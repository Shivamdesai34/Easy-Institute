import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Global_LastFinYear } from '../../../globals/global-variable';
import { ResetpasswordService } from './resetpassword.service';
import {GlobalMessage} from "../../../globals/global.message";
import {CommonService} from "../../../globals/common.service";
import {Students_url} from "../../../globals/global-api";
import {OtpService} from "../otp/otp.service";
import { NgClass } from "@angular/common";
import {CardBodyComponent, CardComponent, ColComponent, RowComponent} from "@coreui/angular-pro";
import {encryptUsingAES256} from "../../../globals/encryptdata";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
    imports: [
        NgClass,
        ReactiveFormsModule,
        RowComponent,
        CardComponent,
        ColComponent,
        CardBodyComponent
    ]
})
export class ResetpasswordComponent implements OnInit {
  ResetPasswordForm!: UntypedFormGroup;
  submitted = false;

  postId: any;
  reqpost = 1;
  token: any;
  data!: {};
  forgottoken: any;
  getmobile: any;
  getaadhaar: any;

  get f1() {
    return this.ResetPasswordForm.controls;
  }

  constructor(
    private route: ActivatedRoute,private commonService: CommonService,
    private router: Router,private globalmessage: GlobalMessage,
    private formBuilder: UntypedFormBuilder,
    private otpservice: OtpService,
    private resetpasswordService: ResetpasswordService
  ) {}

  ngOnInit(): void {
    // this.getmobile = this.route.snapshot.queryParamMap.get('mobile');
    // this.getaadhaar = this.route.snapshot.queryParamMap.get('aadhaar');

    this.ResetPasswordForm = this.formBuilder.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,10}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.MustMatch('newPassword', 'confirmPassword'),
      }
    );

    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.forgottoken = params['token'];

    //
    // });
  }


  onResetPassword() {
    this.submitted = true;
    let jsonin = {
      finyear: Global_LastFinYear,
      collegecode: 1,
      aadhaar: this.otpservice.Aadhaar,
      mobilenumber: this.otpservice.mobileNo,
      pwd: this.ResetPasswordForm.controls['confirmPassword'].value,
    };

    let jsoninput = {
      Input: encryptUsingAES256(jsonin)
    };

    if (this.ResetPasswordForm.invalid) {
      return;
    } else {
      if (this.forgottoken != '') {
        this.commonService
          .Post_json_withouttoken(Students_url.ResetPassword,jsoninput)
          .subscribe((response) => {
            //
            if (response.data == true) {
              Swal.fire({
                title: 'Success!',
                text: 'Your Password has been changed Succesfully!',
                icon: 'success',
                confirmButtonText: 'OK',
              }); //alert
              this.router.navigate(['']);
            } else {
              this.globalmessage.Show_error(response.message);
            }
          });
      }
    }
  }

  MustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
