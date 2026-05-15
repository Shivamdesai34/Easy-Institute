import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  Common_url, Students_url
} from '../../../globals/global-api';
import Swal from 'sweetalert2';
import { handleError } from '../../../globals/GlobalHandleerror';

@Injectable({
  providedIn: 'root'
})
export class AdditionalsubjectsService implements HttpInterceptor {

  constructor(private http: HttpClient) { }


  // Http Options With json and Token
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + sessionStorage.getItem("Token")
    })
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
  CheckSubjectGroupQuota(data: any): Observable<any> {

    return this.http.post<any>(Students_url.CheckSubjectGroupQuota, JSON.stringify(data), this.httpOptions)
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
  Additionalsubjectformfees(data: any): Observable<any> {
    return this.http.post<any>(Students_url.Additionalsubjectformfees_URL, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  GetModalBatchSubjects(data: any): Observable<any> {
    return this.http.post<any>(Students_url.StudentSubjectGroup, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  PortalOpen(data: any): Observable<any> {
    return this.http.post<any>(Students_url.PortalOpenv1, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(3),
        catchError(handleError)
      )
  }

  AdmissionPayment(data: any): Observable<any> {

    return this.http.post<any>(Students_url.IU_Admission, JSON.stringify(data), this.httpOptions)
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
}

