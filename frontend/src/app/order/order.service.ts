import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import { Order } from './order';
import {Product} from "../product/product";
import {Observable} from "rxjs/Observable";
import {ProductService} from "../product/product.service";

@Injectable()
export class OrderService {

  constructor(private http: Http, private productService: ProductService) {
  }

  placeOrder(order: Order) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:9900/addorder', order, options)
      .map(response => response.json());
  }

  getOrdersByUser(userId: string) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getordersbyuser/' + userId, options)
      .map(response => <Order[]>response.json());
  }

  getOrderProducts(orderId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getorderproducts/' + orderId, options)
      .map(response => <Product[]>response.json());
  }

  getOrderById(orderId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getorder/' + orderId, options)
      .map(response => <Order>response.json());
  }

  getProductsFromOrder(orderId: number) {
    return Observable.forkJoin([
      this.productService.getCompleteProducts(),
      this.getOrderProducts(orderId),
    ]).map(results => {
      let products = results[0];
      let orderproducts = results[1];

      return orderproducts.map(orderproduct => {
        let product = products.find(product => product.prodId == orderproduct.prodId);

        return new OrderComplete(
          product.prodId,
          product.name,
          product.category,
          product.type,
          product.price);
      });
    });
  }

  getTotalPrice(orderId: number) {
    return Observable.forkJoin([
      this.getProductsFromOrder(orderId).map(res => res),
    ]).map(results => {
      let totalPrice = results[0].map(item => item.price).reduce((sum, current) => sum + current);
      return new TotalPrice(totalPrice);
    });
  }
}

export class OrderComplete
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
