import {Component, OnInit, Renderer2} from '@angular/core';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent, FormLabelDirective,
    FormSelectDirective,
    RowComponent,
    SpinnerComponent,
} from "@coreui/angular-pro";
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {
    AdmissionQuotasubjectGroups,
    Fees_Receiptmaster,
    Ires_Courseapplied,
    Ires_education,
    Ires_personaldata,
    Ires_Reciept,
    Ires_registerbatch,
    Ires_subjectlist,
    res_singlebatch,
    Student_Documents_Education,
    Subjects_group_h
} from "../../../models/response";
import {Sessiondata} from "../../../models/Sessiondata";
import {SessionService} from "../../../globals/sessionstorage";
import {CommonService} from "../../../globals/common.service";
import {UsersService} from "./users.service";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {Common_url, Students_url} from "../../../globals/global-api";

import {GlobalMessage} from "../../../globals/global.message";
import {ActivatedRoute, Router} from "@angular/router";
import * as myGlobals from "../../../globals/global-variable";
import {BilldeskPay} from "../../../../assets/javascript/billdesk";
import {ImageTransform} from "ngx-image-cropper";
import {FormfeesService} from "../formfees/formfees.service";
import {Global_CurrentFinYear} from "../../../globals/global-variable";

import { v4 as uuidv4 } from 'uuid';
import {Sharedservice} from "../../../services/sharedservice";
import { firstValueFrom } from 'rxjs';



@Component({
    selector: 'app-newformfees',
    imports: [
        CardBodyComponent,
        CardComponent,
        CardHeaderComponent,
        ReactiveFormsModule,
        RowComponent,
        FormSelectDirective,
        ButtonDirective,
        ColComponent,
        SpinnerComponent,
        FormLabelDirective
    ],
    providers: [UsersService],
    standalone: true,
    templateUrl: './newformfees.component.html',
    styleUrl: './newformfees.component.scss'
})
export class NewformfeesComponent implements OnInit {
    private lPDG_course: boolean = false;

    private lcertificate_course: boolean = false;

    items = [1, 2, 3, 4, 5, 6, 7];
    activePane = 0;
    ReceiptID: any;
    ReceiptNo: any;
    QuotaStatus: AdmissionQuotasubjectGroups[] = [];
    Fees_master = {} as Fees_Receiptmaster
    res_Reciept = {} as Ires_Reciept
    Profilepictform!: FormGroup;
    addressDetailsForm!: FormGroup;
    FeesAdmissionForm!: FormGroup;
    submitted = false;
    modalSubmit = false;
    res: any;
    data: any;
    rowss: any = [];
    gridOptions: any;
    gridOptions_document: any;
    gridOptions_edu: any;
    college!: number;
    marks: any;
    boards: any;
    batch_name: any;
    finyear: any;
    collegecode: any;
    //Images Upload and Fill Profile
    formData = new FormData();
    date: any;
    percentage: any;
    public imagePath: any;
    photo: any;
    sign: any;
    public message!: string;
    //Get Education Details
    board: any;
    Education = {} as Student_Documents_Education;
    UploadDocuments: any;
    //Modal
    resp_Abatchs: Ires_registerbatch[] = []
    selected_batch = {} as Ires_registerbatch
    selected_subject = {} as Subjects_group_h;
    batchSubjects: any;
    batchcode: any;
    SubjectGroups: any;
    formAmount: any;
    BatchCode: any;
    resp_singlebatch!: res_singlebatch;
    billdeskRequestMsg: string = '';
    //Badge
    imageChangedEvent: any = '';
    croppedImage: any = '';
    containWithinAspectRatio = false;
    AppliedCourses: Ires_Courseapplied[] = [];
    canvasRotation = 0;
    transform: ImageTransform = {};
    oSession!: Sessiondata;
    get_personaldetail = {} as Ires_personaldata;
    education = {} as Ires_education;
    visiblebatch = false;
    visivlebatch_atkt = false;
    payloader = false;
    regbatchname = '';
    aSubjects: Subjects_group_h[] = [];
    pageType: string = '';
    iseligible: boolean = false;
    public rowSelection: 'single' | 'multiple' = 'single';
    //Badge
    formtype!: string;
    res_iuadmission = {} as Ires_Reciept
    pay_formfees = true
    show_selected_table = false
    registrationfeesform = true
    table_one!: Ires_subjectlist[]
    table_two!: Ires_subjectlist[]

