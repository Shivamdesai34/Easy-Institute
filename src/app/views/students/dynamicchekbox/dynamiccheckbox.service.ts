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
import {Ires_subjectlist} from "../../../models/response";
import {Ireq_subjectlist} from "../../../models/request";

@Injectable({
  providedIn: 'root',
})
export class DynamiccheckboxService {

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

  Cancelledadmission(data: any): Observable<any> {

    return this.http
      .post<any>(Students_url.Cancelledadmission, JSON.stringify(data), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
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

  Bankmasters(data: any): Observable<any> {
    return this.http
      .post<any>(Common_url.Bankmasters, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  subject_list(apiname: string, jsonin: any): Observable<any> {

    return this.http
      .post<any>(apiname, jsonin, {
        headers: {
          'Anonymous': 'mytoken',
          // 'Originname': location.origin,
          // 'Pathname': location.pathname,

        }
      })
      .pipe(catchError(this.handleError));
  }

  savestudentsubjects(apiname: string, jsonin: any): Observable<any> {

    return this.http
      .post<any>(apiname, jsonin, {
        headers: {
          'Anonymous': 'mytoken',
          // 'Originname': location.origin,
          // 'Pathname': location.pathname,
        }
      })
      .pipe(catchError(this.handleError));
  }



  subjectgroup_d_list(apiname: string, jsonin: any): Observable<any> {

    return this.http
      .post<Ires_subjectlist[]>(apiname, jsonin)
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
