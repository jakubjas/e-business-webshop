package models

import java.sql.Timestamp

case class Categories(catId: Long, name: String)
case class ProductTypes(typeId: Long, name: String)
case class PaymentMethods(paymentMetId: Long, name: String)
case class ShippingMethods(shippingMetId: Long, name: String, price: Int)
case class Users(userId: String, name: String, surname: String, email: String, street: String, zip: String, city: String, isAdmin: Int)
case class Products(prodId: Long, typeId: Long, catId: Long, name: String, description: String, price: Int)
case class Carts(userId: String, prodId: Long)
case class CartProduct(cartId: Long, prodId: Long)
case class Orders(orderId: Long, userId: String, shippingMetId: Long, paymentMetId: Long, orderTime: Timestamp)
case class OrderProduct(orderId: Long, prodId: Long)