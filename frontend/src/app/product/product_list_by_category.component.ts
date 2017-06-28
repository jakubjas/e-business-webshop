import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {ProductService} from './product.service';
import {CategoryService} from "../category/category.service";
import {ProductComplete} from './product.service'
import {ActivatedRoute} from "@angular/router";
import {Category} from "../category/category";

@Component({
  selector: 'app-product-list-by-category',
  templateUrl: './product_list_by_category.component.html',
  styleUrls: ['./product_list_by_category.component.css']
})
export class ProductListByCategoryComponent implements OnInit {

  products: ProductComplete[] = new Array();
  category: Category;

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params
      .map(params => params['catId'])
      .subscribe((catId) => {
        this.productService.getCompleteProductsByCategoryId(catId).subscribe(data => this.products = data);
        this.categoryService.getCategoryById(catId).subscribe(data => this.category = data);
      });

  }
}
