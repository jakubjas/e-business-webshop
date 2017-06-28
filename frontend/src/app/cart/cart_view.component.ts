import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { CartComplete, CartService, TotalPrice } from "./cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart_view.component.html',
  styleUrls: ['./cart_view.component.css']
})

export class CartViewComponent implements OnInit {

  cartProducts: CartComplete[] = new Array();
  totalPrice: TotalPrice;
  userId: string;

  constructor(private userService: UserService, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
      this.userId = user.loginInfo.providerKey;
      this.cartService.getProductsFromCart(user.loginInfo.providerKey).subscribe(data => this.cartProducts = data);
      this.cartService.getTotalPrice(user.loginInfo.providerKey).subscribe(data => this.totalPrice = data);
    });

  }

  deleteProductFromCart(prodId: number) {
    this.cartService.deleteFromCart(this.userId,prodId).subscribe(() => this.ngOnInit());
  }
}
