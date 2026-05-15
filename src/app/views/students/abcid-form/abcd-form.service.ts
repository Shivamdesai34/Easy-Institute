import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  abcd_details,
  Common_url, Students_url,
} from '../../../globals/global-api';
import Swal from 'sweetalert2';
import {ApiResponse, Banks_new, Ires_authabcd, Ires_PaidBatchs, Ires_personaldata} from "../../../models/response";

@Injectable({
  providedIn: 'root',
})
export class AbcdFormService {

  errorMessage : string = ""
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.getItem('Token'),
    }),
  };

  httpOptionsFormdata = {
    headers: new HttpHeaders({
      Authorization: 'Token ' + sessionStorage.getItem('Token'),
    }),
  };
  header_Api={
    headers: {
      'Anonymous': 'mytoken',
    }
  }

  auth_abcd(jsonin:any){
      this.http
          .post<Ires_authabcd>(abcd_details.abc_oauth, jsonin)
          .pipe(catchError(this.handleError))
          .subscribe({
            next: (response) => {
              // console.log('Auth response:', response);
              // You can also store the access_key here if needed
              // this.accessKey = response.access_key;
            },
            error: (err) => {
              console.error('Auth error:', err);
            }
          });
  }

  get_abcdetails(jsonin:any):Observable<any> {
    return this.http
        .post<any>(abcd_details.abcaccountsbasicdetails,  jsonin, this.header_Api)
        .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse): Observable<any> {

    if (error.error !== null) {
      this.errorMessage = error.message;
      Swal.fire({
        title: 'Message!',
        text: error.error.exception,
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    } else {
      Swal.fire({
        title: 'Error!',
        text: error.status + 'Server Error!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    }
    return throwError(error);
  }

  //https://jasonwatmore.com/post/2022/11/08/angular-http-request-error-handling-with-the-httpclient

}
