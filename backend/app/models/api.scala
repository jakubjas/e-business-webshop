package models

import java.sql.Timestamp

import org.joda.time.DateTime
import play.api.libs.json._

case class CategoriesREST(catId: Long, name: String)
case class ProductTypesREST(typeId: Long, name: String)
case class PaymentMethodsREST(paymentMetId: Long, name: String)
case class ShippingMethodsREST(shippingMetId: Long, name: String, price: Int)
case class UsersREST(userId: String, name: String, surname: String, email: String, street: String, zip: String, city: String, isAdmin: Int)
case class ProductsREST(prodId: Long, typeId: Long, catId: Long, name: String, description: String, price: Int)
case class CartsREST(userId: String, prodId: Long)
case class OrdersREST(orderId: Long, userId: String, shippingMetId: Long, paymentMetId: Long, orderTime: Timestamp)
case class OrderProductREST(orderId: Long, prodId: Long)

object CategoriesREST {
  implicit val categoriesFormat = Json.format[CategoriesREST]
}

object ProductTypesREST {
  implicit val productTypesFormat = Json.format[ProductTypesREST]
}

object PaymentMethodsREST {
  implicit val paymentMethodsFormat = Json.format[PaymentMethodsREST]
}

object ShippingMethodsREST {
  implicit val shippingMethodsFormat = Json.format[ShippingMethodsREST]
}

object UsersREST {
  implicit val usersFormat = Json.format[UsersREST]
}

object ProductsREST {
  implicit val productsFormat = Json.format[ProductsREST]
}

object CartsREST {
  implicit val cartsFormat = Json.format[CartsREST]
}

object OrdersREST {
  implicit val timestampFormat = new Format[Timestamp] {
    def reads(json: JsValue): JsResult[Timestamp] = json match {
      case JsNumber(bigDecimal) =>
        JsSuccess(new Timestamp(bigDecimal.toLong))
      case JsString(txtFormat) =>
        JsSuccess(new Timestamp(DateTime.parse(txtFormat).getMillis))
      case _ =>
        JsError(s"Wrong timestamp format: $json")
    }
    def writes(o: Timestamp): JsValue = JsNumber(o.getTime)
  }

  implicit val ordersFormat = Json.format[OrdersREST]
}

object OrderProductREST {
  implicit val orderProductFormat = Json.format[OrderProductREST]
}