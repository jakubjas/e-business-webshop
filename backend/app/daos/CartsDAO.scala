package daos

import javax.inject.Inject

import models.{ Carts, CartsREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

class CartsDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val Users = new UsersDAO(dbConfigProvider).Users
  val Products = new ProductsDAO(dbConfigProvider).Products
  val Carts = TableQuery[CartsTable]

  def getAllByUser(userId: String): Future[List[CartsREST]] = {
    val futureCart = db.run(Carts.filter(_.userId === userId).result)

    futureCart.map(
      _.map {
      a => CartsREST(userId = a.userId, prodId = a.prodId)
    }.toList
    )
  }

  def insert(cart: Carts): Future[Unit] = db.run(Carts += cart).map { _ => () }

  def deleteOne(usrId: String, prodId: Long): Future[Int] = db.run(Carts.filter(_.userId === usrId).filter(_.prodId === prodId).delete)

  def deleteAll(usrId: String): Future[Int] = db.run(Carts.filter(_.userId === usrId).delete)

  class CartsTable(tag: Tag) extends Table[Carts](tag, "Carts") {
    def userId = column[String]("userId", O.PrimaryKey)
    def prodId = column[Long]("prodId", O.PrimaryKey)
    def userFk = foreignKey("userFk", userId, Users)(_.userId, ForeignKeyAction.Restrict, ForeignKeyAction.Cascade)
    def prodFk = foreignKey("prodFk", prodId, Products)(_.prodId, ForeignKeyAction.Restrict, ForeignKeyAction.Cascade)

    def * = (userId, prodId) <> (models.Carts.tupled, models.Carts.unapply)
  }

}