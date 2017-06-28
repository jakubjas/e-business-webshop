import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {OrderService} from "../order/order.service";
import {Order} from "../order/order";
import {UserService} from "./user.service";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view_profile.component.html',
  styleUrls: ['./view_profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  orders: Order[] = new Array();
  userId: string;

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
      this.userId = user.loginInfo.providerKey;
      this.orderService.getOrdersByUser(this.userId).subscribe(data => this.orders = data);
    });

  }
}
