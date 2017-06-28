import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {Category} from "../category/category";
import {CategoryService} from "../category/category.service";
import {isNullOrUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-categories-edit',
  templateUrl: './admin_categories_edit.component.html',
  styleUrls: ['./admin_categories_edit.component.css']
})

export class AdminCategoriesEditComponent implements OnInit {

  category: Category = new Category();
  isCategoryAvailableBool: boolean = true;

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.categoryService.getCategoryById(id).subscribe(data => {
          this.category = data
        });
      });
  }

  editCategory()
  {
    this.categoryService.editCategory(this.category.catId, this.category).subscribe(
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
