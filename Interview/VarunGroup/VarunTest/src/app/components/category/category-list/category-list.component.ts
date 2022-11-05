import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}
  categoryList: any = [];
  searchText: string = '';
  categoryGroup = [];
  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategory().subscribe((res: any) => {
      if (res.isSuccess) {
        this.categoryList = res.data;
        this.categoryList = this.categoryList.filter((ele: any) => {
          return ele.status !== 'DeActive';
        });
      } else {
        console.log(res.error);
      }
    });
  }
  deleteCategory(category: any) {
    this.categoryService
      .deleteCategory(+category.categoryId)
      .subscribe((res) => {
        if (res.isSuccess) {
          alert(res.data + 'Category DeActivated Successfully');
          this.getCategory();
        } else {
          alert(res.error + ' DeActivated failed');
        }
      });
  }
}
