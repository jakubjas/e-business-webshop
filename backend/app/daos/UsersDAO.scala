package daos

import javax.inject.Inject

import models.{ Users, UsersREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

class UsersDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val Users = TableQuery[UsersTable]

  def getAll(implicit ec: ExecutionContext): Future[List[UsersREST]] = {
    val query = Users
    val results = query.result
    val futureUsers = db.run(results)
    futureUsers.map(
      _.map {
      a =>
        UsersREST(userId = a.userId, name = a.name, surname = a.surname,
          email = a.email, street = a.street, zip = a.zip, city = a.city, isAdmin = a.isAdmin)
    }.toList
    )
  }

  def getOne(userId: String): Future[Option[UsersREST]] = {
    val futureUser = db.run(Users.filter(_.userId === userId).result.headOption)

    futureUser.map(
      _.map {
        a =>
          UsersREST(userId = a.userId, name = a.name, surname = a.surname,
            email = a.email, street = a.street, zip = a.zip, city = a.city, isAdmin = a.isAdmin)
      }
    )
  }

  def insert(user: Users): Future[Unit] = db.run(Users += user).map { _ => () }

  def deleteOne(userId: String): Future[Int] = db.run(Users.filter(_.userId === userId).delete)

  def edit(user: Users): Future[Int] = {
    db.run(Users.insertOrUpdate(user))
  }

  class UsersTable(tag: Tag) extends Table[Users](tag, "Users") {
    def userId = column[String]("userId", O.PrimaryKey)
    def name = column[String]("name")
    def surname = column[String]("surname")
    def email = column[String]("email")
    def street = column[String]("street")
    def zip = column[String]("zip")
    def city = column[String]("city")
    def isAdmin = column[Int]("isAdmin")
    def * = (userId, name, surname, email, street, zip, city, isAdmin) <> (models.Users.tupled, models.Users.unapply)
  }

}
