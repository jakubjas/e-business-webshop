import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HomeComponent } from "./home.component";
import { ProductListComponent } from './product/product_list.component';
import { ProductListByCategoryComponent } from "./product/product_list_by_category.component";
import { ProductListByTypeComponent } from "./product/product_list_by_type.component";
import { ProductViewComponent } from "./product/product_view.component";
import { CartViewComponent } from "./cart/cart_view.component";
import { CartCheckoutComponent } from "./cart/cart_checkout.component";
import { OrderPlacedComponent } from "./order/order_placed.component";
import { ProductService } from "./product/product.service";
import { CategoryService } from "./category/category.service";
import { TypeService } from "./type/type.service";
import { CartService } from "./cart/cart.service";
import { PaymentService } from "./payment/payment.service";
import { ShippingService } from "./shipping/shipping.service";
import { OrderService } from "./order/order.service";
import { OrderProductService } from "./order/order_product.service";
import { UserService } from "./user/user.service";

import { Routing } from './app.routing';
import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';
import { SignInComponent } from "./user/sign_in.component";
import {AddAddressComponent} from "./user/add_address.component";
import {AddressAddedComponent} from "./user/address_added.component";
import {ViewProfileComponent} from "./user/view_profile.component";
import {OrderViewComponent} from "./order/order_view.component";
import {AdminMainComponent} from "./admin/admin_main.component";
import {AdminProductsComponent} from "./admin/admin_products.component";
import {AdminProductsAddComponent} from "./admin/admin_products_add.component";
import {AdminProductsEditComponent} from "./admin/admin_products_edit.component";
import {AdminCategoriesComponent} from "./admin/admin_categories.component";
import {AdminCategoriesAddComponent} from "./admin/admin_categories_add.component";
import {AdminCategoriesEditComponent} from "./admin/admin_categories_edit.component";

export const GOOGLE_CLIENT_ID = '619310514939-bdvl5mc3u0s03ulgg32611rgkofoatpi.apps.googleusercontent.com';
export const FACEBOOK_CLIENT_ID = '1000237073446232';
export class MyAuthConfig extends CustomConfig {
  defaultHeaders = {'Content-Type': 'application/json'};
  providers = {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      url: 'http://localhost:9900/authenticate/google'
    },
    facebook: {
      clientId: FACEBOOK_CLIENT_ID,
      url: 'http://localhost:9900/authenticate/facebook'
    }
  };
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductListByCategoryComponent,
    ProductListByTypeComponent,
    ProductViewComponent,
    CartViewComponent,
    CartCheckoutComponent,
    OrderPlacedComponent,
    SignInComponent,
    AddAddressComponent,
    AddressAddedComponent,
    ViewProfileComponent,
    OrderViewComponent,
    AdminMainComponent,
    AdminProductsComponent,
    AdminProductsAddComponent,
    AdminProductsEditComponent,
    AdminCategoriesComponent,
    AdminCategoriesAddComponent,
    AdminCategoriesEditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    FormsModule,
    ReactiveFormsModule,
    Routing
  ],
  providers: [ProductService, CategoryService, TypeService, CartService, PaymentService, ShippingService, OrderService, OrderProductService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
