import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Common_url, Easy_url,} from "../../../globals/global-api";
import {ApiResponse, Ires_captcha, Iresp_Login} from "../../../models/response";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {EncryptData} from "../../../globals/encryptdata";
import * as myGlobals from "../../../globals/global-variable";
import {SessionService} from "../../../globals/sessionstorage";



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private router = inject(Router);

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


  selected_login_resp!: Iresp_Login;

  constructor(private http: HttpClient, private sessionservice: SessionService,) {
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
  //vishal
  // GetCaptchaImage(): Observable<Ires_captcha> {
  //   return this.http.post<Ires_captcha>(Common_url.Captchimage, '')
  // }

  GetCaptchaImage(): Observable<Ires_captcha> {
    let captchaUrl = environment.API_URL + '/v1/Common/Captchimage'
    // console.log('vv ', captchaUrl)
    return this.http.post<Ires_captcha>(captchaUrl, '')
  }

  login(credentials: any): Observable<ApiResponse<Iresp_Login>> {
    let loginUrl =  'https://admission.rjcollege.edu.in:7005/v2/eazy/studentlogin'
    // console.log('resloign',loginUrl)
    return this.http.post<any>(loginUrl, credentials,   {
      withCredentials: true
    }).
    pipe(
        tap(response => {
          if (response.success && response.data) {
            sessionStorage.setItem('refresh_token', response.data.refreshtoken);
            // this.router.navigate([`finyear`]);

            sessionStorage.setItem('access_token', response.data.accesstoken);


            this.selected_login_resp = response.data;

            let nregister_Batch_code = EncryptData(String(this.selected_login_resp.student_registration_new.batch_code))
            let current_Finyearenc = EncryptData(String(myGlobals.Global_CurrentFinYear))
            let register_Finyearenc = EncryptData(String(this.selected_login_resp.student_registration_new.finyear))
            let register_admissionboard = EncryptData(this.selected_login_resp.student_registration_new.admissionboard)
            let max_batchcode = EncryptData(String(this.selected_login_resp.maxbatch.batch_code))
            let max_finyear = EncryptData(String(this.selected_login_resp.maxbatch.finyear))
            let max_batchlevel = EncryptData(String(this.selected_login_resp.maxbatch.batch_level))
            let max_subjectgroupid = EncryptData(String(this.selected_login_resp.maxbatch.subject_group_id))
            let nMinor = EncryptData(String(this.selected_login_resp.maxbatch.minor))
            //Shivam-prakash
            if (this.selected_login_resp.student_registration_new.finyear == myGlobals.Global_CurrentFinYear) {
              this.sessionservice.SaveData('lastfinyear', EncryptData(String(myGlobals.Global_CurrentFinYear)));
            } else {
              this.sessionservice.SaveData('lastfinyear', EncryptData(String(myGlobals.Global_LastFinYear)));
            }
            // this.selected_login_resp.Userrole = EncryptData(this.selected_login_resp.Userrole)
            // this.selected_login_resp.User_name = EncryptData(this.selected_login_resp.User_name)
            this.selected_login_resp.student_registration_new.studenttype = EncryptData(this.selected_login_resp.student_registration_new.studenttype)
            this.selected_login_resp.student_registration_new.coursetype = EncryptData(this.selected_login_resp.student_registration_new.coursetype)
            this.selected_login_resp.maxbatch.admissionboard = EncryptData(this.selected_login_resp.maxbatch.admissionboard)
            this.selected_login_resp.maxbatch.subject_group_code = EncryptData(this.selected_login_resp.maxbatch.subject_group_code)
            this.sessionservice.SaveData('demo', EncryptData("false"));
            if (myGlobals.Domainname.toUpperCase().search('LOCALHOST') != -1) {
              this.sessionservice.SaveData('demo', EncryptData("true"));
            }
            if (myGlobals.Domainname.toUpperCase().search('DEMO') != -1) {
              this.sessionservice.SaveData('demo', EncryptData("true"));
            }
            // this.sessionservice.SaveData('userrole', this.selected_login_resp.Userrole);
            // this.sessionservice.SaveData('username', this.selected_login_resp.User_name);
            this.sessionservice.SaveData('studenttype', this.selected_login_resp.student_registration_new.studenttype);
            this.sessionservice.SaveData('coursetype', this.selected_login_resp.student_registration_new.coursetype);
            this.sessionservice.SaveData('finyear', current_Finyearenc);
            this.sessionservice.SaveData('collegecode', (EncryptData(String(myGlobals.Golbal_CollegeCode))))
            this.sessionservice.SaveData('registerbatchcode', nregister_Batch_code)
            this.sessionservice.SaveData('registerfinyear', register_Finyearenc);
            this.sessionservice.SaveData('registeradmissionboard', register_admissionboard);
            this.sessionservice.SaveData('maxbatchcode', max_batchcode)
            this.sessionservice.SaveData('maxfinyear', max_finyear)
            this.sessionservice.SaveData('maxbatchlevel', max_batchlevel)
            this.sessionservice.SaveData('maxsubjectgroupid', max_subjectgroupid)
            this.sessionservice.SaveData('minor', nMinor)
            this.sessionservice.SaveData('maxadmissionboard', this.selected_login_resp.maxbatch.admissionboard)
            this.sessionservice.SaveData('maxsubjectgroupcode', this.selected_login_resp.maxbatch.subject_group_code)
            this.sessionservice.SaveData('currentlevel', EncryptData(String(this.selected_login_resp.updated_status.current_level)));
            this.sessionservice.SaveData('currentlevelfinyear', EncryptData(String(this.selected_login_resp.updated_status.current_year)));

            this.sessionservice.SaveData('currentboardlevel', EncryptData(String(this.selected_login_resp.updated_status.current_boardlevel)));

            this.sessionservice.SaveData('registrationbatchuuid', (EncryptData(String(this.selected_login_resp.student_registration_new.batchuuid))));
            this.sessionservice.SaveData('minbatchuuid', (EncryptData(String(this.selected_login_resp.minbatch.batchuuid))));
            this.sessionservice.SaveData('maxbatchuuid', (EncryptData(String(this.selected_login_resp.maxbatch.batchuuid))));
            this.sessionservice.SaveData('currentbatchuuid', (EncryptData(String(this.selected_login_resp.updated_status.current_batchuuid))));
            this.sessionservice.SaveData('admissionbatchuuid', (EncryptData(String(this.selected_login_resp.updated_status.admission_batchuuid))));

          }
        })
    );
  }

  sendotp(credentials: any): Observable<ApiResponse<Iresp_Login>> {
    let sendotpUrl = 'https://admission.rjcollege.edu.in:7005/v2/eazy/sendotp'
    // console.log('resloign',otpsegmentUrl)
    return this.http.post<any>(sendotpUrl, credentials, {
      withCredentials: true
    }).
    pipe(
        tap(response => {
          if (response.success && response.data) {
            // console.log('res',response.data)
          }
        })
    );
  }

  checkUserExists(data: { emailid?: string; mobilenumber?: string }) {
    return this.http.post<any>('YOUR_API_URL/check-user', data);
  }

  // eazyloginv2(jsonin: any): Observable<ApiResponse<Iresp_Login>> {
  //   return this.http.post<ApiResponse<Iresp_Login>>(Easy_url.eazyloginv2, jsonin)
  // }
}

