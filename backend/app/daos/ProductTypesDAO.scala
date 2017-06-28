package daos

import javax.inject.Inject

import models.{ ProductTypes, ProductTypesREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

class ProductTypesDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val ProductTypes = TableQuery[ProductTypesTable]

  def getAll(implicit ec: ExecutionContext): Future[List[ProductTypesREST]] = {
    val query = ProductTypes
    val results = query.result
    val futureProductTypes = db.run(results)
    futureProductTypes.map(
      _.map {
      a => ProductTypesREST(typeId = a.typeId, name = a.name)
    }.toList
    )
  }

  def getOne(typeId: Long): Future[Option[ProductTypesREST]] = {
    val futureProductType = db.run(ProductTypes.filter(_.typeId === typeId).result.headOption)

    futureProductType.map(
      _.map {
        a => ProductTypesREST(typeId = a.typeId, name = a.name)
      }
    )
  }

  def insert(productType: ProductTypes): Future[Unit] = db.run(ProductTypes += productType).map { _ => () }

  def deleteOne(typeId: Long): Future[Int] = db.run(ProductTypes.filter(_.typeId === typeId).delete)

  def edit(id: Long, productType: ProductTypes): Future[Int] = {
    val toUpdate = productType.copy(typeId = id)
    db.run(ProductTypes.insertOrUpdate(toUpdate))
  }

  class ProductTypesTable(tag: Tag) extends Table[ProductTypes](tag, "ProductTypes") {
    def typeId = column[Long]("typeId", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def * = (typeId, name) <> (models.ProductTypes.tupled, models.ProductTypes.unapply)
  }

}
