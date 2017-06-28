import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {ProductComplete, ProductService} from "../product/product.service";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin_products.component.html',
  styleUrls: ['./admin_products.component.css']
})

export class AdminProductsComponent implements OnInit {

  products: ProductComplete[] = new Array();

  constructor(private productService: ProductService) { }

  ngOnInit() {

    this.productService.getCompleteProducts().subscribe(data => this.products = data);

  }

  deleteProduct(prodId: number)
  {
    this.productService.deleteProduct(prodId).subscribe(() => this.ngOnInit());
  }

}
