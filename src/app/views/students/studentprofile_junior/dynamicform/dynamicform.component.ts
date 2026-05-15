import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, ReactiveFormsModule, Validators, FormGroup} from "@angular/forms";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {
    ButtonDirective,
    CalloutComponent,
    ColComponent,
    FormControlDirective,
    FormLabelDirective,
    FormSelectDirective,
    RowComponent
} from "@coreui/angular-pro";
import {FileuploadversiontwoComponent} from "../../fileuploadversiontwo/fileuploadversiontwo.component";
import {encryptUsingAES256} from "../../../../globals/encryptdata";
import {Students_url} from "../../../../globals/global-api";
import {GlobalMessage} from "../../../../globals/global.message";
import {Sessiondata} from "../../../../models/Sessiondata";
import {Ires_education, Ires_personaldata} from "../../../../models/response";
import {CommonService} from "../../../../globals/common.service";

@Component({
    selector: "app-dynamicform",
    templateUrl: "./dynamicform.component.html",
    imports: [
        ReactiveFormsModule,
        FormSelectDirective,
        FormLabelDirective,
        FormControlDirective,
        RowComponent,
        JsonPipe,
        ColComponent,
        CalloutComponent,
        FileuploadversiontwoComponent
    ],
    styleUrls: ["./dynamicform.component.scss"]
})

export class DynamicformComponent implements OnInit {

    formGroup!: FormGroup;
    addressDetailsForm!: FormGroup;
    checkfinaleducationSubmit!: FormGroup;

    oSession!: Sessiondata;
    get_personaldetail!: Ires_personaldata;
    selected_document!: Ires_education;

    board: any;
    imagefile: any

    SSCSubmit = false;
    checkbox_percentage: boolean = true;
    res_educationsubmitted: boolean = true;
    tabfivedisable = true;

    state = [''];

    constructor(
        private fb: FormBuilder,
        private globalmessage: GlobalMessage,
        private commonService: CommonService,
    ) {
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            items: this.fb.array([])
        });
    }

    get itemsArray() {
        // Cast the abstract control to FormArray
        return this.formGroup.get('items') as FormArray;
    }

    private createItem(): FormGroup {
        return this.fb.group({
            board: ['', [Validators.required]],
            state: ['', [Validators.required]],
            education_board: ['', [Validators.required]],
            college_name: ['', [Validators.required]],
            datepass: ['', [Validators.required]],
            rollno: ['', [Validators.required]],
            marksheetno: ['', [Validators.required]],
            marksobtained: [''],
            outoff: [''],
            percentage: [''],
            file: [''],
            sgpa: ['', [Validators.required]],
            checkpercentagesgpa: ['', [Validators.required]],
            sgpa_percentage: ['', [Validators.required]],
            document_type: ['', [Validators.required]],
            batchstream: [''],
        });
    }

    public addItem(event: any): void {
        const count = Number(event.target.value);

        this.itemsArray.clear();

        for (let i = 0; i < count; i++) {
            this.itemsArray.push(this.createItem());
        }
    }

    getDatafromfileupload(e: any) {
        this.imagefile = e
    }

    get edf() {
        return this.formGroup.controls;
    }

    get adf() {
        return this.addressDetailsForm.controls;
    }

    PercentageCalculater() {
        // let obtainedmarks;
        // let outoff;
        // let percentage;
        // let value;
        // obtainedmarks = parseInt(
        //   this.form.controls['marksobtained'].value
        // );
        // outoff = parseInt(this.form.controls['outoff'].value);
        //
        // if (outoff <= 0) {
        //   return;
        // }
        //
        // if (obtainedmarks <= 0) {
        //   return;
        // }
        //
        // if (obtainedmarks < 100) {
        //   this.globalmessage.Show_error('Obtain marks should be > than 100')
        //   return;
        // }
        //
        //
        // if (obtainedmarks > outoff) {
        //   this.globalmessage.Show_error('Obtain marks should be < than out off marks')
        //
        //   this.form.controls['marksobtained'].setValue('0');
        //   this.form.controls['outoff'].setValue('0');
        //   this.form.controls['percentage'].setValue('0');
        //   return;
        // }
        // percentage = (obtainedmarks / outoff) * 100;
        //
        //
        // this.form.controls['percentage'].setValue(parseFloat(
        //   percentage.toFixed(2))
        // );
        let obtainedmarks = 0;
        let outoff = 0;
        let nper = 0;
        obtainedmarks = this.formGroup.controls['marksobtained'].value
        outoff = this.formGroup.controls['outoff'].value
        // control.value[rownumber].percentage
        if (outoff <= 0) {
            this.formGroup.controls['percentage'].setValue(parseFloat(nper.toFixed(2)))
            return;
        }
        if (obtainedmarks <= 0) {
            this.formGroup.controls['percentage'].setValue(parseFloat(nper.toFixed(2)))
            return;
        }
        /* if (obtainedmarks > 100) {
           this.globalmessage.Show_error('Obtain marks should be < than 100')
           return;
         }*/
        nper = (obtainedmarks / outoff) * 100;
        if (nper > 100) {
            nper = 0
            this.formGroup.controls['percentage'].setValue(parseFloat(nper.toFixed(2)))
            return
        }
        this.formGroup.controls['percentage'].setValue(parseFloat(nper.toFixed(2)))
    }

    EducationSubmit() {
        if (this.get_personaldetail.educationsubmited) {
            this.globalmessage.Show_error('You have already submitted education details.')
            return
        }
        if (this.get_personaldetail.educationsubmited == null) {
            this.globalmessage.Show_error('Please accept the terms and conditions.')
            return
        }
        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            aadhaar: this.oSession.aadhaar,
            educationsubmited: this.checkfinaleducationSubmit.controls['checkeducationsubmitted'].value
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.commonService
            .Post_json_data<boolean>(Students_url.IU_educationsubmited, input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your data');
                }
                this.res_educationsubmitted = response.data;
                if (response.data) {
                    this.getPersonalInfo();
                    this.globalmessage.Show_successmessage('Data submitted successfully.')
                }
            });
    }

    //
    getPersonalInfo() {
        if (this.get_personaldetail.educationsubmited) {
            this.tabfivedisable = false;
        }
        this.Check_alleducation_filled();
    }

    Check_alleducation_filled() {
        let lBreak = false
        this.checkbox_percentage = true    //disable
        for (const edu of this.get_personaldetail.education) {
            if (edu.sgpa_percentage <= 0) {
                lBreak = true
                break;
                //this.checkbox_percentage = false
                //break;
            }
        }
        if (!lBreak) {
            this.checkbox_percentage = false
        }
    }

}