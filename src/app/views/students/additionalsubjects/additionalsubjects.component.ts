import * as myGlobals from '../../../globals/global-variable';
// import {
//   CollegeCode,
//   FinYear,
//   Golbal_CollegeCode,
// } from '../../../globals/global-variable';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AdditionalsubjectsService} from './additionalsubjects.service';
import {BilldeskPay} from '../../../../assets/javascript/billdesk';
import {GlobalMessage} from "../../../globals/global.message";
import {SessionService} from "../../../globals/sessionstorage";
import {Sessiondata} from "../../../models/Sessiondata";
import {CommonService} from "../../../globals/common.service";
import {Common_url, Students_url} from "../../../globals/global-api";
import {
  AdmissionQuotasubjectGroups,
  Ires_Courseapplied,
  Ires_PhdBatchs,
  Ires_Reciept,
  res_Batchs,
  Subjects_group_h
} from "../../../models/response";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {
  ButtonDirective, CardBodyComponent, CardComponent,
  ColComponent,
  FormLabelDirective,
  FormSelectDirective,
  RowComponent
} from "@coreui/angular-pro";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-additionalsubjects',
  templateUrl: './additionalsubjects.component.html',
  styleUrls: ['./additionalsubjects.component.scss'],
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    NgClass,
    FormSelectDirective,
    FormLabelDirective,
    ButtonDirective,
    CardBodyComponent,
    CardComponent
  ]
})
export class AdditionalsubjectsComponent implements OnInit {
  Demoversion: boolean = false;
  QuotaStatus: AdmissionQuotasubjectGroups[] = []
  portal = {} as Ires_PhdBatchs;
  res_reciept = {} as Ires_Reciept;
  additionalSubjectsForm!: FormGroup;
  submitted = false;
  SubjectGroups: any;
  batchSubjects: Subjects_group_h[] = []
  BatchCode: any;
  data: any;
  ReceiptID: any;
  ReceiptNo: any;
  billdeskRequestMsg: string = '';
  selectedObject!: Subjects_group_h;
  modalBatch: res_Batchs[] = [];
  BatchObject = {} as res_Batchs;
  AppliedCourses: Ires_Courseapplied[] = [];
  oSession!: Sessiondata;

  constructor(
    private http: HttpClient, private commonService: CommonService,
    private router: Router, private sessionservice: SessionService,
    private formBuilder: FormBuilder,
    private activeroute: ActivatedRoute,
    private additionalsubjectsService: AdditionalsubjectsService,
    private renderer: Renderer2,
    private globalmessage: GlobalMessage
  ) {
    let xDomain = myGlobals.Domainname.toUpperCase();
    if (xDomain.search('LOCALHOST') != -1) {
      this.Demoversion = true;
    }
    if (xDomain.search('DEMO') != -1) {
      this.Demoversion = true;
    }
  }

  // private changeRef: ChangeDetectorRef
  // ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
  renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  get f() {
    return this.additionalSubjectsForm.controls;
  }

  // AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
  // FinyearSession = myGlobals.Global_CurrentFinYear;
  // TokenSession = sessionStorage.getItem('Token');
  // StudentType = sessionStorage.getItem('StudentType');
  ngOnInit() {
    this.oSession = new Sessiondata(this.sessionservice);
    this.oSession.Getdatafromstroage();
    this.activeroute.queryParams
      .subscribe(params => {
        // this.demo_route = params['page'];
      });
    if (this.oSession.formfeesrecieved == 'NOTPAID') {
      this.globalmessage.Show_error('Please pay form fees for your current batch.')
      this.router.navigate(['/formfees'])
      return
    }
    if (this.oSession.isprofilesubmited == 'false') {
      this.globalmessage.Show_error('Please complete your profile.')
      this.router.navigate(['/studentprofile'])
    }
    this.modalSelectBatch();
    //Shivam
    // this.StudentProfileStatus();
    this.StudentAppliedCourses();
    this.additionalSubjectsForm = this.formBuilder.group({
      batch: ['', Validators.required],
      batchSubjects: ['', Validators.required],
    });
    this.renderExternalScript(
      'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
    ).onload = () => {
    };
  }

