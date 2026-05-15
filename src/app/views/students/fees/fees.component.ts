import {Component, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FeesService} from './fees.service';
import {BilldeskPay} from './../../../../assets/javascript/billdesk';
import {GlobalMessage} from "../../../globals/global.message";
import {
  AdmissionQuotasubjectGroups, Imyinstallment,
  Ires_ApprovedCourse,
  Ires_installments,
  Ires_Reciept,
  Paymentterms,
  Student_Profile,
  Student_ProfileStatus,
  Subjects_group_h
} from "../../../models/response";
import {CommonService} from "../../../globals/common.service";
import {Common_url, Students_url,} from "../../../globals/global-api";
import {Ireq_approvedcourse, Ireq_checkadmission, Ireq_StudentProfileStatus_url} from "./fees.requestmodel";
import {SessionService} from "../../../globals/sessionstorage";
import {Sessiondata} from "../../../models/Sessiondata";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormLabelDirective,
  FormSelectDirective,
  RowComponent,
  SpinnerComponent,
  TableDirective
} from "@coreui/angular-pro";
import {environment} from "../../../../environments/environment";
import {JsonPipe} from "@angular/common";

@Component({
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    ReactiveFormsModule,
    ColComponent,
    RowComponent,
    FormCheckComponent,
    SpinnerComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ButtonDirective,
    FormCheckInputDirective,
    TableDirective,
    FormCheckLabelDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormControlDirective,
    JsonPipe,
    FormsModule
  ],
  standalone: true
})
export class FeesComponent implements OnInit {
  Rjcollegeemail: string = "rjcollege@rjcollege.edu.in"
  FeesPaymentForm!: UntypedFormGroup;
  PaymentForm!: UntypedFormGroup;
  res_Reciept = {} as Ires_Reciept
  TermCode: any;
  InstallmentID: any;
  Quota_status: any;
  QuotaStatus:  AdmissionQuotasubjectGroups[] = [];
  feesPaid: any;
  FullName: any;
  Mobile: any;
  BatchName: any;
  Email: any;
  InstallmentName: any;

  Installmentuuid: string = ""
  Batchuuid: string = ""

  Demoversion: boolean = false;
  submitted = false;
  data: any;
  FeeStructure: Ires_installments[] = [];
  selectedFeesChange: any;
  selectedBatchCode: any = '';
  selectedSubjectGroupId: any = '';
  selectedSubjectGroupCode: any = '';
  ShowDeclaration = false;
  selectedObject: any;
  Batch: any;
  batchSubjects: Subjects_group_h[]=[];
  SubjectGroups: any;
  SubjectGroupID: any;
  res: any;
  index: any;
  Installments: any;
  Header: any;
  Lineitem: any;
  Amount: any;
  FeeReceipt = false;
  FeeModal = true;
  changeState = true;
  billdeskRequestMsg: string='';
  firstSubjectGroupID: any;
  firstBatchCode: any;
  firstSelectedBatch: any;
  firstSubjectGroupName: any;
  firstSubjectGroupCode: any;
  ActiveFinyear:number=0
  //loader

  feesloader = false;
  paymentloader = false;
  billdeskquerymsg!: {
    finyear: number;
    collegecode: number;
    aadhaar: number;
    batchcode: number;
    CustomerID: string;
  };
  selectedBatchName: any;
  SubjectGroupCode: any;
  TotalAmount: number = 0;
  firstInstallmenttext = false;
  InstallmentTerm = '';
  paymentterms!: Paymentterms;
  aApprovedCourses: Ires_ApprovedCourse[]=[];
  selected_batch!: Ires_ApprovedCourse;
  profile_res = {} as Student_ProfileStatus;
  selected_profile_res = {} as Student_Profile
  aInstallment_res!: Ires_installments;
  oSession!: Sessiondata;
  feesamountValueLength: number | null = null;

  MyInstallment: Imyinstallment[] = []

  constructor(
    private router: Router, private commonService: CommonService,
    private feesService: FeesService, private sessionservice: SessionService,
    private formBuilder: UntypedFormBuilder,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private globalmessage: GlobalMessage
  ) {
    // let xDomain = myGlobals.Domainname.toUpperCase();
    // if (xDomain.search('LOCALHOST') != -1) {
    //     this.Demoversion = true;
    // }
    // if (xDomain.search('DEMO') != -1) {
    //     this.Demoversion = true;
    // }
  }

  AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
  FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
  // BatchCode = parseInt(sessionStorage.getItem('BatchCode')!);
  TokenSession = sessionStorage.getItem('token');

  // StudentType = sessionStorage.getItem('StudentType');
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
    return this.FeesPaymentForm.controls;
  }

  ngOnInit() {
    this.oSession = new Sessiondata(this.sessionservice)
    this.oSession.Getdatafromstroage();

    // if(ValidateFormfeesnotpaidProfilenotsubmitted(this.oSession.isprofilesubmited!,this.oSession.formfeesrecieved!)){
    //   this.router.navigate(['dashboard']);
    // }
    /*
    if (this.oSession.studenttype == 'ATKT') {
        this.studentactivefinyear();
        this.checkAdmission();
        this.StudentProfileStatus();
    } else if (this.oSession.studenttype == 'OUTSIDE') {
        this.studentactivefinyear();
        this.checkAdmission();
        this.StudentProfileStatus();
    } else if (this.oSession.studenttype == 'NONE') {
        this.CheckOutstanding();
    }
    // this.CheckOutstanding();

     */
    // https://services.billdesk.com/checkout-widget/src/app.bundle.js
    this.renderExternalScript(
      'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
    ).onload = () => {
    };
    this.CreateForm()
    this.StudentApprovedCourses();

  }

  CreateForm() {
    this.FeesPaymentForm = this.formBuilder.group({
      batch: ['', Validators.required],
      batchSubjects: ['', Validators.required],
      installment: ['', Validators.required],
      // checkbox: ['', Validators.required],
      feesamount: [0, Validators.required],
    });

    this.PaymentForm = this.formBuilder.group({
      checkdec: ['', Validators.required],
      termsandconditions: ['', Validators.required]
      // checkdec: ['', Validators.required],
    });

    // if (this.InstallmentID > 1) {
    //   this.PaymentForm = this.formBuilder.group({
    //     termsandconditions: ['', Validators.required],
    //   });
    // } else {
    //   this.PaymentForm = this.formBuilder.group({
    //     checkdec: ['', Validators.required],
    //     termsandconditions: ['', Validators.required]
    //     // checkdec: ['', Validators.required],
    //   });
    // }

    this.FeesPaymentForm.controls['batch'].valueChanges.subscribe((value) => {
      this.selected_batch = value;
      // console.log(this.selected_batch);
    })

    // this.FeesPaymentForm.controls['feesamount'].valueChanges.subscribe((value) => {
    //
    //   this.selectedFeesChange = value;
    //   console.log('feesamount', this.selectedFeesChange)
    //   // if (value.length > 0) {
    //   //   this.InstallmentValidation();
    //   // }
    // });



    // this.FeesPaymentForm.controls['installment'].
  }

  studentactivefinyear() {
    this.feesService.studentactivefinyear("").subscribe((response) => {
      if (response == null) {
        return;
      }
      this.ActiveFinyear=response
      this.FinyearSession = response;
    });
  }

  checkAmountLength() {
    this.FeesPaymentForm.controls['feesamount'].valueChanges.subscribe((value) => {
        this.selectedFeesChange = value;
      });
    this.Amount=this.selectedFeesChange;
}

  InstallmentValidation() {
    this.studentactivefinyear();
    // if (this.oSession.finyear <= 0) {
    //     this.globalmessage.Show_message('Fincial year not found');
    //     return;
    // }
    this.feesloader = true
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: parseInt(this.selected_batch.batch_code),
      Subjectgroupuuid : this.selected_batch.subjectgroupuuid,
      // aadhaar: this.oSession.aadhaar,
      termcode: this.TermCode,
      installment: this.InstallmentID,
    };
    let input_jsonin = {
      Input: encryptUsingAES256(jsonin)
    };
    this.feesService.InstallmentValidation(input_jsonin).subscribe((response) => {
      // console.log(response);
      this.feesloader = false;
      if (response.data == false) {
        this.globalmessage.Show_message(response.message);
        this.resetAll();
      } else {
        // this.FinyearSession = this.data.finyear;
        this.paymentShowDetails();
        this.CheckSubjectGroupQuota();
      }
      // this.showFeesAmount(this.FeeStructure);
    });
  }

  //new 13-07-2022
  StudentApprovedCourses() {
    let jsonin: Ireq_approvedcourse = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      // Aadhaar: this.oSession.aadhaar,
    };
    let input_jsonin = {
      Input: encryptUsingAES256(jsonin)
    };
    this.feesService.StudentApprovedCourses(input_jsonin).subscribe((response) => {
      this.aApprovedCourses = response.data

      console.log('aApprovedCourses',this.aApprovedCourses);

      if (this.aApprovedCourses == null) {
        this.globalmessage.Show_message('You have not approved in any course')
        return
      }
    });
  }

  formFees: any;

  FormFeesPaid() {
    // if (this.FinyearSession <= 0) {
    //     this.FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
    // }
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      BatchCode: this.oSession.batchcode,
      // Aadhaar: this.oSession.aadhaar,
    };
    let input_jsonin = jsonin
    this.commonService.Post_json_data(Students_url.FormFeesPaid_URL, input_jsonin).subscribe((response) => {
      this.res = response;
      if (this.res.data == true) {
        this.checkAdmission();
        this.StudentProfileStatus();
      }
      if (this.res.data == false) {
        //ShiVAm
        //   this.router.navigate['/dashboard'];
        this.globalmessage.Show_message('Please pay your form fees  xxx!')
      }
    });
  }

  print() {
    // tslint:disable-next-line:no-unused-expression
    window && window.print();
  }

