package daos

import javax.inject.Inject
import java.sql.Timestamp

import models.{ Orders, OrdersREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile
import slick.profile.SqlProfile.ColumnOption.SqlType

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

class OrdersDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val Users = new UsersDAO(dbConfigProvider).Users
  val ShippingMethods = new ShippingMethodsDAO(dbConfigProvider).ShippingMethods
  val PaymentMethods = new PaymentMethodsDAO(dbConfigProvider).PaymentMethods
  val Orders = TableQuery[OrdersTable]

  def getAll(implicit ec: ExecutionContext): Future[List[OrdersREST]] = {
    val query = Orders
    val results = query.result
    val futureOrders = db.run(results)
    futureOrders.map(
      _.map {
      a =>
        OrdersREST(orderId = a.orderId, userId = a.userId, shippingMetId = a.shippingMetId,
          paymentMetId = a.paymentMetId, orderTime = a.orderTime)
    }.toList
    )
  }

  def getOne(orderId: Long): Future[Option[OrdersREST]] = {
    val futureOrder = db.run(Orders.filter(_.orderId === orderId).result.headOption)

    futureOrder.map(
      _.map {
        a =>
          OrdersREST(orderId = a.orderId, userId = a.userId, shippingMetId = a.shippingMetId,
            paymentMetId = a.paymentMetId, orderTime = a.orderTime)
      }
    )
  }

  def getAllByUser(userId: String): Future[List[OrdersREST]] = {
    val futureOrder = db.run(Orders.filter(_.userId === userId).result)

    futureOrder.map(
      _.map {
      a =>
        OrdersREST(orderId = a.orderId, userId = a.userId, shippingMetId = a.shippingMetId,
          paymentMetId = a.paymentMetId, orderTime = a.orderTime)
    }.toList
    )
  }

  def insert(order: Orders): Future[Long] = db.run((Orders returning Orders.map(_.orderId)) += order)

  def deleteOne(orderId: Long): Future[Int] = db.run(Orders.filter(_.orderId === orderId).delete)

  class OrdersTable(tag: Tag) extends Table[Orders](tag, "Orders") {
    def orderId = column[Long]("orderId", O.PrimaryKey, O.AutoInc)

    //foreign keys
    def userId = column[String]("userId")
    def shippingMetId = column[Long]("shippingMetId")
    def paymentMetId = column[Long]("paymentMetId")
    def userFk = foreignKey("userFk", userId, Users)(_.userId, ForeignKeyAction.Restrict, ForeignKeyAction.Cascade)
    def shippingMetFk = foreignKey("shippingMetFk", shippingMetId, ShippingMethods)(_.shippingMetId, ForeignKeyAction.Restrict, ForeignKeyAction.Cascade)
    def paymentMetFk = foreignKey("paymentMetFk", paymentMetId, PaymentMethods)(_.paymentMetId, ForeignKeyAction.Restrict, ForeignKeyAction.Cascade)

    def orderTime = column[Timestamp]("orderTime", SqlType("timestamp default CURRENT_TIMESTAMP not null"))
    def * = (orderId, userId, shippingMetId, paymentMetId, orderTime) <> (models.Orders.tupled, models.Orders.unapply)
  }

}
