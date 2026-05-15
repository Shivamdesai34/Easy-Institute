import * as myGlobals from '../../../globals/global-variable';
import {ChangeDetectionStrategy, Component, OnInit, Renderer2,} from '@angular/core';
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf, registerLocaleData,} from '@angular/common';
import {FormfeesService} from './formfees.service';
import {BilldeskPay} from '../../../../assets/javascript/billdesk';
import {GlobalMessage} from '../../../globals/global.message';
import {CommonService} from '../../../globals/common.service';
import {SessionService} from '../../../globals/sessionstorage';
import {Sessiondata} from '../../../models/Sessiondata';
import {encryptUsingAES256,} from '../../../globals/encryptdata';
import {
  AdmissionQuotasubjectGroups,
  Fees_Receiptmaster,
  Ires_Courseapplied,
  Ires_education,
  Ires_personaldata,
  Ires_Reciept,
  Ires_registerbatch,
  res_singlebatch,
  Student_Documents_Education,
  Subjects_group_h,
} from '../../../models/response';
import localeEs from '@angular/common/locales/es';
import {ImageTransform,} from 'ngx-image-cropper';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    FormDirective, FormLabelDirective,
    FormSelectDirective,
    RowComponent,
    SpinnerComponent
} from "@coreui/angular-pro";
import {Common_url, Students_url} from "../../../globals/global-api";

registerLocaleData(localeEs);

@Component({
  selector: 'app-fillprofile',
  templateUrl: './formfees.component.html',
  styleUrls: ['./formfees.component.scss'],
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
        NgForOf,
        ButtonDirective,
        NgIf,
        FormLabelDirective
    ],
  standalone: true
})
export class FormfeesComponent implements OnInit {
  private lPDG_course: boolean = false;
  items = [1, 2, 3, 4, 5, 6, 7];
  activePane = 0;
  ReceiptID: any;
  ReceiptNo: any;
  QuotaStatus: AdmissionQuotasubjectGroups[] = [];
  Fees_master = {} as Fees_Receiptmaster
  res_Reciept = {} as Ires_Reciept
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
  Education = {} as Student_Documents_Education;
  UploadDocuments: any;
  //Modal
  resp_Abatchs: Ires_registerbatch[] = []
  selected_batch = {} as Ires_registerbatch
  selected_subject = {} as Subjects_group_h;
  batchSubjects: any;
  batchcode: any;
  SubjectGroups: any;
  formAmount: any;
  BatchCode: any;
  resp_singlebatch!: res_singlebatch;
  billdeskRequestMsg: string = '';
  //Badge
  imageChangedEvent: any = '';
  croppedImage: any = '';
  containWithinAspectRatio = false;
  AppliedCourses: Ires_Courseapplied[] = [];
  canvasRotation = 0;
  transform: ImageTransform = {};
  oSession!: Sessiondata;
  get_personaldetail = {} as Ires_personaldata;
  education = {} as Ires_education;
  visiblebatch = false;
  visivlebatch_atkt = false;
  payloader = false;
  regbatchname = '';
  aSubjects: Subjects_group_h[] = [];
  pageType: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  //Badge
  formtype!: string;
  res_iuadmission = {} as Ires_Reciept

