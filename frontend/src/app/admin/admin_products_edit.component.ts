import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {Category} from "../category/category";
import {Type} from "../type/type";
import {CategoryService} from "../category/category.service";
import {TypeService} from "../type/type.service";
import {Product} from "../product/product";
import {isNullOrUndefined} from "util";
import {ProductService} from "../product/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-products-edit',
  templateUrl: './admin_products_edit.component.html',
  styleUrls: ['./admin_products_edit.component.css']
})

export class AdminProductsEditComponent implements OnInit {

  categories: Category[] = new Array();
  types: Type[] = new Array();
  product: Product = new Product();
  productId: number;
  isProductAvailableBool: boolean = true;

  constructor(private categoryService: CategoryService, private productService: ProductService,
              private typeService: TypeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.productService.getProductById(id).subscribe(data => {
          this.productId = data.prodId;
          this.product.typeId = data.typeId;
          this.product.catId = data.catId;
          this.product.name = data.name;
          this.product.description = data.description;
          this.product.price = data.price;
        });
        this.categoryService.getCategories().subscribe(data => this.categories = data);
        this.typeService.getTypes().subscribe(data => this.types = data);
        this.product.catId = 1;
        this.product.typeId = 1;
      });
  }

  editProduct()
  {
    this.productService.editProduct(this.productId, this.product).subscribe(
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
