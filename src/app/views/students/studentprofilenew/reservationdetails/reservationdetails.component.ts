import * as myGlobals from '../../../../globals/global-variable';
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    FormControlDirective,
    FormDirective, FormLabelDirective, FormSelectDirective,
    RowComponent, SpinnerComponent, TabPaneComponent
} from "@coreui/angular-pro";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {encryptUsingAES256} from "../../../../globals/encryptdata";
import {Ires_personaldata, res_singlebatch, Reservation} from "../../../../models/response";
import {GlobalMessage} from "../../../../globals/global.message";
import {Sessiondata} from "../../../../models/Sessiondata";
import {StudentprofileService} from "../../studentprofile/studentprofile.service";
import {SessionService} from "../../../../globals/sessionstorage";
import {CommonService} from "../../../../globals/common.service";
import {Common_url, Students_url} from "../../../../globals/global-api";

@Component({
    selector: 'app-reservationdetails',
    templateUrl: './reservationdetails.component.html',
    styleUrls: ['./reservationdetails.component.scss'],
    standalone: true,
    imports: [
        CardComponent,
        CardBodyComponent,
        ColComponent,
        FormControlDirective,
        FormDirective,
        ReactiveFormsModule,
        RowComponent,
        SpinnerComponent,
        FormLabelDirective,
        FormSelectDirective,
        ButtonDirective
    ]
})
export class ReservationDetailsComponent implements OnInit {
    @Input() reservationdetailForm!: FormGroup;
    @Input() reservation = ['']
    @Input() specially_abled = ['']
    @Input() category = ['']

    @Output() reloadApi_reservartion = new EventEmitter<boolean>();

    doc_category!: File;
    doc_eligible!: File;
    doc_reservatino!: File;
    doc_ration!: File;
    res_singlebatch!: res_singlebatch;
    oSession!: Sessiondata;
    get_personaldetail!: Ires_personaldata;
    CASTECODE = '70'
    DISABILITYCODE = '80'
    RESERVATIONCODE = '888'
    RATIONCODE = '130'


    reservationsaveloader = false
    changeStateReservation = false;
    reservationSubmit = false;
    res_getreservation = {} as Reservation

    constructor(
        private globalmessage: GlobalMessage,
        private studentprofieservice: StudentprofileService,
        private formBuilder: FormBuilder,
        private sessionservice: SessionService,
        private commonService: CommonService,
    ) {
    }

    ngOnInit() {
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();
        // console.log('mnvmv', this.oSession)
        this.Createform();
        this.Get_reservation();
    }

    Createform() {
        this.reservationdetailForm = this.formBuilder.group({
            opencategory: [''],
            parallel_reservation: [''],
            category: ['', Validators.required],
            subcategory: [''],
            specially_abled: [''],
            percentage: [0,],
            udid_no: [''],
            checkotherreservation: [''],
            checkspeciallyabled: [''],
        });
        if (this.oSession.isprofilesubmited == 'true') {
            this.reservationdetailForm.disable();
        }
        this.getPersonalInfo();
        this.single_batch();
    }

