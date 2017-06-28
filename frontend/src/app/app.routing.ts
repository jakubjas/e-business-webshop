import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { HomeComponent } from "./home.component";
import { ProductListComponent } from './product/product_list.component';
import { ProductListByCategoryComponent } from "./product/product_list_by_category.component";
import { ProductListByTypeComponent } from "./product/product_list_by_type.component";
import { ProductViewComponent } from "./product/product_view.component";
import { CartViewComponent } from "./cart/cart_view.component";
import { CartCheckoutComponent } from "./cart/cart_checkout.component";
import { OrderPlacedComponent } from "./order/order_placed.component";
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


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products_by_category/:catId',
    component: ProductListByCategoryComponent
  },
  {
    path: 'products_by_type/:typeId',
    component: ProductListByTypeComponent
  },
  {
    path: 'product/:id',
    component: ProductViewComponent
  },
  {
    path: 'cart',
    component: CartViewComponent
  },
  {
    path: 'checkout',
    component: CartCheckoutComponent
  },
  {
    path: 'orderplaced',
    component: OrderPlacedComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'addaddress',
    component: AddAddressComponent
  },
  {
    path: 'addressadded',
    component: AddressAddedComponent
  },
  {
    path: 'viewprofile',
    component: ViewProfileComponent
  },
  {
    path: 'order/:id',
    component: OrderViewComponent
  },
  {
    path: 'admin',
    component: AdminMainComponent
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent
  },
  {
    path: 'admin/products/add',
    component: AdminProductsAddComponent
  },
  {
    path: 'admin/products/edit/:id',
    component: AdminProductsEditComponent
  },
  {
    path: 'admin/categories',
    component: AdminCategoriesComponent
  },
  {
    path: 'admin/categories/add',
    component: AdminCategoriesAddComponent
  },
  {
    path: 'admin/categories/edit/:id',
    component: AdminCategoriesEditComponent
  }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
