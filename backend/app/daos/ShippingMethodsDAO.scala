package daos

import javax.inject.Inject

import models.{ ShippingMethods, ShippingMethodsREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

class ShippingMethodsDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val ShippingMethods = TableQuery[ShippingMethodsTable]

  def getAll(implicit ec: ExecutionContext): Future[List[ShippingMethodsREST]] = {
    val query = ShippingMethods
    val results = query.result
    val futureShippingMethods = db.run(results)
    futureShippingMethods.map(
      _.map {
      a => ShippingMethodsREST(shippingMetId = a.shippingMetId, name = a.name, price = a.price)
    }.toList
    )
  }

  def getOne(shippingMetId: Long): Future[Option[ShippingMethodsREST]] = {
    val futureShippingMethod = db.run(ShippingMethods.filter(_.shippingMetId === shippingMetId).result.headOption)

    futureShippingMethod.map(
      _.map {
        a => ShippingMethodsREST(shippingMetId = a.shippingMetId, name = a.name, price = a.price)
      }
    )
  }

  def insert(shippingMethod: ShippingMethods): Future[Unit] = db.run(ShippingMethods += shippingMethod).map { _ => () }

  def deleteOne(shippingMetId: Long): Future[Int] = db.run(ShippingMethods.filter(_.shippingMetId === shippingMetId).delete)

  def edit(id: Long, shippingMethod: ShippingMethods): Future[Int] = {
    val toUpdate = shippingMethod.copy(shippingMetId = id)
    db.run(ShippingMethods.insertOrUpdate(toUpdate))
  }

  class ShippingMethodsTable(tag: Tag) extends Table[ShippingMethods](tag, "ShippingMethods") {
    def shippingMetId = column[Long]("shippingMetId", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def price = column[Int]("price")
    def * = (shippingMetId, name, price) <> (models.ShippingMethods.tupled, models.ShippingMethods.unapply)
  }

}