  //Shivam
  // StudentProfileStatus() {
  //   let jsonin = {
  //     Finyear: this.oSession.finyear,
  //     Collegecode: myGlobals.Global_CurrentFinYear,
  //     Aadhaar: this.oSession.aadhaar,
  //     studenttype: this.oSession.studenttype,
  //     webportname: myGlobals.Global_Webportname,
  //   };
  //   this.commonService
  //     .Post_json(StudentProfileStatus,jsonin)
  //     .subscribe((response) => {
  //
  //       if (response.data.Profile.ProfileSubmited == 1) {
  //         return ;
  //       }
  //       if (response.data.Profile.Aadhaar == 0) {
  //         // this.openYesNoDialog("Pending Personal Details")
  //         // alert("Complete Personal Details")
  //         this.router.navigate(['/fillprofile']);
  //       } else if (response.data.Education == false) {
  //         // this.openYesNoDialog("Pending Education Details")
  //         // alert("Complete Education Details")
  //         this.router.navigate(['/fillprofile']);
  //       } else if (response.data.Reservation.Aadhaar == 0) {
  //         // this.openYesNoDialog("Pending Reservation Details")
  //         // alert("Complete Reservation Details")
  //         this.router.navigate(['/fillprofile']);
  //       }
  //       if (response.data.ProfileCount < 2) {
  //         // this.openYesNoDialog("Applying to Additional Course will Lock you Profile and cannot be changed!")
  //         Swal.fire({
  //           title: 'Message!',
  //           text:
  //             'Applying to Additional Course will Lock your Profile and cannot be changed!',
  //           icon: 'info',
  //           confirmButtonText: 'OK',
  //         }); //alert
  //       }
  //     });
  // }
  StudentAppliedCourses() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: 1,
      Aadhaar: this.oSession.aadhaar,
    };
    this.commonService
      .Post_json_data<Ires_Courseapplied[]>(Students_url.StudentAppliedCourses, jsonin)
      .subscribe((response) => {
        this.AppliedCourses = response.data;
      });
  }

  modalSelectBatch() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
      admissionboard: this.oSession.Admissionboard,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<res_Batchs[]>(Common_url.GetAllFirstYearBatchs, input_json)
      .subscribe((response) => {
        this.modalBatch = response.data;
      });
  }

  PortalOpen() {
    // this.portal = "";
    // this.BatchCode = event.Batch_Code;
    // this.formAmount = event.FormAmount;
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      batchcode: this.BatchObject.batch_code,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<Ires_PhdBatchs>(Students_url.PortalOpenv1, input_json)
      .subscribe((response) => {

        this.portal = response.data;
        if (this.portal.outside_admission == true) {
          this.modalSelectBatchSubjects();
        } else {
          // this.portal = '';
          // this.SubjectGroups = '';
          this.globalmessage.Show_message('Admission Closed for this Particular Batch!');
          this.additionalSubjectsForm.controls['batch'].setValue('');
          this.additionalSubjectsForm.controls['batchSubjects'].setValue('');
        }
      });
  }

  modalSelectBatchSubjects() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      BatchCode: this.BatchObject.batch_code,
      Aadhaar: this.oSession.aadhaar,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<Subjects_group_h[]>(Students_url.StudentSubjectGroup, input_json)
      .subscribe((response) => {
        this.batchSubjects = response.data;
      });
  }

  // modalSelectBatchSubjects() {
  //
  //   // this.BatchCode = event.Batch_Code
  //   // this.formAmount = event.FormAmount
  //
  //   // this.PortalOpen();
  //
  //   let jsonin = {
  //     Finyear: this.oSession.finyear,
  //     Collegecode: this.oSession.collegecode,
  //     BatchCode: this.BatchObject.Batch_code,
  //     Aadhaar: this.oSession.aadhaar,
  //   };
  //
  //   let input_json = {
  //     Input: encryptUsingAES256(jsonin),
  //   };
  //
  //   this.commonService
  //     .Post_json(Additionalsubjectformfees_URL,input_json)
  //     .subscribe((response) => {
  //
  //       if (response.data.Receipt_ID <= 0) {
  //         this.commonService
  //           .Post_json(StudentSubjectGroup,input_json)
  //           .subscribe((response) => {
  //             this.batchSubjects = response.data;
  //
  //             //Shivam
  //             // this.portal = '';
  //             this.additionalSubjectsForm.controls['batchSubjects'].setValue('');
  //           });
  //       } else {
  //         // this.BatchObject = "";
  //
  //         //Shivam
  //         // this.portal = '';
  //         this.SubjectGroups = '';
  //         this.additionalSubjectsForm.controls['batch'].setValue('');
  //         this.additionalSubjectsForm.controls['batchSubjects'].setValue('');
  //
  //         Swal.fire({
  //           title: 'Error!',
  //           text:
  //             'Fees Already Paid for this Batch!',
  //           icon: 'error',
  //           confirmButtonText: 'OK',
  //         });
  //
  //       }
  //     });
  // }
  // modalSelectBatchSubjects(event) {
  //   this.BatchCode = event.Batch_Code
  //   this.formAmount = event.FormAmount
  //   this.data = {
  //     "Finyear": this.FinyearSession,
  //     "Collegecode": this.CollegeCodeSession,
  //     "BatchCode": this.BatchCode,
  //     "Aadhaar": this.AadharSession
  //   }
  //   this.additionalsubjectsService.FormFeesPaidCheck(this.data).subscribe(response => {
  //     if(response.data == false){
  //       this.additionalsubjectsService.GetModalBatchSubjects(this.data).subscribe(response => {
  //         this.batchSubjects = response.data
  //         this.additionalSubjectsForm.controls.batchSubjects.setValue("");
  //       })
  //     }
  //     else{
  //       // this.BatchObject = "";
  //       this.SubjectGroups = "";
  //       this.openYesNoDialog("Fees Already Paid for this Batch!");
  //       this.additionalSubjectsForm.controls.batch.setValue("");
  //       this.additionalSubjectsForm.controls.batchSubjects.setValue("");
  //     }
  //   })
  // }
  onGroupSelected() {
    this.CheckSubjectGroupQuota();
  }

  CheckSubjectGroupQuota() {
    let jsonin = {
      collegecode: 1,
      finyear: this.oSession.finyear,
      batchcode: this.BatchObject.batch_code,
      subjectgroupid: this.selectedObject.subject_group_id,
      subject_group_code: this.selectedObject.subject_group_code,
      quota_status: 'XXXX',
    };

    this.commonService
      .Post_json_data<AdmissionQuotasubjectGroups[]>(Students_url.CheckSubjectGroupQuota, jsonin)
      .subscribe((response) => {
        this.QuotaStatus = response.data
        if (this.QuotaStatus[0].quota_status != 'OPEN') {
          this.globalmessage.Show_error('Quota Closed! Select Different Group Code.');
          this.additionalSubjectsForm.controls['batchSubjects'].setValue('');
          this.SubjectGroups = '';
        }
      });
  }

  addSubjectsPayment() {
    this.submitted = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar: this.oSession.aadhaar,
      batch_code: this.BatchObject.batch_code,
      subject_group_id: this.selectedObject.subject_group_id,
      subject_group_code: this.selectedObject.subject_group_code,
      term_code: 9999,
    };
    this.commonService
      .Post_json_data<Ires_Reciept>(Students_url.IU_Admission, jsonin)
      .subscribe((response) => {

        this.ReceiptID = this.res_reciept.receiptid;
        this.ReceiptNo = this.res_reciept.receiptno;
        if (this.ReceiptID > 0) {
          this.RegistrationPayment();
        }
      });
  }

  // BillDeskcheckSumQuery() {
  //   this.billdeskquerymsg = {
  //     "finyear": this.FinyearSession,
  //     "collegecode": this.CollegeCodeSession,
  //     "aadhaar": this.AadharSession,
  //     "batchcode": parseInt(this.BatchCode),
  //     "CustomerID": String(this.ReceiptNo)
  //   }
  //   this.additionalsubjectsService.BillDeskcheckSumQuery(this.billdeskquerymsg).subscribe(response => {
  //   })
  // }
  RegistrationPayment() {
    let nTranscationamount = '';
    if (this.oSession.demo == 'true') {
      nTranscationamount = '1';
    } else {
      nTranscationamount = String(this.BatchObject.formamount);
    }
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.BatchObject.batch_code,
      aadhaar: this.oSession.aadhaar,
      termcode: 9999,
      MerchantID: '',
      CustomerID: String(this.ReceiptNo),
      Filler1: 'NA',
      TxnAmount: String(this.BatchObject.formamount),
      // "TxnAmount": "1",
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
      AdditionalInfo2: '',
      AdditionalInfo3: String(this.BatchObject.formamount),
      AdditionalInfo4: String(this.oSession.aadhaar),
      AdditionalInfo5: '9999',
      AdditionalInfo6: '1',
      AdditionalInfo7: String(this.ReceiptID),
      TypeField3: 'NA',
      Feestype: 'FORMFEES',
    };
    this.commonService
      .Post_json_data<string>(Students_url.BillDeskcheckSum, jsonin)
      .subscribe((response) => {
        this.billdeskRequestMsg = response.data;
        if (this.billdeskRequestMsg != null) {
          BilldeskPay(this.billdeskRequestMsg, "", "");
        }
        // this.StudentAppliedCourses();
      });
  }
}
