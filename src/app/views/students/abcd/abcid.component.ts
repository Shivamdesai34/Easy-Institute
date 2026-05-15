import {Component, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {
    CardComponent,
    ColComponent,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    RowComponent,
    TableDirective,
} from "@coreui/angular-pro";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {aadhaarValidator, mobileValidator} from "../../../globals/aadhaar_validator";
import {Sessiondata} from "../../../models/Sessiondata";
import {SessionService} from 'src/app/globals/sessionstorage';
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {Ires_accountbasicdetails, Ires_createabcd, Student_abcdid} from "../../../models/response";
import {abcd_details, Students_url} from "../../../globals/global-api";
import {CommonService} from 'src/app/globals/common.service';
import {GlobalMessage} from "../../../globals/global.message";

import Swal from "sweetalert2";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    templateUrl: './abcid.component.html',
    styleUrls: ['./abcid.component.scss'],
    imports: [
        CardComponent,
        ReactiveFormsModule,
        RowComponent,
        ColComponent,
        AutocompleteLibModule,
        FormDirective,
        FormLabelDirective,
        FormSelectDirective,
        FormControlDirective,
        TableDirective
    ],
    standalone: true
})
export class AbcidComponent implements OnInit {

    Abcid_aadhaar_name: any;
    ABCDForm!: FormGroup;
    oSession!: Sessiondata;
    abcdlist = {} as Student_abcdid;

    imgFile!: Array<File>;
    basicdetails_account = {} as Ires_accountbasicdetails;

    genderOptions = [
        {value: 'M', label: 'Male'},
        {value: 'F', label: 'Female'}
    ];

    selectedgender!: any

    constructor(private sessionservice: SessionService,
                private commonService: CommonService,
                private globalmessage: GlobalMessage, private router: Router,
                private formBuilder: UntypedFormBuilder) {
    }

    ngOnInit() {

        // console.log('abcc111')
        //  this.globalmessage.Show_message('ABCID Form is closed!')
        // this.router.navigate(['/dashboard'])

        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();

        //this.getstudent();

        this.ABCDForm = this.formBuilder.group({
            nameabcd: ['', Validators.required],
            dob: ['', Validators.required],
            gender: ['', Validators.required],
            aadhaar: ['', [aadhaarValidator, Validators.required]],
            mobile: ['', [mobileValidator, Validators.required]],
            abc_account_id: [''],
            upload: [''],
        });

        this.ABCDForm.controls['abc_account_id'].valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(value => {
            if (value) {  // optional: add min length check
                this.get_abcdapproval(value);
            }
        });

        this.ABCDForm.controls['nameabcd'].valueChanges.subscribe((inputName) => {
            const expectedName = this.basicdetails_account?.cname?.trim() || '';

            if (inputName?.trim() !== expectedName) {
                this.ABCDForm.controls['nameabcd'].setErrors({nameMismatch: true});
            } else {
                const control = this.ABCDForm.controls['nameabcd'];
                if (control.hasError('nameMismatch')) {
                    const errors = {...control.errors};
                    delete errors['nameMismatch'];
                    control.setErrors(Object.keys(errors).length > 0 ? errors : null);
                }
            }
        });

        this.ABCDForm.controls['gender'].valueChanges.subscribe((selectedValue) => {
            // Find the label of the selected value
            const selectedOption = this.genderOptions.find(option => option.value === selectedValue);
            const selectedLabel = selectedOption?.label || '';

            const expectedGenderLabel = this.basicdetails_account?.gender?.trim() || '';

            if (selectedLabel !== expectedGenderLabel) {
                this.ABCDForm.controls['gender'].setErrors({genderMismatch: true});
            } else {
                const control = this.ABCDForm.controls['gender'];
                if (control.hasError('genderMismatch')) {
                    const errors = {...control.errors};
                    delete errors['genderMismatch'];
                    control.setErrors(Object.keys(errors).length > 0 ? errors : null);
                }
            }
        });

        this.ABCDForm.controls['dob'].valueChanges.subscribe((selectedDate) => {
            // Convert selectedDate from 'yyyy-MM-dd' to 'dd/MM/yyyy'
            const formattedInput = this.formatDateToDDMMYYYY(selectedDate);
            const expectedDOB = (this.basicdetails_account?.dob || '').trim();

            if (formattedInput !== expectedDOB) {
                this.ABCDForm.controls['dob'].setErrors({dobMismatch: true});
            } else {
                const control = this.ABCDForm.controls['dob'];
                if (control.hasError('dobMismatch')) {
                    const errors = {...control.errors};
                    delete errors['dobMismatch'];
                    control.setErrors(Object.keys(errors).length > 0 ? errors : null);
                }
            }
        });

        this.ABCDForm.controls['gender'].valueChanges.subscribe((selectedValue) => {
            this.selectedgender = this.genderOptions.find(option => option.value === selectedValue);
        });

    }

