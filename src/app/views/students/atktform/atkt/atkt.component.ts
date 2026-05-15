import {Component, effect, Input, OnInit, signal, ViewChild} from '@angular/core';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective,
    IColumn, LoadingButtonComponent,
    RowComponent,
    SmartTableComponent, SpinnerComponent
} from "@coreui/angular-pro";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgxPrintElementComponent, NgxPrintElementDirective} from "ngx-print-element";
import {
    AtktSubject,
    Fees_receiptatkt,
    Formamount, I_check_atkt,
    Iprefix_month, Ires_atkt_formamount_batch,
    Istudentdetails,
    IStudentpaymentIU
} from "../../../../models/response";
import {Router} from "@angular/router";
import {CommonService} from "../../../../globals/common.service";
import {Sessiondata} from "../../../../models/Sessiondata";
import {SessionService} from "../../../../globals/sessionstorage";
import {Ireq_batchsemester, Ireq_reciept, Ireq_showatkt} from "../atktform.requestmodel";
import {encryptUsingAES256} from "../../../../globals/encryptdata";
import {Atkt_url, Billdesk_url, Marksheet_url, Students_url} from "../../../../globals/global-api";
import {AgGridAngular} from "ag-grid-angular";
import {ColDef, GridOptions, RowSelectedEvent, SelectionChangedEvent} from "ag-grid-community";
import * as myGlobals from "../../../../globals/global-variable";
import {GlobalMessage} from "../../../../globals/global.message";
import {Iatkt_getprefix} from "../atktform.responsemodel";
import {BilldeskPay} from "../../../../../assets/javascript/billdesk";
import {mobileValidator} from "../../../../globals/aadhaar_validator";
import {Subject} from "rxjs";
import {Global_CurrentFinYear} from "../../../../globals/global-variable";

@Component({
    selector: 'app-atkt-subjects',
    imports: [
        ColComponent,
        FormsModule,
        RowComponent,
        AgGridAngular,
        ButtonDirective,
        FormDirective,
        FormSelectDirective,
        LoadingButtonComponent,
        ReactiveFormsModule,
        SpinnerComponent,
        FormLabelDirective,
        FormControlDirective
    ],
    templateUrl: './atkt.component.html',
    styleUrl: './atkt.component.scss'
})
export class AtktComponent implements OnInit {
    @Input() tab_event: number = 0
    @Input('clickSubject') clickSubject: Subject<any> | undefined;
    public Atktformstudent!: FormGroup
    private gridApi_inatkt_subjectdetails: any;
    public gridOptions_details: any;
    AselectedRows: AtktSubject[] = []
    selected_batchstudent = {} as Istudentdetails;
    selected_semester!: any;
    public finalloader = false;
    public btn_diabled = true;
    sumamount = 0;
    public gridOptions_details_subjects: any;
    private select_lastexam: number = 0;
    show_prefix_detail = {} as Iprefix_month;
    atkt_student_batch: Istudentdetails[] = [];
    json_semester_batchwise = [];
    IUstudentpaymentres = {} as IStudentpaymentIU;
    Aformamount_atkt_json: Ires_atkt_formamount_batch[] = [];
    atkt_subject_papers: AtktSubject[] = [];
    all_atkt_subject_papers: AtktSubject[] = [];
    oSession!: Sessiondata;
    public loading = new Array(0);
    check_atkt = {} as I_check_atkt
    public rowSelection_document_atkt: 'single' | 'multiple' = 'multiple';

    prefixcode : number = 10007
    prefixmonth: string = 'ATKT'

