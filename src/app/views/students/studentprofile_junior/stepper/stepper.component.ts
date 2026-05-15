import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import {Component, HostListener, signal} from '@angular/core';
import {
    BadgeComponent,
    ButtonDirective,
    ColComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    FormControlDirective,
    FormLabelDirective,
    FormPasswordDirective,
    FormSelectDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    RowComponent,
    StepperComponent,
    StepperStepComponent
} from '@coreui/angular-pro';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PersonalDetailsComponent} from "../personaldetails/personaldetail.component";
import {ReservationDetailsComponent} from "../reservationdetails/reservationdetails.component";
import {EducationDetailsComponent} from "../educationdetails/educationdetails.component";
import {FinalSubmitComponent} from "../finalsubmit/finalsubmit.component";

@Component({
    selector: 'docs-stepper07',
    imports: [
        BadgeComponent,
        ButtonDirective,
        StepperComponent,
        RowComponent,
        NgTemplateOutlet,
        ReactiveFormsModule,
        FormsModule,
        JsonPipe,
        StepperStepComponent,
        PersonalDetailsComponent,
        ReservationDetailsComponent,
    ],
    standalone: true,
    templateUrl: './stepper.component.html',
    styles: `
      :host {
        .btn {
          margin-inline-end: 0.5rem;
        }
      }
    `
})
export class Stepper07Component {

    stepperLayout: 'horizontal' | 'vertical' = 'horizontal';
    buttonLayout: 'vertical' | 'horizontal' = 'vertical';

    constructor(
        private formBuilder: FormBuilder,
    ) {

        this.checkScreenSize()

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.checkScreenSize();
    }

    checkScreenSize() {
        // Check if the screen width is less than a certain breakpoint (e.g., 768px for mobile)
        if (window.innerWidth < 768) {
            // Mobile layout: vertical stepper, horizontal text/buttons
            this.stepperLayout = 'vertical';
            this.buttonLayout = 'horizontal'; // currentStepButtonLayout is managed within the component, but we control the display via CSS
        } else {
            // Desktop layout: horizontal stepper, vertical text/buttons
            this.stepperLayout = 'horizontal';
            this.buttonLayout = 'vertical';
        }
    }
        readonly stepperForm: FormGroup = new FormGroup({
            step_0: new FormGroup({

                Profilepictform: this.formBuilder.group({}),
                parentDetailsForm: this.formBuilder.group({}),
                addressDetailsForm: this.formBuilder.group({}),
                nationalitynomineeForm: this.formBuilder.group({}),
                otherDetailsForm: this.formBuilder.group({}),
                checkfinalSubmit: this.formBuilder.group({}),

            }),
            step_1: new FormGroup({
                reservationdetailForm: this.formBuilder.group({}),
            })
        });

    readonly formGroups = Object.values(this.stepperForm.controls);
    readonly group_0 = this.stepperForm.get('step_0') as FormGroup;
    readonly group_1 = this.stepperForm.get('step_1') as FormGroup;

    readonly finished = signal(false);
    readonly currentStep = signal(0);

    handleReset() {
        this.stepperForm.reset();
        this.finished.set(false);
    }

    handleFinish(finish: boolean) {
        if (!finish) {
            return false;
        }
        const valid = this.currentFormGroupValid(this.currentStep());
        if (!valid) {
            // return false;
        }
        this.finished.set(finish);
        return true;
    }

    handleNext(stepper: StepperComponent) {
        const valid = this.currentFormGroupValid(this.currentStep());
        if (!valid) {
            // return false;
        }
        stepper.next();
    }

    currentFormGroupValid(step: number) {
        const currentGroup = `group_${step}` as keyof Stepper07Component;
        const currentFormGroup = this[currentGroup] as FormGroup;
        currentFormGroup.markAllAsTouched();
        return currentFormGroup?.valid;
    }

    readonly states = [
        { name: 'Alabama', code: 'AL' },
        { name: 'Alaska', code: 'AK' }
    ];
}
