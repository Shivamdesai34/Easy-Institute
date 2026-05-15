import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Allbatchs} from "../../../models/response";
import {Common_url, Students_url} from "../../../globals/global-api";

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API post() method => Create employee
  // ResetPassword(data): Observable<any> {
  //   return this.http.post<any>(ResetPassword , JSON.stringify(data), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }
  header_Api={
    headers: {
      'Anonymous': 'mytoken',
    }
  }
  ResetPassword(jsonin:any): Observable<any> {
    return this.http.post<any>(Students_url.ResetPassword, jsonin,this.header_Api)
      .pipe(catchError(this.handleError));
  }

   // Error handling
   handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
        Swal.fire({ title: 'Message!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
    }
    else {
        Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert
    }
    return throwError(error);
}
}