    single_batch() {
        let nBatchcode: number | undefined = 0
        let nBatchuuid: string | undefined = ""


        if (myGlobals.Global_CurrentFinYear == this.oSession.registerfinyear) {
            nBatchcode = this.oSession.register_batchcode,
                nBatchuuid = this.oSession.registrationbatchuuid
        } else {
            nBatchcode = this.oSession.currentformfeesbatchcode,
                nBatchuuid = this.oSession.currentformfeesbatchuuid
        }
        if (nBatchcode! <= 0 || nBatchcode == undefined) {
            this.globalmessage.Show_message('Single Batch not found')
            return
        }
        let jsonin = {
            Batchcode: nBatchcode,
            batchuuid:nBatchuuid
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.studentprofieservice
            .getsinglebatch(input_json)
            .subscribe((response) => {
                this.res_singlebatch = response.data;
                // if (this.res_singlebatch.Admissionboard == 'UG') {
                //     if (this.res_singlebatch.Batch_level > 1) {
                //         this.globalmessage.Show_error('Profile change not allowed.')
                //         // this.router.navigate(['/dashboard'])
                //     }
                // }
                // if (this.res_singlebatch.Admissionboard == 'JR') {
                //     if (this.res_singlebatch.Batch_level == 2) {
                //         this.globalmessage.Show_error('Profile change not allowed.')
                //         // this.router.navigate(['/dashboard'])
                //     }
                // }
                // if (this.res_singlebatch.Admissionboard == 'PG') {
                //     if (this.res_singlebatch.Batch_level == 2) {
                //         this.globalmessage.Show_error('Profile change not allowed.')
                //         // this.router.navigate(['/dashboard'])
                //     }
                // }
                // this.CreateForm()
            });
    }

    Opencategory() {
        if (this.reservationdetailForm.controls['opencategory'].value == 'OPEN') {
            this.reservationdetailForm.controls['category'].removeValidators(Validators.required)
            this.reservationdetailForm.controls['category'].updateValueAndValidity();
        }
    }

    get rdf() {
        return this.reservationdetailForm.controls;
    }

    xlsxUpload_category(element: any) {
        this.doc_category = element.target.files[0];
        //this.doc_pdffile[0].name = 'prakash.dbf'
    }

    xlsxUpload_eligible(element: any) {
        this.doc_eligible = element.target.files[0];
        //this.doc_pdffile[0].name = 'prakash.dbf'
    }

    xlsxUpload_reservation(element: any) {
        this.doc_reservatino = element.target.files[0];
        //this.doc_pdffile[0].name = 'prakash.dbf'
    }

    xlsxUpload_ration(element: any) {
        this.doc_ration = element.target.files[0];
        //this.doc_pdffile[0].name = 'prakash.dbf'
    }

    saveReservDetails() {

       // this.submitSuccess()

       // return

        // if (this.res_singlebatch.Rationcard == 1) {
        //     if (this.doc_ration == null) {
        //         this.globalmessage.Show_error('Please upload ration card')
        //         return
        //     }
        // }
        this.reservationdetailForm.addControl('finyear', new FormControl('', []));
        this.reservationdetailForm.controls['finyear'].setValue(
            this.oSession.finyear
        );
        this.reservationdetailForm.addControl(
            'college_code',
            new FormControl('', [])
        );
        this.reservationdetailForm.controls['college_code'].setValue(
            this.oSession.collegecode
        );
        // this.reservationdetailForm.addControl('aadhaar', new FormControl('', []));
        // this.reservationdetailForm.controls['aadhaar'].setValue(
        //     this.oSession.aadhaar
        // );
        if (this.reservationdetailForm.controls['opencategory'].value == 'RESERVED') {
            if (this.doc_category == null) {
                this.globalmessage.Show_error('Please upload category document.')
            }
            if (this.doc_category.name.length > 0) {
                this.reservationdetailForm.addControl('Castecode', new FormControl('', []));
                this.reservationdetailForm.controls['Castecode'].setValue(
                    this.CASTECODE
                );
            }
        }
        if (this.reservationdetailForm.controls['checkspeciallyabled'].value == 'YES') {
            if (this.doc_eligible == null) {
                this.globalmessage.Show_error('Please upload Specially abled document.')
            }
            if (this.doc_eligible.name.length > 0) {
                this.reservationdetailForm.addControl('disabilitycode', new FormControl('', []));
                this.reservationdetailForm.controls['disabilitycode'].setValue(
                    this.DISABILITYCODE
                );
            }
        }
        if (this.reservationdetailForm.controls['checkotherreservation'].value == 'YES') {
            if (this.doc_reservatino == null) {
                this.globalmessage.Show_error('Please upload reservaton document.')
            }
            if (this.doc_reservatino.name.length > 0) {
                this.reservationdetailForm.addControl('reservationcode', new FormControl('', []));
                this.reservationdetailForm.controls['reservationcode'].setValue(
                    this.RESERVATIONCODE
                );
            }
        }
        // if (this.res_singlebatch.Rationcard == 1) {
        //     this.reservationdetailForm.addControl('rationcode', new FormControl('', []));
        //     this.reservationdetailForm.controls['rationcode'].setValue(
        //         this.RATIONCODE
        //     );
        // }
        this.reservationsaveloader = true
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(this.reservationdetailForm.value));
        if (this.reservationdetailForm.controls['opencategory'].value == 'RESERVED') {
            if (this.doc_category.name.length > 0) {
                formdata.append(this.CASTECODE, this.doc_category);
            }
        }
        if (this.reservationdetailForm.controls['checkspeciallyabled'].value == 'YES') {
            if (this.doc_eligible.size > 0) {
                formdata.append(this.DISABILITYCODE, this.doc_eligible);
            }
        }
        if (this.reservationdetailForm.controls['checkotherreservation'].value == 'YES') {
            if (this.doc_reservatino.size > 0) {
                formdata.append(this.RESERVATIONCODE, this.doc_reservatino);
            }
        }
        // if (this.res_singlebatch.Rationcard == 1) {
        //     formdata.append(this.RATIONCODE, this.doc_ration);
        // }
        this.studentprofieservice.IU_Reservations_new(formdata).subscribe((response) => {
            if (response.data == true) {
                this.globalmessage.Show_message('Data uploaded successfully');

                this.submitSuccess()
                this.reservationsaveloader = false
                // this.getPersonalInfo();
            }
        });
    }

