package daos

import javax.inject.Inject

import models.{ Products, ProductsREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

class ProductsDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val ProductTypes = new ProductTypesDAO(dbConfigProvider).ProductTypes
  val Categories = new CategoriesDAO(dbConfigProvider).Categories
  val Products = TableQuery[ProductsTable]

  def getAll(implicit ec: ExecutionContext): Future[List[ProductsREST]] = {
    val query = Products
    val results = query.result
    val futureProducts = db.run(results)
    futureProducts.map(
      _.map {
      a => ProductsREST(prodId = a.prodId, typeId = a.typeId, catId = a.catId, name = a.name, description = a.description, price = a.price)
    }.toList
    )
  }

  def getOne(prodId: Long): Future[Option[ProductsREST]] = {
    val futureProduct = db.run(Products.filter(_.prodId === prodId).result.headOption)

    futureProduct.map(
      _.map {
        a => ProductsREST(prodId = a.prodId, typeId = a.typeId, catId = a.catId, name = a.name, description = a.description, price = a.price)
      }
    )
  }

  def insert(product: Products): Future[Unit] = db.run(Products += product).map { _ => () }

  def deleteOne(prodId: Long): Future[Int] = db.run(Products.filter(_.prodId === prodId).delete)

  def edit(id: Long, product: Products): Future[Int] = {
    val toUpdate = product.copy(prodId = id)
    db.run(Products.insertOrUpdate(toUpdate))
  }

  class ProductsTable(tag: Tag) extends Table[Products](tag, "Products") {
    def prodId = column[Long]("prodId", O.PrimaryKey, O.AutoInc)

    //foreign keys
    def typeId = column[Long]("typeId")
    def catId = column[Long]("catId")
    def typeFk = foreignKey("typeFk", typeId, ProductTypes)(_.typeId, ForeignKeyAction.Restrict, ForeignKeyAction.Cascade)
    def catFk = foreignKey("catFk", catId, Categories)(_.catId, ForeignKeyAction.Restrict, ForeignKeyAction.Cascade)

    def name = column[String]("name")
    def description = column[String]("description")
    def price = column[Int]("price")
    def * = (prodId, typeId, catId, name, description, price) <> (models.Products.tupled, models.Products.unapply)
  }

}
