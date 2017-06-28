import {Component} from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {Category} from "../category/category";
import {CategoryService} from "../category/category.service";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-categories-add',
  templateUrl: './admin_categories_add.component.html',
  styleUrls: ['./admin_categories_add.component.css']
})

export class AdminCategoriesAddComponent {

  category: Category = new Category();
  isCategoryAvailableBool: boolean = false;

  constructor(private categoryService: CategoryService, private router: Router) { }

  addCategory()
  {
    this.categoryService.addCategory(this.category).subscribe(
      data => this.router.navigate(['/admin'])
    );
  }

  isCategoryComplete()
  {
    if (!isNullOrUndefined(this.category.name))
    {
      if (this.category.name.length > 0)
      {
        this.isCategoryAvailableBool = true;
      }
      else {
        this.isCategoryAvailableBool = false;
      }
    }
    else {
      this.isCategoryAvailableBool = false;
    }
  }
}
