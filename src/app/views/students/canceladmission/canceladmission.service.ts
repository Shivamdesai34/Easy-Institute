import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  Common_url, Students_url,
} from '../../../globals/global-api';
import Swal from 'sweetalert2';
import {ApiResponse, Banks_new, Ires_PaidBatchs, Ires_personaldata} from "../../../models/response";

@Injectable({
  providedIn: 'root',
})
export class CanceladmissionService {

  errorMessage : string = ""
  Exception : string = ""
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
  Paidbatchs_URL(input_jsonin:any):Observable<ApiResponse<Ires_PaidBatchs[]>> {
    return this.http
      .post<ApiResponse<Ires_PaidBatchs[]>>(Students_url.Paidbatchs_URL,  input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  Cancelledadmission(input_jsonin:any):Observable<any> {
    return this.http
      .post<any>(Students_url.Cancelledadmission,  input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  Bankmasters(input_jsonin:any):Observable<ApiResponse<Banks_new[]>>{
    return this.http
      .post<ApiResponse<Banks_new[]>>(Common_url.Bankmasters,  input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  AdmissionCancel_Request(formdata:any):Observable<any> {
    return this.http
      .post<any>(Students_url.AdmissionCancel_Request,  formdata, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  // HttpClient API post() method => Create employee
  CheckAdmission(data: any): Observable<any> {
    return this.http
      .post<any>(Students_url.CheckAdmission_URL, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  StudentProfileStatus(data: any): Observable<any> {

    return this.http
      .post<any>(
        Students_url.StudentProfileStatus_url,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //https://jasonwatmore.com/post/2022/11/08/angular-http-request-error-handling-with-the-httpclient
  Paidbatchs(jsonin: any): Observable<any> {

    return this.http.post<any>(Students_url.Paidbatchs_URL, JSON.stringify(jsonin), this.httpOptions)
        .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
          this.errorMessage = error.message;
          this.Exception = error.error.exception ;
          return of();
        }))
  }

  Paidbatchs_old(jsonin: any): Observable<any> {

    return this.http
        .post<any>(Students_url.Paidbatchs_URL, JSON.stringify(jsonin), this.httpOptions)
        .pipe(retry(1), catchError(  this.handleError));
  }



  CancelAdmission(FormData: any): Observable<any> {

    return this.http
      .post<any>(Students_url.AdmissionCancel_Request, FormData, this.httpOptionsFormdata)
      .pipe(retry(1), catchError(this.handleError));
  }

  // CancelRequestValidation(data): Observable<any> {
  //
  //   return this.http.post<any>(CancelRequestValidation , JSON.stringify(data) , this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

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
  handleErrorany(error: any): Observable<any> {
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
}
