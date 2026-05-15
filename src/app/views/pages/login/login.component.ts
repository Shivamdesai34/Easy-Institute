import {Component} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
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
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {LoginService} from "./login.service";
import {GlobalMessage} from "../../../globals/global.message";
import {SessionService} from "../../../globals/sessionstorage";
import * as myGlobals from '../../../globals/global-variable'
import {CommonService} from "../../../globals/common.service";
import {EncryptData} from "../../../globals/encryptdata";
import {Ires_captcha, Iresp_Login} from "../../../models/response";
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardGroupComponent,
    ColComponent,
    ContainerComponent,
    FormControlDirective,
    FormDirective,
    ImgDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    RowComponent,
    SpinnerComponent
} from "@coreui/angular-pro";

import {environment} from "../../../../environments/environment";
import {emailOrMobileValidator} from "../../../globals/global_utility";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {switchMap} from "rxjs";

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

    res_sendotp: any;

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
                identifier: ['', [Validators.required, emailOrMobileValidator]],
                capcachid: ['', Validators.required],
                captchainputvalue: ["", Validators.required],
                otp: ["", Validators.required]
            },
        );
        this.loginControls = Object.keys(this.loginForm.controls);
        this.loginForm.get('captchainputvalue')?.valueChanges.subscribe((value) => {
            if (value && value.length === 4) {
                this.sendOTP();
            }
        })
    }

    captcha_fld() {
        this.loginForm.controls['captcha'];
    }

    logindisable = false;

    GetCaptchaImage() {
        this.loginservice.GetCaptchaImage().subscribe({
            next: (response) => {
                if (response == null) {
                    return;
                }
                this.Res_Captcha = response;

            }, error: (err) => {
                this.globalmessage.Show_error(err.error.exception);
                this.GetCaptchaImage();
            }
        });
    }


    loginme() {
        let payload = {
            identifier: this.loginForm.controls['identifier'].value.toString(),
            otp: this.loginForm.controls['otp'].value,
        };

        if (!payload.identifier || !payload.otp) {
            this.globalmessage.Show_error('Please fill all required fields');
            return;
        }

        this.loginLoader = true;
        this.logindisable = true;
        this.submitted = true;
        this.loginservice.login(payload).subscribe({
            next: (res) => {
                if (!res.data.student_registration_new.aadhaar) {
                    this.globalmessage.Show_error('Aadhaar not linked with this number');
                    return;
                }
                const secretkey = res.data?.securitykey
                console.log('secretkey',secretkey);
                if (secretkey) {
                    sessionStorage.setItem('securitykey', secretkey);
                } else {
                    this.router.navigate(['/login']);
                    sessionStorage.clear();
                    this.globalmessage.Show_error('Key is empty')
                }
                this.router.navigate(['/dashboard']);
            }, error: (error) => {
                this.globalmessage.Show_error(error.error.exception);
                console.log(error.error.exception);
                this.GetCaptchaImage();
                this.loginLoader = false;
                this.logindisable = false;
            }
        });
    }

    sendOTP() {
        let jsonin = {
            identifier: this.loginForm.controls['identifier'].value.toString(),
            capcachid: this.Res_Captcha.id,
            captchainputvalue: this.loginForm.controls['captchainputvalue'].value
        }

        // console.log('OTP', jsonin)
        this.loginservice.sendotp(jsonin).subscribe(response => {
            this.res_sendotp = response.data
            this.globalmessage.Show_message('OTP has been sent successfully.Please check your mobile or email')
        }, error => {
            if (error.status === 400) {
                this.globalmessage.Show_error(error.error.exception);
                this.loginForm.controls['captchainputvalue'].setValue('');
                this.GetCaptchaImage();
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


