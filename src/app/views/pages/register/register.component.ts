import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {OtpService} from '../otp/otp.service';
import * as myGlobals from '../../../globals/global-variable';
import {GlobalMessage} from "../../../globals/global.message";
import {CommonService} from "../../../globals/common.service";
import {RegisterService} from "./register.service";
import {HttpClient} from "@angular/common/http";
import {Ipg_batchs, Ireq_register, Ireqget_otp, Ires_registrationbatchs} from "./register.requestmodel";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {Common_url, Students_url,} from "../../../globals/global-api";
import {Sessiondata} from "../../../models/Sessiondata";
import {SessionService} from "../../../globals/sessionstorage";
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    ContainerComponent,
    FormControlDirective,
    FormDirective,
    FormFeedbackComponent,
    FormLabelDirective,
    FormSelectDirective,
    ImgDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    RowComponent,
    SpinnerComponent
} from "@coreui/angular-pro";
import {NgClass} from "@angular/common";
import {Allbatchs, Ires_captcha} from "../../../models/response";
import {aadhaarValidator, mobileValidator} from "../../../globals/aadhaar_validator";
import {DOC_ORIENTATION, NgxImageCompressService} from "ngx-image-compress";
import {IconDirective, IconSetService} from "@coreui/icons-angular";
// import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {brandSet, cilInput} from '@coreui/icons';
// import {switchMap} from "rxjs";
import {debounceTime, distinctUntilChanged, of, switchMap} from "rxjs";
import {catchError} from "rxjs/operators";
import {UDownloadfiles} from "../../../globals/global_utility";


//Password validators
export class PasswordValidators {
    static confirmPassword(control: AbstractControl): ValidationErrors | null {
        const password = control.get('student_password');
        const confirm = control.get('confirmPassword');
        if (password?.valid && password?.value === confirm?.value) {
            confirm?.setErrors(null);
            return null;
        }
        confirm?.setErrors({passwordMismatch: true});
        return {passwordMismatch: true};
    }
}


declare var Tesseract: any;

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [
        ColComponent,
        NgClass,
        RowComponent,
        CardComponent,
        ContainerComponent,
        CardBodyComponent,
        ReactiveFormsModule,
        FormFeedbackComponent,
        FormControlDirective,
        FormSelectDirective,
        FormLabelDirective,
        FormDirective,
        SpinnerComponent,
        ButtonDirective,
        IconDirective,
        ImgDirective,
        InputGroupComponent,
        InputGroupTextDirective
    ],
    standalone: true
})
export class RegisterComponent implements OnInit {
    // @HostBinding('class') cAppClass = 'c-app flex-row align-items-center';
    @Output() formValueEmitter = new EventEmitter<any>();
    Registrationlabel!: string;
    registerForm!: FormGroup;
    submitted = false;
    data: any;
    res: any;
    otpres: any;
    BatchNames: Ires_registrationbatchs[] = [];
    Selected_batchname = {} as Ires_registrationbatchs;
    RES_registration!: Allbatchs;
    selectedugpg = '';
    //register
    formErrors: any;
    // @Input() public OTPGetValue;
    // public OTPSendValue;
    Files!: Array<File>;
    result = 'Recognizing...';
    oSession!: Sessiondata;
    studentgettype!: any;
    createAccountloader = false

    originalImageSrc: string | null = null;
    compressedFile!: File;

    Res_Captcha!: Ires_captcha

    formdata = new FormData();

    get f() {
        return this.registerForm.controls;
    }

    constructor(
        private router: Router, private sessionservice: SessionService,
        private commonService: CommonService,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private registerservice: RegisterService,
        private otpService: OtpService,
        private globalMessage: GlobalMessage,
        private imageCompress: NgxImageCompressService,
        public iconSet: IconSetService,
    ) {
        this.studentgettype = this.sessionservice.GetData('studenttype')!
        this.formErrors = this.registerservice.errorMessages;
        if (this.studentgettype == myGlobals.Global_OUTSIDE) {
            this.Registrationlabel = 'Outside';
        }
        if (this.studentgettype == myGlobals.Global_ATKT) {
            this.Registrationlabel = 'Atkt';
        }
        iconSet.icons = {cilInput, ...brandSet};
    }

