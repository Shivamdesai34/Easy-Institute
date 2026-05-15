  import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  Common_url, Fees_url, Students_url
} from '../../../globals/global-api';
import Swal from 'sweetalert2';
import { handleError } from '../../../globals/GlobalHandleerror';
import {
  ApiResponse,
  Ires_Courseapplied, Ires_PhdBatchs, Ires_Reciept,
  Res_ProfileResources,
  res_singlebatch,
  Subjects_group_h
} from "../../../models/response";

@Injectable({
  providedIn: 'root'
})
export class NepadditionalsubjectsService implements HttpInterceptor {

  TokenSession: any;
  constructor(private http: HttpClient) {
    this.TokenSession = sessionStorage.getItem('Token');
   }


  // Http Options With json and Token
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + sessionStorage.getItem("Token")
    })
  }
  header_Api={
    headers: {
      'Anonymous': 'mytoken',
    }
  }
  Nepsubjects_url(jsonin_input:any): Observable<any>{
    return this.http
      .post<any>(Students_url.Nepsubjects_url, jsonin_input, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  single_subject(jsonin_input:any): Observable<ApiResponse<Subjects_group_h>>{
    return this.http
      .post<ApiResponse<Subjects_group_h>>(Fees_url.single_subject,  jsonin_input, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  StudentAppliedCourses(jsonin_input:any): Observable<ApiResponse<Ires_Courseapplied[]>>{
    return this.http
      .post<ApiResponse<Ires_Courseapplied[]>>(Students_url.StudentAppliedCourses,  jsonin_input, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  registertionbatchs(input_json:any): Observable<ApiResponse<res_singlebatch[]>>{
    return this.http
      .post<ApiResponse<res_singlebatch[]>>(Common_url.registertionbatchs,input_json)
      .pipe(catchError(this.handleError));
  }
  PortalOpenv1(jsonin_input:any):  Observable<ApiResponse<Ires_PhdBatchs>>{
    return this.http
      .post<ApiResponse<Ires_PhdBatchs>>(Students_url.PortalOpenv1, jsonin_input, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  Additionalsubjectformfees_URL(jsonin_input:any):  Observable<any>{
    return this.http
      .post<any>(Students_url.Additionalsubjectformfees_URL, jsonin_input, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  StudentSubjectGroup(jsonin:any):Observable<ApiResponse<Subjects_group_h[]>>{
    return this.http
      .post<ApiResponse<Subjects_group_h[]>>(Students_url.StudentSubjectGroup, jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_nepAdmission(input_json:any):Observable<Ires_Reciept>{
    return this.http
      .post<Ires_Reciept>(Students_url.IU_nepAdmission, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  BillDeskcheckSum(data:any):Observable<any>{
    return this.http
      .post<any>(Students_url.BillDeskcheckSum, data, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  batch(input_json:any):Observable<ApiResponse<res_singlebatch>>{
    return this.http
      .post<ApiResponse<res_singlebatch>>(Common_url.batch, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => handleError(error))
    );
  }


  StudentProfileStatus(data: any): Observable<any> {
    return this.http.post<any>(Students_url.StudentProfileStatus, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }



  StreamBatchService(data: any): Observable<any> {
    //let mytoken = sessionStorage.getItem('Token');
    this.TokenSession = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.TokenSession,
      }),
    };
    return this.http
      .post<any>(Common_url.Pg_batchs_URL, JSON.stringify(data), httpFormOptions)
      .pipe(retry(3), catchError(handleError));
  }

  CheckSubjectGroupQuota(data: any): Observable<any> {
    return this.http.post<any>(Students_url.CheckSubjectGroupQuota, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  Check_NepQuota(data: any): Observable<any> {
    return this.http.post<any>(Students_url.nepquotacheck, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  StudentBatch(data: any): Observable<any> {
    return this.http.post<any>(Common_url.GetAllFirstYearBatchs, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  FormFeesPaidCheck(data: any): Observable<any> {
    return this.http.post<any>(Students_url.FormFeesPaid, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  Additionalsubjectformfees(data: any): Observable<any> {
    return this.http.post<any>(Students_url.Additionalsubjectformfees_URL, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  GetModalBatchSubjects(data: any): Observable<any> {
    //let mytoken = sessionStorage.getItem('Token');
    this.TokenSession = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.TokenSession,
      }),
    };
    return this.http
      .post<any>(Students_url.StudentSubjectGroup, JSON.stringify(data), httpFormOptions)
      .pipe(catchError(handleError));
  }
  // GetModalBatchSubjects(data): Observable<any> {
  //   return this.http.post<any>(StudentSubjectGroup, JSON.stringify(data), this.httpOptions)
  //     .pipe(
  //       retry(3),
  //       catchError(handleError)
  //     )
  // }
  GetModel_Nepsubjects(jsonin: any): Observable<any> {
    this.TokenSession = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.TokenSession,
      }),
    };
    return this.http
      .post<any>(Students_url.Nepsubjects_url, JSON.stringify(jsonin), httpFormOptions)
      .pipe(catchError(handleError));
  }
  PortalOpen(data: any): Observable<any> {
    return this.http.post<any>(Students_url.PortalOpenv1, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  AdmissionPayment(data: any): Observable<any> {
    return this.http.post<any>(Students_url.IU_nepAdmission, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  BillDeskTransactionPay(billdeskmsg: any): Observable<any> {
    return this.http.post<any>(Students_url.BillDeskcheckSum, JSON.stringify(billdeskmsg), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  BillDeskcheckSumQuery(billdeskquerymsg: any): Observable<any> {
    return this.http.post<any>(Students_url.BillDeskcheckSumQuery, JSON.stringify(billdeskquerymsg), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
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

