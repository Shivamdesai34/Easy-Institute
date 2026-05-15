import {Component, EventEmitter, OnInit, Output, Renderer2, ViewChild,} from '@angular/core';
import {FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';

import {WidgetService} from '../widgets.service';
import {PlatformLocation} from '@angular/common';

import {BilldeskPay} from './../../../../assets/javascript/billdesk';
import * as myGlobals from '../../../globals/global-variable';
import {GlobalMessage} from "../../../globals/global.message";
import {cilArrowTop, cilOptions} from '@coreui/icons';
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {CommonService} from "../../../globals/common.service";
import {
  Common_url, Students_url
} from "../../../globals/global-api";
import {
  Ireq_admissionstarted,
  Ireq_checksubjectgroupquota, Ireq_eligibilitydata,
  Ireq_nextsubjects,

} from "../../../models/request";
import {Sessiondata} from "../../../models/Sessiondata";

import {SessionService} from "../../../globals/sessionstorage";
import {Imaxbatch, Ires_validateadmissionstarted} from "../../../models/response";
import {Ires_validateEligiblestudents, Subjects_group_h} from "../../../models/response";
import {Global_FORMFEESTERMNAME, Global_NONE} from "../../../globals/global-variable";
import {
    ButtonDirective,
    CardBodyComponent, CardComponent, CardHeaderComponent,
    ColComponent,
    DropdownComponent, DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective, FormControlDirective,
    FormDirective, FormLabelDirective,
    FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent,
    RowComponent, TemplateIdDirective,
    WidgetStatAComponent
} from "@coreui/angular-pro";
import {IconComponent, IconDirective} from "@coreui/icons-angular";

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  providers: [WidgetService],
    imports: [
        CardBodyComponent,
        RowComponent,
        ColComponent,
        WidgetStatAComponent,
        DropdownComponent,
        IconDirective,
        RouterLink,
        IconComponent,
        ModalComponent,
        ModalHeaderComponent,
        ReactiveFormsModule,
        ModalBodyComponent,
        ModalFooterComponent,
        CardComponent,
        CardHeaderComponent,
        DropdownMenuDirective,
        ButtonDirective,
        DropdownToggleDirective,
        TemplateIdDirective,
        DropdownItemDirective,
        FormDirective,
        FormLabelDirective,
        FormSelectDirective,
        FormControlDirective
    ],
  standalone: true
})
export class WidgetsDropdownComponent implements OnInit {

  icons = {cilOptions, cilArrowTop,};

  options: any = {};

  BatchCodes: number = 0;

  modalForm!: UntypedFormGroup;
  //Modal
  aBatchs!: Imaxbatch[];

  aSubjects!: Subjects_group_h[];
  selected_subject!: Subjects_group_h;

  batchcode: any;
  SubjectGroups: any;
  selected_Batch!: Imaxbatch;

  SubjectGroupID: any;
  formAmount: any;

  Incremental_batch: any;

  public paymentmodalform = false;

  StatusMessage: any;

  res: any;

  FeesAttachedMsg: any;

  BatchCode: any;
  data: any;

  SubjectGroupCode: any;

  modalSubmit: any;
  ReceiptID: any;
  ReceiptNo: any;

  billdeskRequestMsg: any;

  visiblebatch = false;
  visivlebatch_atkt = false;

  QuotaStatus: any;
  regbatchname = "";

  res_admissionstarted! : Ires_validateadmissionstarted

  res_validateeligibility!: Ires_validateEligiblestudents;

  oSession!: Sessiondata;

  constructor(
    private renderer: Renderer2, private sessionservice: SessionService,
    private formBuilder: UntypedFormBuilder,
    private router: Router, private commonService: CommonService,
    private globalmessage: GlobalMessage
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

    this.oSession = new Sessiondata(this.sessionservice)
    this.oSession.Getdatafromstroage();


    // if(this.oSession.studenttype == 'OUTSIDE'){
    //   this.BatchObject.setValue(this.oSession.registerbatchname)
    // }

    if (this.oSession.studenttype == 'OUTSIDE') {
      this.modalForm = this.formBuilder.group({
        // grnNo: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
        batchSubjects: ['', Validators.required],
        batch_name: ['', Validators.required],
      });
    } else {
      this.modalForm = this.formBuilder.group({
        // grnNo: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
        batch: ['', Validators.required],
        batchSubjects: ['', Validators.required],
      });
    }


    if (this.oSession.studenttype == 'OUTSIDE') {
      this.regbatchname = this.oSession.registerbatchname!
      this.visiblebatch = true;

    } else {
      this.visivlebatch_atkt = true
      this.visiblebatch = false;
    }

    this.renderExternalScript(
      'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
    ).onload = () => {
    };

    if (this.oSession.lastyearoutstanding == 'true'){
      this.globalmessage.Show_error('Please pay your outstanding.')
      this.router.navigate(['Fees'])
    }else{
      this.ValidateEligibility();
    }
    // this.CheckOutstanding();
  }