    ngOnInit(): void {
        //Shivam
        // if (!this.studentgettype) {
        //     this.router.navigate(['']);
        //     // this.openYesNoDialog("Please Click Register button!")
        //     Swal.fire({
        //         title: 'Message!',
        //         text: 'Please Click Register button!',
        //         icon: 'info',
        //         confirmButtonText: 'OK',
        //     }); //alert
        // } else {
        this.registerForm = this.formBuilder.group({
                ugpg: [null, [Validators.required]],
                userbatch: [null, Validators.required],
                aadhaarname: ['', Validators.required],
                aadhaar: ['', [aadhaarValidator]],
                confirmaadhaar: ['', [aadhaarValidator]],
                emailid: ['', [Validators.required, Validators.email]],
                confirmemailid: ['', [Validators.required, Validators.email]],
                // mobilenumber: ['', [mobileValidator]],

                //triggerserror only when user focusout from the control
                mobilenumber: this.formBuilder.control('', {
                    validators: [mobileValidator],
                    updateOn: 'blur'
                }),
                confirmmobilenumber: this.formBuilder.control('', {
                    validators: [mobileValidator],
                    updateOn: 'blur'
                }),
                uploadaadhaar: ['', [Validators.required,]],
                captchainputvalue: ["", Validators.required],

            },
            // {validators: [PasswordValidators.confirmPassword]},
        );

        this.GetCaptchaImage();

        this.registerForm.controls['userbatch'].valueChanges.subscribe((value) => {
            this.Selected_batchname = value;
        })

        this.f['emailid'].valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),

