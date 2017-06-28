import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Payment} from "./payment";
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {

  constructor(private http: Http) { }

  getPaymentMethods() {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getpaymentmethods', options)
      .map(response => <Payment[]>response.json());
  }

  getPaymentMethodById(paymentMetId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getpaymentmethod/' + paymentMetId, options)
      .map(response => <Payment>response.json());
  }
}