  get isValid() {
    if (this.modalForm.controls['batchSubjects'].value == "--- Please Select --") {
      return !this.modalForm.controls['batchSubjects'].invalid;
    } else {
      return !this.modalForm.controls['batchSubjects'].valid;
    }

  }

  get f() {
    return this.modalForm.controls;
  }

  openYesNoDialog(msg: any) {
    this.globalmessage.Show_message('Delete');
  }

  // CheckOutstanding() {
  //
  //   let outstanding = {
  //     finyear: this.oSession.lastfinyear,
  //     college_code: this.oSession.collegecode,
  //     aadhaar: this.oSession.aadhaar,
  //     batch_code: -99,
  //   };
  //
  //   let jsonin = {
  //     Input: encryptUsingAES256(outstanding)
  //   };
  //
  //   this.commonService.Post_json(checkoutstanding, jsonin).subscribe((response) => {
  //     this.res = response;
  //     if (this.res.data.Outstanding == true) {
  //
  //       this.globalmessage.Show_error('Please pay your pending Fees to Proceed!')
  //
  //       this.router.navigate(['/dashboard']);
  //     }
  //     if (this.res.data.Outstanding == false) {
  //       if (this.oSession.studenttype == myGlobals.Global_NONE) {
  //         this.ValidateEligibility();
  //       } else {
  //         this.Incremental_batch = this.BatchCodes;
  //       }
  //     }
  //   });
  // }

  PayFormFees() {
    // this.admissionstartedvalidate()
  }

  admissionstartedvalidate() {

    let jsonin = {}
    if (this.oSession.studenttype == Global_NONE) {
        jsonin = {
        finyear: this.oSession.finyear,
        college_code: this.oSession.collegecode,
        batch_code: this.Incremental_batch,
      };
    }else{
      jsonin = {
        finyear: this.oSession.finyear,
        college_code: this.oSession.collegecode,
        batch_code: this.oSession.register_batchcode,
      };
    }



    let jsonin_input = {
      Input: encryptUsingAES256(jsonin)
    };

    this.commonService
      .Post_json_data<Ires_validateadmissionstarted>(Students_url.validateadmissionstarted, jsonin_input)
      .subscribe(
        (response) => {


            this.res_admissionstarted = response.data

          if (this.res_admissionstarted.Admissionstarted == 1) {
            this.PaidFormFeesdetail()
          }else{
            this.globalmessage.Show_error('Admission not started.')
            this.router.navigate(['/dashboard'])
          }
        }, error => {
          this.globalmessage.Show_error(error.error.exception)
          this.router.navigate(['/dashboard'])
        });
  }

  PaidFormFeesdetail() {
    // this.router.navigate(['/students/fillprofile']);

    if (this.oSession.studenttype == 'OUTSIDE') {
      this.modalForm.controls['batch_name'].setValue(this.regbatchname)
      this.registerSelectBatchSubjects();
      this.paymentmodalform = true;

    } else {

      this.FormFeesPaid();
      this.modalSelectBatchSubjects(event);
      // this.openModal();

    }
  }

  DocumentApproval() {
    this.MarksheetApprovalStatus();
    // this.FeesAttached();
  }

  PayFees() {
    this.router.navigate(['Fees']);
  }

  FormFeesPaid() {

    if (this.oSession.studenttype == myGlobals.Global_OUTSIDE || this.oSession.studenttype == myGlobals.Global_ATKT) {
      this.Incremental_batch = this.oSession.batchcode;
    }

    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      BatchCode: this.res_admissionstarted.Batch_code,
      Aadhaar: this.oSession.aadhaar,
    };


    let jsonin_input = {
      Input: encryptUsingAES256(jsonin)
    };