    constructor(
        private formBuilder: UntypedFormBuilder,
        private sessionservice: SessionService, private commonService: CommonService,
        private router: Router,
        private activeroute: ActivatedRoute,
        public formfeesService: FormfeesService,
        private renderer: Renderer2,
        private globalmessage: GlobalMessage,private sharedservice: Sharedservice
    ) {
    }

    renderExternalScript(src: string): HTMLScriptElement {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        script.defer = true;
        this.renderer.appendChild(document.body, script);
        return script;
    }

    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();
         console.log('mcxcx',this.oSession);

        // let url_batchlevel = ""

        if(this.oSession.formfeesrecieved == "PAID" &&
            this.oSession.currentformfeesbatchlevel == "1" &&
            this.oSession.isprofilesubmited == "false"
            // this.oSession.finyear == Global_CurrentFinYear
        ){
            this.router.navigate(['studentprofilenew']);
        }
        // this.pageType

        // this.student_selectedsubjectthird()
        // if(this.oSession.maxfinyear == Global_CurrentFinYear && this.oSession.formfeesrecieved == 'PAID'){
        //
        //     this.registrationfeesform = false
        //     this.show_selected_table = true
        //     this.student_selectedsubjectthird()
        //
        // }
        this.activeroute.queryParams
            .subscribe(params => {
                this.pageType = params['page'];
                this.iseligible = params['iseligible'];
            });

        this.formtype = '';


        //SHIvam1005
        if(this.oSession.currentlevel! <= 1 && this.pageType == 'A'){
            this.Show_registrationbatchs('JR')
        }

