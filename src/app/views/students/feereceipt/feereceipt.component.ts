import {Component, effect, OnInit, signal, ViewChild} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import {FeereceiptService} from './feereceipt.service';
import {GlobalMessage} from "../../../globals/global.message";
import {
    ApprovedCourse,
    Ires_allreciepts,
    IRes_downloadsinglereceipt,
    IRes_singlereceipt,
    PaidInstallments_M
} from "../../../models/response";
import {CommonService} from "../../../globals/common.service";
import {IBatchname, Ifinyear} from "./feereceipt.responsemodel";
import {SessionService} from "../../../globals/sessionstorage";
import {Sessiondata} from "../../../models/Sessiondata";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent, CardHeaderComponent,
    ColComponent, IColumn, ImgDirective,
    RowComponent,
    SmartTableComponent, SpinnerComponent,
} from "@coreui/angular-pro";

import {downloadstudentreceipt, Students_url} from "../../../globals/global-api";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Extractguid, UDownloadfiles, ValidateFormfeesnotpaidProfilenotsubmitted} from "../../../globals/global_utility";
import {AppStateService} from "../../../globals/appstateservice";

@Component({
    selector: 'app-feereceipt',
    templateUrl: './feereceipt.component.html',
    styleUrls: ['./feereceipt.component.scss'],
    imports: [
        CardComponent,
        CardBodyComponent,
        ReactiveFormsModule,
        RowComponent,
        ColComponent,
        SmartTableComponent,
        CardHeaderComponent,
        ImgDirective,
        SpinnerComponent,
        ButtonDirective
    ],
    standalone: true
})
export class FeereceiptComponent implements OnInit {
    @ViewChild('tableRef') tableElement: any;
    Rjcollegeemail: string = "rjcollege@rjcollege.edu.in"
    data: any;
    FeereceiptForm!: UntypedFormGroup;
    Lineitem: any;
    Amount: any;
    InstallmentID: any;
    PrefixName: any;
    ReceiptNo: any;
    ReceiptDate: any;
    Installments: PaidInstallments_M[] = [];
    index: any;
    Header: any;
    submitted = false;
    Batch: any;
    FullName: any;
    Mobile: any;
    BatchName: any;
    Email: any;
    BilldeskTranID: any;
    ApprovedCourses: ApprovedCourse[] = [];
    FeeReceipt = false;
    FeeModal = true;
    FeeStructure: any;
    private gridApi: any;
    private gridColumnApi: any;
    rowss: any = [];
    gridOptions: any;
    public rowSelection: 'single' | 'multiple' = 'single';
    BatchNames: IBatchname[] = [];
    SelectedBatchs = {} as IBatchname;
    Finyear: Ifinyear[] = [];
    SelectedFinyear = {} as Ifinyear;
    Finyearnumber: any;
    allreceipts: Ires_allreciepts[] = [];
    selectednode = {} as Ires_allreciepts;
    oSession!: Sessiondata;
    ReceiptDetails = {} as IRes_singlereceipt;
    viewButton = false;

    activePage = 1;

    reciept_img: SafeResourceUrl = '';

