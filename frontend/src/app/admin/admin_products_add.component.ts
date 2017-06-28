import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {Category} from "../category/category";
import {Type} from "../type/type";
import {CategoryService} from "../category/category.service";
import {TypeService} from "../type/type.service";
import {Product} from "../product/product";
import {isNullOrUndefined} from "util";
import {ProductService} from "../product/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-products-add',
  templateUrl: './admin_products_add.component.html',
  styleUrls: ['./admin_products_add.component.css']
})

export class AdminProductsAddComponent implements OnInit {

  categories: Category[] = new Array();
  types: Type[] = new Array();
  product: Product = new Product();
  isProductAvailableBool: boolean = false;

  constructor(private categoryService: CategoryService, private productService: ProductService, private typeService: TypeService, private router: Router) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
    this.typeService.getTypes().subscribe(data => this.types = data);
    this.product.catId = 1;
    this.product.typeId = 1;
  }

  addProduct()
  {
    this.productService.addProduct(this.product).subscribe(
      data => this.router.navigate(['/admin'])
    );
  }

  isProductNameReady()
  {
    if (!isNullOrUndefined(this.product.name))
    {
      if (this.product.name.length > 0)
      {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  isProductDescriptionReady()
  {
    if (!isNullOrUndefined(this.product.description))
    {
      if (this.product.description.length > 0)
      {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  isProductComplete()
  {
    if (this.isProductNameReady() && this.product.catId != null && this.product.typeId != null && this.product.price != null && this.isProductDescriptionReady())
    {
      this.isProductAvailableBool = true;
    }
    else
    {
      this.isProductAvailableBool = false;
    }
  }
}
