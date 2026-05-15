import {Component, effect, OnInit, signal, ViewChild} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalMessage} from "../../../globals/global.message";
import {
  ApprovedCourse,
  Ires_allreciepts,
  IRes_downloadsinglereceipt,
  IRes_singlereceipt,
  PaidInstallments_M
} from "../../../models/response";
import {CommonService} from "../../../globals/common.service";
import {SessionService} from "../../../globals/sessionstorage";
import {Sessiondata} from "../../../models/Sessiondata";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormDirective,
  IColumn,
  ImgDirective,
  LoadingButtonComponent,
  NavComponent,
  NavLinkDirective,
  RowComponent,
  SmartTableComponent,
  SpinnerComponent,
  TabContentComponent,
  TabContentRefDirective,
  TableColorDirective,
  TabPaneComponent,
} from "@coreui/angular-pro";
import { JsonPipe } from "@angular/common";
import {downloadstudentreceipt, Students_url} from "../../../globals/global-api";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Extractguid, UDownloadfiles} from "../../../globals/global_utility";
import {
  CheckboxEditorModule,
  ClientSideRowModelModule,
  ColDef, GridOptions,
  ModuleRegistry,
  ValidationModule
} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {NgxPrintElementComponent} from "ngx-print-element";
import {AutocompleteLibModule} from "angular-ng-autocomplete";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CheckboxEditorModule,
  ValidationModule
]);

const data = Array.from(Array(20).keys()).map((val: any, index: number) => ({
  boolean: !!(index % 2),
}));


@Component({
  selector: 'app-democomponent',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  imports: [
    CardComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    CardHeaderComponent,
    AgGridAngular,
    CardComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    AgGridAngular,
    AutocompleteLibModule
],
  standalone: true
})
export class DemoComponent implements OnInit {
  @ViewChild('tableRef') tableElement: any;
  Rjcollegeemail: string = "rjcollege@rjcollege.edu.in"
  data: any;

  gridOptions_details: any
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
  ApprovedCourses: ApprovedCourse[]=[];
  FeeReceipt = false;
  FeeModal = true;
  FeeStructure: any;
  private gridApi: any;
  private gridColumnApi: any;
  rowss: any = [];
  gridOptions: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  Finyearnumber: any;
  allreceipts:Ires_allreciepts[]=[];
  selectednode= {} as Ires_allreciepts;
  oSession!: Sessiondata;
  ReceiptDetails= {} as IRes_singlereceipt;
  viewButton = false;

  activePage = 1;
  private gridApi_inatkt_subjectdetails: any;


  reciept_img: SafeResourceUrl = '';

  columns: (IColumn | string)[] = [
    {key: 'Receiptno', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
    {key: 'Receiptamount', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
    {key: 'Billdesktranid', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
    {key: 'Payment_mode', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
    {key: 'Batch_name', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
    {key: 'Transactionguid', filter: false, sorter: false, _style: {width: '15%'}, _classes: 'text-muted small'},
  ];

  readonly signal_users = signal<Ires_allreciepts[]>([]);
  readonly signal_selectedId = signal<number | undefined>(0);
  itemsPerPage = 10;
  nSelectedReceipt: number = 0;

  downloadloader = false

  columnDefs: ColDef[] = [
    {
      headerName: "Checkbox Cell Editor",
      field: "boolean",
      cellEditor: "agCheckboxCellEditor",
    },
  ];
  defaultColDef: ColDef = {
    width: 200,
    editable: true,
  };
  rowData: any[] | null = data;
  constructor(
    private router: Router, private commonService: CommonService,
    private formBuilder: UntypedFormBuilder, private sessionservice: SessionService,
    private globalmessage: GlobalMessage
  ) {
    this.gridOptions_details = <GridOptions>{
      context: {
        componentParent: this,
      },
    };

  }

  get f() {
    return this.FeereceiptForm.controls;
  }

  print() {
    // tslint:disable-next-line:no-unused-expression
    window && window.print();
  }

  ngOnInit(): void {
    //this.oSession = new Sessiondata(this.sessionservice)
    //this.oSession.Getdatafromstroage();
    this.Createform();

  }

  Createform() {


    // console.log('ddd',this.rowData)
  }


  onGridReady_subject_selected(params: any) {
    this.gridApi_inatkt_subjectdetails = params.api;
  }

}
