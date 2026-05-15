import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SuccessresponseService {

  token!: string;

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API post() method => Create employee
//   ForgotPassword(data): Observable<any> {
//
//     return this.http.post<any>(Forgotpassword , JSON.stringify(data), this.httpOptions)
//     .pipe(
//       retry(1),
//       catchError(this.handleError)
//     )

//   }

  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
      Swal.fire({ title: 'Message!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
    }
    else {
      Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert

    }
    return throwError(error);
  }
  // Error handling
 //  handleError(error) {
 //    let errorMessage = '';
 //    if(error.error instanceof ErrorEvent) {
 //      // Get client-side error
 //      errorMessage = error.error.message;
 //    } else {
 //      // Get server-side error
 //      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
 //    }
 //    window.alert(errorMessage);
 //    return throwError(errorMessage);
 // }
}
