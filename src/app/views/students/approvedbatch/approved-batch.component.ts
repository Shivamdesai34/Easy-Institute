import {Component, OnInit, ViewChild} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalMessage} from "../../../globals/global.message";
import {CommonService} from "../../../globals/common.service";
import {print_profile, Students_url} from "../../../globals/global-api";
import {SessionService} from "../../../globals/sessionstorage";
import {Sessiondata} from "../../../models/Sessiondata";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {GridOptions} from "ag-grid-community";
import {Ires_Courseapplied, IRes_profileprint, Ires_studentapprovelist} from "../../../models/response";
import {
    ButtonDirective, CardBodyComponent, CardComponent,
    ColComponent,
    RowComponent,
    SmartTableComponent,
    TableColorDirective, TemplateIdDirective
} from "@coreui/angular-pro";
import {UDownloadfiles} from "../../../globals/global_utility";
import {Global_CurrentFinYear} from "../../../globals/global-variable";
import {ApprovedbatchService} from "../approvedbatchs/approvedbatchs.service";

@Component({
  selector: 'app-approvedbatchs',
  templateUrl: './approved-batch.component.html',
  styleUrls: ['./approved-batch.component.scss'],
    imports: [
        ReactiveFormsModule,
        RowComponent,
        ColComponent,
        ButtonDirective,
        SmartTableComponent,
        TableColorDirective,
        CardComponent,
        CardBodyComponent,
        TemplateIdDirective
    ],
  standalone: true
})
export class ApprovedBatchComponent implements OnInit {
  @ViewChild('tableRef') tableElement: any;
  oSession!: Sessiondata;
  private gridApi: any;
  private gridColumnApi: any;
  approvedbatchs: Ires_studentapprovelist[]=[];
  gridOptions: any;
  AppliedCourses:Ires_Courseapplied[]=[];
  Profileprint: IRes_profileprint={} as IRes_profileprint;
  selected_data= {} as Ires_Courseapplied;
  public rowSelection: 'single' | 'multiple' = 'single';

  constructor(
    private router: Router,
    private commonService: CommonService,
    private formBuilder: UntypedFormBuilder, private sessionservice: SessionService,
    private globalmessage: GlobalMessage,
    private approvedbatchservice: ApprovedbatchService,
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
    this.get_approvedbatchs();
    this.StudentAppliedCourses();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    params.api.sizeColumnsToFit();
  }

  columnDefs = [
    {headerName: "Batch Name", field: "Batch_name", resizable: true, maxWidth: 200},
    {headerName: "Status", flex: 1, field: "Admission_status", resizable: true},
    {headerName: "Subject Group code", flex: 1, field: "Subject_group_code", resizable: true},
    {headerName: "Subject Name", field: "Subject_group_name", resizable: true},
    {headerName: "Reciept Amount", field: "Receiptamount", resizable: true},
  ]

  get_approvedbatchs() {
    let jsonin = {
      college_code: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      // aadhaar: this.oSession.aadhaar
    }
    let input_jsonin = jsonin
    this.commonService.Post_json_data<Ires_studentapprovelist[]>(Students_url.student_approvedlist, input_jsonin).subscribe(response => {
      if (response == null) {
        this.globalmessage.Show_error('No data found.')
      }
      this.approvedbatchs = response.data
    });
  }

  onSelectionChanged(event: any) {
    let selected_outnode = this.gridApi.getSelectedRows();
    this.selected_data = selected_outnode[0];
  }

  StudentAppliedCourses() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
    };
    let jsonin_input = jsonin
    this.commonService
      .Post_json_data<Ires_Courseapplied[]>(Students_url.StudentAppliedCourses, jsonin_input)
      .subscribe((response) => {
        this.AppliedCourses = response.data;
      });
  }

  ProfilePrint() {

      if(this.oSession.currentformfeesboardlevel == 'JR' && this.oSession.currentformfeesbatchlevel != '1'){
        this.globalmessage.Show_error('No data found.')
        return
      }
      if(this.oSession.currentformfeesbatchlevel == 'UG' && this.oSession.currentformfeesboardlevel != '1'){
        this.globalmessage.Show_error('No data found.')
        return
      }
      if(this.oSession.currentformfeesbatchlevel == 'PG' && this.oSession.currentformfeesboardlevel != '1'){
        this.globalmessage.Show_error('No data found.')
        return
      }

    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
      Batchcode: this.selected_data.batch_code
    };
    let jsonin_input = {
      Input: encryptUsingAES256(jsonin),
    };
    this.approvedbatchservice.PrintProfile(jsonin_input)
      .subscribe((response) => {
        this.Profileprint = response;
        UDownloadfiles(response.image,response.filename)

        this.batchsubject_view()
      });
  }

  onSelectedItemsChange(selectedItems: Ires_Courseapplied[]) {
    // this.selectedItemsCount.set(selectedItems.length ?? 0);
    if (selectedItems['length'] > 1) {
      this.globalmessage.Show_error("Please select one record.")
      // selectedItems.pop()
      return
    }
    this.selected_data = selectedItems[0]
    //
  }

  batchsubject_view(){
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      useraadhaar: this.oSession.aadhaar,
      batch_code: parseInt(this.selected_data.batch_code),
      subject_group_code: this.selected_data.subject_group_code,
    };
    let jsonin_input = jsonin
    this.commonService
        .Post_json_data(Students_url.batchsubject_view,jsonin_input)
        .subscribe((response) => {


        })
  }
}
