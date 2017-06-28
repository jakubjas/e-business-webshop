import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Type} from "./type";
import 'rxjs/add/operator/map';

@Injectable()
export class TypeService {

  constructor(private http: Http) { }

  getTypes() {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getproducttypes', options)
      .map(response => <Type[]>response.json());
  }

  getTypeById(typeId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getproducttype/' + typeId, options)
      .map(response => <Type>response.json());
  }
}
