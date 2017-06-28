import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { CartComplete, CartService, TotalPrice } from "./cart.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PaymentService } from "../payment/payment.service";
import { ShippingService } from "../shipping/shipping.service";
import { UserService } from "../user/user.service";
import { OrderService } from "../order/order.service";
import { OrderProductService } from "../order/order_product.service";
import { Payment } from "../payment/payment";
import { Shipping } from "../shipping/shipping";
import { User } from "../user/user";


@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart_checkout.component.html',
  styleUrls: ['./cart_checkout.component.css']
})

export class CartCheckoutComponent implements OnInit {

  user: User;
  userId: string;
  cartProducts: CartComplete[] = new Array();
  paymentMethods: Payment[] = new Array();
  shippingMethods: Shipping[] = new Array();
  totalPrice: TotalPrice;
  shippingPrice: number = 5;
  isAddressAvailable: boolean = false;
  order: CompleteOrder = {
    orderId: 0,
    userId: "",
    shippingMetId: 1,
    paymentMetId: 1,
    orderTime: new Date()
  };

  constructor(private cartService: CartService, private paymentService: PaymentService, private shippingService: ShippingService,
              private userService: UserService, private orderService: OrderService, private orderProductService: OrderProductService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.userService.getUserWithAddress().subscribe(user => {
      this.userId = user.userId;
      this.user = user;
      this.order.userId = this.userId;

      if (user.street != "" && user.zip != "" && user.city != "")
      {
        this.isAddressAvailable = true;
      }

      this.cartService.getProductsFromCart(user.userId).subscribe(data => this.cartProducts = data);
      this.cartService.getTotalPrice(user.userId).subscribe(data => this.totalPrice = data);
      this.paymentService.getPaymentMethods().subscribe(data => this.paymentMethods = data);
      this.shippingService.getShippingMethods().subscribe(data => this.shippingMethods = data);
    });

  }

  updateShippingPrice() {

    for (let shippingMethod of this.shippingMethods)
    {
      if (shippingMethod.shippingMetId == this.order.shippingMetId)
      {
        this.shippingPrice = shippingMethod.price
      }
    }

  }

  placeOrder() {

    return Observable.forkJoin([
      this.orderService.placeOrder(this.order),
      this.cartService.emptyCart(this.order.userId)
    ]).map(results => {
      let orderId = results[0];

      for (let cartProduct of this.cartProducts)
      {
        this.orderProductService.addProductToOrder(orderId, cartProduct.prodId).subscribe()
      }
    }).subscribe( res => {
      this.router.navigate(['/orderplaced'])
    });

  }

}

export class CompleteOrder
{
  orderId: number;
  userId: string;
  shippingMetId: number;
  paymentMetId: number;
  orderTime: Date;

  constructor(userId: string, shippingMetId: number, paymentMetId: number)
  {
    this.orderId = 0;
    this.userId = userId;
    this.shippingMetId = shippingMetId;
    this.paymentMetId = paymentMetId;
    this.orderTime = new Date("2012-04-23T18:25:43.511Z");
  }
}
