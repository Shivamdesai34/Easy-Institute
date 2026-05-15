import * as myGlobals from '../../../globals/global-variable';
import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Renderer2, ViewChild,} from '@angular/core';
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, PlatformLocation, registerLocaleData,} from '@angular/common';
import {JrformfeesService} from './jrformfees.service';
import {HttpClient} from '@angular/common/http';
import {BilldeskPay} from '../../../../assets/javascript/billdesk';
import {Common_url, Students_url,} from '../../../globals/global-api';
import {GlobalMessage} from '../../../globals/global.message';
import {CommonService} from '../../../globals/common.service';
import {SessionService} from '../../../globals/sessionstorage';
import {Sessiondata} from '../../../models/Sessiondata';
import {encryptUsingAES256,} from '../../../globals/encryptdata';
import {
  AdmissionQuotasubjectGroups, Fees_Receiptmaster,
  Ires_Courseapplied,
  Ires_education,
  Ires_personaldata, Ires_Reciept,
  Ires_registerbatch,
  res_singlebatch,
  Student_Documents_Education,
  Subjects_group_h,
} from '../../../models/response';
import localeEs from '@angular/common/locales/es';
import {ImageTransform,} from 'ngx-image-cropper';
import {DomSanitizer} from '@angular/platform-browser';
import {DashboardService} from '../../dashboard/dashboard.service';
import {GridOptions} from "ag-grid-community";
import {
    CardBodyComponent,
    CardComponent,
    ColComponent,
    FormDirective, FormLabelDirective, FormSelectDirective,
    RowComponent,
    SpinnerComponent
} from "@coreui/angular-pro";

registerLocaleData(localeEs);

@Component({
  selector: 'app-fillprofile',
  templateUrl: './jrformfees.component.html',
  styleUrls: ['./jrformfees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CardComponent,
        CardBodyComponent,
        ReactiveFormsModule,
        RowComponent,
        ColComponent,
        SpinnerComponent,
        FormDirective,
        FormSelectDirective,
        FormLabelDirective
    ]
})
export class JrformfeesComponent implements OnInit {
  items = [1, 2, 3, 4, 5, 6, 7];
  activePane = 0;
  ReceiptID: any;
  ReceiptNo: any;
  QuotaStatus: AdmissionQuotasubjectGroups[] = [];
  Fees_master={} as Fees_Receiptmaster
  // EducationDetailsForm!: UntypedFormGroup;
  // reservationDetailsForm!: UntypedFormGroup;
  Profilepictform!: FormGroup;
  addressDetailsForm!: FormGroup;
  FeesAdmissionForm!: FormGroup;
  submitted = false;
  modalSubmit = false;
  res: any;
  data: any;
  rowss: any = [];
  gridOptions: any;
  gridOptions_document: any;
  gridOptions_edu: any;
  college!: number;
  marks: any;
  boards: any;
  res_Reciept= {} as Ires_Reciept
  batch_name: any;
  finyear: any;
  collegecode: any;
  //Images Upload and Fill Profile
  formData = new FormData();
  date: any;
  percentage: any;
  public imagePath: any;
  photo: any;
  sign: any;
  public message!: string;
  //Get Education Details
  board: any;
  Education!: Student_Documents_Education;
  UploadDocuments: any;
  //Modal
  resp_Abatchs: Ires_registerbatch[] = [];
  selected_batch= {} as Ires_registerbatch
  selected_subject= {} as Subjects_group_h;
  batchSubjects: any;
  batchcode: any;
  SubjectGroups: any;
  formAmount: any;
  BatchCode: any;
  resp_singlebatch= {} as res_singlebatch;
  billdeskRequestMsg: string='';
  //Badge
  imageChangedEvent: any = '';
  croppedImage: any = '';
  containWithinAspectRatio = false;
  AppliedCourses: Ires_Courseapplied[] = [];
  canvasRotation = 0;
  transform: ImageTransform = {};
  oSession!: Sessiondata;
  get_personaldetail= {} as Ires_personaldata;
  education= {} as Ires_education;
  visiblebatch = false;
  visivlebatch_atkt = false;
  payloader = false;
  regbatchname = '';
  aSubjects: Subjects_group_h[]=[];
  pageType: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  //Badge
  formtype!: string;