    constructor(
        private router: Router, private commonService: CommonService,
        private formBuilder: FormBuilder,
        private globalmessage: GlobalMessage,
        private sessionservice: SessionService,) {
        this.Atktformstudent = this.formBuilder.group({
            out_batch: ['', Validators.required],
            out_semester: ['', Validators.required],
            mobileno: ['', [mobileValidator, Validators.required]]
            // payment_type_outside: ['', Validators.required],
        });
        this.gridOptions_details = <GridOptions>{
            rowSelection: 'multiple',
            context: {
                componentParent: this,
            },
        };
        this.gridOptions_details_subjects = <GridOptions>{
            context: {
                componentParent: this,
            },
        };
    }

    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();
        // this.Get_apiformamount()
        // console.log('hfgfd', this.oSession)
        // this.Atkt_studentbatch('ATKT');
        this.clickSubject!.subscribe((e: number) => {
            // console.log('111')
            if (e == 0) {
                // console.log("prakash")
                this.check_atkt_close('ATKT')
                // this.Atkt_studentbatch('ATKT');
            }
        });
    }

    atktformamountbatchwise() {
        let jsonin = {
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            // Useraadhaar: this.oSession.aadhaar,
            Batchtype: this.selected_batchstudent.boardlevel
        }

        this.commonService.Post_json_normal<Ires_atkt_formamount_batch[]>(Marksheet_url.atkt_formamount_batch, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.Aformamount_atkt_json = response
        });
    }

    Get_apiformamount(formtype: string) {
        let jsonin = {
            // atktformtype: formtype,
            // boardlevel: this.oSession.currentboardlevel,
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

    check_atkt_close(Formtype: string) {
        let sWebportal = myGlobals.Domainname
        let jsonin = {
            'atktformtype': Formtype,
            'Weburl': sWebportal,
            'boardlevel': this.oSession.currentboardlevel,
            // 'aadhaar':this.oSession.aadhaar
        }
        // console.log("atkttab", jsonin)
        this.commonService.Post_json_normal<I_check_atkt>(Atkt_url.check_atkt_close, jsonin).subscribe((response) => {
                this.check_atkt = response
                if (this.check_atkt == null) {
                    this.globalmessage.Show_error('No data found')
                }
                if (this.check_atkt.tabstatus == "CLOSE") {
                    this.globalmessage.Show_error('Atkt is closed')
                    return
                }
                if (this.check_atkt.tabstatus == "OPEN" || this.check_atkt.exam_Status == '') {
                    if (this.check_atkt.exam_Status == 'CLOSE') {
                        this.globalmessage.Show_error('Atkt is closed')
                        this.router.navigate(['/dashboard'])
                    }
                    this.Atkt_studentbatch('ATKT')
                    this.Get_apiformamount(Formtype)
                }
                // this.check_atkt = response
                // console.log('attktk', this.check_atkt)
                // if (this.check_atkt.Atkt == 'CLOSE' && Formtype == "ATKT") {
                //     // this.activePane = 2
                //     this.globalmessage.Show_error('AtKt form submission is closed.')
                //     return
                // }
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

    defaultColDef: ColDef = {
        width: 200,
        editable: true,
    };

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

    onSelect_batch() {
        this.atkt_subject_papers = []
        this.AselectedRows = []
        this.sumamount = 0
        this.Atktformstudent.controls['mobileno'].setValue('')
        this.finalloader = false
        if(this.selected_batchstudent.boardlevel == 'SF' || this.selected_batchstudent.boardlevel == 'UG'){
            if(this.selected_batchstudent.batch_level == 3 && this.oSession.currentlevelfinyear == Global_CurrentFinYear){
                this.globalmessage.Show_error('Regular TY students are not permitted to appear for the ATKT examination.')
                this.router.navigate(['/dashboard'])
            }
        }
        this.batchwise_semester()
        // this.check_atkt_close('ATKT')
    }

    batchwise_semester() {
        let jsonin: Ireq_batchsemester = {
            College_code: myGlobals.Golbal_CollegeCode,
            Finyear: myGlobals.Global_CurrentFinYear,
            Batch_code: this.selected_batchstudent.batch_code,
            // batchuuid
            // useraadhaar: this.oSession.aadhaar!,
        };
        this.commonService.Post_json_normal<[]>(Marksheet_url.batchwise_semester, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.json_semester_batchwise = response;
        });
    }

    onSelect_semester() {
        this.finalloader = false
        this.atkt_subject_papers = []
        this.AselectedRows = []
        this.sumamount = 0
        this.Atktformstudent.controls['mobileno'].setValue('')
    }

    ShowAtkt() {
        let local_atkt_subject_papers: AtktSubject[] = [];
        this.AselectedRows = {} as AtktSubject[];
        let jsonin = {
            'College_code': myGlobals.Golbal_CollegeCode,
            'Finyear': myGlobals.Global_CurrentFinYear,
            'Boardlevel': this.selected_batchstudent.boardlevel,
            // 'Aadhaar': this.oSession.aadhaar!,
            'Batch_code': this.selected_batchstudent.batch_code,
            // batchuuid
            'Semester': this.selected_semester,
            'Examtype': 'ATKT',
        }
        this.finalloader = true
        this.commonService.Post_json_normal<AtktSubject[]>(Atkt_url.atktstudentspaper_semesterwise, jsonin).subscribe((response) => {
            if (response == null) {
                this.globalmessage.Show_error('No data found')
                this.finalloader = false
                return;
            }
            this.all_atkt_subject_papers = response
            local_atkt_subject_papers = response
            const papercodeMap = new Map();
            local_atkt_subject_papers.forEach(item => {
                if (!papercodeMap.has(item.papercode)) {
                    papercodeMap.set(item.papercode, item); // Store only the first occurrence
                }
            });
            let uniqueSubjects = Array.from(papercodeMap.values());
            this.atkt_subject_papers = uniqueSubjects
            // console.log('sub', this.atkt_subject_papers)
            // const groupedData = local_atkt_subject_papers.reduce((acc: { [key: string]: AtktSubject[] }, currentItem: AtktSubject) => {
            //     const key = currentItem.Papercode;
            //
            //     const value = currentItem.Subject_name;
            //
            //     console.log('kyy',key)
            //     console.log('vlll',value)
            //
            //
            //     if (!acc[key]) {
            //         acc[key] = [];
            //     }
            //     acc[key].push(currentItem);
            //     return acc;
            // }, {});
            //
            // console.log('data',groupedData)
            //this.atkt_subject_papers = local_atkt_subject_papers.filter(item => item.Papercode)
            //this.gridApi_inatkt_subjectdetails.setRowData(this.atkt_subject_papers)
            this.finalloader = false
        }, error => {
            // console.log('errorrrrrrrrrrrrrr');
            if (error) {
                this.finalloader = false
            }
        });
    }

    subject_details = [
        {
            headerName: '',
            checkboxSelection: true,
            width: 50
        },
        {
            headerName: 'Subject name', field: 'Subject_name', resizable: true,
            filter: true, minWidth: 550
        },
        {headerName: 'Paper Code', field: 'Papercode', resizable: true, filter: true,},
    ];
    public subject_details_subjects = [
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

    onRowSelected_subject($event: RowSelectedEvent<any>) {
        let aSelectedItem = this.gridApi_inatkt_subjectdetails.getSelectedRows();
        // console.log('ss', aSelectedItem);
        this.AselectedRows = [];
        for (const seleceditem of aSelectedItem) {
            const details = this.all_atkt_subject_papers.filter(item => item.papercode === seleceditem.Papercode);
            if (details.length > 0) {
                for (const detailitem of details) {
                    this.AselectedRows.push(detailitem);
                }
            }
        }
        // ✅ Now check after populating AselectedRows
        if (this.AselectedRows.length <= 0) {
            this.globalmessage.Show_message('Please select subject');
            this.btn_diabled = true;
            this.sumamount = 0
            return;
        }



        let matchfound = undefined;
        if (aSelectedItem.length >= 3) {
            matchfound = this.Aformamount_atkt_json.find(item => item.formcount === 3);
        } else {
            matchfound = this.Aformamount_atkt_json.find(item => item.formcount === aSelectedItem.length);
        }


        if (matchfound == undefined) {
            // console.log('slecmatchfound')
            this.globalmessage.Show_message('Please select subject');
            this.btn_diabled = true;  // 🔒 disable if selection is invalid
            this.sumamount = 0
            return;
        }
        if (this.check_atkt.exam_Status == 'PENALTY') {
            this.sumamount = matchfound.formamount + this.check_atkt.penaltyamount;
        } else {
            this.sumamount = matchfound.formamount;
        }
        this.btn_diabled = false;
        // console.log("All records for selected Papercode:", this.AselectedRows);
    }

    // onRowSelected_subject($event: RowSelectedEvent<any>) {
    //
    //   if (this.AselectedRows.length <= 0) {
    //     this.btn_diabled = true
    //     return;
    //   }
    //
    //   let aSelectedItem = this.gridApi_inatkt_subjectdetails.getSelectedRows();
    //
    //   console.log('ss',aSelectedItem)
    //
    //   this.AselectedRows = []
    //   for (const seleceditem of aSelectedItem) {
    //     const details = this.all_atkt_subject_papers.filter(item => item.Papercode === seleceditem.Papercode);
    //     if (details.length > 0) {
    //       for (const detailitem of details) {
    //         this.AselectedRows.push(detailitem)
    //       }
    //     }
    //   }
    //   let matchfound = undefined
    //
    //   if (aSelectedItem.length >= 3) {
    //     matchfound = this.Aformamount_atkt_json.find(item => (item.Formcount == 3))
    //   } else {
    //     matchfound = this.Aformamount_atkt_json.find(item => (item.Formcount == aSelectedItem.length))
    //   }
    //   if (matchfound == undefined) {
    //     this.globalmessage.Show_message('Please select subject')
    //
    //     return
    //   }
    //
    //
    //   this.sumamount = matchfound.Formamount + this.show_prefix_detail.Penaltyamount;
    //   this.btn_diabled = false;
    //   console.log("All records for selected Papercode:");
    //
    // }
    onGridReady_subject_selected(params: any) {
        this.gridApi_inatkt_subjectdetails = params.api;
    }

    onSelectionChanged_subject($event: SelectionChangedEvent<any>) {
    }

    onGridReady_subject_details_selected(params: any) {
    }

    Finalsubmit(idx: number) {
        if (this.AselectedRows.length <= 0) {
            this.globalmessage.Show_message('Please select subjects')
            return;
        }
        if (this.Atktformstudent.controls['mobileno'].value == null
            || this.Atktformstudent.controls['mobileno'].value == undefined
            || this.Atktformstudent.controls['mobileno'].value == "") {
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
            'Receiptamount': this.sumamount,
            'Penaltyamt': this.check_atkt.penaltyamount,
            'Batch_code': this.selected_batchstudent.batch_code,
            // batchuuid
            'Semester': this.selected_semester,
            'Dataentered': 'student',
            'Selectedsubject': this.AselectedRows,
            'Mobileno': this.Atktformstudent.controls['mobileno'].value
        }
        // console.log('dsfs',jsonin)
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(jsonin))
        formdata.append('file', '')
        this.commonService.Post_formdata(Atkt_url.IU_ATKTForm, formdata).subscribe((response) => {
            if (response == null) {
                this.loading[idx] = undefined;
                this.globalmessage.Show_message('No data found')
                return
            }
            this.IUstudentpaymentres = response['data']
            this.loading[idx] = undefined;
            if (this.IUstudentpaymentres.receipt_id > 0) {
                this.AtktPayment('ATKT');
            }
        });
    }

    AtktPayment(sformtype: string) {
        let nTranscationamount = '';
        let sWebportal = myGlobals.Domainname
        nTranscationamount = String(this.sumamount);
        let jsonin = {
            collegecode: myGlobals.Golbal_CollegeCode,
            finyear: this.oSession.finyear,
            // aadhaar: this.oSession.aadhaar,
            Fullname: this.IUstudentpaymentres.fullname,
            Prefix_month: this.prefixmonth,
            termcode: this.prefixcode,
            atktformtype: sformtype,
            Weburl: sWebportal,
            MerchantID: '',
            CustomerID: this.IUstudentpaymentres.transactionguid.toString(),
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
            Accountinfo: this.IUstudentpaymentres.billdeskaccountid,
            AdditionalInfo3: this.selected_semester.toString(),
            // AdditionalInfo4: String(this.oSession.aadhaar),
            AdditionalInfo5: this.prefixcode.toString(),
            AdditionalInfo6: '1',
            AdditionalInfo7: this.IUstudentpaymentres.receipt_id.toString(),
            TypeField3: 'NA',
            Feestype: 'ATKTFEES',
        };
        // console.log('attinpt', jsonin)
        // return
        this.commonService
            .Post_json_data(Billdesk_url.Billdeskchecksum_atkt, jsonin)
            .subscribe((response: any) => {
                // console.log('chefcksress', response)
                if (response.data != null) {
                    BilldeskPay(response.data, this.router.url, "ATKT")
                }
            });
    }
}
