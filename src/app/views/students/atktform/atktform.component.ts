//https://www.positronx.io/angular-show-image-preview-with-reactive-forms-tutorial/
import {Component, effect, OnInit, Renderer2, signal, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalMessage} from '../../../globals/global.message';
import {ImageTransform} from 'ngx-image-cropper';
import * as myGlobals from '../../../globals/global-variable';
import {billdeskjs} from '../../../globals/global-variable';
import {CommonService} from "../../../globals/common.service";
import {Atkt_url, Billdesk_url, Marksheet_url, Students_url} from "../../../globals/global-api";
import {
    AtktSubject,
    AtktSubject_additional,
    CSemester_outside,
    Fees_receiptatkt,
    Formamount,
    I_check_atkt,
    IAtktsubjectdetails,
    Iprefix_month,
    Istudentdetails,
    IStudentpaymentIU
} from "../../../models/response";
import {
    ClientSideRowModelModule,
    ColDef,
    GridOptions,
    ModuleRegistry,
    RowSelectedEvent,
    RowSelectionModule,
    SelectionChangedEvent
} from "ag-grid-community";
import {BilldeskPay} from "../../../../assets/javascript/billdesk";
import {Req_IAtktsubects} from "../../../models/request";
import {Sessiondata} from "../../../models/Sessiondata";
import {Iatkt_getprefix} from "./atktform.responsemodel";
import {Ireq_batchsemester, Ireq_reciept, Ireq_showatkt} from "./atktform.requestmodel";
import {SessionService} from "../../../globals/sessionstorage";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {
    ColComponent,
    IColumn,
    TabDirective,
    TabPanelComponent,
    TabsComponent,
    TabsContentComponent,
    TabsListComponent
} from "@coreui/angular-pro";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {mobileValidator} from "../../../globals/aadhaar_validator";
import {RecieptComponent} from "./reciept/reciept.component";
import {AdditionalComponent} from "./additional/additional.component";
import {AtktComponent} from "./atkt/atkt.component";
import {Subject} from "rxjs";

Sessiondata
type MyArrayType = Array<{ id: number, name: string }>;
ModuleRegistry.registerModules([ClientSideRowModelModule, RowSelectionModule]);

@Component({
    selector: 'app-updateprofile',
    templateUrl: './atktform.component.html',
    styleUrls: ['./atktform.component.scss'],
    imports: [
        ReactiveFormsModule,
        ColComponent,
        AutocompleteLibModule,
        RecieptComponent,
        AdditionalComponent,
        AtktComponent,
        TabsComponent,
        TabsListComponent,
        TabDirective,
        TabsContentComponent,
        TabPanelComponent,

    ],
    standalone: true
})
export class AtktformComponent implements OnInit {
    @ViewChild('tableRef') tableElement: any;
    clickSubject: Subject<any> = new Subject();
    transform: ImageTransform = {};
    public loading = new Array(0);
    public loadingadditional = new Array(0);
    public selected_tab: string = '';
    public btn_diabled = true;
    public btn_diabled_additional = true;
    Demoversion: boolean = false;
    //Atkt
    public Atktformstudent: FormGroup;
    public additional_ATKTForm: FormGroup;
    atkt_student_batch: Istudentdetails[] = [];
    selected_batchstudent = {} as Istudentdetails;
    json_semester_batchwise = [];
    json_semester_batchwise_student = [];
    atkt_subject_papers: AtktSubject[] = [];
    all_atkt_subject_papers: AtktSubject[] = [];
    private gridApi_inatkt_subjectdetails: any;
    feeatkthead!: any;
    Penalty_feeshead: string = "";
    // lprint_penalty = true ;
    selected_semester!: any;
    selected_payment_type_outside: any;
    public finalloader = false;
    selected_semester_additional!: any;
    public outatktdetails_gridOptions: any;
    public gridOptions_details: any;
    public gridOptions_details_subjects: any;
    public gridOptions_details_additional: any;
    public gridOptions_details_additionalsubjects_selected: any;
    sumamount = 0;
    activePane = 2;
    activeTab = 'Reciept';
    sumamountadditional = 0;
    selected_batchcode = {} as Istudentdetails;
    additionalAtkt_subject_papers: AtktSubject_additional[] = [];
    private gridApi_inatkt_subjectdetails_additional: any;
    iReq_Reciept: Fees_receiptatkt[] = [];
    FeeReceipt = false;
    private select_lastexam: number = 0;
    show_prefix_detail = {} as Iprefix_month;
    Aformamount_atkt_json: Formamount[] = [];
    outatkt_recieptdetail: IAtktsubjectdetails[] = [];
    aSemester_outside: CSemester_outside[] = [];
    AselectedRows: AtktSubject[] = []
    AselectedRows_outside: Req_IAtktsubects[] = [];
    IUstudentpaymentres = {} as IStudentpaymentIU;
    // IUadditionaldata! : any;
    IUadditionaldata = {} as IStudentpaymentIU;
    private gridApi_inatkt_Reciept: any;
    private gridColumnApi_inatkt_Reciept: any;
    out_rowselected: any;
    check_atkt = {} as I_check_atkt
    oSession!: Sessiondata;
    config = {
        allowNumbersOnly: true,
        length: 10,
        isPasswordInput: false,
        disableAutoFocus: false,
        placeholder: '',
        inputStyles: {
            width: '30px',
            height: '30px',
        },
        containerStyles: {
            'display': 'flex',
            'padding': '0px 0px 0px 0px',
        },
        inputClass: 'each_input',
        containerClass: 'all_inputs'
    };
    itemsPerPage = 10;
    readonly signal_users = signal<Fees_receiptatkt[]>([]);
    readonly signal_selectedId = signal<number | undefined>(0);
    nSelectedReceipt: number = 0;
    nSelected_singlerecieptdata = {} as Fees_receiptatkt
    tabone: boolean = false
    tabtwo: boolean = false
    tabthree: boolean = false

