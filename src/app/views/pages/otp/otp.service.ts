import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Students_url} from "../../../globals/global-api";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  mobileNo: number = 0;
  Aadhaar: number = 0;
  header_Api={
    headers: {
      'Anonymous': 'mytoken',
    }
  }
  constructor(private http: HttpClient) {
  }

  otpResponse: any;
  data: any;
  studentsforgotmobile(jsoninput: any): Observable<any> {

    return this.http.post<any>(Students_url.studentsforgotmobile, jsoninput, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  Validatemobileotp(jsoninput: any): Observable<any> {

    return this.http.post<any>(Students_url.ValidateOTP,  jsoninput, this.header_Api)
      .pipe(catchError(this.handleError));

  }

  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
      Swal.fire({ title: 'Message!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
    }
    else {
      Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert

    }
    return throwError(error);
  }
  setValue(value: any) {
    this.otpResponse = value;
    this.valuefromService(this.otpResponse);
  }

  valuefromService(otpValue: any) {
    this.data = otpValue;
  }

  Get_otp(jsoninput: any): Observable<boolean> {
    return this.http.post<boolean>(Students_url.studentsforgotmobile, jsoninput)
  }

}
