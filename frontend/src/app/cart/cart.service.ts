import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Cart} from "./cart";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ProductService } from "../product/product.service";
import { Product } from "../product/product";
import {Observer} from "rxjs/Observer";

@Injectable()
export class CartService {

  public OnCartChange$: Observable<any>;
  private observer: Observer<any>;

  constructor(private http: Http, private productService: ProductService) {
    this.OnCartChange$ = new Observable(observer => this.observer = observer).share();
  }

  getCartsByUser(userId: string) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getusercart/' + userId, options)
      .map(response => <Cart[]>response.json());
  }

  getProductsFromCart(userId: string) {
    return Observable.forkJoin([
      this.productService.getCompleteProducts(),
      this.getCartsByUser(userId),
    ]).map(results => {
      let products = results[0];
      let carts = results[1];

      return carts.map(cart => {
        let product = products.find(product => product.prodId == cart.prodId);

        return new CartComplete(
          product.prodId,
          product.name,
          product.category,
          product.type,
          product.price);
      });
    });
  }

  getTotalPrice(userId: string) {
    return Observable.forkJoin([
      this.getProductsFromCart(userId).map(res => res),
    ]).map(results => {
      let totalPrice = results[0].map(item => item.price).reduce((sum, current) => sum + current);
      return new TotalPrice(totalPrice);
    });
  }

  addToCart(userId: string, prodId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let cart = new Cart();

    cart.userId = userId;
    cart.prodId = prodId;

    const options = new RequestOptions({headers: headers});

    return this.http
      .post('http://localhost:9900/addtocart', cart, options)
      .do(_ => this.observer.next(null))
      .map(response => response.json());

  }

  deleteFromCart(userId: string, prodId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http
      .get('http://localhost:9900/deletefromcart/' + userId + '/' + prodId, options)
      .do(_ => this.observer.next(null))
      .map(response => response.json());

  }

  emptyCart(userId: string) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http
      .get('http://localhost:9900/emptycart/' + userId, options)
      .do(_ => this.observer.next(null))
      .map(response => response.json());
  }
}

export class CartComplete
{
  prodId: number;
  name: string;
  category: string;
  type: string;
  price: number;

  constructor(prodId: number, name: string, category: string, type: string, price: number)
  {
    this.prodId = prodId;
    this.name = name;
    this.category = category;
    this.type = type;
    this.price = price;
  }
}

export class TotalPrice
{
  price: number;

  constructor(price: number)
  {
    this.price = price;
  }
}
