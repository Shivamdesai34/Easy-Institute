import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {IconDirective, IconSetService} from '@coreui/icons-angular';
import {
  brandSet,
  cilArrowRight,
  cilArrowTop,
  cilBank,
  cilFolder,
  cilGroup,
  cilHome,
  cilInput,
  cilLayers,
  cilListNumbered,
  cilLockLocked,
  cilMenu,
  cilMoney,
  cilNotes,
  cilOptions,
  cilPaperPlane,
  cilPen,
  cilUser,
  cilUserPlus,
  cilWallpaper,
  cilXCircle
} from '@coreui/icons';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {LoginService} from "./login.service";
import {GlobalMessage} from "../../../globals/global.message";
import {SessionService} from "../../../globals/sessionstorage";
import * as myGlobals from '../../../globals/global-variable'
import {Global_CurrentFinYear, Global_Webportname, Golbal_CollegeCode} from '../../../globals/global-variable'
import {CommonService} from "../../../globals/common.service";
import {Common_url, Easy_url} from "../../../globals/global-api";
import {EncryptData, encryptUsingAES256} from "../../../globals/encryptdata";
import {ApiResponse, Ires_captcha, Iresp_Login} from "../../../models/response";
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardGroupComponent,
    ColComponent,
    ContainerComponent,
    FormControlDirective,
    FormDirective, ImgDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    RowComponent,
    SpinnerComponent
} from "@coreui/angular-pro";

import {environment} from "../../../../environments/environment";

/** passwords must match - custom validator */
export class PasswordValidators {
  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password");
    const confirm = control.get("confirmPassword");
    if (password?.valid && password?.value === confirm?.value) {
      confirm?.setErrors(null);
      return null;
    }
    confirm?.setErrors({passwordMismatch: true});
    return {passwordMismatch: true};
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    imports: [
        CardComponent,
        ContainerComponent,
        RowComponent,
        ColComponent,
        CardGroupComponent,
        CardBodyComponent,
        ReactiveFormsModule,
        InputGroupComponent,
        FormControlDirective,
        SpinnerComponent,
        RouterLink,
        RouterOutlet,
        ButtonDirective,
        InputGroupTextDirective,
        IconDirective,
        FormDirective,
        ImgDirective
    ],
  standalone: true,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  submitted = false;
  loginForm!: FormGroup;
  loginControls!: string[];

  WebsiteId: any;
  Res_Captcha!: Ires_captcha
  formErrors: any;

  server_captcha_image: any;
  server_captcha_image_id: any;

  // login_resp!: Ilogindata;

  selected_login_resp!: Iresp_Login;

  loginLoader = false;

  currentApplicationVersion = environment.appVersion;

  constructor(
    private router: Router, private commonService: CommonService,
    public iconSet: IconSetService,
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private globalmessage: GlobalMessage,
    private sessionservice: SessionService,
  ) {

    this.formErrors = this.loginservice.errorMessages;

    iconSet.icons = {
      cilListNumbered, cilPaperPlane, cilUserPlus, cilNotes, cilArrowTop,
      cilBank, cilFolder, cilPen, cilHome, cilMoney, cilXCircle,
      cilGroup, cilWallpaper, cilArrowRight, cilLayers, cilMenu,
      cilLockLocked, cilUser, cilOptions, cilInput, ...brandSet
    };

    this.createForm();
    this.GetCaptchaImage();
  }

  get f() {
    return this.loginForm.controls;
  }

  createForm() {
    this.loginForm = this.formBuilder.group(
      {
        aadhaar: ["", [Validators.required,
          Validators.minLength(this.loginservice.formRules.aadhaarmin),
          Validators.maxLength(this.loginservice.formRules.aadhaarmax)
        ]],

        // Aadharno: ["", [Validators.required,
        //   Validators.minLength(this.loginservice.formRules.aadhaarmin),
        //   Validators.maxLength(this.loginservice.formRules.aadhaarmax),
        // ]],
        user_pwd: ["", [Validators.required
        ]],
        Valuesdata: ["", [Validators.required]],
      },
    );
    this.loginControls = Object.keys(this.loginForm.controls);
  }

  captcha_fld() {
    this.loginForm.controls['captcha'];
  }


  GetCaptchaImage() {
    this.loginservice.GetCaptchaImage().subscribe((response) => {
      if (response == null) {
        return;
      }
      this.Res_Captcha = response;

    });
  }


  logindisable = false;

  loginme() {


    if (this.loginForm.status == "INVALID") {
      this.globalmessage.Show_error('Invalid form Please enter all input ');
      return;
    }

    this.loginForm.addControl('application', new FormControl('', []));
    this.loginForm.controls['application'].setValue(Global_Webportname);

    this.loginForm.addControl('id', new FormControl('', []));
    this.loginForm.controls['id'].setValue(this.Res_Captcha.id);

    this.loginForm.addControl('finyear', new FormControl('', []));
    this.loginForm.controls['finyear'].setValue(Global_CurrentFinYear);

    this.loginForm.addControl('college_code', new FormControl('', []));
    this.loginForm.controls['college_code'].setValue(Golbal_CollegeCode);


    let trimedata = JSON.stringify(this.loginForm.getRawValue());

    if (trimedata.length <= 0) {
      this.globalmessage.Show_message("Error");
      return;
    }

    let jsonin = {
      Input: encryptUsingAES256(this.loginForm.value)
    };

    this.loginLoader = true;
    this.logindisable = true;
    this.submitted = true;
    this.loginservice.eazyloginv2(jsonin)
        .subscribe({
          next: (response: ApiResponse<Iresp_Login>) => {
            if (response == null) {
              return;
            }
            this.loginLoader = false;
            this.logindisable = false;
            this.selected_login_resp = response.data
            // let nAadhaar = EncryptData(String(this.selected_login_resp))
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
            // this.sessionservice.SaveData('aadhaar', nAadhaar);
            // this.sessionservice.SaveData('userrole', this.selected_login_resp.Userrole);
            // this.sessionservice.SaveData('username', this.selected_login_resp.User_name);
            this.sessionservice.SaveData('token', this.selected_login_resp.accesstoken);
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


            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
             this.globalmessage.Show_error(error.error.exception);
            console.error('Error:', error.error.exception);
            this.GetCaptchaImage();
            this.loginLoader = false;
            this.logindisable = false;
          },
          complete: () => {
            this.loginLoader = false;
            this.logindisable = false;
          }
        });

  }

  DisplayATKTmessage() {


    // this.globalmessage.Show_error('Admission not started.')


    this.WebsiteId = 1;
    this.sessionservice.SaveData('studenttype', myGlobals.Global_ATKT);
    this.sessionservice.SaveData('websiteid', this.WebsiteId);
    this.router.navigate(['register']);

  }

  DisplayOUTSIDEmessage() {

    // this.globalmessage.Show_error('Please contact college for registration.')

    this.WebsiteId = 2;
    // this.sessionservice.SaveData('studenttype', myGlobals.Global_OUTSIDE);
    this.sessionservice.SaveData('websiteid', this.WebsiteId);
    this.router.navigate(['register']);
  }

  //Captcha

}


