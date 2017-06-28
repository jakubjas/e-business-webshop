import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {ProductService} from './product.service';
import {ProductComplete} from './product.service'
import {ActivatedRoute} from "@angular/router";
import {Type} from '../type/type';
import {TypeService} from "../type/type.service";

@Component({
  selector: 'app-product-list-by-type',
  templateUrl: './product_list_by_type.component.html',
  styleUrls: ['./product_list_by_type.component.css']
})
export class ProductListByTypeComponent implements OnInit {

  products: ProductComplete[] = new Array();
  type: Type;

  constructor(private productService: ProductService, private typeService: TypeService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params
      .map(params => params['typeId'])
      .subscribe((typeId) => {
        this.productService.getCompleteProductsByTypeId(typeId).subscribe(data => this.products = data);
        this.typeService.getTypeById(typeId).subscribe(data => this.type = data);
      });

  }
}
