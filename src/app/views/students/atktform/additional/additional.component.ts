import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    FormControlDirective,
    FormLabelDirective,
    FormSelectDirective,
    LoadingButtonComponent,
    RowComponent
} from "@coreui/angular-pro";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    AtktSubject_additional,
    CSemester_outside,
    Formamount,
    I_check_atkt,
    Iprefix_month, Ires_atkt_formamount_batch,
    Istudentdetails,
    IStudentpaymentIU,
} from "../../../../models/response";
import {Router} from "@angular/router";
import {CommonService} from "../../../../globals/common.service";
import {Sessiondata} from "../../../../models/Sessiondata";
import {SessionService} from "../../../../globals/sessionstorage";
import {Ireq_batchsemester, Ireq_showatkt} from "../atktform.requestmodel";
import {encryptUsingAES256} from "../../../../globals/encryptdata";
import {Atkt_url, Billdesk_url, Marksheet_url, Students_url} from "../../../../globals/global-api";
import {AgGridAngular} from "ag-grid-angular";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {mobileValidator} from "../../../../globals/aadhaar_validator";
import * as myGlobals from "../../../../globals/global-variable";
import {GlobalMessage} from "../../../../globals/global.message";
import {Iatkt_getprefix} from "../atktform.responsemodel";
import {ColDef, GridOptions, RowSelectedEvent, SelectionChangedEvent} from "ag-grid-community";
import {Req_IAtktsubects} from "../../../../models/request";
import {BilldeskPay} from "../../../../../assets/javascript/billdesk";
import {environment} from "../../../../../environments/environment";
import {Subject} from "rxjs";

@Component({
    selector: 'app-additional-subjects',
    imports: [
        ColComponent,
        FormsModule,
        RowComponent,
        AgGridAngular,
        AutocompleteLibModule,
        LoadingButtonComponent,
        ReactiveFormsModule,
        FormLabelDirective,
        FormControlDirective,
        ButtonDirective,
        FormSelectDirective
    ],
    templateUrl: './additional.component.html',
    styleUrl: './additional.component.scss'
})
export class AdditionalComponent implements OnInit {
    @Output() checkadditional = new EventEmitter<any>();
    @Input() tab_event: number = 0
    @Input('clickSubject') clickSubject: Subject<any> | undefined;
    public additional_ATKTForm: FormGroup;
    Batchkeyword = 'Batch_name';
    sumamountadditional = 0;
    selected_semester_additional!: any;
    public btn_diabled_additional = true;
    public loadingadditional = new Array(0);
    json_semester_batchwise_student = [];
    atkt_student_batch: Istudentdetails[] = [];
    show_prefix_detail = {} as Iprefix_month;
    IUadditionaldata = {} as IStudentpaymentIU;
    selected_batchcode = {} as Istudentdetails;
    additionalAtkt_subject_papers: AtktSubject_additional[] = [];
    aSemester_outside: CSemester_outside[] = [];
    private gridApi_inatkt_subjectdetails_additional: any;
    oSession!: Sessiondata;
    public gridOptions_details_additional: any;
    public gridOptions_details_additionalsubjects_selected: any;
    private select_lastexam: number = 0;
    single_rowSelection_additional: 'single' | 'multiple' = 'multiple';
    AselectedRows_outside: Req_IAtktsubects[] = [];
    Aformamount_atkt_json: Ires_atkt_formamount_batch[] = [];
    check_atkt = {} as I_check_atkt

    prefixcode : number = 10008
    prefixmonth: string = 'ADDITIONAL'

    defaultColDef: ColDef = {
        flex: 1,
        minWidth: 120,
        filter: true,
        floatingFilter: true,
        sortable: true,
        resizable: true,
    };

    constructor(
        private router: Router, private commonService: CommonService,
        private formBuilder: FormBuilder, private globalmessage: GlobalMessage,
        private sessionservice: SessionService,) {
        // this.loadUsers()
        this.gridOptions_details_additional = <GridOptions>{
            context: {
                componentParent: this,
            },
        };
        this.gridOptions_details_additionalsubjects_selected = <GridOptions>{
            context: {
                componentParent: this,
            }
        }
        this.additional_ATKTForm = this.formBuilder.group({
            in_semester: ['', Validators.required],
            in_aadhaar: ['', Validators.required],
            out_batch: ['', Validators.required],
            mobilenoadditional: ['', [mobileValidator, Validators.required]],
            payment_type_additional: ['', Validators.required],
        });
        this.additional_ATKTForm.controls['out_batch'].valueChanges.subscribe((value) => {
            this.selected_batchcode = value;
        })
    }

    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();
        // this.Atkt_studentbatch()
        // this.get_atktprefix()

