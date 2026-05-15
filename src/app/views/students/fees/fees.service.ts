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
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Common_url, Fees_url, Students_url,} from '../../../globals/global-api';
import {
  AdmissionQuotasubjectGroups,
  ApiResponse,
  Ires_ApprovedCourse,
  Ires_installments, Ires_Reciept,
  Paymentterms,
  Student_Profile
} from "../../../models/response";

@Injectable({
  providedIn: 'root',
})
export class FeesService implements HttpInterceptor {
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
  header_Api = {
    headers: {
      'Anonymous': 'mytoken',
    }
  }

  // HttpClient API post() method => Create employee
  studentactivefinyear(data: any): Observable<number> {
    return this.http
      .post<number>(Students_url.studentactivefinyear, data)
      .pipe(catchError(this.handleError));
  }

  InstallmentValidation(input_jsonin: any): Observable<any> {
    return this.http
      .post<any>(Students_url.InstallmentValidation, input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  StudentApprovedCourses(input_jsonin: any): Observable<ApiResponse<Ires_ApprovedCourse[]>> {
    return this.http
      .post<ApiResponse<Ires_ApprovedCourse[]>>(Students_url.StudentApprovedCourses, input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  CheckAdmission_URL(input_jsonin: any): Observable<any> {
    return this.http
      .post<any>(Students_url.CheckAdmission_URL, input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  StudentProfileStatus_url(input_jsonin: any): Observable<ApiResponse<Student_Profile[]>> {
    return this.http
      .post<ApiResponse<Student_Profile[]>>(Students_url.StudentProfileStatus_url, input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  studentfeesinstallment_new(input_jsonin: any): Observable<ApiResponse<Ires_installments>> {
    return this.http
      .post<ApiResponse<Ires_installments>>(Students_url.studentfeesinstallment_new, input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  BatchSubjects(jsonin: any): Observable<ApiResponse<Ires_installments>> {
    return this.http
      .post<ApiResponse<Ires_installments>>(Students_url.studentfeesinstallment_new, jsonin)
      .pipe(catchError(this.handleError));
  }

  CheckSubjectGroupQuota(input_jsonin: any): Observable<ApiResponse<AdmissionQuotasubjectGroups[]>>{
    return this.http
      .post<ApiResponse<AdmissionQuotasubjectGroups[]>>(Students_url.CheckSubjectGroupQuota, input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  paymentterms(data: any): Observable<ApiResponse<Paymentterms>> {
    return this.http
      .post<ApiResponse<Paymentterms>>(Students_url.paymentterms, data)
      .pipe(catchError(this.handleError));
  }

  IU_receipt(input_jsonin: any): Observable<ApiResponse<Ires_Reciept>>{
    return this.http
      .post<ApiResponse<Ires_Reciept>>(Students_url.IU_receipt, input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  BillDeskcheckSum(input_jsonin: any): Observable<string> {
    return this.http
      .post<string>(Students_url.BillDeskcheckSum, input_jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  FormFeesPaid(data: any): Observable<any> {
    return this.http
      .post<any>(Students_url.FormFeesPaid_URL, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  checkoutstanding(data: any): Observable<any> {
    return this.http
      .post<any>(Students_url.checkoutstanding, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  StudentProfileStatus(data: any): Observable<any> {

    return this.http
      .post<any>(
        Students_url.StudentProfileStatus_url,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }


  GetBatch(data: any): Observable<any> {
    return this.http
      .post<any>(Students_url.StudentBatch, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  StudentSubjectGroup(data: any): Observable<any> {
    return this.http
      .post<any>(Common_url.BatchSubjects, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  StudentFeesInstallments(data: any): Observable<any> {
    return this.http
      .post<any>(Students_url.StudentFeesInstallment, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  payment_terms(): Observable<any> {
    return this.http
      .post<any>(Students_url.paymentterms, '', this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  BillDeskTransactionPay(data: any) {
    return this.http
      .post<any>(Students_url.BillDeskcheckSum, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  ReceiptDetails(data: any) {
    return this.http
      .post<any>(Students_url.IU_receipt, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  BillDeskcheckSumQuery(billdeskquerymsg: any): Observable<any> {
    return this.http
      .post<any>(
        Students_url.BillDeskcheckSumQuery,
        JSON.stringify(billdeskquerymsg),
        this.httpOptions
      )
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
