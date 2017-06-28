import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user/user.service";
import {OrderComplete, OrderService, TotalPrice} from "./order.service";
import {Payment} from "../payment/payment";
import {Shipping} from "../shipping/shipping";
import {PaymentService} from "../payment/payment.service";
import {ShippingService} from "../shipping/shipping.service";
import {Order} from "./order";
import {User} from "../user/user";

@Component({
  selector: 'app-order-view',
  templateUrl: './order_view.component.html',
  styleUrls: ['./order_view.component.css']
})
export class OrderViewComponent implements OnInit {

  user: User;
  order: OrderComplete[];
  orderId: number;
  totalPrice: TotalPrice;
  paymentMethod: Payment;
  shippingMethod: Shipping;

  constructor(private userService: UserService, private orderService: OrderService, private paymentService: PaymentService,
              private shippingService: ShippingService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.orderService.getProductsFromOrder(id).subscribe(data => this.order = data);
        this.orderService.getTotalPrice(id).subscribe(data => this.totalPrice = data);
        this.orderService.getOrderById(id).subscribe(data => {
          this.orderId = id;
          this.userService.getUserWithAddressById(data.userId).subscribe(data => this.user = data);
          this.paymentService.getPaymentMethodById(data.paymentMetId).subscribe(data => this.paymentMethod = data);
          this.shippingService.getShippingMethodById(data.shippingMetId).subscribe(data => {
            this.shippingMethod = data;
            this.orderService.getTotalPrice(id).subscribe(data => this.totalPrice = data);
          });
        });
      });

  }
}
