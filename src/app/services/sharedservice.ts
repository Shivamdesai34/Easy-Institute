import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {ApiResponse, Ires_Profilesubmited, Iresp_Formfees} from "../models/response";
import {Students_url} from "../globals/global-api";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class Sharedservice {

  constructor(private http: HttpClient) {}


  IsProfileSubmited_URL(jsonin: any): Observable<ApiResponse<Ires_Profilesubmited>>{
    return this.http
        .post<ApiResponse<Ires_Profilesubmited>>(Students_url.IsProfileSubmited_URL, jsonin,)
        .pipe(catchError(this.handleError));
  }

  isFormfeesreceivedv1(credentials: any): Observable<ApiResponse<Iresp_Formfees>> {
    return this.http
        .post<ApiResponse<Iresp_Formfees>>(Students_url.formfeesreceivedv1_url, credentials,)
        .pipe(catchError(this.handleError));
  }

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
