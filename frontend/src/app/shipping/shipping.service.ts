import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Shipping} from "./shipping";
import 'rxjs/add/operator/map';

@Injectable()
export class ShippingService {

  constructor(private http: Http) { }

  getShippingMethods() {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getshippingmethods', options)
      .map(response => <Shipping[]>response.json());
  }

  getShippingMethodById(shippingMetId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getshippingmethod/' + shippingMetId, options)
      .map(response => <Shipping>response.json());
  }
}
