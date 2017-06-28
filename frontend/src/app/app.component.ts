import { Component, OnInit } from '@angular/core';
import { Category } from './category/category';
import { Type } from './type/type';
import { Cart } from "./cart/cart";
import { TypeService } from './type/type.service';
import { CategoryService } from './category/category.service';
import { CartService } from './cart/cart.service';
import { AuthService } from "ng2-ui-auth";
import {UserService} from "./user/user.service";
import {User} from "./user/user";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: Category[];
  types: Type[];
  cartCounter: number = 0;
  user: any;
  isAdminBool: boolean = false;

  constructor(private categoryService: CategoryService, private typeService: TypeService,
              private cartService: CartService, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(data => this.categories = data);
    this.typeService.getTypes().subscribe(data => this.types = data);
    this.cartService.OnCartChange$.subscribe( data => this.updateCartCounter() );
    this.categoryService.OnCategoriesUpdate$.subscribe( data => this.updateCategories() );
    this.userService.OnUserChange$.subscribe( _ => {
      this.updateUser();
      this.updateCartCounter();
    } );

    if (this.isAuthenticated() != false)
    {
      this.updateUser();
      this.updateCartCounter();
    }
  }

  updateCategories() {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  updateCartCounter() {
    if (this.isAuthenticated() != false) {
      this.userService.getUserWithAddress().subscribe(
        user => this.cartService.getCartsByUser(user.userId).subscribe(data => this.cartCounter = data.length)
      );
    }
  }

  updateUser() {
    if (this.isAuthenticated() != false) {
      this.userService.getUserWithAddress().subscribe(
        data => {
          this.user = data;
          this.updateAdminBool();
        });
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  updateAdminBool() {
    if (!isNullOrUndefined(this.user)) {
      if (this.user.isAdmin == 1) {
        this.isAdminBool = true;
      }
      else {
        this.isAdminBool = false;
      }
    }
  }

  signIn(provider) {
    this.userService.signIn(provider);
  }

  signOut() {
    this.userService.signOut();
  }
}