            switchMap(value => {

                if (!value || this.f['emailid'].hasError('email')) {
                    return of(null);
                }

                return this.registerservice.checkUserExists(value).pipe(

                    // ✅ HANDLE ERROR HERE (NOT in subscribe)
                    catchError(err => {
                        console.log('API error:', err);

                        const message = err?.error?.exception?.toLowerCase();

                        if (message?.includes('email')) {
                            return of({ exists: true }); // ✅ convert error → response
                        }

                        return of(null);
                    })
                );
            })

        ).subscribe(res => {

            const control = this.f['emailid'];

            if (res?.exists) {
                const errors = control.errors || {};
                errors['alreadyExists'] = true;
                control.setErrors(errors);
            } else {
                if (control.hasError('alreadyExists')) {
                    const errors = { ...control.errors };
                    delete errors['alreadyExists'];
                    control.setErrors(Object.keys(errors).length ? errors : null);
                }
            }

        });


        this.f['mobilenumber'].valueChanges.pipe(
            debounceTime(700),
            distinctUntilChanged(),

            switchMap(value => {

                if (!value || this.f['mobilenumber'].hasError('mobilenumber')) {
                    return of(null);
                }

                return this.registerservice.checkUserExists(value).pipe(

                    // ✅ HANDLE ERROR HERE (NOT in subscribe)
                    catchError(err => {
                        console.log('API error:', err);

                        const message = err?.error?.exception?.toLowerCase();

                        if (message?.includes('mobilenumber')) {
                            return of({ exists: true }); // ✅ convert error → response
                        }

                        return of(null);
                    })
                );
            })

        ).subscribe(res => {

            const control = this.f['mobilenumber'];

            if (res?.exists) {
                const errors = control.errors || {};
                errors['alreadyExists'] = true;
                control.setErrors(errors);
            } else {
                if (control.hasError('alreadyExists')) {
                    const errors = { ...control.errors };
                    delete errors['alreadyExists'];
                    control.setErrors(Object.keys(errors).length ? errors : null);
                }
            }

        });

    }

    openYesNoDialog(msg: any) {
        this.globalMessage.Show_message('Delete');
    }

    //Show batchs
    Show_registrationbatchs() {
        let sOutsideUrl = myGlobals.Domainname
        let jsoninbatch = {
            Boardlevel: this.selectedugpg,
            Webportal: sOutsideUrl,
            Firstyear: 0
        };

        // let jsonin = {
        //     Input: encryptUsingAES256(jsoninbatch)
        // };
        this.commonService.Post_json_withouttoken(Common_url.registertionbatchs, jsoninbatch).subscribe((response) => {
            if (response == null) {
                return;
            }
            //this.RES_registration = response;
            this.BatchNames = response.data;
        });

        // this.http.post(Common_url.registertionbatchs, jsoninbatch, {headers: {'Anonymous': 'no'}})
        //     .subscribe(res => {
        //         console.log(res);
        //
        //         // this.BatchNames = res;
        //     });
    }

    onUgPg_Selected(value: string): void {
        this.selectedugpg = value;

        console.log('call',this.selectedugpg);
        if (this.selectedugpg != '') {
            this.Show_registrationbatchs();
        }
    }

    //On select batch
    on_Selectbtch() {

        if (this.Selected_batchname.admissionyear == 0) {
            this.globalMessage.Show_error('Finyear not configured.Please contact admin.')
            this.router.navigate(['/login'])
        }

        console.log('vcnc',this.Selected_batchname)
        if (this.Selected_batchname.admissionstarted == 0) {
            this.globalMessage.Show_error(this.Selected_batchname.atkt_message)
            this.router.navigate(['/login'])
        }

        //https://www.angularjswiki.com/angular/how-to-bind-a-select-element-to-object-in-angular/
    }


    //Register form submit
    onRegister() {


        this.submitted = true;
        this.createAccountloader = true;
        let nAadhaar = this.registerForm.controls['aadhaar'].value

        this.formdata.append('aadhaar', this.registerForm.controls['aadhaar'].value)
        // this.formdata.append('confirmaadhaar', this.registerForm.controls['confirmaadhaar'].value)
        this.formdata.append('emailid', this.registerForm.controls['emailid'].value)
        // this.formdata.append('confirmemailid', this.registerForm.controls['confirmemail'].value)
        this.formdata.append('mobilenumber', this.registerForm.controls['mobilenumber'].value)
        // this.formdata.append('confirmmobilenumber', this.registerForm.controls['confirmmobilenumber'].value)
        this.formdata.append('studenttype','OUTSIDE')
        this.formdata.append('finyear', this.Selected_batchname.admissionyear.toString())
        // formdata.append('college_code',  myGlobals.Golbal_CollegeCode.toString())
        this.formdata.append('coursetype', this.selectedugpg)
        this.formdata.append('batch_code', this.Selected_batchname.batch_code.toString())
        this.formdata.append('aadhaarname', this.registerForm.controls['aadhaarname'].value)
        this.formdata.append('capcachid', this.Res_Captcha.id)
        this.formdata.append('captchainputvalue', this.registerForm.controls['captchainputvalue'].value)
        this.formdata.append('file', this.compressedFile)


        this.formdata.forEach((value,key)=>{
            console.log(key,value);

        });

        this.commonService.Post_formdata_withouttoken(Students_url.StudentRegistration,this.formdata).subscribe((response) =>{
            console.log(response);
            this.globalMessage.Show_message("Registration completed.")
            this.router.navigate(['/login'])
        })
        // this.http.post('https://admission.rjcollege.edu.in:7005/v1/Students/StudentRegistration', this.formdata,{
        //     reportProgress : true,
        //     observe: 'events',
        // })
        //     .subscribe(res => {
        //         console.log(res);
        //         this.globalMessage.Show_message("Registration completed.")
        //         this.router.navigate(['/login'])
        //     });
    }

    GetOTP() {
        let jsonin_otp: Ireqget_otp = {
            aadhaar: parseInt(this.registerForm.controls['aadhaar'].value),
            emailid: this.registerForm.controls['emailid'].value,
            mobile: parseInt(this.registerForm.controls['mobilenumber'].value),
        };
        let jsonin = {
            Input: encryptUsingAES256(jsonin_otp)
        };
        this.commonService.Post_json_withouttoken(Students_url.GetOTP, jsonin).subscribe((response: any) => {
            const hasKey = 'data' in response;
            if (hasKey) {
                this.otpres = response.data
            } else {
                this.otpres = response
            }
            if (this.otpres == true) {
                this.otpService.mobileNo = parseInt(this.registerForm.controls['mobilenumber'].value)
                this.otpService.Aadhaar = parseInt(this.registerForm.controls['aadhaar'].value)
                this.globalMessage.Show_message("OTP has been sent to registered Mobile Number")
                this.router.navigate(['/otp']);
                this.createAccountloader = false
            }
        });
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];

        console.log('vvv1',file)

        if (file) {
            this.originalImageSrc = URL.createObjectURL(file);
            const reader = new FileReader();
            reader.onload = (readerEvent: any) => {
                const imageDataUrl = readerEvent.target.result;
                this.imageCompress.compressFile(
                    imageDataUrl,
                    DOC_ORIENTATION.Up,
                    50,
                    50
                ).then(
                    (compressedBase64: string) => {
                        let compressed_image = this.base64ToFile(compressedBase64, file.name.split('.')[0] + '_compressed.png');

                        console.log('vvv',compressed_image)
                        console.log(
                            '%c Compressed Size: ' + (compressed_image!.size / 1024 / 1024).toFixed(2) + ' MB',
                            'background:green;color:white;font-size:14px;padding:4px;'
                        );

                        this.get_tesseract(compressed_image);
                    },
                    (error) => {
                        console.error('Compression failed:', error);
                    }
                );
            };
            reader.readAsDataURL(file);
        }
    }

    private base64ToFile(base64Data: string, filename: string): File | null {
        const arr = base64Data.split(',');
        if (arr.length < 2) return null;
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) return null;
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

    get_tesseract(selectedfile: any) {
        let nAadhaar = String(this.registerForm.controls['aadhaar'].value)

        this.compressedFile = selectedfile
    }

    //New
    getValidity(ctrl: AbstractControl | null): boolean | undefined {
        if (!ctrl) return undefined;
        return ctrl.touched ? ctrl.valid : this.submitted && ctrl.invalid ? false : undefined;
    }

    GetCaptchaImage() {
        this.registerservice.GetCaptchaImage().subscribe({
            next: (response) => {
                if (response == null) {
                    return;
                }
                this.Res_Captcha = response;

            }, error: (err) => {
                this.globalMessage.Show_error(err.error.exception);
                this.GetCaptchaImage();
            }
        });
    }

    checkAadhaarMatch() {
        const aadhaar = this.registerForm.get('aadhaar')?.value;
        const confirmAadhaar = this.registerForm.get('confirmaadhaar')?.value;

        if (aadhaar && confirmAadhaar && aadhaar !== confirmAadhaar) {
            this.registerForm.get('confirmaadhaar')?.setErrors({ mismatch: true });
        } else {
            this.registerForm.get('confirmaadhaar')?.setErrors(null);
        }
    }

    checkEmailMatch() {
        const emailid = this.registerForm.get('emailid')?.value;
        const confirmemailid = this.registerForm.get('confirmemailid')?.value;

        if (emailid && confirmemailid && emailid !== confirmemailid) {
            this.registerForm.get('confirmemailid')?.setErrors({ mismatch: true });
        } else {
            this.registerForm.get('confirmemailid')?.setErrors(null);
        }
    }

    checkMobileMatch() {
        const mobilenumber = this.registerForm.get('mobilenumber')?.value;
        const confirmmobilenumber = this.registerForm.get('confirmmobilenumber')?.value;

        if (mobilenumber && confirmmobilenumber && mobilenumber !== confirmmobilenumber) {
            this.registerForm.get('confirmmobilenumber')?.setErrors({ mismatch: true });
        } else {
            this.registerForm.get('confirmmobilenumber')?.setErrors(null);
        }
    }

}