  constructor(
    private formBuilder: UntypedFormBuilder,
    private sessionservice: SessionService, private commonService: CommonService,
    private router: Router,
    private activeroute: ActivatedRoute,
    public formfeesService: FormfeesService,
    private renderer: Renderer2,
    private globalmessage: GlobalMessage,
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
    this.oSession = new Sessiondata(this.sessionservice);
    this.oSession.Getdatafromstroage();
    this.activeroute.queryParams
      .subscribe(params => {
        this.pageType = params['page'];
      });
    this.formtype = '';
    switch (this.pageType) {
      case 'R': {
        if (this.oSession.iseligible == 'NOTELIGIBLE' || this.oSession.iseligible == 'FAIL') {
          this.globalmessage.Show_error('You are not eligible for this course!')
          this.router.navigate(['/dashboard'])
        }
        break
      }
      case 'A': {
        this.formtype = 'for Additional batch & subjects.'
        if (this.oSession.maxadmissionboard == 'UG') {
          if (this.oSession.maxbatchlevel != 3) {
            // UG and first year and second year student not allowed additional course
            this.router.navigate(['/dashboard'])
          }
          if (this.oSession.maxbatchlevel == 3) {
            if (this.oSession.maxfinyear == myGlobals.Global_CurrentFinYear) {
              // Prakash 22/4/2025  need to understand
              this.router.navigate(['/dashboard'])
            }
          }
        }
        if (this.oSession.maxadmissionboard == 'JR') {
          if (this.oSession.maxbatchlevel! === 2) {
            // JR Syjc students additional course not allowed
            this.router.navigate(['/dashboard'])
          }
        }
        if (this.oSession.maxadmissionboard == 'PG') {
          if (this.oSession.maxbatchlevel! === 2) {
            this.router.navigate(['/dashboard'])
          }
        }
        break
      }
      case 'PGD': {
        if (this.oSession.maxadmissionboard == 'JR') {
          this.router.navigate(['/dashboard'])
        }
        if (this.oSession.maxadmissionboard == 'UG') {
          if (this.oSession.maxbatchlevel! <= 2) {
            this.router.navigate(['/dashboard'])
          } else {
            // Third year student allowed for PGD course
            this.lPDG_course = true
          }
        }
        if (this.oSession.maxadmissionboard == 'PG') {
          this.lPDG_course = true
          this.Show_registrationbatchs('PG')
        }
        break
      }
    }
    /*
    if (this.pageType == 'R') {
      this.formtype = ''
      if (this.oSession.iseligible == 'NOTELIGIBLE' || this.oSession.iseligible == 'FAIL') {
        this.globalmessage.Show_error('You are not eligible for this course!')
        this.router.navigate(['/dashboard'])
      }
    }
    if (this.pageType == 'A') {
      //It was used to show applied batchs ,not needed 22-04-2025
      //this.StudentAppliedCourses();
      // this.router.navigateByUrl('/formfees', (skipLocationChange: true ))


      this.formtype = 'for Additional batch & subjects.'
      if (this.oSession.maxadmissionboard == 'UG') {
        if (this.oSession.maxbatchlevel != 3) {

          // UG and first year and second year student not allowed additional course
          this.router.navigate(['/dashboard'])
        }
        if (this.oSession.maxbatchlevel == 3) {
          if (this.oSession.maxfinyear == myGlobals.Global_CurrentFinYear) {

            // Prakash 22/4/2025  need to understand
            this.router.navigate(['/dashboard'])
          }
        }
      }
      if (this.oSession.maxadmissionboard == 'JR') {
        if (this.oSession.maxbatchlevel! === 2) {
          // JR Syjc students additional course not allowed
          this.router.navigate(['/dashboard'])
        }
      }

      if (this.oSession.maxadmissionboard == 'PG') {
        if (this.oSession.maxbatchlevel! === 2) {
          this.router.navigate(['/dashboard'])
        }
      }

    }

     */

    if (!this.lPDG_course) {
      if (this.oSession.lastyearoutstanding == 'true') {
        this.globalmessage.Show_message('Please pay your last year pending fees!')
        this.router.navigate(['/Fees'])
        return
      }
      if (this.oSession.iseligible == 'ELIGIBLE' ||
        this.oSession.iseligible == 'FAIL') {
        this.globalmessage.Show_message('You are not eligible for this course!')
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
      if (this.oSession.submittedyear != myGlobals.Global_CurrentFinYear) {
        if (this.pageType == 'A') {
          this.globalmessage.Show_error('You are not allowed to apply for this courses.')
          this.router.navigate(['/dasbhoard'])
        }
      }
    }

    this.renderExternalScript(
      'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
    ).onload = () => {
    };
    this.CreateForm();
  }

  Batch_selected() {
    if (this.selected_batch.admissionstarted == 0) {
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
        this.Show_registrationbatchs('PG')
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
    }
    this.formfeesService
      .StudentBatch(input_json)
      .subscribe((response) => {
        this.resp_Abatchs = response.data;
        // adding incemental batch
        this.resp_Abatchs[0].runtime_incrementalbatch = true;
      });
  }

  Register_Batch_api() {
    let single_batch: Ires_registerbatch;
    let jsonin = {
      Batch_code: this.oSession.register_batchcode,
      batchuuid : this.oSession.registrationbatchuuid
      // batchuuid:
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    }
    this.formfeesService
      .Registerbatch(input_json)
      .subscribe((response) => {
        this.resp_Abatchs.push(response.data)
      });
  }

  batch_configuration() {
    let jsonin = {
      Batchcode: this.oSession.maxbatchcode,
      // batchuuid:

    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.formfeesService
      .batch(input_json)
      .subscribe((response) => {
        this.resp_singlebatch = response.data;
        //TY to Masters (PG)
        if (this.resp_singlebatch.batch_level == 3 &&
          this.resp_singlebatch.admissionboard == 'UG') {
          if (this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear) {
            this.Show_registrationbatchs('PG')
          }
        } else {
          if (this.pageType == 'A') {
            this.globalmessage.Show_error('You are not eligible for additional courses.')
            this.router.navigate(['/dashboard'])
          }
          if (!this.lPDG_course) {
            this.Incremental_Batchapi()
          }
        }
      });
  }

  Show_registrationbatchs(sBoardlevel: string) {
    let jsoninbatch = {
      Boardlevel: sBoardlevel,
    };
    let jsonin = {
      Input: encryptUsingAES256(jsoninbatch)
    };
    this.formfeesService.registertionbatchs(jsonin).subscribe((response) => {
      this.resp_Abatchs = response.data
      if (this.lPDG_course) {
        let pgdbatchs = this.resp_Abatchs.filter((pgdbatch) => (pgdbatch.batch_code >= 2700 && pgdbatch.batch_code <= 3100))
        this.resp_Abatchs = [...pgdbatchs]
      }
    });
  }

  CheckSubjectGroupQuota() {
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.selected_batch.batch_code,
      // Subjectgroupuuid
      subjectgroupid: this.selected_subject.subject_group_id,
      subject_group_code: this.selected_subject.subject_group_code,
      quota_status: 'XXXX',
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.formfeesService
      .CheckSubjectGroupQuota(input_json)
      .subscribe((response) => {
        if (response.data != null) {
          this.QuotaStatus = response.data
          if (this.QuotaStatus[0].quota_status != 'OPEN') {
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
      BatchCode: this.selected_batch.batch_code,
      // batchuuid:
      Aadhaar: this.oSession.aadhaar,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.formfeesService
      .Additionalsubjectformfees_URL<Fees_Receiptmaster>(input_json)
      .subscribe((response) => {
        if (response == null) {
          return
        }
        this.Fees_master = response.data
        if (this.Fees_master.receipt_id <= 0) {
          if (this.selected_batch.batch_code > 0) {
            this.SelectBatchSubjects(this.selected_batch.batch_code);
          }
        } else {
          if (this.Fees_master.receipt_id == undefined) {
            this.globalmessage.Show_error('undefined')
            return;
          }
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
      batch_code: this.selected_batch.batch_code,
      // batchuuid
      subject_group_id: this.selected_subject.subject_group_id,
      subject_group_code: this.selected_subject.subject_group_code,
      term_code: myGlobals.Global_FORMFEESTERMNAME,
    };
    let input_json = jsonin
    this.commonService
      .Post_json_data<Ires_Reciept>(Students_url.IU_Admission, input_json)
      .subscribe((response) => {
        this.res_iuadmission = response.data
        if (this.res_iuadmission != null) {
          this.payloader = false
          // this.ReceiptID = this.res_Reciept.ReceiptID;
          // this.ReceiptNo = this.res_Reciept.ReceiptNo;
          if (this.res_iuadmission.receiptid > 0) {
            this.RegistrationPayment();
          }
        }
      });
  }

  RegistrationPayment() {
    let billdeskmsg = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      batchcode: this.selected_batch.batch_code,
      // batchuuid:
      aadhaar: this.oSession.aadhaar,
      termcode: myGlobals.Global_FORMFEESTERMNAME,
      MerchantID: '',
      CustomerID: String(this.res_iuadmission.receiptno),
      Filler1: 'NA',
      // TxnAmount: nTranscationamount,
      TxnAmount: String(this.selected_batch.formamount),
      //TxnAmount: "1",
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
      AdditionalInfo3: String(this.selected_batch.batch_code),
      AdditionalInfo4: String(this.oSession.aadhaar),
      AdditionalInfo5: '9999',
      AdditionalInfo6: '1',
      AdditionalInfo7: String(this.res_iuadmission.receiptid),
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
    if (this.selected_batch.runtime_incrementalbatch) {
      jsonin = {
        incremental_batchcode: this.selected_batch.batch_code,
        collegecode: this.oSession.collegecode,
        finyear: this.oSession.finyear,
        aadhaar: this.oSession.aadhaar,
        subject_group_code: this.oSession.maxsubjectgroupcode
      };
      // Students_url.IncrementalBatchSubjects_v2
      this.commonService
        .Post_json_data<Subjects_group_h[]>(Students_url.IncrementalBatchSubjects_v2, jsonin)
        .subscribe((response) => {
          this.aSubjects = response.data
          this.DisplaySubjects();
        });
    } else {
      jsonin = {
        BatchCode: nBatchcode,
        // batchuuid:
      };
      this.commonService
        .Post_json_data<Subjects_group_h[]>(Common_url.BatchSubjects, jsonin)
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
    this.formfeesService
      .StudentAppliedCourses(jsonin_input)
      .subscribe((response) => {
        this.AppliedCourses = response.data;
      });
  }
}



