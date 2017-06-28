import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {ProductService} from './product.service';
import {ProductComplete} from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product_list.component.html',
  styleUrls: ['./product_list.component.css']
})
export class ProductListComponent implements OnInit {

  products: ProductComplete[] = new Array();

  constructor(private productService: ProductService) { }

  ngOnInit() {

    this.productService.getCompleteProducts().subscribe(data => this.products = data);

  }
}
