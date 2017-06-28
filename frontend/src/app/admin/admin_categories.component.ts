import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {Category} from "../category/category";
import {CategoryService} from "../category/category.service";

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin_categories.component.html',
  styleUrls: ['./admin_categories.component.css']
})

export class AdminCategoriesComponent implements OnInit {

  categories: Category[] = new Array();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(data => this.categories = data);

  }

  deleteCategory(catId: number)
  {
    this.categoryService.deleteCategory(catId).subscribe(() => this.ngOnInit());
  }

}