  constructor(
    private http: HttpClient, private formBuilder: UntypedFormBuilder,
    private sessionservice: SessionService, private commonService: CommonService,
    private router: Router,
    private activeroute: ActivatedRoute,
    public fillprofileService: JrformfeesService,
    private platformLocation: PlatformLocation,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private dashboardservice: DashboardService,
    private globalmessage: GlobalMessage,
    public datepipe: DatePipe,
  ) {
    this.gridOptions_edu = <GridOptions>{
      context: {
        componentParent: this,
      },
    };
  }

  @ViewChild('content') content: any;
  @ViewChild('item1') item1: any;
  @ViewChild('res_table') res_tablehtml: any;
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

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
    this.oSession = new Sessiondata(this.sessionservice);
    this.oSession.Getdatafromstroage();
    this.activeroute.queryParams
      .subscribe(params => {
        this.pageType = params['page'];
      });
    this.formtype = '';
    if (this.pageType == 'R') {
      this.formtype = ''
      if (this.oSession.iseligible == 'NOTELIGIBLE' || this.oSession.iseligible == 'FAIL') {
        this.globalmessage.Show_error('You are not eligible for this course!')
        this.router.navigate(['/dashboard'])
      }
    }
    if (this.pageType == 'A') {
      if (this.oSession.formfeesrecieved == 'NOTPAID') {
        this.globalmessage.Show_error('You are not allowed to apply for this courses.')
        this.router.navigate(['/dashboard'])
      }
      this.StudentAppliedCourses();
      // this.router.navigateByUrl('/formfees', (skipLocationChange: true ))
      this.formtype = 'for Additional batch & subjects.'
      if (this.oSession.maxadmissionboard == 'UG') {
        if (this.oSession.maxbatchlevel != 3) {
          this.router.navigate(['/dashboard'])
        }
        if (this.oSession.maxbatchlevel == 3) {
          if (this.oSession.maxfinyear == myGlobals.Global_CurrentFinYear) {
            this.router.navigate(['/dashboard'])
          }
        }
      }
      if (this.oSession.maxadmissionboard == 'JR') {
        if (this.oSession.maxbatchlevel! >= 2) {
          this.router.navigate(['/dashboard'])
        }
      }
      if (this.oSession.maxadmissionboard == 'PG') {
        if (this.oSession.maxbatchlevel! >= 2) {
          this.router.navigate(['/dashboard'])
        }
      }
    }
    this.renderExternalScript(
      'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
    ).onload = () => {
    };
    if (this.oSession.lastyearoutstanding == 'true') {
      this.globalmessage.Show_message('Please pay your last year pending fees!')
      this.router.navigate(['/Fees'])
      return
    }
    if (this.oSession.iseligible == 'ELIGIBLE' ||
      this.oSession.iseligible == 'FAIL') {
      this.globalmessage.Show_message('Please pay your last year pending fees!')
      this.router.navigate(['/dashboard'])
    }
    if (this.oSession.formfeesrecieved == 'NOTPAID') {
      if (this.pageType == 'A') {
        this.globalmessage.Show_message('Please complete your profile.')
        this.router.navigate(['/dashboard'])
        return
      }
    } else {
      if (this.pageType == 'R') {
        if (this.oSession.formfeesrecieved == 'PAID') {
          this.globalmessage.Show_message('Formfees already paid.Please complete your profile.')
          this.router.navigate(['/dasbhoard'])
        }
      }
    }
    // if (this.oSession.submittedyear != myGlobals.Global_CurrentFinYear) {
    //   if (this.pageType == 'A') {
    //     this.globalmessage.Show_error('You are not allowed to apply for this courses.')
    //     // this.router.navigate(['/dasbhoard'])
    //   }
    // }
    this.CreateForm();
  }

  Batch_selected() {
    this.FeesAdmissionForm.controls['batchSubjects'].setValue('')
    if (this.selected_batch.Admissionstarted == 0) {
      this.globalmessage.Show_error('Admission not started for this batch.')
      return
    }
    this.Additionalformfeesrecieved();
  }

  DisplaySubjects() {
    if (this.oSession.studenttype == 'OUTSIDE') {
      this.regbatchname = this.oSession.registerbatchname?.trim()!;
      this.visiblebatch = true;
      //hARSH
      // this.FeesAdmissionForm.controls['batch_name'].setValue(this.regbatchname);
      // this.SelectBatchSubjects();
    } else {
      this.visivlebatch_atkt = true;
      this.visiblebatch = false;
    }
  }

  CreateForm() {
    this.FeesAdmissionForm = this.formBuilder.group({
      // batch_name: ['', Validators.required],
      batch_name: ['', Validators.required],
      batchSubjects: ['', Validators.required],
    })
    if (this.oSession.registerfinyear == myGlobals.Global_CurrentFinYear) {
      if (this.pageType == 'R') {
        this.Register_Batch_api()
      } else {
        this.Show_registrationbatchs('JR')
      }
    } else {
      this.batch_configuration();
    }
  }

  // get f5() {
  //   return this.EducationDetailsForm.controls;
  // }
  Batch_uii() {
  }

  Incremental_Batchapi() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<Ires_registerbatch[]>(Students_url.StudentBatch, input_json)
      .subscribe((response) => {
        const hasKey = 'data' in response;
        if (hasKey) {
          this.resp_Abatchs = response.data;
        } else {
          this.resp_Abatchs = response;
        }
        // adding incemental batch
        this.resp_Abatchs[0].Runtime_incrementalbatch = true;
      });
  }

  Register_Batch_api() {
    let single_batch: Ires_registerbatch;
    let jsonin = {
      Batch_code: this.oSession.register_batchcode
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<Ires_registerbatch>(Students_url.Registerbatch, input_json)
      .subscribe((response) => {
        this.resp_Abatchs.push(response.data)
      });
  }

  batch_configuration() {
    let jsonin = {
      Batchcode: this.oSession.maxbatchcode,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<res_singlebatch>(Common_url.batch, input_json)
      .subscribe((response) => {
        this.resp_singlebatch = response.data;
        //TY to Masters (PG)
        if (this.resp_singlebatch.Batch_level == 3 &&
          this.resp_singlebatch.Admissionboard == 'UG') {
          if (this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear) {
            this.Show_registrationbatchs('PG')
          }
        } else {
          if (this.pageType == 'A') {
            this.globalmessage.Show_error('You are not eligible for additional courses.')
            this.router.navigate(['/dashboard'])
          }
          this.Incremental_Batchapi()
        }
      });
  }

  Show_registrationbatchs(sBoardlevel: string) {
    let sOutsideUrl = myGlobals.Domainname
    let jsoninbatch = {
      Boardlevel: sBoardlevel,
      Firstyear: 1,
      Webportal: sOutsideUrl,
    };
    let jsonin = {
      Input: encryptUsingAES256(jsoninbatch)
    };
    this.commonService.Post_json_withouttoken(Common_url.registertionbatchs, jsonin).subscribe((response) => {
      this.resp_Abatchs = response.data
    });
  }

  CheckSubjectGroupQuota() {
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.selected_batch.Batch_code,
      subjectgroupid: this.selected_subject.Subject_group_id,
      subject_group_code: this.selected_subject.Subject_group_code,
      quota_status: 'XXXX',
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<AdmissionQuotasubjectGroups[]>(Students_url.CheckSubjectGroupQuota, input_json)
      .subscribe((response) => {
        if (response.data != null) {
          this.QuotaStatus = response.data;
          if (this.QuotaStatus[0].Quota_status != 'OPEN') {
            this.globalmessage.Show_message(
              'Quota Closed! Select Different Group Code.'
            );
            this.FeesAdmissionForm.controls['batchSubjects'].setValue('');
            this.SubjectGroups = '';
          }
        }
      });
  }

  Additionalformfeesrecieved() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      BatchCode: this.selected_batch.Batch_code,
      Aadhaar: this.oSession.aadhaar,
    };
    this.commonService
      .Post_json_data<Fees_Receiptmaster>(Students_url.Additionalsubjectformfees_URL, jsonin)
      .subscribe((response) => {
        if (this.Fees_master.Receipt_ID <= 0) {
          if (this.selected_batch.Batch_code > 0) {
            this.SelectBatchSubjects(this.selected_batch.Batch_code);
          }
        } else {
          this.globalmessage.Show_error('Form fees Already Paid for this Batch!')
          if (this.pageType == "R") {
            this.router.navigate(['/dashboard'])
          }
          // this.onLevelSelect("",0);
          //this.Resetcontrols(0);
        }
      });
  }

  Btn_Payment() {
    this.payloader = true
    this.modalSubmit = true;
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: myGlobals.Golbal_CollegeCode,
      aadhaar: this.oSession.aadhaar,
      batch_code: this.selected_batch.Batch_code,
      subject_group_id: this.selected_subject.Subject_group_id,
      subject_group_code: this.selected_subject.Subject_group_code,
      term_code: myGlobals.Global_FORMFEESTERMNAME,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<Ires_Reciept>(Students_url.IU_Admission, input_json)
      .subscribe((response) => {
        if (response != null) {
          this.payloader = false
          this.ReceiptID =this.res_Reciept.ReceiptID;
          this.ReceiptNo =this.res_Reciept.ReceiptNo;
          if (this.ReceiptID > 0) {
            this.RegistrationPayment();
          }
        }
      });
  }

  RegistrationPayment() {
    let nTranscationamount: string = '';
    if (this.oSession.demo == 'true') {
      nTranscationamount = '1';
      this.formAmount = '1';
    } else {
      nTranscationamount = String(this.selected_batch.Formamount);
    }
    let billdeskmsg = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.selected_batch.Batch_code,
      aadhaar: this.oSession.aadhaar,
      termcode: myGlobals.Global_FORMFEESTERMNAME,
      MerchantID: '',
      CustomerID: String(this.ReceiptNo),
      Filler1: 'NA',
      TxnAmount: String(this.selected_batch.Formamount),
      // TxnAmount: nTranscationamount,
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
      AdditionalInfo3: String(this.selected_batch.Batch_code),
      AdditionalInfo4: String(this.oSession.aadhaar),
      AdditionalInfo5: '9999',
      AdditionalInfo6: '1',
      AdditionalInfo7: String(this.ReceiptID),
      TypeField3: 'NA',
      Feestype: 'FORMFEES',
    };
    let input_json = {
      Input: encryptUsingAES256(billdeskmsg),
    };
    this.commonService
      .Post_json_data<string>(Students_url.BillDeskcheckSum, input_json)
      .subscribe((response) => {
        this.billdeskRequestMsg = response.data;
        if (this.billdeskRequestMsg != null) {
          BilldeskPay(this.billdeskRequestMsg, '', '');
        }
      });
  }

  //Get Details
  SelectBatchSubjects(nBatchcode: number) {
    let jsonin = {}
    if (this.selected_batch.Runtime_incrementalbatch) {
      jsonin = {
        incremental_batchcode: this.selected_batch.Batch_code,
        collegecode: this.oSession.collegecode,
        finyear: this.oSession.finyear,
        aadhaar: this.oSession.aadhaar,
        subject_group_code: this.oSession.maxsubjectgroupcode
      };
      let jsonin_input = {
        Input: encryptUsingAES256(jsonin),
      };
      this.commonService
        .Post_json_data<Subjects_group_h[]>(Students_url.IncrementalBatchSubjects_v2, jsonin_input)
        .subscribe((response) => {
          this.aSubjects = response.data;
          this.DisplaySubjects();
        });
    } else {
      jsonin = {
        BatchCode: nBatchcode,
      };
      let jsonin_input = {
        Input: encryptUsingAES256(jsonin),
      };
      this.commonService
        .Post_json_data<Subjects_group_h[]>(Common_url.BatchSubjects, jsonin_input)
        .subscribe((response) => {
          this.aSubjects = response.data;
          this.DisplaySubjects();
        });
    }
  }

  StudentAppliedCourses() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: 1,
      Aadhaar: this.oSession.aadhaar,
    };
    let jsonin_input = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<Ires_Courseapplied[]>(Students_url.StudentAppliedCourses, jsonin_input)
      .subscribe((response) => {

          this.AppliedCourses = response.data;

      });
  }
}