    this.commonService.Post_json_data(Students_url.FormFeesPaid_URL, jsonin_input).subscribe((response) => {
      this.res = response;
      if (this.res.data == true) {
        this.globalmessage.Show_message('You have already Paid form fees!')
      }
      if (this.res.data == false) {
        this.BatchandSubjectSelection();
      }
    });
  }

  ValidateEligibility() {

    let eligibilitydata: Ireq_eligibilitydata = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
    };

    let jsonin = {
      Input: encryptUsingAES256(eligibilitydata)
    };

    this.commonService.Post_json_data(Students_url.validateeliglibity, jsonin).subscribe(
      (response) => {

        this.res_validateeligibility = response.data
        // this.res = response;
        this.Incremental_batch = 0;

        // if (this.res_validateeligibility.Admissionstated == 1) {
        //   this.Incremental_batch = this.res_validateeligibility.Incremental_batch;
        //   this.PaidFormFeesdetail()
        // }else{
        //   this.globalmessage.Show_error(this.res_validateeligibility.Message)
        //   this.router.navigate(['/dashboard'])
        // }

        if (this.res_validateeligibility.eligible == 'PASS') {
          this.Incremental_batch = this.res_validateeligibility.incremental_batch;
          // this.validateadmissionstarted();
         this.admissionstartedvalidate();
        }
        if (this.res_validateeligibility.eligible == 'NOTELIGIBLE' ) {

          this.globalmessage.Show_error('You are not eligible for this course!')

          this.router.navigate(['dashboard']);
        }
        if (this.res_validateeligibility.Eligible == 'FAIL' ) {

          this.globalmessage.Show_error('You are not eligible for this course!')

          this.router.navigate(['dashboard']);
        }
      },
      (error) => {
        if (error.error !== null) {
          console.error('error caught in component', error);
          Swal.fire({
            title: 'Error!',
            text: error.error.exception,
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
          this.router.navigate(['dashboard']);
        } else {
          Swal.fire({
            title: 'Error!',
            text: error.status + 'Server Error!',
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        }
        // this.resetAll();
      }
    );
  }

  MarksheetApprovalStatus() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
      Batchcode: this.Incremental_batch,
    };

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin)
    };

    this.commonService
      .Post_json_data(Students_url.Admissionstatus, jsonin_input)
      .subscribe((response) => {
        this.res = response;
        this.StatusMessage = this.res.data;
        // if (this.StatusMessage == "APPROVED") {
        //   const completedDoc = "Your Document Approval is Completed  Your Fee Configuration is Completed"+"<br/>";
        //   const completeFees = " You can proceed to Fee payment	\n"
        //   Swal.fire({
        //     title: 'Status!',
        //     text: completedDoc + completeFees,
        //     icon: 'success',
        //     confirmButtonText: 'OK'
        //   })//alert
        // }
        // else {

        // }
      });
    this.FeesAttached();
  }


  FeesAttached() {

    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
      Batchcode: this.Incremental_batch,
    };

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin)
    };

    this.commonService.Post_json_data(Students_url.Feesattached, jsonin_input).subscribe((response) => {
      this.res = response;
      this.FeesAttachedMsg = this.res.data;

      //  if (this.res.data == true && this.StatusMessage=="APPROVED")  {
      //   Swal.fire({ title: 'Status!',
      //    html: "Your Document Approval is Completed  Your Fee Configuration is Completed<br />html included",
      //    text: "Your Document Approval is Completed  Your Fee Configuration is Completed. You can proceed to Fee payment	",
      //    icon: 'success',
      //   confirmButtonText: 'OK' })//alert
      // }
      // else {

      // }
    });
  }

  //Modal Form
//ShivAm
  BatchandSubjectSelection() {
    this.paymentmodalform = true;
    this.modalSelectBatch();
  }

