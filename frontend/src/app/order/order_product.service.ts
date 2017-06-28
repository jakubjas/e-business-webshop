import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { OrderProduct } from "./order_product";

@Injectable()
export class OrderProductService {

  constructor(private http: Http) {
  }

  addProductToOrder(orderId: number, prodId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    let orderProduct = new OrderProduct();

    orderProduct.orderId = orderId;
    orderProduct.prodId = prodId;

    return this.http.post('http://localhost:9900/addorderproduct', orderProduct, options)
      .map(response => response.json());
  }
}