        this.clickSubject!.subscribe((e: number) => {
            if (e == 1) {

                this.check_atkt_close('ADDITIONAL')
                //  this.Atkt_studentbatch('ADDITIONAL');
            }
        });

    }

    ngOnDestroy() {
        this.clickSubject!.unsubscribe();
    }


    check_atkt_close(Formtype: string) {
        let sWebportal = myGlobals.Domainname
        let jsonin = {
            'atktformtype': 'ADDITIONAL',
            'Weburl': sWebportal,
            'boardlevel': this.oSession.currentboardlevel,
            // 'aadhaar':this.oSession.aadhaar
        }

        this.commonService.Post_json_normal<I_check_atkt>(Atkt_url.check_atkt_close, jsonin).subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('No data found')
                }
                this.check_atkt = response
                if (this.check_atkt == null) {
                    this.globalmessage.Show_error('No data found')
                }
                if (this.check_atkt.tabstatus == "CLOSE") {
                    this.globalmessage.Show_error('Atkt is closed')
                    return
                }
                if (this.check_atkt.tabstatus == "OPEN") {
                    if (this.check_atkt.exam_Status == 'CLOSE' || this.check_atkt.exam_Status == '') {
                        this.globalmessage.Show_error('Atkt is closed')

                        this.router.navigate(['/dashboard'])
                    }
                    this.Atkt_studentbatch('ADDITIONAL');
                    this.Get_apiformamount('ADDITIONAL')
                }
            },
        );
    }

    Get_apiformamount(formtype: string) {
        // let jsonin = {
        //     atktformtype: formtype,
        //     boardlevel: this.oSession.currentboardlevel
        // }

        let jsonin = {
            Collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            // useraadhaar: this.oSession.aadhaar,
            examtype: formtype,
            boardlevel:this.oSession.currentboardlevel,
            // Studentaadhaar:this.oSession.aadhaar,
        }

        this.commonService.Post_json_normal<Ires_atkt_formamount_batch[]>(Atkt_url.atkt_formamount_batch, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.Aformamount_atkt_json = response
        });
    }

    Atkt_studentbatch(Formtype: string) {
        let sWebportal = myGlobals.Domainname
        let jsonin = {
            // 'Aadhaar': this.oSession.aadhaar!,
            'Atktformtype': Formtype,
            'Weburl': sWebportal
        }
        this.commonService.Post_json_normal<Istudentdetails[]>(Students_url.Atkt_studentbatch, jsonin).subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('No data found')
                }
                this.atkt_student_batch = response
                // this.gridApi_inatkt_subjectdetails.setRowData(this.atkt_subject_papers)
            },
        );
    }

    get_atktprefix(Examtype: string) {
        let sWebportal = myGlobals.Domainname
        let jsonin: Iatkt_getprefix = {
            'Examtype': Examtype,
            'Weburl': sWebportal
        }
        this.commonService.Post_json_normal<Iprefix_month>(Atkt_url.get_atktprefix, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.show_prefix_detail = response
        });
    }

    outatakt_selectBatch() {
        //this.selected_batchcode = event
        // this.GetUserExamApi();
        //this.check_atkt_close('ADDITIONAL')
        this.batchwise_semester_student()
    }

    batchwise_semester_student() {
        let jsonin: Ireq_batchsemester = {
            College_code: myGlobals.Golbal_CollegeCode,
            Finyear: myGlobals.Global_CurrentFinYear,
            Batch_code: this.selected_batchcode.batch_code,
            // useraadhaar: this.oSession.aadhaar!,
        };
        this.commonService.Post_json_normal<[]>(Marksheet_url.batchwise_semester, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.json_semester_batchwise_student = response;
        });
    }

    onSelect_semester_additional() {
        this.additionalAtkt_subject_papers = []
        this.aSemester_outside = [];
    }

    onGridReady_subject_selected_additional(params: any) {
        this.gridApi_inatkt_subjectdetails_additional = params.api;
    }

    onGridReady_additional_subject_details_selected(params: any) {
    }

    public additionalSubject_GridData = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: 'Subject order', field: 'Subject_order', resizable: true, filter: true,},
        {headerName: 'Subject name', field: 'Subject_name', resizable: true, filter: true, minWidth: 550},
        {headerName: 'Paper Code', field: 'Papercode', resizable: true, filter: true,},
    ];
    public subject_details_additionalsubjects_selected = [
        //{headerName: 'Batchname', field: 'Batch_name', resizable: true, filter: true,},
        // {headerName: 'Subject order', field: 'Subject_order',
        // resizable: true, filter: true,},
        //{headerName: 'Semester', field: 'Semester', resizable: true, filter: true,},
        {
            headerName: 'Subject name', field: 'Subject_name', resizable: true,
            filter: true, minWidth: 550
        },
        {headerName: 'Paper Code', field: 'Papercode', resizable: true, filter: true,},
        {headerName: 'Examtype', field: 'Examttype', resizable: true, filter: true,},
    ];

    ShowAtkt_additional() {
        this.additionalAtkt_subject_papers = {} as AtktSubject_additional[];
        let jsonin: Ireq_showatkt = {
            'College_code': myGlobals.Golbal_CollegeCode,
            'Finyear': myGlobals.Global_CurrentFinYear,
            'Boardlevel': this.selected_batchcode.boardlevel,
            // 'Aadhaar': this.oSession.aadhaar!,
            'Batch_code': this.selected_batchcode.batch_code,
            'Semester': this.selected_semester_additional,
            'Examtype': 'ADDITIONAL'
            // Batchexam_id: this.selected_userexam.Batchexam_id,
        }

        let isValidAdditionalExam =
            (jsonin.Semester === 5 && jsonin.Boardlevel === 'UG') ||
            (jsonin.Semester === 3 && jsonin.Boardlevel === 'PG');

        if (isValidAdditionalExam) {
            this.commonService.Post_json_normal<AtktSubject_additional[]>(Atkt_url.atktstudentspaper_semesterwise, jsonin).subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('No data found')
                    return
                }
                this.additionalAtkt_subject_papers = response
                //this.gridApi_inatkt_subjectdetails_additional.setRowData(this.additionalAtkt_subject_papers)
            });
        } else {
            this.additionalAtkt_subject_papers = {} as AtktSubject_additional[];
            //this.gridApi_inatkt_subjectdetails_additional.api.hideOverlay()
            //this.gridApi_inatkt_subjectdetails_additional.setRowData(this.additionalAtkt_subject_papers)
            if(jsonin.Semester === 5 && jsonin.Boardlevel === 'UG') {
                this.globalmessage.Show_message("Additional exam is applicable for Semester 5 students only.")
            }else {
                this.globalmessage.Show_message("Additional exam is applicable for Semester 3 students only.")
            }
            return
        }
    }

    onSelectionChanged_subject($event: SelectionChangedEvent<any>) {
    }

    onRowSelected_subject_additional($event: RowSelectedEvent<any>) {
        this.sumamountadditional = 0;
        this.AselectedRows_outside = this.gridApi_inatkt_subjectdetails_additional.getSelectedRows();
        if (this.AselectedRows_outside.length <= 0) {
            this.btn_diabled_additional = true
            return;
        }


        let matchfound = undefined
        if (this.AselectedRows_outside.length >= 3) {
            matchfound = this.Aformamount_atkt_json.find(item => (item.formcount == 3))
        } else {
            matchfound = this.Aformamount_atkt_json.find(item => (item.formcount == this.AselectedRows_outside.length))
        }




        if (matchfound == undefined) {
            this.globalmessage.Show_message('Please select subject')
            return
        }
        // this.sumamountadditional = matchfound.Formamount + this.show_prefix_detail.Penaltyamount;
        if (this.check_atkt.exam_Status == 'PENALTY') {
            this.sumamountadditional = matchfound.formamount + this.check_atkt.penaltyamount;
        } else {
            this.sumamountadditional = matchfound.formamount;
        }
        this.btn_diabled_additional = false;


    }

    Finalsubmit_additional(idx: number) {
        if (this.AselectedRows_outside.length <= 0) {
            this.globalmessage.Show_message('Select Subject ')
            return;
        }
        if (this.additional_ATKTForm.controls['mobilenoadditional'].value == null
            || this.additional_ATKTForm.controls['mobilenoadditional'].value == undefined
            || this.additional_ATKTForm.controls['mobilenoadditional'].value == "") {
            this.globalmessage.Show_error('Please enter whatsapp no.')
            return
        }
        let jsonin = {
            'College_code': myGlobals.Golbal_CollegeCode,
            'Finyear': myGlobals.Global_CurrentFinYear,
            // 'Aadhaar': this.oSession.aadhaar!,
            'Prefix_code': this.prefixcode,
            'Prefix_month': this.prefixmonth,
            'Firstname': "",
            'Lastname': "",
            'Fathername': "",
            'Mothername': "",
            'Selected_finyear': this.select_lastexam,
            // 'Useraadhaar': this.oSession.aadhaar!,
            'Prnno': "",
            'Gender': "",
            'Formtype': "INHOUSE",
            'Receiptamount': this.sumamountadditional,
            'Penaltyamt': this.check_atkt.penaltyamount,
            'Batch_code': this.selected_batchcode.batch_code,
            'Semester': this.selected_semester_additional,
            'Dataentered': 'student',
            'Selectedsubject': this.AselectedRows_outside,
            'Mobileno': this.additional_ATKTForm.controls['mobilenoadditional'].value,
        }
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(jsonin))
        formdata.append('file', '')
        this.commonService.Post_formdata(Atkt_url.IU_ATKTForm, formdata).subscribe((response) => {
            if (response == null) {
                this.loadingadditional[idx] = undefined;
                this.globalmessage.Show_message('No data found')
                return
            }
            this.IUadditionaldata = response['data']
            this.loadingadditional[idx] = undefined;
            if (this.IUadditionaldata.receipt_id > 0) {
                this.AtktPayment_additional('ADDITIONAL');
            }
        });
    }

    AtktPayment_additional(sformtype: string) {
        let nTranscationamount = '';
        let sWebportal = myGlobals.Domainname
        if (environment.demoMode) {
            nTranscationamount = '1'
        } else {
            nTranscationamount = String(this.sumamountadditional);
        }

        let jsonin = {
            collegecode: myGlobals.Golbal_CollegeCode,
            finyear: this.oSession.finyear,
            // aadhaar: this.oSession.aadhaar,
            Fullname: this.IUadditionaldata.fullname,
            Prefix_month: this.prefixmonth,
            termcode: this.prefixcode,
            atktformtype: sformtype,
            Weburl: sWebportal,
            MerchantID: '',
            CustomerID: this.IUadditionaldata.transactionguid.toString(),
            Filler1: 'NA',
            TxnAmount: nTranscationamount,
            BankID: 'NA',
            Filler2: 'NA',
            Filler3: 'NA',
            CurrencyType: 'INR',
            ItemCode: 'NA',
            TypeField1: 'R',
            SecurityID: '',
            Filler4: 'NA',
            Filler5: 'NA',
            TypeField2: 'F',
            AdditionalInfo1: String(this.oSession.finyear),
            Accountinfo: this.IUadditionaldata.billdeskaccountid,
            AdditionalInfo3: this.selected_semester_additional.toString(),
            // AdditionalInfo4: String(this.oSession.aadhaar),
            AdditionalInfo5: this.prefixcode.toString(),
            AdditionalInfo6: '1',
            AdditionalInfo7: this.IUadditionaldata.receipt_id.toString(),
            TypeField3: 'NA',
            Feestype: 'ATKTFEES',
        };
        this.commonService
            .Post_json_data(Billdesk_url.Billdeskchecksum_atkt, jsonin)
            .subscribe((response: any) => {
                if (response.data != null) {
                    BilldeskPay(response.data, this.router.url, 'ATKT')
                }
            });
        /* this.updateprofileservice
           .Billdesk_url.Billdeskchecksum_atkt(jsonin)
           .subscribe((response: any) => {
             if (response.data != null) {
               BilldeskPay(response.data, this.router.url, "ATKT")
             }
           });*/
    }
}