    getPersonalInfo() {
        // this.reservationdetailForm.patchValue(
        //     this.get_personaldetail.reservation
        // );
    }

    // Reservation API Calling
    // single_batch() {
    //     let nBatchcode: number | undefined = 0
    //     if (myGlobals.Global_CurrentFinYear == this.oSession.registerfinyear) {
    //         nBatchcode = this.oSession.register_batchcode
    //     } else {
    //         nBatchcode = this.oSession.currentformfeesbatchcode
    //     }
    //     if (nBatchcode! <= 0 || nBatchcode == undefined) {
    //         this.globalmessage.Show_message('Single Batch not found')
    //         return
    //     }
    //     let jsonin = {
    //         Batchcode: nBatchcode
    //     };
    //     let input_json = {
    //         Input: encryptUsingAES256(jsonin),
    //     };
    //
    //     this.commonService.Post_json_data<Reservation>(Students_url.reservation, input_json).subscribe((response) => {
    //
    //         console.log(response);
    //
    //             this.res_getreservation = response.data;
    //
    //         this.reservationdetailForm.patchValue(this.res_getreservation)
    //
    //
    //     })
    //
    // }
    Get_reservation() {
        let nBatchcode = 0;
        let nBatchuuid = '';
        if (this.oSession.currentformfeesbatchcode! <= 0) {
            nBatchcode = this.oSession.maxbatchcode!
            nBatchuuid = this.oSession.maxbatchuuid!
        } else {
            nBatchcode = this.oSession.currentformfeesbatchcode!
            nBatchuuid = this.oSession.currentbatchuuid!
        }
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            // Aadhaar: this.oSession.aadhaar,
            batch_code: nBatchcode,
            batchuuid : nBatchuuid
        }
        let input_json = jsonin
        this.commonService.Post_json_data<Reservation>(Students_url.reservation, input_json).subscribe((response) => {
            // console.log(response);
            this.res_getreservation = response.data;
            this.reservationdetailForm.patchValue(this.res_getreservation)
        })
    }

    submitSuccess() {
        // when your save / submit API is successful
        this.reloadApi_reservartion.emit(true);
    }
}
