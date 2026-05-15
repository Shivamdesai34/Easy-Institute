import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {
  Billdesk_url,
  Common_url, queryapi_URl,
  Students_url
} from '../../globals/global-api';
import Swal from "sweetalert2";
import {
  ApiResponse, Ires_eligibility, IRes_myprofilemultiplebatchs,
  Ires_personaldata,
  Ires_Profilesubmited, Ires_validateEligiblestudents,
  Iresp_Formfees,
  Res_Outstanding, res_singlebatch
} from "../../models/response";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

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
  httpOptionsWithoutToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  header_Api={
    headers: {
      'Anonymous': 'mytoken',
    }
  }
  public ProfileResources(): Observable<any> {
    return this.http
        .post<any>(Students_url.ProfileResources, '', this.httpOptions)
        .pipe(catchError(this.handleError));
  }



  checkoutstanding(jsonin_input: any): Observable<ApiResponse<Res_Outstanding>>{
    return this.http
        .post<ApiResponse<Res_Outstanding>>(Students_url.checkoutstanding, jsonin_input, this.header_Api)
        .pipe(catchError(this.handleError));
  }


  // formfeesreceivedv1_url(jsonin_input: any): Observable<ApiResponse<Iresp_Formfees>>{
  //   return this.http
  //     .post<ApiResponse<Iresp_Formfees>>(Students_url.formfeesreceivedv1_url, jsonin_input, this.header_Api)
  //     .pipe(catchError(this.handleError));
  // }

//vishal
  formfeesreceivedv1_url(credentials: any): Observable<ApiResponse<Iresp_Formfees>> {
    let formfeesreceivedv1Url = environment.API_URL +  '/v1/Students/formfeesreceivedv1'
    return this.http.post<ApiResponse<Iresp_Formfees>>(formfeesreceivedv1Url, credentials, {
      withCredentials: true
    }).pipe(
        tap(response => {
          if (response) {

            console.log('resloign2', response);

          }
        })
    );
  }

  IsProfileSubmited_URL(jsonin: any): Observable<ApiResponse<Ires_Profilesubmited>>{
    return this.http
      .post<ApiResponse<Ires_Profilesubmited>>(Students_url.IsProfileSubmited_URL, jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_Changeprofilesubmit(jsonin_input: any): Observable<any>{
    return this.http
      .post<any>(Students_url.IU_Changeprofilesubmit,  jsonin_input, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  StudentMyProfile_URL(jsonin_input: any): Observable<ApiResponse<IRes_myprofilemultiplebatchs>>{
    return this.http
      .post<ApiResponse<IRes_myprofilemultiplebatchs>>(Students_url.StudentMyProfile_URL, jsonin_input, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  Run_aueryapi(jsonin_input: any): Observable<any>{
    return this.http
        .post<any>('https://admission.rjcollege.edu.in:7005/v1/Billdesk/run_queryapi_singlestudent',  jsonin_input, this.header_Api)
        .pipe(catchError(this.handleError));
  }


  // batch(input_json: any): Observable<ApiResponse<res_singlebatch>>{
  //   return this.http
  //     .post<ApiResponse<res_singlebatch>>(Common_url.batch, input_json, this.header_Api)
  //     .pipe(catchError(this.handleError));
  // }


  //vishal
  batch(credentials: any): Observable<res_singlebatch> {
    let formfeesreceivedv1Url = environment.API_URL+'/v1/Common/batch'
    return this.http.post<res_singlebatch>(formfeesreceivedv1Url, credentials, {
      withCredentials: true
    }).pipe(
        tap(response => {
          if (response) {

            console.log('resloign2', response);

          }
        })
    );
  }

  validateeliglibity(jsonin: any): Observable<ApiResponse<Ires_eligibility>>{
    return this.http
      .post<ApiResponse<Ires_eligibility>>(Students_url.validateeliglibity, jsonin, this.header_Api)
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
