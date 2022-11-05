import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../common/category.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private dataservice: DataService) {}
  categoryList = [];
  getCategory(): Observable<any> {
    return this.dataservice.doGetData('/Category/GetAll');
  }

  addCategory(data: any): Observable<any> {
    return this.dataservice.doPostData(data, '/Category/Save');
  }

  updateCategory(data: any): Observable<any> {
    return this.dataservice.doPostData(data, '/Category/Update');
  }

  deleteCategory(id: number): Observable<any> {
    let Id = { Id: id };
    return this.dataservice.doDelete('/Category/Delete/' + id, Id);
  }

  getCategoryById(id: number): Observable<any> {
    return this.dataservice.doGetData('/Category/GetById/' + id);
  }

  getCategoryGrp(): Observable<any> {
    return this.dataservice.doGetData('/CategoryGroup/GetAll');
  }
}