    constructor(
        private router: Router, private commonService: CommonService,
        private formBuilder: FormBuilder, private route: ActivatedRoute,
        private globalmessage: GlobalMessage, private sessionservice: SessionService,
        private renderer: Renderer2,
    ) {
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
        this.gridOptions_details_additionalsubjects_selected = <GridOptions>{
            context: {
                componentParent: this,
            }
        }
        this.outatktdetails_gridOptions = <GridOptions>{
            context: {
                componentParent: this,
            },
        };
        this.gridOptions_details_additional = <GridOptions>{
            context: {
                componentParent: this,
            },
        };
        this.Atktformstudent = this.formBuilder.group({
            out_batch: ['', Validators.required],
            out_semester: ['', Validators.required],
            mobileno: ['', [mobileValidator, Validators.required]]
            // payment_type_outside: ['', Validators.required],
        });
        this.additional_ATKTForm = this.formBuilder.group({
            in_semester: ['', Validators.required],
            in_aadhaar: ['', Validators.required],
            mobilenoadditional: ['', [mobileValidator, Validators.required]],
            payment_type_additional: ['', Validators.required],
        });
        this.loadUsers()
        effect(() => {
            this.signal_users.set(this.getReceipts(this.signal_selectedId()));
        });
    }

    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();

        // if(ValidateFormfeesnotpaidProfilenotsubmitted(this.oSession.isprofilesubmited!,this.oSession.formfeesrecieved!)){
        //   //  this.router.navigate(['dashboard']);
        // }

