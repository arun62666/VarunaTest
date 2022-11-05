import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit {
  categoryGroup: any[] = [];
  CategoryForm!: FormGroup;
  id!: number;
  isEdit: boolean = false;
  title: string = '';
  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.title = 'Add Category';
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.isEdit = true;
        this.title = 'Edit Category';
        this.getCategory(this.id);
      }
    });
    this.categoryService.getCategoryGrp().subscribe((res) => {
      console.log(res);
      this.categoryGroup = res.data;
    });

    this.CategoryForm = this.formBuilder.group({
      categoryId: [0],
      categoryName: ['', Validators.required],
      categoryDescription: ['', Validators.required],
      categoryGrpId: ['', Validators.required],
      isActive: [false],
    });
  }

  getCategory(id: number) {
    this.categoryService.getCategoryById(this.id).subscribe((res) => {
      if (res.isSuccess) {
        this.editCategory(res.data);
      }
    });
  }
  editCategory(category: any) {
    this.CategoryForm.patchValue({
      categoryId: this.id,
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription,
      categoryGrpId: category.categoryGrpId,
      isActive: category.isActive,
    });
  }

  submit() {
    if (this.CategoryForm.valid) {
      if (this.isEdit) {
        console.log(this.CategoryForm.value);
        this.categoryService
          .updateCategory(this.CategoryForm.value)
          .subscribe((res) => {
            console.log(res);
            if (res.isSuccess) {
              alert('Category Updated' + res.data);
              this.router.navigate(['list']);
            } else {
              alert(res.errors);
            }
          });
      } else {
        this.categoryService
          .addCategory(this.CategoryForm.value)
          .subscribe((res) => {
            console.log(res);
            if (res.isSuccess) {
              alert('Category Added' + res.data);
              this.router.navigate(['list']);
            } else {
              alert(res.errors);
            }
          });
        this.CategoryForm.reset();
      }
    } else {
      alert('Form Invalid');
    }
  }
}
