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
import Swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';
import {Common_url, Fees_url, Students_url,} from '../../../globals/global-api';
import {
  AdmissionQuotasubjectGroups,
  ApiResponse,
  Ires_Courseapplied,
  Ires_registerbatch,
  res_singlebatch,
  Subjects_group_h
} from "../../../models/response";

@Injectable({
  providedIn: 'root',
})
export class FormfeesService implements HttpInterceptor {
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

  data: any;
  loginResponse: any;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.getItem('Token'),
    }),
  };
  httpOptionswithoutToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  httpOptionsFormdata = {
    headers: new HttpHeaders({
      Authorization: 'Token ' + sessionStorage.getItem('Token'),
    }),
  };
  header_Api = {
    headers: {
      'Anonymous': 'mytoken',
    }
  }

  StudentBatch(input_json: any): Observable<ApiResponse<Ires_registerbatch[]>> {
    return this.http
      .post<ApiResponse<Ires_registerbatch[]>>(Students_url.StudentBatch, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  Registerbatch(input_json: any): Observable<ApiResponse<Ires_registerbatch>> {
    return this.http
      .post<ApiResponse<Ires_registerbatch>>(Students_url.Registerbatch, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  batch(input_json: any): Observable<ApiResponse<res_singlebatch>> {
    return this.http
      .post<ApiResponse<res_singlebatch>>(Common_url.batch, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  registertionbatchs(jsonin: any): Observable<ApiResponse<Ires_registerbatch[]>> {
    return this.http
      .post<ApiResponse<Ires_registerbatch[]>>(Common_url.registertionbatchs, jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  CheckSubjectGroupQuota(input_json: any): Observable<ApiResponse<AdmissionQuotasubjectGroups[]>> {
    return this.http
      .post<ApiResponse<AdmissionQuotasubjectGroups[]>>(Students_url.CheckSubjectGroupQuota, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  Additionalsubjectformfees_URL<T>(jsonin: any): Observable<ApiResponse<T>> {
    return this.http
      .post<ApiResponse<T>>(Students_url.Additionalsubjectformfees_URL, jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  IU_Admission(input_json: any): Observable<any> {
    return this.http
      .post<any>(Students_url.IU_Admission, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  StudentAppliedCourses(jsonin_input: any): Observable<ApiResponse<Ires_Courseapplied[]>> {
    return this.http
      .post<ApiResponse<Ires_Courseapplied[]>>(Students_url.StudentAppliedCourses, jsonin_input, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  BillDeskTransactionPay(billdeskmsg: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.BillDeskcheckSum, JSON.stringify(billdeskmsg), httpFormOptions)
      .pipe(catchError(this.handleError));
  }

  BillDeskcheckSumQuery(billdeskquerymsg: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(
        Students_url.BillDeskcheckSumQuery,
        JSON.stringify(billdeskquerymsg),
        httpFormOptions
      )
      .pipe(catchError(this.handleError));
  }

  CheckAdmission(data: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.CheckAdmission_URL, JSON.stringify(data), httpFormOptions)
      .pipe(catchError(this.handleError));
  }

  formfeesreceived(data: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.formfeesreceivedv1_url, JSON.stringify(data), httpFormOptions)
      .pipe(catchError(this.handleError));
  }

  ProfileSubmited(data: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.ProfileSubmited, JSON.stringify(data), httpFormOptions)
      .pipe(catchError(this.handleError));
  }

  AdmissionPayment(data: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.IU_Admission, JSON.stringify(data), httpFormOptions)
      .pipe(catchError(this.handleError));
  }


  displayportalmessage(data: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };

    return this.http
      .post<any>(
        Fees_url.ValidatePortalmessage_URL,
        JSON.stringify(data),
        httpFormOptions
      )
      .pipe(catchError(this.handleError));
  }

  // HttpClient API post() method => Create employee
  SavePersonalDetails(FormData: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.IU_StudentProfile, FormData, httpFormOptions)
      .pipe(catchError(this.handleError));
  }

  SaveEducationDetails(data: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.IU_StudentEducation, JSON.stringify(data), httpFormOptions)
      .pipe(catchError(this.handleError));
  }

  EducationDocuments(data: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.EducationDocuments_URL, JSON.stringify(data), httpFormOptions)
      .pipe(catchError(this.handleError));
  }

  StudentUploadDocuments(documentsformData: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.UploadDocuments, documentsformData, httpFormOptions)
      .pipe(catchError(this.handleError));
  }

  SaveReservationDetails(data: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.IU_Reservations, JSON.stringify(data), httpFormOptions)
      .pipe(catchError(this.handleError));
  }

  GetEducationDetails(data: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.GetEducationDetails, JSON.stringify(data), httpFormOptions)
      .pipe(catchError(this.handleError));
  }

  PortalOpenv1(data: any): Observable<any> {
    let mytoken = sessionStorage.getItem('Token');
    let httpFormOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + mytoken,
      }),
    };
    return this.http
      .post<any>(Students_url.PortalOpenv1, JSON.stringify(data), httpFormOptions)
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
