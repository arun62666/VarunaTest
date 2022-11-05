import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiurl = 'https://api-uat1.varuna.net/api';
  constructor(private http: HttpClient) {}

  doGetData(url: string) {
    return this.http
      .get(`${this.apiurl}${url}`, this.createrequestoption())
      .pipe(catchError((error) => this.catchAuthError(error)));
  }

  doPostData(data: any, url: string) {
    return this.http
      .post(
        `${this.apiurl}${url}`,
        JSON.stringify(data),
        this.createrequestoption()
      )
      .pipe(catchError((error) => this.catchAuthError(error)));
  }

  doDelete(url: string, data: any) {
    return this.http
      .delete(`${this.apiurl}${url}`, this.createrequestoption())
      .pipe(catchError((error) => this.catchAuthError(error)));
  }

  catchAuthError(error: any): Observable<Response> {
    if (error && error.error && error.error.message) {
      alert(error.error.message);
    } else if (error && error.message) {
      alert(error.message);
    } else {
      alert(JSON.stringify(error));
    }
    return throwError(error);
  }

  public createrequestoption() {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });
    let options: any = {
      headers: headers,
    };
    return options;
  }
}