        this.route.queryParamMap.subscribe(params => {
            const nReceiptid = parseInt(params.get("receiptid")?.toString()!);
            const nAadhaar = parseInt(params.get("student")?.toString()!);
            const sBilldeskstatus = params.get("billdeskstatus");
            if (sBilldeskstatus == "SUCCESS") {
                this.globalmessage.Show_message('Data uploaded successfully')
                // this.get_atktfeesreceipt_details(nReceiptid,nAadhaar);
                return;
            }
            if (sBilldeskstatus == "BILLDESKERROR") {
                this.globalmessage.Show_error('Transaction failed please wait for 24hrs')
                return;
            }
            if (sBilldeskstatus == "CANCELLED") {
                this.globalmessage.Show_error('Transaction failed. Please try again later')
                return;
            }
            if (sBilldeskstatus == "SERVERERROR") {
                this.globalmessage.Show_error('Server error. Please contact college')
                return;
            }
        });
        this.loadbilldesk();
        //this.Get_apiformamount();
        this.studentappliedatkt_detail();
        this.ShowReciept(this.oSession.finyear, this.oSession.collegecode, this.oSession.aadhaar)
        // this.disabledTabtwo(date);
    }

    disabledTabtwo(date: any): void {
        // console.log('Picked date: ', date);
    }

    loadUsers() {
        //  this.ShowReciept(this.oSession.finyear, this.oSession.collegecode, this.oSession.aadhaar);
    }

    RenderExternalScript(src: string): HTMLScriptElement {
        // console.log('dsfsdfsd')
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        script.defer = true;
        this.renderer.appendChild(document.body, script);
        return script;
    }

    loadbilldesk() {
        this.RenderExternalScript(billdeskjs).onload = () => {
        };
    }

    columns: (IColumn | string)[] = []

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

    studentappliedatkt_detail() {
        let jsonin = {
            College_code: this.oSession.collegecode,
            Finyear: myGlobals.Global_CurrentFinYear,
            // Aadhaar: this.oSession.aadhaar,
        };
        this.commonService.Post_json_normal<IAtktsubjectdetails[]>(Students_url.Atkt_studentreceipt, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                this.outatkt_recieptdetail = response
            }
        );
    }

    Get_apiformamount() {
        this.commonService.Post_json_normal<Formamount[]>(Marksheet_url.atkt_formamount, "").subscribe((response) => {
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

    check_atkt_close(Formtype: string) {
        let sWebportal = myGlobals.Domainname
        let jsonin = {
            'atktformtype': Formtype,
            'Weburl': sWebportal
        }

        this.commonService.Post_json_normal<I_check_atkt>(Atkt_url.check_atkt_close, jsonin).subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('No data found')
                }
                this.check_atkt = response
                if (response.tabstatus == "CLOSE") {
                    this.globalmessage.Show_error('Atkt is closed')
                    return
                }
                if (response.tabstatus == "OPEN") {
                    if (response.exam_Status == 'Close') {
                        this.globalmessage.Show_error('Atkt is closed')
                    }
                    if (response.exam_Status == 'PENALTY') {
                        this.globalmessage.Show_error('Penalty')
                    }
                }
                if (Formtype == "ATKT") {
                    this.Atkt_studentbatch('ATKT');
                    this.get_atktprefix('ATKT');
                }
                if (Formtype == "ADDITIONAL") {
                    this.Atkt_studentbatch('ADDITIONAL');
                    this.get_atktprefix('ADDITIONAL');
                }
            },
        );
    }

    onSelect_batch() {
        this.atkt_subject_papers = []
        this.AselectedRows = []
        this.sumamount = 0
        this.finalloader = false
        this.batchwise_semester();
    }

    batchwise_semester() {
        let jsonin: Ireq_batchsemester = {
            College_code: myGlobals.Golbal_CollegeCode,
            Finyear: myGlobals.Global_CurrentFinYear,
            Batch_code: this.selected_batchstudent.batch_code,
            // useraadhaar: this.oSession.aadhaar!,
        };

        this.commonService.Post_json_normal<[]>(Marksheet_url.batchwise_semester, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.json_semester_batchwise = response;
        });
    }

    subject_details = [
        {
            headerName: '',
            checkboxSelection: true,
            width: 50
        },
        // {
        //   field: '', maxWidth: 50, checkboxSelection: true
        // },
        // {headerName: 'Batchname', field: 'Batch_name', resizable: true, filter: true,},
        // {headerName: 'Subject order', field: 'Subject_order',
        // resizable: true, filter: true,},
        // {headerName: 'Semester', field: 'Semester', resizable: true, filter: true,},
        {
            headerName: 'Subject name', field: 'Subject_name', resizable: true,
            filter: true, minWidth: 550
        },
        {headerName: 'Paper Code', field: 'Papercode', resizable: true, filter: true,},
    ];
    defaultColDef: ColDef = {
        width: 200,
        editable: true,
    };
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
    //ShivAm
    // Image Cropper
    single_rowSelection_details: 'single' | 'multiple' = 'multiple';

    ShowAtkt() {
        let local_atkt_subject_papers: AtktSubject[] = [];
        this.AselectedRows = {} as AtktSubject[];
        let jsonin: Ireq_showatkt = {
            'College_code': myGlobals.Golbal_CollegeCode,
            'Finyear': myGlobals.Global_CurrentFinYear,
            'Boardlevel': this.selected_batchstudent.boardlevel,
            // 'Aadhaar': this.oSession.aadhaar!,
            'Batch_code': this.selected_batchstudent.batch_code,
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
            //     const key = currentItem.papercode;
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
            //this.atkt_subject_papers = local_atkt_subject_papers.filter(item => item.papercode)
            //this.gridApi_inatkt_subjectdetails.setRowData(this.atkt_subject_papers)
            this.finalloader = false
        }, error => {
            if (error) {
                this.finalloader = false
            }
        });
    }

    onGridReady_subject_selected(params: any) {
        this.gridApi_inatkt_subjectdetails = params.api;
    }

    onGridReady_subject_details_selected(params: any) {
    }

    onGridReady_additional_subject_details_selected(params: any) {
    }

    onRowSelected_subject($event: RowSelectedEvent<any>) {
        if (this.AselectedRows.length <= 0) {
            this.btn_diabled = true
            return;
        }
        let aSelectedItem = this.gridApi_inatkt_subjectdetails.getSelectedRows();
        // console.log('ss', aSelectedItem)
        this.AselectedRows = []
        for (const seleceditem of aSelectedItem) {
            const details = this.all_atkt_subject_papers.filter(item => item.papercode === seleceditem.papercode);
            if (details.length > 0) {
                for (const detailitem of details) {
                    this.AselectedRows.push(detailitem)
                }
            }
        }
        let matchfound = undefined
        if (aSelectedItem.length >= 3) {
            matchfound = this.Aformamount_atkt_json.find(item => (item.formcount == 3))
        } else {
            matchfound = this.Aformamount_atkt_json.find(item => (item.formcount == aSelectedItem.length))
        }
        if (matchfound == undefined) {
            this.globalmessage.Show_message('Please select subject')
            return
        }
        this.sumamount = matchfound.formamount + this.show_prefix_detail.penaltyamount;
        this.btn_diabled = false;
        // console.log("All records for selected Papercode:");
        // this.sumamount = 0;
        //
        // let arraydata = []
        // let selectedItem = this.gridApi_inatkt_subjectdetails.getSelectedRows();
        //
        //
        // arraydata.push(selectedItem)
        //
        // this.getAllWithSamePapercode(selectedItem, arraydata)
        //
        // let selected_item = arraydata.find(d => d.papercode === selectedItem.papercode); // or any logic
        // if (selectedItem) {
        //     const relatedSubjects = this.getAllWithSamePapercode(selected_item, arraydata);
        //     console.log(relatedSubjects);
        // }
        //
        //
        // let data = arraydata.filter(item => item.papercode === selectedItem.papercode);
        //
        // console.log('Aaraydata', data.find(item => item.papercode === item.papercode))
    }

    // getAllWithSamePapercode(selectedItem: any, allData: any) {
    //     return allData.filter((item: { Papercode: any; }) => item.papercode === selectedItem.papercode);
    // }

