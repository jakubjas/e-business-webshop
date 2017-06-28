package daos

import javax.inject.Inject

import models.{ Categories, CategoriesREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

class CategoriesDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val Categories = TableQuery[CategoriesTable]

  def getAll(implicit ec: ExecutionContext): Future[List[CategoriesREST]] = {
    val query = Categories
    val results = query.result
    val futureCategories = db.run(results)
    futureCategories.map(
      _.map {
      a => CategoriesREST(catId = a.catId, name = a.name)
    }.toList
    )
  }

  def getOne(catId: Long): Future[Option[CategoriesREST]] = {
    val futureCategory = db.run(Categories.filter(_.catId === catId).result.headOption)

    futureCategory.map(
      _.map {
        a => CategoriesREST(catId = a.catId, name = a.name)
      }
    )
  }

  def insert(category: Categories): Future[Unit] = db.run(Categories += category).map { _ => () }

  def deleteOne(catId: Long): Future[Int] = db.run(Categories.filter(_.catId === catId).delete)

  def edit(id: Long, category: Categories): Future[Int] = {
    val toUpdate = category.copy(catId = id)
    db.run(Categories.insertOrUpdate(toUpdate))
  }

  class CategoriesTable(tag: Tag) extends Table[Categories](tag, "Categories") {
    def catId = column[Long]("catId", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def * = (catId, name) <> (models.Categories.tupled, models.Categories.unapply)
  }

}