//ShiVam
  openYesNoDialog(msg: any) {
    this.globalmessage.Show_message(msg)
    //     // negative: 'No',
    //     // neutral: 'Not sure'
    //
    //   .then((response: any) => {}, () => {
    //     }
    //   );
  }

  checkAdmission() {
    //Prakash 13/4/2024
    // if (this.oSession.finyear! <= 0) {
    //     this.openYesNoDialog('Financial year not found!');
    //     this.oSession.finyear = parseInt(this.oSession.finyear);
    // }
    // if (this.oSession.aadhaar! <= 0) {
    //     this.openYesNoDialog('aadhaar  not found!');
    // }
    let jsonin: Ireq_checkadmission = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      // Aadhaar: this.oSession.aadhaar,
    };
    let input_jsonin = {
      Input: encryptUsingAES256(jsonin)
    };
    this.feesService.CheckAdmission_URL(input_jsonin).subscribe((response) => {
      this.selectedBatchCode = response.data.batch_code;
      this.selectedSubjectGroupId = response.data.subject_group_id;
      this.selectedSubjectGroupCode = response.data.subject_group_code;
      this.selectedBatchName = response.data.batch_name;
      this.feesPaid = response.data.feespaid;
      this.oSession.finyear = this.oSession.finyear;
      this.StudentApprovedCourses();
    });
  }

  StudentProfileStatus() {
    let jsonin: Ireq_StudentProfileStatus_url = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      // Aadhaar: this.oSession.aadhaar,
      studenttype: this.oSession.studenttype,
      webportname: 'STUDENTS',
    };
    let input_jsonin = jsonin
    this.commonService.Post_json_data<Student_ProfileStatus>(Students_url.StudentProfileStatus_url, input_jsonin).subscribe((response) => {
      this.profile_res = response.data

      if (this.profile_res.profile.aadhaar == 0) {
        // Prakash
        if (this.oSession.studenttype == 'ATKT') {
          this.router.navigate(['/Fillprofile']);
        }
        if (this.oSession.studenttype == 'OUTSIDE') {
          this.router.navigate(['/Fillprofile']);
        }
        if (this.oSession.studenttype == 'NONE') {
          this.router.navigate(['/fillprofile']);
        }
      } else if (this.profile_res.education == false) {
        if (this.oSession.studenttype == 'ATKT') {
          this.router.navigate(['/Fillprofile']);
        }
        if (this.oSession.studenttype == 'OUTSIDE') {
          this.router.navigate(['/Fillprofile']);
        }
        if (this.oSession.studenttype == 'NONE') {
          // this.router.navigate(["/students/fillprofile"])
        }
      }
    });
  }

  onBatchSelected(event: any) {
    if (this.selected_batch != null) {
      this.ShowInstallmentDetails();
      this.get_installmentDetails();

    }
  }

  onSubjectSelect(event: any) {
    //this.firstSubjectGroupCode = event.Subject_group_code;
    this.firstSubjectGroupName = event.subject_group_name;
    // console.log('firstSubjectGroupName',this.firstSubjectGroupName)
  }

  SelectBatchSubjects() {
    if (this.selectedBatchCode != null || this.selectedBatchCode != undefined) {
      let jsonin = {
        BatchCode: this.selectedBatchCode,
      };
      this.commonService.Post_json_data<Subjects_group_h[]>(Common_url.BatchSubjects, jsonin).subscribe((response) => {
        this.batchSubjects = response.data;
        for (var key in this.batchSubjects) {
          if (this.batchSubjects.hasOwnProperty(key)) {
            if (
              this.batchSubjects[key].subject_group_code ==
              this.selectedSubjectGroupCode
            ) {
              this.selectedObject = this.batchSubjects[key].subject_group_code;
              this.SubjectGroups = this.batchSubjects[key].subject_group_name;
            }
          }
        }
        // this.selectedObject = this.batchSubjects[0].Subject_group_code
        // this.SubjectGroups = this.batchSubjects[0].Subject_group_name
        if (this.selected_batch != null) {
          this.ShowInstallmentDetails();
        }
      });
    } else {
      this.openYesNoDialog('Select Batch');
      // alert("Select Batch")
    }
  }

  onGroupSelected(event: any) {
    // this.SubjectGroups = event.Subject_group_name
    // this.SubjectGroupID = event.Subject_group_id;
    // this.Quota_status = event.Quota_status;
    for (var key in this.batchSubjects) {
      if (this.batchSubjects.hasOwnProperty(key)) {
        if (this.batchSubjects[key].subject_group_code == event) {
          this.SubjectGroups = this.batchSubjects[key].subject_group_name;
          this.SubjectGroupID = this.batchSubjects[key].subject_group_id;
          this.SubjectGroupCode = this.batchSubjects[key].subject_group_code;
          this.Quota_status = this.batchSubjects[key].quota_status;
        }
      }
    }
  }

  ShowInstallmentDetails() {
    this.submitted = true;
    let jsonin = {
      CollegeCode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      BatchCode: parseInt(this.selected_batch.batch_code),
      Subjectgroupuuid: this.selected_batch.subjectgroupuuid,
      // Aadhaar: this.oSession.aadhaar,
    }

    console.log('jssss',jsonin)
    // let input_jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };
    this.commonService.Post_json_data<Ires_installments>(Students_url.studentfeesinstallment_new,jsonin)
      .subscribe((response) => {
        this.aInstallment_res = response.data;
        // console.log(this.aInstallment_res);
        if (this.aInstallment_res.message == "") {
        } else {
          this.globalmessage.Show_error(this.aInstallment_res.message);
          return;
        }
        if (this.aInstallment_res.installmentalreadypaid == true) {
          this.globalmessage.Show_message('All Installments are Paid!');
          return;
        }
        if (this.aInstallment_res.installments == null) {
          this.globalmessage.Show_error('No Installments Found!');
          return;
        }
      });
  }

  CheckSubjectGroupQuota() {

    this.showReceipt()

    return
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: parseInt(this.selected_batch.batch_code),
      Subjectgroupuuid : this.selected_batch.subjectgroupuuid,
      subjectgroupid: parseInt(this.selected_batch.subject_group_id),
      subject_group_code: this.selected_batch.subject_group_code,
      quota_status: 'XXXX',
    };
    // let input_jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };
    this.commonService
        .Post_json_data<AdmissionQuotasubjectGroups>(Students_url.CheckSubjectGroupQuota,jsonin).subscribe((response) => {

      // if (response.data == null) {
      //   this.globalmessage.Show_error('No data found')
      //   return
      // }


      //Shivam2804
      // let QuotaStatus: AdmissionQuotasubjectGroups = {} as AdmissionQuotasubjectGroups;
      // QuotaStatus = response.data
      // if (QuotaStatus.quota_status == 'CLOSE') {
      //   this.globalmessage.Show_message('Quota Closed! Select Different Group Code.');
      //   this.changeState = false;
      // }else {
      //   this.showReceipt()
      // }


      //Shivam1205
      // this.showReceipt()


      //     this.QuotaStatus = response.data;
      //
      // if (this.feesPaid <= 0) {
      //   if (this.QuotaStatus[0].quota_status != 'OPEN') {
      //     this.globalmessage.Show_message('Quota Closed! Select Different Group Code.');
      //     this.changeState = false;
      //   } else {
      //     this.showReceipt();
      //   }
      // } else {
      //   this.showReceipt();
      //   // this.openYesNoDialog("Subject Group cannot be changed!")
      // }
    });
  }

  showFeesAmount(FeeStructure: any) {
    this.Amount = FeeStructure.header.amount;
    // this.Amount = this.selectedFeesChange;
    this.TermCode = FeeStructure.header.term_code;
    this.FullName = FeeStructure.header.fullname;
    this.BatchName = FeeStructure.header.batchname;
    this.Mobile = FeeStructure.header.mobile;
    this.Email = FeeStructure.header.emailid;
    this.InstallmentID = FeeStructure.header.installmentid;
    this.InstallmentName = FeeStructure.header.installment;
    this.Installmentuuid = FeeStructure.header.installmentuuid;
    this.Batchuuid = FeeStructure.header.batchuuid;

    this.Lineitem = FeeStructure.lineitem;
    // console.log('FeeStructure',FeeStructure);

    // const ShowDeclaration_ctrl = this.FeesPaymentForm.get('checkbox');

    const checkdec_ctrl = this.PaymentForm.get('checkdec');


    const validators = [Validators.required];

    console.log('iDd',this.InstallmentID)


    // if (this.InstallmentID == 1) {
    //   this.InstallmentTerm = this.selected_batch.atkt_message
    //
    //   console.log('iDdttt',this.InstallmentTerm)
    //
    //   // this.ShowDeclaration = true;
    //   this.firstInstallmenttext = true;
    //
    //   console.log('iDdtexttt',this.firstInstallmenttext)
    //
    //   checkdec_ctrl!.addValidators(validators);
    //   // this.FeesPaymentForm = this.formBuilder.group({
    //   //     checkbox: ['', Validators.required],
    //   // });
    // } else {
    //   // this.ShowDeclaration = false;
    //
    //   // this.InstallmentTerm = this.selected_batch.atkt_message
    //   //
    //   // this.firstInstallmenttext = true;
    //
    //   // checkdec_ctrl?.removeValidators(validators);
    //
    //   checkdec_ctrl!.removeValidators(validators);
    //   // this.FeesPaymentForm = this.formBuilder.group({
    //   //     checkbox: [''],
    //   // });
    // }

    if (this.InstallmentID > 1) {
      checkdec_ctrl?.removeValidators(validators);
      checkdec_ctrl?.setValue(null); // optional reset
    } else {
      this.InstallmentTerm = this.selected_batch.atkt_message
      this.firstInstallmenttext = true;
      // checkdec_ctrl?.setValidators([Validators.required]);
      checkdec_ctrl?.addValidators(validators);
    }


    this.TotalAmount = this.Amount
    checkdec_ctrl?.updateValueAndValidity();
    this.FeesPaymentForm.controls['feesamount'].setValue(this.Amount);
    console.log('FormVlaid?',this.FeesPaymentForm.valid)

    console.log('FormVlaid?',this.FeesPaymentForm.controls)

    this.InstallmentValidation()
  }

  paymentShowDetails() {
    this.feesService.paymentterms("").subscribe((response) => {
      if (response == null) {
        return;
      }
      this.paymentterms = response.data;
    });
  }

  showReceipt() {
    // this.CheckSubjectGroupQuota()
    // if(this.QuotaStatus == "OPEN"){
    //   this.openYesNoDialog("Quota Closed! Select Different Group Code.")
    //   this.changeState = false;
    // }
    // else{
    //   this.submitted = true;
    //   this.FeeReceipt = true;
    //   this.FeeModal = false;
    //   this.IU_Receipt();
    // }
    this.submitted = true;
    // this.FeeReceipt = true;
    // this.FeeModal = false;
    this.IU_Receipt();
  }

  ChangeInstallment() {
    // this.FeeModal = true;
    // this.FeeReceipt = false;
    // this.FeeStructure = '';
    this.Amount = '';
    this.resetAll();
  }

  resetAll() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      // if (this.StudentType == "ATKT") {
      //   this.router.navigate(["/Fees"]);
      // }
      // else if (this.StudentType == "OUTSIDE") {
      //   this.router.navigate(["/Fees"]);
      // }
      // else if (this.StudentType == "NONE") {
      //   this.router.navigate(["/students/fees"]);
      // }
    });
  }

  IU_Receipt() {
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      // aadhaar: this.oSession.aadhaar,
      batch_code: parseInt(this.selected_batch.batch_code),
      // batchuuid
      term_code: this.TermCode,
      installment: this.InstallmentID,
      existing_subject_group_id: parseInt(this.selected_batch.subject_group_id),
      paid_subject_group_id: parseInt(this.selected_batch.subject_group_id),
      existing_subject_group_code: this.selected_batch.subject_group_code,
      paid_subject_group_code: this.selected_batch.subject_group_code,
      termmessage: this.InstallmentTerm
    };

    console.log('vvvv',jsonin)

    // let input_jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };
    this.commonService.Post_json_data<Ires_Reciept>(Students_url.IU_receipt, jsonin).subscribe((response) => {
      this.res_Reciept = response.data
        // console.log('IU_Receipt',this.res_Reciept)
    });
  }

  // BillDeskcheckSumQuery() {
  //   this.billdeskquerymsg = {
  //     "finyear": this.FinyearSession,
  //     "collegecode": 1,
  //     "aadhaar": this.AadharSession,
  //     "batchcode": parseInt(this.selectedBatchCode),
  //     "CustomerID": String(this.ReceiptNO)
  //   }
  //   this.feesService.BillDeskcheckSumQuery(this.billdeskquerymsg).subscribe(response => {
  //   })
  // }
  FeesPayment() {

    // debugger
    this.paymentloader = true
    let nTranscationamount = "";
    // if (environment.demoMode) {
        nTranscationamount = this.FeesPaymentForm.controls['feesamount'].value;
    // }

    //  if (this.oSession.demo == 'true') {
    //     nTranscationamount = '1';
    // } else {
    //     nTranscationamount = String(this.Amount);
    // }
    if (this.PaymentForm.invalid) {
      this.openYesNoDialog(
        'Please Accept Terms & Conditions to Proceed to Payment!'
      );
    } else {
      let jsonin = {
         ...this.PaymentForm.value,
        collegecode: this.oSession.collegecode,
        finyear: this.oSession.finyear,
        batchcode: parseInt(this.selected_batch.batch_code),
        Subjectgroupuuid : this.selected_batch.subjectgroupuuid,
        termcode: this.TermCode,
        CustomerID: String(this.res_Reciept.receiptno),
        TxnAmount: String(nTranscationamount),
        AdditionalInfo6: String(this.InstallmentID),
        AdditionalInfo7: String(this.res_Reciept.receiptid),
        Feestype: '',
        batchuuid:this.Batchuuid,
        installmentuuid: this.Installmentuuid
        // feesamount: nTranscationamount,
      };
      if (this.res_Reciept.receiptid > 0) {
        this.commonService
          .Post_json_data<string>(Students_url.BillDeskcheckSum,jsonin)
          .subscribe((response) => {
            // console.log(response);
            this.paymentloader = false
            this.billdeskRequestMsg = response.data;
            if (this.billdeskRequestMsg != null) {
              BilldeskPay(this.billdeskRequestMsg, "", "");
              // let headers = new HttpHeaders()
              // let hostdata = headers.get("Host")
            }
          });
      }
    }
  }

  get_installmentDetails() {
    let jsonin = {
      CollegeCode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      BatchCode: parseInt(this.selected_batch.batch_code),
      // Subjectgroupuuid: this.selected_batch.subjectgroupuuid,
      // Aadhaar: this.oSession.aadhaar,
    }

    console.log('jssss',jsonin)
    // let input_jsonin = {
    //   Input: encryptUsingAES256(jsonin)
    // };
    this.commonService.Post_json_data<Ires_installments>(Students_url.myinstallments,jsonin)
        .subscribe((response:any) => {
          if (response['data'] == '' || response['data'] == null) {

          }
          else{
            this.MyInstallment = response['data'];
            console.log('dsdfds',this.MyInstallment);
          }

        })}

  protected readonly environment = environment;
}