    columns: (IColumn | string)[] = [
        {key: 'receiptno', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
        {key: 'receiptamount', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
        {key: 'billdesktranid', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
        {key: 'transcationmode', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
        {key: 'batch_name', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
        {key: 'transactionguid', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
    ];

    readonly signal_users = signal<Ires_allreciepts[]>([]);
    readonly signal_selectedId = signal<number | undefined>(0);
    itemsPerPage = 10;
    nSelectedReceipt: number = 0;

    downloadloader = false

    constructor(
        private router: Router,
        private appState: AppStateService,
        private commonService: CommonService,
        private feereceiptService: FeereceiptService, private sanitizer: DomSanitizer,
        private formBuilder: UntypedFormBuilder, private sessionservice: SessionService,
        private globalmessage: GlobalMessage
    ) {
        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();

        // if(ValidateFormfeesnotpaidProfilenotsubmitted(this.oSession.isprofilesubmited!,this.oSession.formfeesrecieved!)){
        //   this.router.navigate(['dashboard']);
        // }

        this.loadUsers()
        effect(() => {
            this.signal_users.set(this.getReceipts(this.signal_selectedId()));
        });
    }

    loadUsers() {
        this.Get_allreceipts(this.oSession.finyear, this.oSession.collegecode, this.oSession.aadhaar);
    }

    get f() {
        return this.FeereceiptForm.controls;
    }

    print() {
        // tslint:disable-next-line:no-unused-expression
        window && window.print();
    }

    ngOnInit(): void {

        this.appState.admission$.subscribe(state => {
            console.log("GLOBAL:", state);

            if (state.admissionstarted === 1) {
                // allow UI
            }
        });

        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();
        this.Createform();
        this.GetFinyearAPI();
        this.get_recieptDetails();
    }

    Createform() {
        this.FeereceiptForm = this.formBuilder.group({
            finyear: ['', Validators.required],
            batch: ['', Validators.required],
            installment: ['', Validators.required],
        });
    }

    StudentApprovedCourses() {
        let jsonin = {
            Finyear: this.SelectedFinyear.Finyear,
            Collegecode: this.oSession.collegecode,
            // Aadhaar: this.oSession.aadhaar,
        };
        let input_json = {
            Input : encryptUsingAES256(jsonin)
        }
        this.feereceiptService.StudentApprovedCourses(input_json)
            .subscribe((response) => {
                if (response == null) {
                    return;
                }
                this.ApprovedCourses = response.data;
            });
    }

    GetFinyearAPI() {
        let jsonin = {
            Finyear: -99,
            Collegecode: this.oSession.collegecode,
            // Aadhaar: this.oSession.aadhaar,
        };
        let input_json = {
            Input : encryptUsingAES256(jsonin)
        }
        this.feereceiptService.Paidfinyear(input_json).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.Finyear = response.data;
        });
    }

    GetBatchAPI() {
        let jsonin = {
            Finyear: this.SelectedFinyear.Finyear,
            Collegecode: this.oSession.collegecode,
            // Aadhaar: this.oSession.aadhaar,
        };
        let input_json = {
            Input : encryptUsingAES256(jsonin)
        }
        this.feereceiptService.Paidbatchs_URL(input_json).subscribe((response) => {
            if (response == null) {
                return;
            }
            this.BatchNames = response.data;
        });
    }

    onFinyearSelected() {
        this.GetBatchAPI();
    }

    onBatchSelected(event: any) {
        if (this.SelectedBatchs.Batch_code > 0) {
            this.ShowInstallmentDetailsv2();
        }
    }

    showFeesAmount() {
        this.Amount = this.FeeStructure.Header.Amount;
        this.InstallmentID = this.FeeStructure.Header.Installment;
        this.Finyearnumber = this.FeeStructure.Header.Finyear;
        this.PrefixName = this.FeeStructure.Header.Prefix_name;
        this.ReceiptNo = this.FeeStructure.Header.Receiptno;
        this.FullName = this.FeeStructure.Header.FullName;
        this.BatchName = this.FeeStructure.Header.BatchName;
        this.Mobile = this.FeeStructure.Header.Mobile;
        this.Email = this.FeeStructure.Header.Email;
        this.BilldeskTranID = this.FeeStructure.Header.BilldeskTranID;
        this.ReceiptDate = this.FeeStructure.Header.Receiptdate;
        this.Lineitem = this.FeeStructure.Lineitem;
    }

    ShowInstallmentDetailsv2() {
        this.submitted = true;
        let jsonin = {
            'CollegeCode': 1,
            'Finyear': this.SelectedFinyear.Finyear,
            'BatchCode': this.SelectedBatchs.Batch_code,
            // 'Aadhaar': this.oSession.aadhaar
        };
        let input_json = {
            Input : encryptUsingAES256(jsonin)
        }
        this.feereceiptService.StudentReceiptDetailsv2(input_json).subscribe(response => {
            if (response == null) {
                return;
            }
            this.Installments = response.data;
            // this.RemainingFees = response.data.Totalfees - this.Installments.I
        });
        this.StudentApprovedCourses();
    }

    showFeesAmountv2(index: any) {
        if (index <= 0) {
            return;
        }
        index = index - 1;
        let selectedrow = this.Installments[index];
        this.Amount = selectedrow.amount;
        this.InstallmentID = selectedrow.installment;
        this.PrefixName = selectedrow.prefix_name;
        this.Finyearnumber = selectedrow.finyear
        this.ReceiptNo = selectedrow.receiptno;
        this.FullName = selectedrow.fullname;
        this.BatchName = selectedrow.batchname;
        this.Mobile = selectedrow.mobile;
        this.Email = selectedrow.email;
        this.BilldeskTranID = selectedrow.billdesktranid;
        this.ReceiptDate = selectedrow.receiptdate;
        this.Lineitem = selectedrow.lineitem;
    }

    openYesNoDialog(msg: any) {
        this.globalmessage.Show_message('Delete');
    }

    showReceipt() {
        // this.FeeModal = false;
        this.FeeReceipt = true;
    }

    ChangeInstallment() {
        this.FeeModal = true;
        this.FeeReceipt = false;
        this.FeeStructure = '';
        this.Amount = '';
        this.resetPage();
    }

    resetPage() {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
    }

    columnDefs = [
        {headerName: "Finyear", flex: 1, field: "Finyear", resizable: true},
        {headerName: "Receipt id", flex: 1, field: "Receipt_id", resizable: true},
        {headerName: "Batch Name", flex: 1, field: "Batch_name", resizable: true},
        {headerName: "BillDesk Transaction Id", flex: 1, field: "Billdesktranid", resizable: true},
        {headerName: "Amount", field: "Receiptamount", flex: 1, resizable: true},
    ]

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }

    onSelectionChanged(event: any) {
        let selected_outnode = this.gridApi.getSelectedNodes();
        let out_rowselected = selected_outnode.map((node: { data: any; }) => node.data);
        this.selectednode = out_rowselected[0]
    }

    get_recieptDetails() {
        let jsonin = {
            CollegeCode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            // Aadhaar: this.oSession.aadhaar
        }
        let input_json = {
            Input : encryptUsingAES256(jsonin)
        }
        this.feereceiptService.allreceipts(input_json).subscribe(response => {
            if (response == null) {
                this.globalmessage.Show_error('No data found.')
            }
            this.allreceipts = response.data;
        });
    }

    view(mode: string) {

        if (mode == 'PDF') {
            this.downloadloader = true
        }
        this.FeeReceipt = true;
        let jsonin = {
            receipt_id: this.nSelectedReceipt,
            mode: mode
        };
        console.log('ccv',jsonin)
        let input_json = {
            Input : encryptUsingAES256(jsonin)
        }
        this.feereceiptService.receipts(input_json).subscribe(response => {
            if (response == null) {
                this.globalmessage.Show_error('No data found.')
            }
            if (mode == 'PDF') {
                UDownloadfiles(response.data.image, response.data.filename)
                this.downloadloader = false
                return
            }
            this.reciept_img = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response.data.image}`);
            // this.ReceiptDetails = response;
        });
    }

    onSelectedItemsChange(selectedItems: Ires_allreciepts[]) {
        let filter_noselected: Ires_allreciepts[]
        filter_noselected = selectedItems.filter(
            (receipt_item: Ires_allreciepts) => receipt_item.receipt_id !== this.signal_selectedId()
        );
        this.nSelectedReceipt = filter_noselected[0]?.receipt_id ?? undefined
        this.signal_selectedId.set(this.nSelectedReceipt);

    }

    Get_allreceipts(finyear: number = 0, Collegecode: number = 0, aadhaar: number = 0) {
        let jsonin = {
            CollegeCode: Collegecode,
            Finyear: finyear,
            // Aadhaar: aadhaar
        }
        let input_json = jsonin
        this.commonService.Post_json_data<Ires_allreciepts[]>(Students_url.allreceipts, input_json).subscribe(response => {
            if (!response || !response.data) {
                return;
            }
            this.allreceipts = response.data;
            this.signal_users.set(this.allreceipts)
            //this.signal_selectedId.set(0);
        });
    }

    getReceipts(selectedId: number | undefined) {
        return this.allreceipts.map((lineitem: Ires_allreciepts) => {
            lineitem._selected = lineitem.receipt_id === selectedId;
            return {...lineitem};
        });
    }
}
