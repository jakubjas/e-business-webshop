import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Product} from "./product";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Rx';
import {CategoryService} from '../category/category.service';
import {TypeService} from '../type/type.service';
import {AuthService} from "ng2-ui-auth";


@Injectable()
export class ProductService {

  constructor(private http: Http, private categoryService: CategoryService, private typeService: TypeService) { }

  getProducts() {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getproducts', options)
      .map(response => <Product[]>response.json());
  }

  getCompleteProducts() {
    return Observable.forkJoin([
      this.getProducts().map(res => res),
      this.categoryService.getCategories().map(res => res),
      this.typeService.getTypes().map(res => res)
    ]).map(results => {
      let productsWithIds = results[0];
      let categories = results[1];
      let types = results[2];

      return productsWithIds.map(product => {
        let category = categories.find(category => category.catId == product.catId);
        let type = types.find(type => type.typeId == product.typeId);

        return new ProductComplete(
          product.prodId,
          type.name,
          category.name,
          product.name,
          product.description,
          product.price);
      });
    });
  }

  getCompleteProductsByCategoryId(catId: number) {
    return Observable.forkJoin([
      this.getProducts().map(res => res.filter(item => item.catId == catId)),
      this.categoryService.getCategories().map(res => res),
      this.typeService.getTypes().map(res => res)
    ]).map(results => {
      let productsWithIds = results[0];
      let categories = results[1];
      let types = results[2];

      return productsWithIds.map(product => {
        let category = categories.find(category => category.catId == product.catId);
        let type = types.find(type => type.typeId == product.typeId);

        return new ProductComplete(
          product.prodId,
          type.name,
          category.name,
          product.name,
          product.description,
          product.price);
      });
    });
  }

  getCompleteProductsByTypeId(typeId: number) {
    return Observable.forkJoin([
      this.getProducts().map(res => res.filter(item => item.typeId == typeId)),
      this.categoryService.getCategories().map(res => res),
      this.typeService.getTypes().map(res => res)
    ]).map(results => {
      let productsWithIds = results[0];
      let categories = results[1];
      let types = results[2];

      return productsWithIds.map(product => {
        let category = categories.find(category => category.catId == product.catId);
        let type = types.find(type => type.typeId == product.typeId);

        return new ProductComplete(
          product.prodId,
          type.name,
          category.name,
          product.name,
          product.description,
          product.price);
      });
    });
  }

  getCompleteProductById(prodId: number) {
    return Observable.forkJoin([
      this.getProductById(prodId).map(res => res),
      this.categoryService.getCategories().map(res => res),
      this.typeService.getTypes().map(res => res)
    ]).map(results => {
      let productWithId = results[0];
      let categories = results[1];
      let types = results[2];

      let category = categories.find(category => category.catId == productWithId.catId);
      let type = types.find(type => type.typeId == productWithId.typeId);

      return new ProductComplete(
        productWithId.prodId,
        type.name,
        category.name,
        productWithId.name,
        productWithId.description,
        productWithId.price);
    });
  }

  getProductById(prodId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getproduct/' + prodId, options)
      .map(response => <Product>response.json());
  }

  addProduct(product: Product) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let product_complete = new Product();

    product_complete.prodId = 0;
    product_complete.typeId = product.typeId;
    product_complete.catId = product.catId;
    product_complete.name = product.name;
    product_complete.description = product.description;
    product_complete.price = product.price;

    const options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:9900/addproduct', product_complete, options)
      .map(response => response.json());

  }

  editProduct(prodId: number, product: Product) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let product_complete = new Product();

    product_complete.prodId = prodId;
    product_complete.typeId = product.typeId;
    product_complete.catId = product.catId;
    product_complete.name = product.name;
    product_complete.description = product.description;
    product_complete.price = product.price;

    const options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:9900/editproduct/' + prodId, product_complete, options)
      .map(response => response.json());

  }

  deleteProduct(prodId: number) {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/deleteproduct/' + prodId, options)
      .map(response => response.json());
  }
}

export class ProductComplete
{
  prodId: number;
  type: string;
  category: string;
  name: string;
  description: string;
  price: number;

  constructor(prodId: number, type: string, category: string, name: string, description: string, price: number)
  {
    this.prodId = prodId;
    this.type = type;
    this.category = category;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
