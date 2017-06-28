package controllers

import java.sql.Timestamp
import java.util.Date
import javax.inject.Inject

import daos.{ CartsDAO, CategoriesDAO, OrderProductDAO, OrdersDAO, PaymentMethodsDAO, ProductTypesDAO, ProductsDAO, ShippingMethodsDAO, UsersDAO }
import models.{ Carts, Categories, OrderProduct, Orders, PaymentMethods, ProductTypes, Products, ShippingMethods, Users }
import models.{ CartsREST, CategoriesREST, OrderProductREST, OrdersREST, PaymentMethodsREST, ProductTypesREST, ProductsREST, ShippingMethodsREST, UsersREST }
import play.api.libs.json.Json
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext

class Application @Inject() (categoriesDAO: CategoriesDAO, productTypesDAO: ProductTypesDAO,
    paymentMethodsDAO: PaymentMethodsDAO, shippingMethodsDAO: ShippingMethodsDAO,
    usersDAO: UsersDAO, productsDAO: ProductsDAO, cartsDAO: CartsDAO,
    ordersDAO: OrdersDAO, orderProductDAO: OrderProductDAO) extends Controller {

  // Categories
  def getcategories = Action.async { implicit request =>
    categoriesDAO.getAll map {
      categories => Ok(Json.toJson(categories))
    }
  }

  def getcategory(catId: Long) = Action.async { implicit request =>
    categoriesDAO.getOne(catId) map {
      category => Ok(Json.toJson(category))
    }
  }

  def addcategory = Action { implicit request =>
    var json: CategoriesREST = request.body.asJson.get.as[CategoriesREST]
    var category = Categories(catId = 0, name = json.name)
    var res = categoriesDAO.insert(category)
    Ok(request.body.asJson.get)
  }

  def deletecategory(catId: Long) = Action.async { implicit request =>
    categoriesDAO.deleteOne(catId) map {
      result => Ok(Json.toJson(result))
    }
  }

  def editcategory(id: Long) = Action.async { implicit request =>
    var json: CategoriesREST = request.body.asJson.get.as[CategoriesREST]
    var category = Categories(catId = 0, name = json.name)
    categoriesDAO.edit(id, category) map {
      result => Ok(Json.toJson(result))
    }
  }

  // Product Types
  def getproducttypes = Action.async { implicit request =>
    productTypesDAO.getAll map {
      productTypes => Ok(Json.toJson(productTypes))
    }
  }

  def getproducttype(typeId: Long) = Action.async { implicit request =>
    productTypesDAO.getOne(typeId) map {
      productType => Ok(Json.toJson(productType))
    }
  }

  def addproducttype = Action { implicit request =>
    var json: ProductTypesREST = request.body.asJson.get.as[ProductTypesREST]
    var productType = ProductTypes(typeId = 0, name = json.name)
    var res = productTypesDAO.insert(productType)
    Ok(request.body.asJson.get)
  }

  def deleteproducttype(typeId: Long) = Action.async { implicit request =>
    productTypesDAO.deleteOne(typeId) map {
      result => Ok(Json.toJson(result))
    }
  }

  def editproducttype(id: Long) = Action.async { implicit request =>
    var json: ProductTypesREST = request.body.asJson.get.as[ProductTypesREST]
    var productType = ProductTypes(typeId = 0, name = json.name)
    productTypesDAO.edit(id, productType) map {
      result => Ok(Json.toJson(result))
    }
  }

  // Payment Methods
  def getpaymentmethods = Action.async { implicit request =>
    paymentMethodsDAO.getAll map {
      paymentMethods => Ok(Json.toJson(paymentMethods))
    }
  }

  def getpaymentmethod(paymentMetId: Long) = Action.async { implicit request =>
    paymentMethodsDAO.getOne(paymentMetId) map {
      paymentMethod => Ok(Json.toJson(paymentMethod))
    }
  }

  def addpaymentmethod = Action { implicit request =>
    var json: PaymentMethodsREST = request.body.asJson.get.as[PaymentMethodsREST]
    var paymentMethod = PaymentMethods(paymentMetId = 0, name = json.name)
    var res = paymentMethodsDAO.insert(paymentMethod)
    Ok(request.body.asJson.get)
  }

  def deletepaymentmethod(paymentMetId: Long) = Action.async { implicit request =>
    paymentMethodsDAO.deleteOne(paymentMetId) map {
      result => Ok(Json.toJson(result))
    }
  }

  def editpaymentmethod(id: Long) = Action.async { implicit request =>
    var json: PaymentMethodsREST = request.body.asJson.get.as[PaymentMethodsREST]
    var paymentMethod = PaymentMethods(paymentMetId = 0, name = json.name)
    paymentMethodsDAO.edit(id, paymentMethod) map {
      result => Ok(Json.toJson(result))
    }
  }

  // Shipping Methods
  def getshippingmethods = Action.async { implicit request =>
    shippingMethodsDAO.getAll map {
      shippingMethods => Ok(Json.toJson(shippingMethods))
    }
  }

  def getshippingmethod(shippingMetId: Long) = Action.async { implicit request =>
    shippingMethodsDAO.getOne(shippingMetId) map {
      shippingMethod => Ok(Json.toJson(shippingMethod))
    }
  }

  def addshippingmethod = Action { implicit request =>
    var json: ShippingMethodsREST = request.body.asJson.get.as[ShippingMethodsREST]
    var shippingMethod = ShippingMethods(shippingMetId = 0, name = json.name, price = json.price)
    var res = shippingMethodsDAO.insert(shippingMethod)
    Ok(request.body.asJson.get)
  }

  def deleteshippingmethod(shippingMetId: Long) = Action.async { implicit request =>
    shippingMethodsDAO.deleteOne(shippingMetId) map {
      result => Ok(Json.toJson(result))
    }
  }

  def editshippingmethod(id: Long) = Action.async { implicit request =>
    var json: ShippingMethodsREST = request.body.asJson.get.as[ShippingMethodsREST]
    var shippingMethod = ShippingMethods(shippingMetId = 0, name = json.name, price = json.price)
    shippingMethodsDAO.edit(id, shippingMethod) map {
      result => Ok(Json.toJson(result))
    }
  }

  // Users
  def getusers = Action.async { implicit request =>
    usersDAO.getAll map {
      users => Ok(Json.toJson(users))
    }
  }

  def getuser(userId: String) = Action.async { implicit request =>
    usersDAO.getOne(userId) map {
      user => Ok(Json.toJson(user))
    }
  }

  def adduser = Action { implicit request =>
    var json: UsersREST = request.body.asJson.get.as[UsersREST]
    var user = Users(userId = json.userId, name = json.name, surname = json.surname,
      email = json.email, street = json.street, zip = json.zip, city = json.city, isAdmin = json.isAdmin)
    var res = usersDAO.insert(user)
    Ok(request.body.asJson.get)
  }

  def deleteuser(userId: String) = Action.async { implicit request =>
    usersDAO.deleteOne(userId) map {
      result => Ok(Json.toJson(result))
    }
  }

  def edituser = Action.async { implicit request =>
    var json: UsersREST = request.body.asJson.get.as[UsersREST]
    var user = Users(userId = json.userId, name = json.name, surname = json.surname,
      email = json.email, street = json.street, zip = json.zip, city = json.city, isAdmin = json.isAdmin)
    usersDAO.edit(user) map {
      result => Ok(Json.toJson(result))
    }
  }

  // Products
  def getproducts = Action.async { implicit request =>
    productsDAO.getAll map {
      products => Ok(Json.toJson(products))
    }
  }

  def getproduct(prodId: Long) = Action.async { implicit request =>
    productsDAO.getOne(prodId) map {
      product => Ok(Json.toJson(product))
    }
  }

  def addproduct = Action { implicit request =>
    var json: ProductsREST = request.body.asJson.get.as[ProductsREST]
    var product = Products(prodId = 0, typeId = json.typeId, catId = json.catId,
      name = json.name, description = json.description, price = json.price)
    var res = productsDAO.insert(product)
    Ok(request.body.asJson.get)
  }

  def deleteproduct(prodId: Long) = Action.async { implicit request =>
    productsDAO.deleteOne(prodId) map {
      result => Ok(Json.toJson(result))
    }
  }

  def editproduct(id: Long) = Action.async { implicit request =>
    var json: ProductsREST = request.body.asJson.get.as[ProductsREST]
    var product = Products(prodId = 0, typeId = json.typeId, catId = json.catId,
      name = json.name, description = json.description, price = json.price)
    productsDAO.edit(id, product) map {
      result => Ok(Json.toJson(result))
    }
  }

  // Carts
  def getusercart(usrId: String) = Action.async { implicit request =>
    cartsDAO.getAllByUser(usrId) map {
      carts => Ok(Json.toJson(carts))
    }
  }

  def addtocart = Action { implicit request =>
    var json: CartsREST = request.body.asJson.get.as[CartsREST]
    var cart = Carts(userId = json.userId, prodId = json.prodId)
    var res = cartsDAO.insert(cart)
    Ok(request.body.asJson.get)
  }

  def deletefromcart(usrId: String, prodId: Long) = Action.async { implicit request =>
    cartsDAO.deleteOne(usrId, prodId) map {
      result => Ok(Json.toJson(result))
    }
  }

  def emptycart(usrId: String) = Action.async { implicit request =>
    cartsDAO.deleteAll(usrId) map {
      result => Ok(Json.toJson(result))
    }
  }

  // Orders
  def getorders = Action.async { implicit request =>
    ordersDAO.getAll map {
      orders => Ok(Json.toJson(orders))
    }
  }

  def getordersbyuser(usrId: String) = Action.async { implicit request =>
    ordersDAO.getAllByUser(usrId) map {
      orders => Ok(Json.toJson(orders))
    }
  }

  def getorder(orderId: Long) = Action.async { implicit request =>
    ordersDAO.getOne(orderId) map {
      order => Ok(Json.toJson(order))
    }
  }

  def addorder = Action.async { implicit request =>
    var now = new Date()
    var json: OrdersREST = request.body.asJson.get.as[OrdersREST]
    var order = Orders(orderId = 0, userId = json.userId, shippingMetId = json.shippingMetId,
      paymentMetId = json.paymentMetId, orderTime = new Timestamp(now.getTime()))

    ordersDAO.insert(order) map {
      result => Ok(Json.toJson(result))
    }
  }

  def deleteorder(orderId: Long) = Action.async { implicit request =>
    ordersDAO.deleteOne(orderId) map {
      result => Ok(Json.toJson(result))
    }
  }

  // OrderProduct
  def getorderproducts(orderId: Long) = Action.async { implicit request =>
    orderProductDAO.getAll(orderId) map {
      products => Ok(Json.toJson(products))
    }
  }

  def addorderproduct = Action { implicit request =>
    var json: OrderProductREST = request.body.asJson.get.as[OrderProductREST]
    var orderProduct = OrderProduct(orderId = json.orderId, prodId = json.prodId)
    var res = orderProductDAO.insert(orderProduct)
    Ok(request.body.asJson.get)
  }

  // Options fix
  def options(path: String) = Action {
    Ok("").withHeaders(
      "Access-Control-Allow-Origin" -> "*",
      "Access-Control-Allow-Methods" -> "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers" -> "Accept, Origin, Content-type, X-Json, X-Prototype-Version, X-Requested-With",
      "Access-Control-Allow-Credentials" -> "true",
      "Access-Control-Max-Age" -> (60 * 60 * 24).toString
    )
  }
}