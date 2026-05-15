import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError, tap} from 'rxjs/operators';
import {
  reports_URl,
  Students_url
} from '../../../globals/global-api';
import Swal from 'sweetalert2';
import {
  ApiResponse, ApprovedCourse,
  Ires_allreciepts, IRes_downloadsinglereceipt,
  Ires_personaldata, IRes_singlereceipt, Iresp_Login,
  PaidInstallments_M,
  Subjects_group_h
} from "../../../models/response";
import {IBatchname, Ifinyear} from "./feereceipt.responsemodel";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class FeereceiptService implements HttpInterceptor {
  constructor(private http: HttpClient) {
  }

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
  // HttpClient API post() method => Create employee

  CheckAdmission(jsonin: any): Observable<any> {
    return this.http
      .post<any>(Students_url.CheckAdmission_URL, JSON.stringify(jsonin), this.httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }

  StudentApprovedCourses(input_jsonin: any): Observable<ApiResponse<ApprovedCourse[]>> {

    return this.http
      .post<ApiResponse<ApprovedCourse[]>>(Students_url.StudentApprovedCourses,input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  Paidfinyear(input_jsonin: any): Observable<ApiResponse<Ifinyear[]>> {

    return this.http
      .post<ApiResponse<Ifinyear[]>>(Students_url.Paidfinyear, input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  Paidbatchs_URL(input_jsonin: any): Observable<ApiResponse<IBatchname[]>> {

    return this.http
      .post<ApiResponse<IBatchname[]>>(Students_url.Paidbatchs_URL, input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  StudentReceiptDetailsv2(input_jsonin: any): Observable<ApiResponse<PaidInstallments_M[]>> {
    return this.http
      .post<ApiResponse<PaidInstallments_M[]>>(Students_url.StudentReceiptDetailsv2,input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  allreceipts(input_jsonin: any): Observable<ApiResponse<Ires_allreciepts[]>> {
    return this.http
      .post<ApiResponse<Ires_allreciepts[]>>(Students_url.allreceipts,input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  singlereceipt(input_jsonin: any): Observable<ApiResponse<IRes_singlereceipt>> {
    return this.http
      .post<ApiResponse<IRes_singlereceipt>>(Students_url.singlereceipt,input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  receipts(input_jsonin: any): Observable<ApiResponse<IRes_downloadsinglereceipt>> {
    return this.http
        .post<ApiResponse<IRes_downloadsinglereceipt>>(reports_URl.receipts,input_jsonin)
        .pipe(catchError(this.handleError));
  }



  StudentProfileStatus(jsonin: any): Observable<any> {

    return this.http
      .post<any>(
        Students_url.StudentProfileStatus_url,
        JSON.stringify(jsonin),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  GetBatch(jsonin: any): Observable<any> {
    return this.http
      .post<any>(Students_url.StudentBatch, JSON.stringify(jsonin), this.httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }

  StudentReceiptDetails(jsonin: any): Observable<any> {
    return this.http
      .post<any>(
        Students_url.StudentReceiptDetails_URL,
        JSON.stringify(jsonin),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.handleError));
  }



  // Error handling
  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
      Swal.fire({
        title: 'Error!',
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

  DownloadRecipte(credentials: any): Observable<IRes_downloadsinglereceipt> {
    let recieptDownload = environment.API_URL_RECIEPT + '/download_student_receipt'
    console.log('recieptDownload',recieptDownload)
    return this.http.post<IRes_downloadsinglereceipt>(recieptDownload, credentials, {
      withCredentials: true
    }).
    pipe(
        tap(response => {
          if (response) {
             console.log('res',response.filename)
          }
        })
    );
  }
}