    formatDateToDDMMYYYY(dateString: string): string {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    getstudent() {
        let jsonin = {
            // 'Aadhaar': this.oSession.aadhaar,
            'Collegecode': this.oSession.collegecode,
            'Finyear': this.oSession.finyear,
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.commonService.Post_json_normal<Student_abcdid>(Students_url.studentabcdid_get, input_json).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_error('No data found');
            }
            this.abcdlist = response;

            //this.get_abcdapproval(this.abcdlist.Abcdid)
            if (this.abcdlist.approved_status == 'APPROVED') {
                this.globalmessage.Show_message('Your data is approved.You cannot modify the data.');
                this.router.navigate(['/dashboard']);
                return;
            }
            if (this.abcdlist.approved_status == 'NONE') {
                this.globalmessage.Show_message('sorry you cannot modify data since you have already submitted the ABC ID');
                //this.router.navigate(['/dashboard']);
                //return;
            }
            // this.ABCDForm.controls['nameabcd'].setValue(this.abcdlist.Aadhaarname);
            // this.ABCDForm.controls['fromdate'].setValue(this.abcdlist.Dob);
            // this.ABCDForm.controls['genderabcd'].setValue(this.abcdlist.Gender);
            // this.ng_ref_aadhaar.setValue(this.abcdlist.Studentaadhaar);
            // this.ng_ref_mobile.setValue(this.abcdlist.Mobileno);
            // this.ABCDForm.controls['rollnoabcd'].setValue(this.abcdlist.Rollno);
            // this.ng_ref_abcid.setValue(this.abcdlist.Abcdid);
            //this.ABCDForm.controls['idabcd'].setValue(parseInt(this.abcdlist.Abcdid))
        });
    }

    get_abcdapproval(stringid: string) {

        let jsonin = {
            abc_account_id: stringid,
        }

        this.commonService.Post_json_abc<Ires_accountbasicdetails>(abcd_details.abcaccountsbasicdetails, jsonin).subscribe((response) => {

            this.basicdetails_account = response

        })

    }

    png_jpeg_Upload(element: any) {
        this.imgFile = element.target.files;
        if (this.imgFile[0].type == 'image/png' || this.imgFile[0].type == 'image/jpeg') {
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Only jpeg or png file allowed!',
                icon: 'error',
                confirmButtonText: 'OK'
            });//alert
            // this.resetAll();
        }
    }

    onSubmit() {

        //this.get_abcdapproval()

        let change_date_format = this.ABCDForm.controls['dob'].value

        const date = new Date(change_date_format);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();

        change_date_format = `${day}/${month}/${year}`;

        if (this.ABCDForm.controls['nameabcd'].value != this.basicdetails_account.cname) {
            this.globalmessage.Show_error('Please check your name.')
            return
        }

        if (this.selectedgender.label != this.basicdetails_account.gender) {
            this.globalmessage.Show_error('Please check the gender.')
            return
        }

        if (change_date_format != this.basicdetails_account.dob) {
            this.globalmessage.Show_error('Please check your date of birth.')
            return
        }

        if (this.ABCDForm.controls['nameabcd'].value == "") {
            this.globalmessage.Show_message('Enter Name');
            return;
        }
        if (this.ABCDForm.controls['dob'].value == "") {
            this.globalmessage.Show_message('Enter date of birth');
            return;
        }
        if (this.selectedgender.value == "") {
            this.globalmessage.Show_message('Select Gender');
            return;
        }

        // if(String(this.oSession.aadhaar) != this.ABCDForm.controls['aadhaar'].value){
        //   this.globalmessage.Show_error('Aadhaar mismatch')
        //   return
        // }


        let jsonin = {
            //Collegecode: this.oSession.collegecode,
            //Finyear: this.oSession.finyear,
            //Loginaadhaar: this.oSession.aadhaar,
            aadhaar_name: this.ABCDForm.controls['nameabcd'].value,
            dob: change_date_format,
            gender: this.selectedgender.value,
            aadhaar_number: this.ABCDForm.controls['aadhaar'].value,
            mobile: this.ABCDForm.controls['mobile'].value,
            ai_nad_id: 'NAD021824'
            //  Rollno: 99,
            //formData.append('Rollno', this.ABCDForm.controls['rollnoabcd'].value);
            // Abcdid: parseInt(this.ABCDForm.controls['idabcd'].value)
        }
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(jsonin))
        // formdata.append('file', this.imgFile[0])
        formdata.append('file', '')

        this.commonService.Post_json_normal<Ires_createabcd>(abcd_details.createabcidbyaadhaar, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_error('No data found');
                return
            }
            if (response.status == 'success') {
                this.globalmessage.Show_message(response.message)

            }

        });
    }

    create_abc() {

        let change_date_format = this.ABCDForm.controls['dob'].value

        const date = new Date(change_date_format);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();

        change_date_format = `${day}/${month}/${year}`;

        if (this.ABCDForm.controls['nameabcd'].value != this.basicdetails_account.cname) {
            this.globalmessage.Show_error('Please check your name.')
            return
        }

        if (this.selectedgender.label != this.basicdetails_account.gender) {
            this.globalmessage.Show_error('Please check the gender.')
            return
        }

        if (change_date_format != this.basicdetails_account.dob) {
            this.globalmessage.Show_error('Please check your date of birth.')
            return
        }

        if (this.ABCDForm.controls['nameabcd'].value == "") {
            this.globalmessage.Show_message('Enter Name');
            return;
        }
        if (this.ABCDForm.controls['dob'].value == "") {
            this.globalmessage.Show_message('Enter date of birth');
            return;
        }
        if (this.selectedgender.value == "") {
            this.globalmessage.Show_message('Select Gender');
            return;
        }

        // console.log('Aadhaar mismatch',this.ABCDForm.controls['aadhaar'].value)
        // console.log('oSession aadhaar',this.oSession.aadhaar)

        if (String(this.oSession.aadhaar) != this.ABCDForm.controls['aadhaar'].value) {
            this.globalmessage.Show_error('Aadhaar mismatch')
            return
        }

        // return;

        let jsonin = {

            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            // Loginaadhaar: this.oSession.aadhaar,
            Aadhaarname: this.ABCDForm.controls['nameabcd'].value,
            Dob: this.ABCDForm.controls['dob'].value,
            Gender: this.selectedgender.value,
            // Studentaadhaar: this.oSession.aadhaar,
            Mobileno: parseInt(this.ABCDForm.controls['mobile'].value),
            Rollno: 99,
            //formData.append('Rollno', this.ABCDForm.controls['rollnoabcd'].value);
            Abcdid: parseInt(this.ABCDForm.controls['abc_account_id'].value)

        }

        // let formdata = new FormData();
        // formdata.append('input_form', encryptUsingAES256(jsonin))
        // formdata.append('file', this.imgFile[0])

        let input_json = {
            Input: encryptUsingAES256(jsonin)
        }

        this.commonService.Post_json_normal(Students_url.save_abc, input_json).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_error('No data found');
                return
            }
            this.globalmessage.Show_message(`${this.basicdetails_account.cname} you have successfully submitted the ABC ID details on college Portal.
             Please keep checking your mail or mobile for status whether it is approved or rejected.`);

            //this.router.navigate(['/dashboard']);
            //this.getstudent();

        });
    }

    check_abcdetails() {
        let formvalue = this.ABCDForm.controls['abc_account_id'].value

        let jsonin = {
            abc_account_id: this.ABCDForm.controls['abc_account_id'].value,
        }

        formvalue.valueChanges?.pipe(
            debounceTime(200)
        ).subscribe((value: any) => {
            this.filterOptions(value || '');
        });

        // this.commonService.Post_json_normal<Ires_accountbasicdetails>(abcd_details.abcaccountsbasicdetails, jsonin).subscribe((response) => {
        //
        //   console.log('rsppp', response)
        // })
    }

    filterOptions(query: string) {
        const lowerQuery = query.toLowerCase();
    }


    // abcdlist!: IAbcd_list[];
}
