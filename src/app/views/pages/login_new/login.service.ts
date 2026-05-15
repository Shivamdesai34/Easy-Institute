import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Common_url, Easy_url,} from "../../../globals/global-api";
import {ApiResponse, Ires_captcha, Iresp_Login} from "../../../models/response";



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  errorMessages: any;

  nLength = 12;


  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    passwordMin: 6,
    aadhaarmin: 12,
    aadhaarmax: 12,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
    capchamin: 6,
  };

  formErrors = {
    aadhaar: 'number',
    password: '',
    // Aadharno: '',
    capcha: '',
  };

  public message!: string;
  public password!: string;
  public encryptedMessage!: string;
  public decryptedMessage!: string;
  encriptionCode = 'delphigolangjavanode';


  constructor(private http: HttpClient) {
    this.formerrormessage();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  formerrormessage() {
    this.errorMessages = {
      aadhaar: {
        required: 'Aadhaar is required',
        minLength: `Aadhaar must be at least ${this.formRules.aadhaarmin} characters`,
        maxLength: `Aadhaar must be at least ${this.formRules.aadhaarmax} characters`
      },
      password: {
        required: 'Password is required',
        pattern: 'Password must contain: numbers, uppercase and lowercase letters',
        minLength: `Password must be at least ${this.formRules.passwordMin} characters`
      },

      capcha: {
        required: 'Capcha is required',
      },
    }
  }

  GetCaptchaImage(): Observable<Ires_captcha> {
    return this.http.post<Ires_captcha>(Common_url.Captchimage, '')
  }

  eazyloginv2(jsonin: any): Observable<ApiResponse<Iresp_Login>> {
    return this.http.post<ApiResponse<Iresp_Login>>('Easy_url.eazyloginv2', jsonin)
  }
}

