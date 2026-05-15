import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators,} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {GridOptions} from 'ag-grid-community';
import {InternalExamMarksService} from './internal-exammarks.service';

import {GlobalMessage} from "../../../globals/global.message";
import {CommonService} from "../../../globals/common.service";
import {Students_url} from "../../../globals/global-api";
import {IExam} from "./internal-examworks.responsemodel";
import {SessionService} from "../../../globals/sessionstorage";
import {Sessiondata} from "../../../models/Sessiondata";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {Ires_batchinternal} from "../../../models/response";
import {Ires_Marksheet_marksinternal} from "../../../models/response";
import {AgGridAngular} from "ag-grid-angular";
import {
    ButtonDirective, CardBodyComponent,
    CardComponent, CardHeaderComponent,
    ColComponent, ContainerComponent,
    FormCheckComponent, FormLabelDirective, FormSelectDirective,
    RowComponent,
    SpinnerComponent
} from "@coreui/angular-pro";

import {IconComponent} from "@coreui/icons-angular";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {ValidateFormfeesnotpaidProfilenotsubmitted} from "../../../globals/global_utility";

@Component({
  templateUrl: './internal-exammarks.component.html',
  styleUrls: ['./internal-exammarks.component.scss'],
  encapsulation: ViewEncapsulation.None,
    imports: [
        ReactiveFormsModule,
        ColComponent,
        RowComponent,
        CardComponent,
        ButtonDirective,
        AgGridAngular,
        PdfViewerModule,
        FormLabelDirective,
        FormSelectDirective
    ],
  standalone: true
})
export class InternalExamMarksComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;
  gridOptions: any;
  showpdfbox = false;
  showGridbox = true;
  marksForm!: FormGroup;
  SelectedBatch!: Ires_batchinternal;

  Batchs!: Ires_batchinternal[];
  batch: any;
  examdata: any;

  InternalExam!: IExam[];
  SelectedInternalExam!: IExam;

  //zoom
  pageVariable: number = 1;
  zoom: number = 1.0;
  originalSize: boolean = true;
  Studentpassfail: string = '';

  res: any;
  showGrid: any;

  Batch_code: any;

  oSession!: Sessiondata;

  public rowSelection: 'single' | 'multiple' = 'single';
  res_Showinternalmarks!: Ires_Marksheet_marksinternal[];

  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  BatchCode = parseInt(sessionStorage.getItem('BatchCode')!);

  constructor(
    private router: Router,private commonService: CommonService,
    private Internalexammarksservice: InternalExamMarksService,
    private globalmessage: GlobalMessage,private sessionservice: SessionService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }

  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionservice)
    this.oSession.Getdatafromstroage();

    // if(ValidateFormfeesnotpaidProfilenotsubmitted(this.oSession.isprofilesubmited!,this.oSession.formfeesrecieved!)){
    //   this.router.navigate(['dashboard']);
    // }

      this.CreateForm();

      this.GetBatchApi();

  }

  CreateForm(){
    this.marksForm = new FormGroup({
      Batch_name: new FormControl('', Validators.required),
      Internal_Name: new FormControl('', Validators.required),
    });
  }

  //Grid
  columnData = [
    // {
    //   field: '',
    //   maxWidth: 50, checkboxSelection: true
    // },
    {
      headerName: 'Subject Name',
      minWidth: 600,
      field: 'Subject_name',
      resizable: true,
    },
    { headerName: 'Marks', minWidth: 100, field: 'Marks', resizable: true },
    {
      headerName: 'Present(P)/Absent(A)',
      field: 'Present_absent',
      resizable: true,
    },
    // { headerName: 'Documents', field: 'Document_Filename ', cellRendererFramework: PdfCellCustomComponent }
  ];

  rowData: any = [];

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
  }

  onRowSelectedEvent(event: any) {
    //on checkbox selection
  }


  onSelectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();
  }
  openYesNoDialog(msg: any) {
    // this.globalmessage.Show_message({message: msg});
  }

  //
  //Batch


  GetBatchApi() {
    //Batch select list displaying
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.lastfinyear,
      // Aadhaar: this.oSession.aadhaar,
    };

    let input_json = jsonin

    this.commonService.Post_json_data<Ires_batchinternal[]>(Students_url.studentbatchs,input_json).subscribe(
      (response: any) => {
        if (response['data'] == '' || response['data'] == null) {
          // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert

          this.globalmessage.Show_error('No data found! Please Configure Marksheet..')

        } else {
          this.Batchs = response.data
        }
      }
    );
  }

  //ExamName
  GetInternalExamApi() {
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.lastfinyear,
      Batchcode: this.SelectedBatch.batch_code,
      // Aadhaar: this.oSession.aadhaar,
    };

    let input_json = jsonin

    this.commonService.Post_json_data<IExam[]>(Students_url.studentbatchexams,input_json).subscribe(
      (response: any) => {
        if (response['data'] == '' || response['data'] == null) {
          // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert

         this.globalmessage.Show_error('No data found! Please Configure Marksheet..')

        } else {
          this.InternalExam = response.data
        }
      }
    );
  }
  //when batch subject is Selected
  onChangeBatchSelect() {
    this.GetInternalExamApi();
  }

  //when exam is Selected
  onChangeInternalExamSelect() {

  }


  onShowClick() {

    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Batchcode: this.SelectedBatch.batch_code,
      Aadhaar: this.oSession.aadhaar,
      examcode: this.SelectedInternalExam.Userexamid,
    };


    let input_json = jsonin

    this.commonService.Post_json_data<Ires_Marksheet_marksinternal[]>(Students_url.Internalexammarks,input_json).subscribe(
      (response) => {
        this.res_Showinternalmarks = response.data;
      }
    );
  }
}
