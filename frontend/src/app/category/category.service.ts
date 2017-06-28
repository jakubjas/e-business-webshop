import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Category} from "./category";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Injectable()
export class CategoryService {

  public OnCategoriesUpdate$: Observable<any>;
  private observer: Observer<any>;

  constructor(private http: Http) {
    this.OnCategoriesUpdate$ = new Observable(observer => this.observer = observer).share();
  }

  getCategories() {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getcategories', options)
      .map(response => <Category[]>response.json());
  }

  getCategoryById(catId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getcategory/' + catId, options)
      .map(response => <Category>response.json());
  }

  addCategory(category: Category) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let category_complete = new Category();

    category_complete.catId = 0;
    category_complete.name = category.name;

    const options = new RequestOptions({headers: headers});

    return this.http
      .post('http://localhost:9900/addcategory', category_complete, options)
      .do(_ => this.observer.next(null))
      .map(response => response.json());

  }

  deleteCategory(catId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http
      .get('http://localhost:9900/deletecategory/' + catId, options)
      .do(_ => this.observer.next(null))
      .map(response => response.json());
  }

  editCategory(catId: number, category: Category) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http
      .post('http://localhost:9900/editcategory/' + catId, category, options)
      .do(_ => this.observer.next(null))
      .map(response => response.json());

  }
}