// Example: Selecting any subject
    // onRowSelected_subject($event: RowSelectedEvent<any>) {
    //     this.sumamount = 0;
    //     this.AselectedRows = this.gridApi_inatkt_subjectdetails.getSelectedRows();
    //
    //     if (this.AselectedRows.length <= 0) {
    //         this.btn_diabled = true
    //         return;
    //     }
    //
    //     /*
    //     this.aSemester = [];
    //       for (let oSemesterKey of this.AselectedRows) {
    //         let aElement = this.aSemester.find(i => i.Semester === oSemesterKey.Semester);
    //         if (aElement == undefined) {
    //           let oSemester = new CSemester();
    //           oSemester.Semester = oSemesterKey.Semester;
    //           oSemester.Totalcount = 1
    //           oSemester.Semesteramount = this.Aformamount_atkt_json[0].Formamount
    //           this.aSemester.push(oSemester);
    //           continue;
    //         } else {
    //           let mycount = aElement.Totalcount + 1;
    //           aElement.Totalcount = mycount;
    //           if (aElement.Totalcount == 2) {
    //             aElement.Semesteramount = this.Aformamount_atkt_json[1].Formamount;
    //           }
    //           if (aElement.Totalcount > 2) {
    //             aElement.Semesteramount = this.Aformamount_atkt_json[2].Formamount;
    //           }
    //         }
    //       }
    //       for (let oSemesterKey of this.aSemester) {
    //         this.sumamount = this.sumamount + oSemesterKey.Semesteramount;
    //       }
    //       this.sumamount = this.sumamount + this.show_prefix_detail.penaltyamount;
    //       */
    //
    //     let matchfound = undefined
    //     if (this.AselectedRows.length >= 3) {
    //         matchfound = this.Aformamount_atkt_json.find(item => (item.formcount == 3))
    //     } else {
    //         matchfound = this.Aformamount_atkt_json.find(item => (item.formcount == this.AselectedRows.length))
    //     }
    //     if (matchfound == undefined) {
    //         this.globalmessage.Show_message('Please select subject')
    //         return
    //     }
    //     this.sumamount = matchfound.Formamount + this.show_prefix_detail.penaltyamount;
    //     this.btn_diabled = false;
    //
    // }
    onSelectionChanged_subject($event: SelectionChangedEvent<any>) {
    }

    outatakt_selectBatch(event: any) {
        this.selected_batchcode = event
        // this.GetUserExamApi();
        this.batchwise_semester_student();
    }

    batchwise_semester_student() {
        let jsonin: Ireq_batchsemester = {
            College_code: myGlobals.Golbal_CollegeCode,
            Finyear: myGlobals.Global_CurrentFinYear,
            Batch_code: this.selected_batchcode.batch_code,
            // batchuuid
            // useraadhaar: this.oSession.aadhaar!,
        };

        this.commonService.Post_json_normal<[]>(Marksheet_url.batchwise_semester, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.json_semester_batchwise_student = response;
        });
    }

    //ShivAm Cropper
    protected readonly event = event;

    outsidechange($event: string | number | undefined) {
        this.selected_tab = ''
        // this.activePane = $event;
        if ($event == "ATKTExam") {
            this.selected_tab = 'ATKT';
            this.clickSubject.next(0);
        }
        if ($event == "AdditionalExam") {
            this.selected_tab = 'ADDITIONAL'
            this.clickSubject.next(1);
        }
        if ($event == "Reciept") {
            this.selected_tab = 'RECEIPT'
            this.clickSubject.next(2);
            this.studentappliedatkt_detail();
        }
    }

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

        if (jsonin.Semester === 5) {
            this.commonService.Post_json_normal<AtktSubject_additional[]>(Atkt_url.atktstudentspaper_semesterwise, jsonin).subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('No data found')
                    return
                }
                this.additionalAtkt_subject_papers = response
                this.gridApi_inatkt_subjectdetails_additional.setRowData(this.additionalAtkt_subject_papers)
            });
        } else {
            this.additionalAtkt_subject_papers = {} as AtktSubject_additional[];
            //this.gridApi_inatkt_subjectdetails_additional.api.hideOverlay()
            //this.gridApi_inatkt_subjectdetails_additional.setRowData(this.additionalAtkt_subject_papers)
            this.globalmessage.Show_message("Additional exam is applicable for Semester 5 students only.")
            return
        }
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
    single_rowSelection_additional: 'single' | 'multiple' = 'multiple';

    onGridReady_subject_selected_additional(params: any) {
        this.gridApi_inatkt_subjectdetails_additional = params.api;
    }

    onRowSelected_subject_additional($event: RowSelectedEvent<any>) {
        // this.sumamountadditional = 0;
        // this.aSemester_outside = [];
        // this.AselectedRows_outside = this.gridApi_inatkt_subjectdetails_additional.getSelectedRows();
        // for (let oSemesterKey of this.AselectedRows_outside) {
        //     let aElement = this.aSemester_outside.find(i => i.Semester === oSemesterKey.Semester);
        //     if (aElement == undefined) {
        //         let oSemester = new CSemester_outside();
        //         oSemester.Semester = oSemesterKey.Semester;
        //         oSemester.Totalcount = 1
        //         oSemester.Semesteramount = this.Aformamount_atkt_json[0].Formamount
        //         this.aSemester_outside.push(oSemester);
        //         continue;
        //     } else {
        //         let mycount = aElement.Totalcount + 1;
        //         aElement.Totalcount = mycount;
        //         if (aElement.Totalcount == 2) {
        //             aElement.Semesteramount = this.Aformamount_atkt_json[1].Formamount;
        //         }
        //         if (aElement.Totalcount > 2) {
        //             aElement.Semesteramount = this.Aformamount_atkt_json[2].Formamount;
        //         }
        //     }
        // }
        // for (let oSemesterKey of this.aSemester_outside) {
        //     this.sumamountadditional = this.sumamountadditional + oSemesterKey.Semesteramount;
        // }
        // this.sumamountadditional = this.sumamountadditional + this.show_prefix_detail.Perdaypenalty;
        // if (this.AselectedRows_outside.length > 0) {
        //     this.btn_diabled_additional = false;
        // }
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
        this.sumamountadditional = matchfound.formamount + this.show_prefix_detail.penaltyamount;
        this.btn_diabled_additional = false;
    }

    onSelectionChanged_additional_subject($event: SelectionChangedEvent<any>) {
    }

    public feesReciept_GridData = [
        {
            field: '',
            maxWidth: 50, checkboxSelection: true
        },
        {headerName: 'Transactionguid', field: 'Transactionguid', resizable: true, filter: true,},
        {headerName: 'Billdesktranid', field: 'Billdesktranid', resizable: true, filter: true, minWidth: 550},
        {headerName: 'Receiptno', field: 'Receiptno', resizable: true, filter: true,},
        {headerName: 'Receiptamount', field: 'Receiptamount', resizable: true, filter: true,},
    ];

    onGridReady_Reciept(params: any) {
        this.gridApi_inatkt_Reciept = params.api;
        this.gridColumnApi_inatkt_Reciept = params.ColumnApi;
    }

    onRowSelected_Reciep($event: RowSelectedEvent<any>) {
        this.FeeReceipt = true
        let selected_outnode = this.gridApi_inatkt_Reciept.getSelectedNodes();
        this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
        const nfeeHeader = this.out_rowselected[0].Prefix_code
        if (nfeeHeader == 10003) {
            this.feeatkthead = 'ADDITIONAL'
        } else {
            this.feeatkthead = 'ATKT'
        }
        if (this.out_rowselected[0].Penaltyamt > 0) {
            this.Penalty_feeshead = "Penalty-late fees "
        }
    }

    intToRoman(num: number) {
        const romanNumerals = [
            {value: 1000, numeral: 'M'},
            {value: 900, numeral: 'CM'},
            {value: 500, numeral: 'D'},
            {value: 400, numeral: 'CD'},
            {value: 100, numeral: 'C'},
            {value: 90, numeral: 'XC'},
            {value: 50, numeral: 'L'},
            {value: 40, numeral: 'XL'},
            {value: 10, numeral: 'X'},
            {value: 9, numeral: 'IX'},
            {value: 5, numeral: 'V'},
            {value: 4, numeral: 'IV'},
            {value: 3, numeral: 'III'},
            {value: 1, numeral: 'I'}
        ];
        let roman = '';
        for (let i = 0; i < romanNumerals.length; i++) {
            while (num >= romanNumerals[i].value) {
                roman += romanNumerals[i].numeral;
                num -= romanNumerals[i].value;
            }
        }
        return roman;
    }

    ShowReciept(finyear: number = 0, Collegecode: number = 0, aadhaar: number = 0) {
        let jsonin: Ireq_reciept = {
            College_code: Collegecode,
            Finyear: finyear!,
            Aadhaar: aadhaar!,
        }

        this.commonService.Post_json_normal<Fees_receiptatkt[]>(Students_url.getReciept, jsonin).subscribe((response) => {
            if (!response) return;
            this.iReq_Reciept = response
            this.signal_users.set(this.iReq_Reciept)
            // this.gridApi_inatkt_Reciept.setRowData(this.iReq_Reciept)
        })
    }

    public outatktdetails_columnDefs = [
        {headerName: 'Recieptno', field: 'Receiptno', resizable: true, filter: true,},
        {headerName: 'Transaction id', field: 'Transactionguid', resizable: true, filter: true,},
        {headerName: 'Date', field: 'Billdeskdate', resizable: true, filter: true,},
        {headerName: 'Billdesk transactionID', field: 'Billdesktranid', resizable: true, filter: true,},
    ];
    outdetail_rowSelection: 'single' | 'multiple' = 'multiple';

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
            'Prefix_code': this.show_prefix_detail.prefix_code,
            'Prefix_month': this.show_prefix_detail.prefix_month,
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
            'Penaltyamt': this.show_prefix_detail.penaltyamount,
            'Batch_code': this.selected_batchstudent.batch_code,
            'Semester': this.selected_semester,
            'Dataentered': 'student',
            'Selectedsubject': this.AselectedRows,
            'Mobileno': this.Atktformstudent.controls['mobileno'].value
        }
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(jsonin))
        formdata.append('file', '')
        this.commonService.Post_formdata(Marksheet_url.IU_ATKTForm, formdata).subscribe((response) => {
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
            Prefix_month: this.show_prefix_detail.prefix_month,
            termcode: this.show_prefix_detail.prefix_code,
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
            AdditionalInfo5: this.show_prefix_detail.prefix_code.toString(),
            AdditionalInfo6: '1',
            AdditionalInfo7: this.IUstudentpaymentres.receipt_id.toString(),
            TypeField3: 'NA',
            Feestype: 'ATKTFEES',
        };
        this.commonService
            .Post_json_data(Billdesk_url.Billdeskchecksum_atkt, jsonin)
            .subscribe((response: any) => {
                if (response.data != null) {
                    BilldeskPay(response.data, this.router.url, "ATKT")
                }
            });
    }

    // commented on 22/01/2025
    Finalsubmit_additional_notworkig(idx: number) {
        if (this.AselectedRows_outside.length <= 0) {
            this.globalmessage.Show_message('Select Subject ')
            return;
        }
        let formdata = new FormData();
        formdata.append('College_code', myGlobals.Golbal_CollegeCode.toString());
        formdata.append('Finyear', myGlobals.Global_CurrentFinYear.toString());
        // formdata.append('Aadhaar', this.oSession.aadhaar!.toString());
        formdata.append('Prefix_code', this.show_prefix_detail.prefix_code.toString());
        formdata.append('Prefix_month', this.show_prefix_detail.prefix_month);
        formdata.append('Firstname', "");
        formdata.append('Lastname', "");
        formdata.append('Fathername', "");
        formdata.append('Mothername', "");
        formdata.append('Selected_finyear', "");
        // formdata.append('Useraadhaar', this.oSession.aadhaar!.toString());
        formdata.append('Prnno', "");
        formdata.append('Gender', "");
        formdata.append('Receiptamount', this.sumamountadditional.toString());
        formdata.append('Penaltyamt', this.show_prefix_detail.penaltyamount.toString());
        formdata.append('Batch_code', this.selected_batchcode.batch_code.toString());
        formdata.append('Semester', this.selected_semester_additional.toString());
        formdata.append('Mobileno', this.Atktformstudent.controls['mobileno'].value);
        formdata.append('Formtype', 'INHOUSE');
        for (const subject of this.AselectedRows_outside) {
            formdata.append('Selectedsubject', JSON.stringify(subject));
        }
        this.commonService.Post_formdata(Marksheet_url.IU_ATKTForm, formdata).subscribe((response) => {
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
            'Prefix_code': this.show_prefix_detail.prefix_code,
            'Prefix_month': this.show_prefix_detail.prefix_month,
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
            'Penaltyamt': this.show_prefix_detail.penaltyamount,
            'Batch_code': this.selected_batchcode.batch_code,
            'Semester': this.selected_semester_additional,
            'Dataentered': 'student',
            'Selectedsubject': this.AselectedRows_outside,
            'Mobileno': this.additional_ATKTForm.controls['mobilenoadditional'].value,
        }
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(jsonin))
        formdata.append('file', '')
        this.commonService.Post_formdata(Marksheet_url.IU_ATKTForm, formdata).subscribe((response) => {
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
        nTranscationamount = String(this.sumamountadditional);
        let jsonin = {
            collegecode: myGlobals.Golbal_CollegeCode,
            finyear: this.oSession.finyear,
            // aadhaar: this.oSession.aadhaar,
            Fullname: this.IUadditionaldata.fullname,
            Prefix_month: this.show_prefix_detail.prefix_month,
            termcode: this.show_prefix_detail.prefix_code,
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
            AdditionalInfo5: this.show_prefix_detail.prefix_code.toString(),
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

    onSelect_semester() {
        this.finalloader = false
        this.atkt_subject_papers = []
        this.AselectedRows = []
        this.sumamount = 0
    }

    protected readonly length = length;

    onSelect_semester_additional() {
        this.additionalAtkt_subject_papers = []
        this.aSemester_outside = [];
    }

    onSelectedItemsChange(selectedItems: Fees_receiptatkt[]) {
        // this.selectedItemsCount.set(selectedItems.length ?? 0);
        // if (selectedItems['length'] > 1) {
        //     this.globalmessage.Show_error("Please select one record.")
        //     // selectedItems.pop()
        //     return
        // }
        // this.FeeReceipt = true
        // this.out_rowselected = selectedItems[0]
        //
        // console.log('finn',this.out_rowselected)
        // // let selected_outnode = this.gridApi_inatkt_Reciept.getSelectedNodes();
        // // this.out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
        // const nfeeHeader = this.out_rowselected.prefix_code
        // if (nfeeHeader == 10003) {
        //     this.feeatkthead = 'ADDITIONAL'
        // } else {
        //     this.feeatkthead = 'ATKT'
        // }
        // if (this.out_rowselected.Penaltyamt > 0) {
        //     this.Penalty_feeshead = "Penalty-late fees "
        // }
        //
        let filter_noselected: Fees_receiptatkt[]
        filter_noselected = selectedItems.filter(
            (receipt_item: Fees_receiptatkt) => receipt_item.receipt_id !== this.signal_selectedId()
        );
        this.nSelectedReceipt = filter_noselected[0]?.receipt_id ?? undefined
        this.signal_selectedId.set(this.nSelectedReceipt);
        this.nSelected_singlerecieptdata = filter_noselected[0] ?? undefined
        this.FeeReceipt = true
        this.feeatkthead = this.nSelected_singlerecieptdata.description
        // const nfeeHeader = this.nSelected_singlerecieptdata.prefix_code
        // if (nfeeHeader == 10003) {
        //     this.feeatkthead = 'ADDITIONAL'
        // } else {
        //     this.feeatkthead = 'ATKT'
        // }
        if (this.nSelected_singlerecieptdata.penaltyamt > 0) {
            this.Penalty_feeshead = "Penalty-late fees "
        }
    }

    onSelectedItemsChange_additional(selectedItems: Req_IAtktsubects[]) {
        this.sumamountadditional = 0;
        this.aSemester_outside = [];
        // this.AselectedRows_outside = this.gridApi_inatkt_subjectdetails_additional.getSelectedRows();
        this.AselectedRows_outside = selectedItems
        for (let oSemesterKey of this.AselectedRows_outside) {
            let aElement = this.aSemester_outside.find(i => i.semester === oSemesterKey.Semester);
            if (aElement == undefined) {
                let oSemester = new CSemester_outside();
                oSemester.semester = oSemesterKey.Semester;
                oSemester.totalcount = 1
                oSemester.semesteramount = this.Aformamount_atkt_json[0].formamount
                this.aSemester_outside.push(oSemester);
                continue;
            } else {
                let mycount = aElement.totalcount + 1;
                aElement.totalcount = mycount;
                if (aElement.totalcount == 2) {
                    aElement.semesteramount = this.Aformamount_atkt_json[1].formamount;
                }
                if (aElement.totalcount > 2) {
                    aElement.semesteramount = this.Aformamount_atkt_json[2].formamount;
                }
            }
        }
    }

    getReceipts(selectedId: number | undefined) {
        return this.iReq_Reciept.map((lineitem: Fees_receiptatkt) => {
            lineitem._selected = lineitem.receipt_id === selectedId;
            return {...lineitem};
        });
    }
}
