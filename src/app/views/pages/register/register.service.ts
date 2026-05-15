import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Allbatchs, Ires_captcha} from "../../../models/response";
import {Common_url, Easy_url, Students_url} from "../../../globals/global-api";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {Ireq_register} from "./register.requestmodel";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,
    passwordMax: 10,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}'
  };

  formErrors = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    student_password: '',
    confirmPassword: '',
    birthday: '',
    accept: false
  };

  //login error messages
  constructor(private http: HttpClient) {
    this.errorMessages = {
      firstName: {
        required: 'First name is required'
      },
      lastName: {
        required: 'Last name is required'
      },
      username: {
        required: 'Username is required',
        minLength: `Username must be ${this.formRules.usernameMin} characters or more`,
        pattern: 'Must contain letters and/or numbers, no trailing spaces'
      },
      email: {
        required: 'required',
        email: 'Invalid email address'
      },
      student_password: {
        required: 'Password is required',
        pattern: 'Password must contain: numbers, uppercase and lowercase letters',
        minLength: `Password must contain between ${this.formRules.passwordMin} - ${this.formRules.passwordMax} characters`,
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      birthday: {
        required: 'Birthday date required'
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      }
    };

  }

  header_Api={
    headers: {
      'Anonymous': 'mytoken',
    }
  }
  // StudentRegistration_URL(formdata:any): Observable<any>{
  //   return this.http
  //     .post<any>(Students_url.atktoutsideregistration, formdata, this.header_Api)
  //     .pipe(catchError(this.handleError));
  // }
  GetOTP(jsonin:any): Observable<any>{
    return this.http
      .post<any>(Students_url.GetOTP,  jsonin, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  registertionbatchs(jsonin:any): Observable<Allbatchs> {
    return this.http.post<Allbatchs>(Common_url.registertionbatchs, jsonin,this.header_Api)
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

  handleError_check(error: HttpErrorResponse): Observable<any> {
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

  GetCaptchaImage(): Observable<Ires_captcha> {
    let captchaUrl = environment.API_URL + '/v1/Common/Captchimage'
    // console.log('vv ', captchaUrl)
    return this.http.post<Ires_captcha>(captchaUrl, '')
  }

  checkUserExists(identifier: string) {
    // let identifierUrl = environment.API_URL + 'https://admission.rjcollege.edu.in:7010/v2/eazy/identifiervalidation'

    let identifierUrl = 'https://admission.rjcollege.edu.in:7005/v2/eazy/identifiervalidation'


    return this.http.post<any>(identifierUrl, {
      identifier: identifier
    })
        .pipe(catchError(this.handleError_check));
  }

  // checkUserExists(data: { emailid?: string; mobilenumber?: string }) {
  //   return this.http.post<any>(Students_url.identifiervalidation, data);
  // }
}
