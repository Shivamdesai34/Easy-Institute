import {Component, EventEmitter, OnInit, Output, ViewChild,} from '@angular/core';
import {FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import {CanceladmissionService} from './canceladmission.service';
import Swal from 'sweetalert2';
import {GlobalMessage} from '../../../globals/global.message';
import {CommonService} from '../../../globals/common.service';
import {SessionService} from '../../../globals/sessionstorage';
import {Sessiondata} from '../../../models/Sessiondata';
import {encryptUsingAES256} from '../../../globals/encryptdata';
import {Banks_new, Ires_PaidBatchs} from '../../../models/response';
import { NgClass } from "@angular/common";
import {
    CardBodyComponent,
    CardComponent,
    ColComponent, FormControlDirective, FormLabelDirective, FormSelectDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    RowComponent, TableDirective
} from "@coreui/angular-pro";
import {Students_url} from "../../../globals/global-api";
import {ValidateFormfeesnotpaidProfilenotsubmitted} from "../../../globals/global_utility";

@Component({
    selector: 'app-canceladmission',
    templateUrl: './canceladmission.component.html',
    styleUrls: ['./canceladmission.component.scss'],
    imports: [
        NgClass,
        ColComponent,
        CardComponent,
        CardBodyComponent,
        RowComponent,
        ReactiveFormsModule,
        ModalFooterComponent,
        ModalComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        FormControlDirective,
        FormLabelDirective,
        FormSelectDirective,
        TableDirective
    ],
    standalone: true
})
export class CanceladmissionComponent implements OnInit {
    banks: Banks_new[] = [];
    SelectedBatch: any;
    BatchName!: Ires_PaidBatchs[];
    cancelAdmissionForm!: UntypedFormGroup;
    submitted = false;
    data: any;
    formData = new FormData();
    chequebook_img!: Array<File>;
    oSession!: Sessiondata;

    constructor(
        private router: Router,
        private commonService: CommonService,
        private sessionservice: SessionService,
        private formBuilder: UntypedFormBuilder,
        private globalmessage: GlobalMessage,
        private canceladmissionService: CanceladmissionService
    ) {
    }

    @ViewChild('content') content: any;
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

    get f() {
        return this.cancelAdmissionForm.controls;
    }

    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();

        // if(ValidateFormfeesnotpaidProfilenotsubmitted(this.oSession.isprofilesubmited!,this.oSession.formfeesrecieved!)){
        //     this.router.navigate(['dashboard']);
        // }

        this.Createform();
        this.Check_feespaid();
        this.Bankmasters();
    }

    Createform() {
        this.cancelAdmissionForm = this.formBuilder.group({
            studentbatch: ['', Validators.required],
            reason: ['', Validators.required],
            bankname: ['', Validators.required],
            accountholdername: ['', Validators.required],
            accountno: ['', Validators.required],
            bankbranch: ['', Validators.required],
            ifsccode: ['', Validators.required],
            enrollment: ['', Validators.required],
        });
    }

    Check_feespaid() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
        };
        let input_json = jsonin
        this.commonService
            .Post_json_data<Ires_PaidBatchs[]>(Students_url.Paidbatchs_URL, input_json)
            .subscribe((response) => {
                if (response.data != null) {
                    this.BatchName = response.data;
                }
            });
        // if (this.canceladmissionService.Exception != '') {
        //   Swal.fire({
        //     title: 'Error!',
        //     text: this.canceladmissionService.Exception,
        //     icon: 'error',
        //     confirmButtonText: 'OK',
        //   });
        //   this.router.navigate(['/dashboard']);
        // }
    }

    onBatchSelected(event: any) {
        this.Cancelledadmission();
    }

    Cancelledadmission() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            // Aadhaar: this.oSession.aadhaar,
            batch_code: this.SelectedBatch.Batch_code,
        };
        let input_json = jsonin
        this.commonService
            .Post_json_data<boolean>(Students_url.Cancelledadmission, input_json)
            .subscribe((response) => {
                if (response.data == null) {
                    this.openYesNoDialog('Something went wrong!');
                    return
                }
                let res_cancelledadmission: boolean = response.data
                if (!res_cancelledadmission) {
                    this.router.navigate(['/dashboard']);
                }
            },error => {
                this.router.navigate(['/dashboard']);
            });
    }

    openYesNoDialog(msg: any) {
        this.globalmessage.Show_message('Delete');
    }

    Bankmasters() {
        //subject api
        let jsonin = {
            // Aadhaar: this.oSession.aadhaar,
            Finyear: this.oSession.finyear,
            CollegeCode: this.oSession.collegecode,
        };
        let input_jsonin = {
            Input: encryptUsingAES256(jsonin)
        };
        this.canceladmissionService
            .Bankmasters(input_jsonin)
            .subscribe((response) => {
                if (response === null) {
                    return;
                }
                this.banks = response.data;
            });
    }

    ChequeBook_Filechange(element: any) {
        this.chequebook_img = element.target.files;
        // if (this.chequebook_img[0].type == "application/pdf" && this.chequebook_img[0].size < 2400000) {
        //   this.chequebook_img = element.target.files;
        // }
        // else {
        //   this.openYesNoDialog("Only application/pdf files allowed! Max Size 2MB!")
        // }
    }

    onCancelAdmission() {
        this.submitted = false;
        if (!this.chequebook_img) {
            this.openYesNoDialog('Select ChequeBook/PassBook Image!');
            // alert("Select Profile/Aadhaar/Sign Images")
            // return false;
        } else {
            if (this.cancelAdmissionForm.invalid) {
                return;
            } else {
                if (
                    this.chequebook_img[0].type == 'image/jpeg' ||
                    this.chequebook_img[0].type == 'image/png'
                ) {
                    if (this.chequebook_img[0].size < 2400000) {
                        this.cancelAdmissionForm.addControl(
                            'finyear',
                            new FormControl('', [])
                        );
                        this.cancelAdmissionForm.controls['finyear'].setValue(
                            this.oSession.finyear
                        );
                        this.cancelAdmissionForm.addControl(
                            'collegecode',
                            new FormControl('', [])
                        );
                        this.cancelAdmissionForm.controls['collegecode'].setValue(
                            this.oSession.collegecode
                        );
                        // this.cancelAdmissionForm.addControl(
                        //     'aadhaar',
                        //     new FormControl('', [])
                        // );
                        // this.cancelAdmissionForm.controls['aadhaar'].setValue(
                        //     this.oSession.aadhaar
                        // );
                        this.cancelAdmissionForm.addControl(
                            'batchcode',
                            new FormControl('', [])
                        );
                        this.cancelAdmissionForm.controls['batchcode'].setValue(
                            this.SelectedBatch.Batch_code
                        );

                        let formdata = new FormData();
                        formdata.append(
                            'input_form',
                            encryptUsingAES256(this.cancelAdmissionForm.value)
                        );
                        formdata.append('file', this.chequebook_img[0]);
                        // this.formData.append('finyear', sessionStorage.getItem('Finyear')!);
                        // this.formData.append('collegecode', '1');
                        // this.formData.append('aadhaar', sessionStorage.getItem('Aadhaar')!);
                        // this.formData.append('batchcode', this.SelectedBatch.Batch_code);
                        // this.formData.append(
                        //     'reason',
                        //     this.cancelAdmissionForm.controls['reason'].value
                        // );
                        // this.formData.append(
                        //     'bankname',
                        //     this.cancelAdmissionForm.controls['bankname'].value
                        // );
                        // this.formData.append(
                        //     'accountholdername',
                        //     this.cancelAdmissionForm.controls['accountholdername'].value
                        // );
                        // this.formData.append(
                        //     'accountno',
                        //     this.cancelAdmissionForm.controls['accountnumber'].value
                        // );
                        // this.formData.append(
                        //     'bankbranch',
                        //     this.cancelAdmissionForm.controls['bankbranch'].value
                        // );
                        // this.formData.append(
                        //     'ifsccode',
                        //     this.cancelAdmissionForm.controls['ifsc'].value
                        // );
                        // this.formData.append(
                        //     'enrollment',
                        //     this.cancelAdmissionForm.controls['enrollment'].value
                        // );
                        // this.formData.append('cheque_img', this.chequebook_img[0]);
                        // let input_json = {
                        //     Input: encryptUsingAES256(this.formData)
                        // };
                        this.canceladmissionService
                            .AdmissionCancel_Request(formdata)
                            .subscribe((response) => {
                                if (response.data == true) {
                                    this.globalmessage.Show_message(
                                        'Admission Cancellation Request Sent!'
                                    );
                                    this.submitted = true;
                                } else {
                                    this.globalmessage.Show_message(response.message);
                                    // this.personalDetailsForm.reset();
                                    // alert("Error!")
                                }
                            });
                    } else {
                        this.globalmessage.Show_error('Max Size 2MB!');
                    }
                } else {
                    this.globalmessage.Show_error('Only png/jgp files allowed!');
                }
            }
        }
    }
}
