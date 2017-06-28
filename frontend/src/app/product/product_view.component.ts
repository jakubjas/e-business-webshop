import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {ProductService} from './product.service';
import {CategoryService} from '../category/category.service';
import {CartService} from "../cart/cart.service";
import {TypeService} from '../type/type.service';
import {ActivatedRoute} from "@angular/router";
import {ProductComplete} from './product.service'
import {Cart} from "../cart/cart";
import {isNullOrUndefined} from "util";
import {UserService} from "../user/user.service";
import {AuthService} from "ng2-ui-auth";

@Component({
  selector: 'app-product-view',
  templateUrl: './product_view.component.html',
  styleUrls: ['./product_view.component.css']
})
export class ProductViewComponent implements OnInit {

  product: ProductComplete;
  cart: Cart[];
  isInCart: boolean;

  constructor(private productService: ProductService, private userService: UserService, private cartService: CartService,
              private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {

    if (this.isAuthenticated() != false)
    {
      this.userService.getUser().subscribe(user => {
        this.route.params
          .map(params => params['id'])
          .subscribe((id) => {
            this.productService.getCompleteProductById(id).subscribe(data => this.product = data);
            this.cartService.getCartsByUser(user.loginInfo.providerKey).subscribe(
              data => {
                this.cart = data.filter(item => item.prodId == id);
                this.isInCart = (this.cart.length == 1);
              });
          });
      });
    }
    else {
      this.route.params
        .map(params => params['id'])
        .subscribe((id) => {
          this.productService.getCompleteProductById(id).subscribe(data => this.product = data);
        });
    }

  };

  addProductToCart(prodId: number) {

    this.userService.getUser().subscribe(user => {
      this.cartService.addToCart(user.loginInfo.providerKey, prodId).subscribe(() => this.ngOnInit());
    });

  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
