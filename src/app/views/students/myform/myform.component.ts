import {Component} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {MyformService} from './myform.service';
import {
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ColDirective, DatePickerComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,
  FormControlDirective, FormDirective,
  FormFeedbackComponent, FormLabelDirective, MultiSelectComponent, MultiSelectOptionComponent,
  RowComponent
} from "@coreui/angular-pro";
import {JsonPipe, NgClass, NgIf} from "@angular/common";

/** passwords must match - custom validator */
export class PasswordValidators {
  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    if (password?.valid && password?.value === confirm?.value) {
      confirm?.setErrors(null);
      return null;
    }
    confirm?.setErrors({passwordMismatch: true});
    return {passwordMismatch: true};
  }
}

@Component({
  selector: 'app-myform',
  imports: [
    ColComponent,
    CardComponent,
    RowComponent,
    ReactiveFormsModule,
    ColDirective,
    FormControlDirective,
    FormFeedbackComponent,
    DatePickerComponent,
    MultiSelectComponent,
    MultiSelectOptionComponent,
    NgClass,
    CardBodyComponent,
    JsonPipe,
    FormCheckComponent,
    FormCheckInputDirective,
    ButtonGroupComponent,
    ButtonDirective,
    NgIf,
    FormCheckLabelDirective,
    FormLabelDirective,
    FormDirective
  ],
  providers: [MyformService],
  templateUrl: './myform.component.html',
  styleUrl: './myform.component.scss'
})
export class MyformComponent {
  simpleForm!: FormGroup;
  submitted = false;
  formErrors: any;
  formControls!: string[];

  constructor(
    private formBuilder: FormBuilder,
    public validationFormsService: MyformService
  ) {
    this.formErrors = this.validationFormsService.errorMessages;
    this.createForm();
  }

  createForm() {
    this.simpleForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(this.validationFormsService.formRules.usernameMin),
            Validators.pattern(this.validationFormsService.formRules.nonEmpty)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(this.validationFormsService.formRules.passwordMin),
            Validators.pattern(this.validationFormsService.formRules.passwordPattern)
          ]
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(this.validationFormsService.formRules.passwordMin),
            Validators.pattern(this.validationFormsService.formRules.passwordPattern)
          ]
        ],
        birthday: [null as Date | null, [Validators.required]],
        framework: ['', [Validators.required]],
        accept: [false, [Validators.requiredTrue]]
      },
      {validators: [PasswordValidators.confirmPassword]}
    );
    this.formControls = Object.keys(this.simpleForm.controls);
  }

  onReset() {
    this.submitted = false;
    this.simpleForm.reset();
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.simpleForm.status === 'VALID';
  }

  onSubmit() {
    console.warn(this.onValidate(), this.simpleForm.value);

    if (this.onValidate()) {
      // TODO: Submit form value
      console.warn(this.simpleForm.value);
      alert('SUCCESS!');
    }
  }

  getValidity(ctrl: AbstractControl | null): boolean | undefined {
    if (!ctrl) return undefined;
    return ctrl.touched ? ctrl.valid : this.submitted && ctrl.invalid ? false : undefined;
  }

}


