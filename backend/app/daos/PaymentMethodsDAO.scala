package daos

import javax.inject.Inject

import models.{ PaymentMethods, PaymentMethodsREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

class PaymentMethodsDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val PaymentMethods = TableQuery[PaymentMethodsTable]

  def getAll(implicit ec: ExecutionContext): Future[List[PaymentMethodsREST]] = {
    val query = PaymentMethods
    val results = query.result
    val futurePaymentMethods = db.run(results)
    futurePaymentMethods.map(
      _.map {
      a => PaymentMethodsREST(paymentMetId = a.paymentMetId, name = a.name)
    }.toList
    )
  }

  def getOne(paymentMetId: Long): Future[Option[PaymentMethodsREST]] = {
    val futurePaymentMethod = db.run(PaymentMethods.filter(_.paymentMetId === paymentMetId).result.headOption)

    futurePaymentMethod.map(
      _.map {
        a => PaymentMethodsREST(paymentMetId = a.paymentMetId, name = a.name)
      }
    )
  }

  def insert(paymentMethod: PaymentMethods): Future[Unit] = db.run(PaymentMethods += paymentMethod).map { _ => () }

  def deleteOne(paymentMetId: Long): Future[Int] = db.run(PaymentMethods.filter(_.paymentMetId === paymentMetId).delete)

  def edit(id: Long, paymentMethod: PaymentMethods): Future[Int] = {
    val toUpdate = paymentMethod.copy(paymentMetId = id)
    db.run(PaymentMethods.insertOrUpdate(toUpdate))
  }

  class PaymentMethodsTable(tag: Tag) extends Table[PaymentMethods](tag, "PaymentMethods") {
    def paymentMetId = column[Long]("paymentMetId", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def * = (paymentMetId, name) <> (models.PaymentMethods.tupled, models.PaymentMethods.unapply)
  }

}