        if(this.oSession.currentlevel! >= 3 && this.pageType == 'CERT'){
            this.lcertificate_course = true
            this.Show_registrationbatchs('CERT')
        }
        if (this.oSession.maxadmissionboard == 'PG' && this.pageType == 'PGD') {
            this.lPDG_course = true
            this.Show_registrationbatchs('PGD')
        }
        this.renderExternalScript(
            'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
        ).onload = () => {
        };
        this.CreateForm();




    }
    async Profilesubmitted_API(): Promise<boolean>{

        let lyesno: boolean = false

        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
            // Aadhaar: this.oSession.aadhaar,
            BatchCode: this.oSession.currentformfeesbatchcode,
        }
        let input_jsonin = {
            Input: encryptUsingAES256(jsonin)
        };

        const response = await firstValueFrom(
            this.sharedservice.IsProfileSubmited_URL(input_jsonin)
        );

        return response.data.profilesubmited;
    }

    async FormFeesRecieved_API(): Promise<boolean> {

        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
        };

        let input_jsonin = {
            Input: encryptUsingAES256(jsonin)
        };

        const response = await firstValueFrom(
            this.sharedservice.isFormfeesreceivedv1(input_jsonin)
        );

        return response.data.fees_receiptmaster.billdesktranid.length > 0;
    }



    Batch_selected() {

        console.log('slss',this.selected_batch)

        if (this.selected_batch.admissionstarted == 0 && this.selected_batch.admissionyear == Global_CurrentFinYear) {
            this.globalmessage.Show_error('Admission not started for this batch.')
            this.router.navigate(['dashboard']);
            return
        }

        if(this.selected_batch.batch_level == 2 ){
            this.SelectBatch_juniorSubjects()
            return
        }


        this.Additionalformfeesrecieved();
    }


    DisplaySubjects() {
        if (this.oSession.studenttype == 'OUTSIDE') {
            this.regbatchname = this.oSession.registerbatchname?.trim()!;
            this.visiblebatch = true;
            //hARSH
            // this.FeesAdmissionForm.controls['batch_name'].setValue(this.regbatchname);
            // this.SelectBatchSubjects();
        } else {
            this.visivlebatch_atkt = true;
            this.visiblebatch = false;
        }
    }

    async CreateForm() {
        this.FeesAdmissionForm = this.formBuilder.group({
            // batch_name: ['', Validators.required],
            batch_name: ['', Validators.required],
            batchSubjects: ['', Validators.required],
        })

        this.FeesAdmissionForm.controls['batch_name'].valueChanges.subscribe((value) => {
            this.selected_batch = value;
        })

        this.FeesAdmissionForm.controls['batchSubjects'].valueChanges.subscribe((value) => {
            this.selected_subject = value;
        })

        if (this.oSession.registerfinyear == myGlobals.Global_CurrentFinYear) {

            console.log('111')
            if (this.pageType == 'R') {
                this.Register_Batch_api()

                console.log('112')

            } else if (this.pageType == 'CERT') {

                console.log('113')

                // if(this.oSession)

                this.Show_registrationbatchs('CERT')
            } else if (this.pageType == 'PGD') {

                console.log('114')

                this.Show_registrationbatchs('PGD')
            } else if (this.oSession.currentformfeesboardlevel == 'JR') {
                console.log('114')
                this.Show_registrationbatchs('JR')
            } else {
                console.log("brdddd")
                this.Show_registrationbatchs('NONE')
            }
        } else {

            console.log('115')
            this.batch_configuration(this.oSession.maxbatchcode!);
        }
        //Student0405
        if(this.pageType == 'PGD'){
            let lyesno = await this.Profilesubmitted_API()

            let flyesno = await this.FormFeesRecieved_API()

            console.log('110',lyesno)

            console.log('110',flyesno)
            if(!lyesno){
                this.globalmessage.Show_message('Please complete the profile')
                this.router.navigate(['studentprofilenew']);
            }
        }

    }

    // get f5() {
    //   return this.EducationDetailsForm.controls;
    // }
    Batch_uii() {
    }

    Incremental_Batchapi() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
            // Aadhaar: this.oSession.aadhaar,
        };
         let input_json = {
             Input : encryptUsingAES256(jsonin),
         }
        this.formfeesService
            .StudentBatch(input_json)
            .subscribe((response) => {
                this.resp_Abatchs = response.data;
                // adding incemental batch
                //this.resp_Abatchs[0].Runtime_incrementalbatch = true;
            });
    }

    Register_Batch_api() {
        let single_batch: Ires_registerbatch;
        let jsonin = {
            Batch_code: this.oSession.register_batchcode,
            batchuuid : this.oSession.registrationbatchuuid
        };
        let input_json = {
            Input : encryptUsingAES256(jsonin),
        }
        this.formfeesService
            .Registerbatch(input_json)
            .subscribe((response) => {
                this.resp_Abatchs.push(response.data)
            });
    }

    batch_configuration(Pbatch_code: Number) {
        let jsonin = {
            Batchcode: Pbatch_code,
            batchuuid : this.oSession.maxbatchuuid,
            // batchuuid
        };

        console.log('batt',jsonin)
        let input_json = {
            Input : encryptUsingAES256(jsonin),
        }
        this.formfeesService
            .batch(input_json)
            .subscribe((response) => {
                this.resp_singlebatch = response.data;
                //TY to Masters (PG)

                if (this.pageType == "CERT") {
                    //let pgdbatchs = this.resp_Abatchs.filter((pgdbatch) => (pgdbatch.batch_code >= 2700 && pgdbatch.batch_code <= 3100))
                    let certbatchs = this.resp_Abatchs.filter(this.Only_CertBatchs)

                    this.resp_Abatchs = [...certbatchs]

                    console.log('bcttc',this.resp_Abatchs)

                    return
                }

                if (this.resp_singlebatch.batch_level == 3 &&
                    this.resp_singlebatch.admissionboard == 'UG') {

                    //Shivam0205
                    if (this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear) {
                        if (this.pageType == 'PGD') {
                            this.Show_registrationbatchs('PGD');
                        } else {
                            this.Show_registrationbatchs('PG');
                        }

                    }
                } else {
                    if (this.pageType == 'A') {
                        this.globalmessage.Show_error('You are not eligible for additional courses.')
                        this.router.navigate(['/dashboard'])
                    }
                    if (!this.lPDG_course && this.pageType == 'PGD') {
                        this.Show_registrationbatchs('PGD');
                        return
                        //Shivam0405
                        // this.Incremental_Batchapi()
                    }

                    this.Incremental_Batchapi()
                }
            });
    }

    Show_registrationbatchs(sBoardlevel: string) {

        if(sBoardlevel == 'NONE'){
            this.globalmessage.Show_error('Please contact admin')
            return
        }

        let jsoninbatch = {
            boardlevel: sBoardlevel,
        };

        let jsonin = {
            Input: encryptUsingAES256(jsoninbatch)
        };
        this.formfeesService.registertionbatchs(jsoninbatch).subscribe((response) => {

            this.resp_Abatchs = response.data
            // debugger
            if (this.pageType == "PGD") {
                //let pgdbatchs = this.resp_Abatchs.filter((pgdbatch) => (pgdbatch.batch_code >= 2700 && pgdbatch.batch_code <= 3100))
                let pgdbatchs = this.resp_Abatchs.filter(this.Only_PGDBatchs)
                this.resp_Abatchs = [...pgdbatchs]
                // console.log(this.resp_Abatchs)
                return
            }
            if (this.pageType == "CERT") {
                //let pgdbatchs = this.resp_Abatchs.filter((pgdbatch) => (pgdbatch.batch_code >= 2700 && pgdbatch.batch_code <= 3100))
                let certbatchs = this.resp_Abatchs.filter(this.Only_CertBatchs)

                this.resp_Abatchs = [...certbatchs]

                console.log('bcttc',this.resp_Abatchs)

                return
            }
            //SHIVAMPRAKASH0805
            if (this.pageType == 'A') {
                // this.batch_configuration(this.oSession.currentformfeesbatchcode!)




                if(this.oSession.currentformfeesboardlevel != 'JR'){
                    if (this.oSession.currentformfeesbatchlevel == '1' &&
                        this.oSession.formfeesrecieved == 'PAID'
                    ) {
                        let pgdbatchs = this.resp_Abatchs.filter(this.Only_Firstyear)
                        this.resp_Abatchs = [...pgdbatchs]
                        return
                    }
                }

            }
        });
    }

    Only_Firstyear(pgdbatch: Ires_registerbatch) {
        //let b = (Number(pgdbatch.batch_code) >= 2700 && Number(pgdbatch.batch_code <= 3100));
        return pgdbatch.batch_level == 1 &&
            pgdbatch.boardlevel == 'JR';
    }

    Only_Firstyearjunior(pgdbatch: Ires_registerbatch) {
        //let b = (Number(pgdbatch.batch_code) >= 2700 && Number(pgdbatch.batch_code <= 3100));
        let b = pgdbatch.batch_level == 1;
        return b;
    }

    Only_PGDBatchs(pgdbatch: Ires_registerbatch) {
        //let b = (Number(pgdbatch.batch_code) >= 2700 && Number(pgdbatch.batch_code <= 3100));
        let b = pgdbatch.stream == 'PGD';
        return b;
    }

    Only_CertBatchs(pgdbatch: Ires_registerbatch) {
        //let b = (Number(pgdbatch.batch_code) >= 2700 && Number(pgdbatch.batch_code <= 3100));
        let b = pgdbatch.stream == 'CERT';
        return b;
    }

    Non_PGDBatchs(pgdbatch: Ires_registerbatch): boolean {
        // let b = (Number(pgdbatch.batch_code) < 2700 || Number(pgdbatch.batch_code) > 3100);
        let b = pgdbatch.stream != 'PGD';
        return b;
    }

    CheckSubjectGroupQuota() {
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchcode: this.selected_batch.batch_code,
            // Subjectgroupuuid
            subjectgroupid: this.selected_subject.subject_group_id,
            subject_group_code: this.selected_subject.subject_group_code,
            quota_status: 'XXXX',
        };
        this.commonService
            .Post_json_data<AdmissionQuotasubjectGroups>(Students_url.CheckSubjectGroupQuota,jsonin)
            .subscribe((response) => {
                if (response.data == null) {
                    this.globalmessage.Show_error('No data found')
                    return
                }
                let QuotaStatus: AdmissionQuotasubjectGroups = {} as AdmissionQuotasubjectGroups;

                QuotaStatus = response.data


                if (QuotaStatus.quota_status == 'CLOSE') {

                    this.globalmessage.Show_message(
                        'Quota Closed! Select Different Group Code.'
                    );


                    //this.FeesAdmissionForm.controls['batch_name'].setValue('');
                   // this.FeesAdmissionForm.controls['batchSubjects'].setValue('');

                    this.aSubjects = []
                }
            });
    }

    Additionalformfeesrecieved() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
            BatchCode: this.selected_batch.batch_code,
            // batchuuid
            // Aadhaar: this.oSession.aadhaar,
        };
        this.commonService
            .Post_json_data<Fees_Receiptmaster>(Students_url.Additionalsubjectformfees_URL, jsonin)
            .subscribe((response) => {
                if (response == null) {
                    return
                }
                this.Fees_master = response.data
                if (this.Fees_master.receipt_id <= 0) {
                    if (this.selected_batch.batch_code > 0) {
                        this.SelectBatchSubjects(this.selected_batch.batch_code);
                    }
                } else {
                    if (this.Fees_master.receipt_id == undefined) {
                        this.globalmessage.Show_error('undefined')
                        return;
                    }
                    this.globalmessage.Show_error('Form fees Already Paid for this Batch!')
                    if (this.pageType == "R") {
                        this.router.navigate(['/dashboard'])
                    }
                    // this.onLevelSelect("",0);
                    //this.Resetcontrols(0);
                }
            });
    }

    Btn_Payment() {
        this.payloader = true
        this.modalSubmit = true;

        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: myGlobals.Golbal_CollegeCode,
            // aadhaar: this.oSession.aadhaar,
            batch_code: this.selected_batch.batch_code,
            subject_group_id: this.selected_subject.subject_group_id,
            subject_group_code: this.selected_subject.subject_group_code,
            subjectgroupuuid: this.selected_subject.subjectgroupuuid,
            term_code: myGlobals.Global_FORMFEESTERMNAME,
        };
         let input_json = jsonin
        this.commonService
            .Post_json_data<Ires_Reciept>(Students_url.IU_Admission, input_json)
            .subscribe((response) => {
                this.res_iuadmission = response.data
                if (this.res_iuadmission != null) {
                    this.payloader = false
                    // this.ReceiptID = this.res_Reciept.ReceiptID;
                    // this.ReceiptNo = this.res_Reciept.ReceiptNo;
                    if (this.res_iuadmission.receiptid > 0) {
                        this.RegistrationPayment();
                    }
                }
            });
    }

    RegistrationPayment() {

        //randomuuid
        let installmentuuid= uuidv4();

        let billdeskmsg = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchcode: this.selected_batch.batch_code,
            batchuuid: this.selected_batch.batchuuid,
            // aadhaar: this.oSession.aadhaar,
            termcode: myGlobals.Global_FORMFEESTERMNAME,
            merchantID: '',
            customerid: String(this.res_iuadmission.receiptno),
            filler1: 'NA',
            // TxnAmount: nTranscationamount,
            txnamount: String(this.selected_batch.formamount),
            //TxnAmount: "1",
            // txnamount: "1",
            bankid: 'NA',
            filler2: 'NA',
            filler3: 'NA',
            currencytype: 'INR',
            itemcode: 'NA',
            typefield1: 'R',
            securityid: '',
            filler4: 'NA',
            filler5: 'NA',
            typefield2: 'F',
            additionalinfo1: String(this.oSession.finyear),
            additionalinfo2: '',
            additionalinfo3: String(this.selected_batch.batch_code),
            // AdditionalInfo4: String(this.oSession.aadhaar),
            additionalinfo5: '9999',
            additionalinfo6: '1',
            additionalinfo7: String(this.res_iuadmission.receiptid),
            typefield3: 'NA',
            feestype: 'FORMFEES',
            installmentuuid: installmentuuid
        };

        console.log('uiii',billdeskmsg)
        let input_json = {
            Input: encryptUsingAES256(billdeskmsg),
        };
        this.commonService
            .Post_json_data<string>(Students_url.BillDeskcheckSum, billdeskmsg)
            .subscribe((response) => {
                this.billdeskRequestMsg = response.data;
                if (this.billdeskRequestMsg != null) {
                    BilldeskPay(this.billdeskRequestMsg, '', '');
                }
            });
    }

    //Get Details
    SelectBatchSubjects(nBatchcode: number) {
        let jsonin = {}
        if (this.selected_batch.runtime_incrementalbatch) {
            jsonin = {
                incremental_batchcode: this.selected_batch.batch_code,
                collegecode: this.oSession.collegecode,
                finyear: this.oSession.finyear,
                batchuuid: this.selected_batch.batchuuid,
                // aadhaar: this.oSession.aadhaar,
                subject_group_code: this.oSession.maxsubjectgroupcode
            };
            let jsonin_input = jsonin
            // Students_url.IncrementalBatchSubjects_v2

            this.commonService
                .Post_json_data<Subjects_group_h[]>(Students_url.IncrementalBatchSubjects_v2, jsonin_input)
                .subscribe((response) => {
                    this.aSubjects = response.data
                    this.DisplaySubjects();
                });
        } else {
            jsonin = {
                BatchCode: nBatchcode,
                batchuuid: this.selected_batch.batchuuid,
                // batchuuid
            };
            let jsonin_input = jsonin
            this.commonService
                .Post_json_data<Subjects_group_h[]>(Common_url.BatchSubjects, jsonin_input)
                .subscribe((response) => {
                    this.aSubjects = response.data;
                    this.DisplaySubjects();
                });
        }
    }

    StudentAppliedCourses() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: 1,
            // Aadhaar: this.oSession.aadhaar,
        };
        let jsonin_input = {
            Input: encryptUsingAES256(jsonin),
        };
        this.formfeesService
            .StudentAppliedCourses(jsonin_input)
            .subscribe((response) => {
                this.AppliedCourses = response.data;
            });
    }

    student_selectedsubjectthird() {
        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            // aadhaar: this.oSession.aadhaar,
            Batch_code: this.oSession.currentformfeesbatchcode,
        };
        let jsonin_input = {
            Input: encryptUsingAES256(jsonin),
        };
        this.commonService
            .Post_json_data<Ires_subjectlist[]>(Students_url.student_selectedsubjectthird, jsonin_input)
            .subscribe((response) => {
                let tdata = response.data
                this.table_one = tdata.filter((item) => item.semester === 5);
                this.table_two = tdata.filter((item) => item.semester === 6);
            })
    }

    SelectBatch_juniorSubjects() {
        let jsonin = {}
            jsonin = {
                incremental_batchcode: this.selected_batch.batch_code,
                collegecode: this.oSession.collegecode,
                finyear: this.oSession.finyear,
                // aadhaar: this.oSession.aadhaar,
                subject_group_code: this.oSession.maxsubjectgroupcode
            };
            // let jsonin_input = {
            //     Input: encryptUsingAES256(jsonin),
            // };
            this.commonService
                .Post_json_data<Subjects_group_h[]>(Students_url.IncrementalBatchSubjects_v2, jsonin)
                .subscribe((response) => {
                    const hasKey = 'data' in response;
                    if (hasKey) {
                        this.aSubjects = response.data;
                    } else {
                        this.aSubjects = response;
                    }

                    console.log('vkv',this.aSubjects)
                    // this.DisplaySubjects();
                });
        }


}

