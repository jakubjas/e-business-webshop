package daos

import javax.inject.Inject

import models.{ OrderProduct, OrderProductREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

class OrderProductDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val Orders = new OrdersDAO(dbConfigProvider).Orders
  val Products = new ProductsDAO(dbConfigProvider).Products
  val OrderProduct = TableQuery[OrderProductTable]

  def getAll(orderId: Long): Future[List[OrderProductREST]] = {
    val futureOrderProduct = db.run(OrderProduct.filter(_.orderId === orderId).result)

    futureOrderProduct.map(
      _.map {
      a => OrderProductREST(orderId = a.orderId, prodId = a.prodId)
    }.toList
    )
  }

  def insert(orderProduct: OrderProduct): Future[Unit] = db.run(OrderProduct += orderProduct).map { _ => () }

  class OrderProductTable(tag: Tag) extends Table[OrderProduct](tag, "OrderProduct") {
    //foreign keys
    def orderId = column[Long]("orderId")
    def prodId = column[Long]("prodId")
    def orderFk = foreignKey("orderFk", orderId, Orders)(_.orderId, ForeignKeyAction.Restrict, ForeignKeyAction.Cascade)
    def prodFk = foreignKey("prodFk", prodId, Products)(_.prodId, ForeignKeyAction.Restrict, ForeignKeyAction.Cascade)

    def * = (orderId, prodId) <> (models.OrderProduct.tupled, models.OrderProduct.unapply)
  }

}