//
//     NgbModalOptions: NgbModalOptions = {
//         backdrop: 'static',
//         keyboard: false,
//         centered: true,
//         size: 'lg',
//     };
//
//     closeModal() {
//         this.modalService.dismissAll();
//         // this.router.navigate(['']);
//     }


  modalSelectBatch() {
    let jsonin = {
      Finyear: this.oSession.lastfinyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
    };

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin)
    };

    this.commonService.Post_json_data(Students_url.Studentmaxbatch, jsonin_input).subscribe((response) => {
      this.aBatchs = response.data;
    });
  }

  registerSelectBatchSubjects() {

    let jsonin = {
      BatchCode: this.oSession.register_batchcode,
    };

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin)
    };

    this.commonService.Post_json_data(Common_url.BatchSubjects, jsonin_input).subscribe((response) => {
      this.aSubjects = response.data;
    });
  }

  modalSelectBatchSubjects(event: any) {


    this.BatchCode = event.Batch_Code;
    this.formAmount = event.FormAmount;

    // if (this.oSession.demo == 'true') {
    //   this.formAmount = 1
    // }

    let jsonin: Ireq_nextsubjects = {
      Finyear: this.oSession.lastfinyear,
      Collegecode: this.oSession.collegecode,
      BatchCode: this.BatchCode,
      Aadhaar: this.oSession.aadhaar,
    };

    let jsonin_input = {
      Input: encryptUsingAES256(jsonin)
    };

    this.commonService.Post_json_data(Students_url.Nextbatchsubjects, jsonin_input).subscribe((response) => {
      this.aSubjects = response.data;

    });
  }

  onGroupSelected(event: any) {

    this.selected_subject = event

    this.SubjectGroups = event.Subject_group_name;
    this.SubjectGroupID = event.Subject_group_id;
    this.SubjectGroupCode = event.Subject_group_code;

  }


  CheckSubjectGroupQuota() {


    let jsonin: Ireq_checksubjectgroupquota = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.selected_Batch.Batch_Code,
      subjectgroupid: this.selected_subject.Subject_group_id,
      subject_group_code: this.selected_subject.Subject_group_code,
      quota_status: 'XXXX',
    };


    let jsonin_input = {
      Input: encryptUsingAES256(jsonin)
    };

    this.commonService
      .Post_json_data(Students_url.CheckSubjectGroupQuota, jsonin_input)
      .subscribe((response) => {
        this.QuotaStatus = response.data[0].Quota_status;
        if (this.QuotaStatus != 'OPEN') {
          this.globalmessage.Show_error('Quota Closed! Select Different Group Code.')
          this.modalForm.controls['batchSubjects'].setValue('');
          this.SubjectGroups = '';
        } else {
          this.IU_Admission()
        }
      });
  }

  IU_Admission() {


    this.modalSubmit = true

    if (this.selected_Batch == null) {
      this.globalmessage.Show_error('Please select batch')
      return;
    }

    if (this.selected_subject == null) {
      this.globalmessage.Show_error('Please select subject')
      return
    }


    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar: this.oSession.aadhaar,
      batch_code: this.selected_Batch.Batch_Code,
      subject_group_id: this.selected_subject.Subject_group_id,
      subject_group_code: this.selected_subject.Subject_group_code,
      term_code: myGlobals.Global_FORMFEESTERMNAME,
    };


    this.commonService.Post_json_data(Students_url.IU_Admission, jsonin).subscribe((response) => {

      this.ReceiptID = response.data.ReceiptID;
      this.ReceiptNo = response.data.ReceiptNo;
      if (this.ReceiptID > 0) {
        this.RegistrationPayment();
      }
    });
  }


  RegistrationPayment() {

    if (this.oSession.demo == 'true') {
      this.formAmount = 1;
    }

    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.selected_Batch.Batch_Code,
      aadhaar: this.oSession.aadhaar,
      termcode: myGlobals.Global_FORMFEESTERMNAME,
      MerchantID: '',
      CustomerID: this.ReceiptNo,
      Filler1: 'NA',
      TxnAmount: String(this.formAmount),
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
      AdditionalInfo3: String(this.selected_Batch.Batch_Code),
      AdditionalInfo4: String(this.oSession.aadhaar),
      AdditionalInfo5: String(myGlobals.Global_FORMFEESTERMNAME),
      AdditionalInfo6: '1',
      AdditionalInfo7: String(this.ReceiptID),
      TypeField3: 'NA',
    };


    this.commonService
      .Post_json_data(Students_url.BillDeskcheckSum, jsonin)
      .subscribe((response) => {

        this.billdeskRequestMsg = response.data;
        if (this.billdeskRequestMsg != null) {
          BilldeskPay(this.billdeskRequestMsg, "", "");
        }
      });
  }

  onselectedsubject(event: any) {
    this.selected_subject = event
  }

  handleLiveDemoChange(event: any) {
    this.paymentmodalform = event;
  }

  CloseModal() {
    this.paymentmodalform = false
  }

}
