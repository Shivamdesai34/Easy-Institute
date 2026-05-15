import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  Marksheet_url, Students_url,
} from '../../../globals/global-api';
import Swal from 'sweetalert2';
import {ApiResponse, Ires_Studentmarklist, Res_Outstanding, Res_ProfileResources} from "../../../models/response";

@Injectable({
  providedIn: 'root',
})
export class MarksheetViewerService implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.getItem('Token'),
    }),
  };
  header_Api={
    headers: {
      'Anonymous': 'mytoken',
    }
  }
  studentsmarksheetlist(input_json: any):Observable<ApiResponse<Ires_Studentmarklist[]>> {
    return this.http
      .post<ApiResponse<Ires_Studentmarklist[]>>(Students_url.ProfileResources,   input_json,this.header_Api)
      .pipe(catchError(this.handleError));
  }
  printmarksheet_date(input_json: any):Observable<any> {
    return this.http
      .post<any>(Marksheet_url.printmarksheet_date,input_json,this.header_Api)
      .pipe(catchError(this.handleError));
  }
  checkoutstanding(input_json: any):Observable<ApiResponse<Res_Outstanding>> {
    return this.http
      .post<ApiResponse<Res_Outstanding>>(Students_url.checkoutstanding,input_json,this.header_Api)
      .pipe(catchError(this.handleError));
  }
  validateeliglibity(data: any): Observable<any> {
    return this.http
      .post<any>(Students_url.validateeliglibity, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  validateadmissionstarted(data: any): Observable<any> {
    return this.http
      .post<any>(
        Students_url.validateadmissionstarted,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  printmarksheet(data: any): Observable<any> {
    return this.http
      .post<any>(Marksheet_url.printmarksheet, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
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
