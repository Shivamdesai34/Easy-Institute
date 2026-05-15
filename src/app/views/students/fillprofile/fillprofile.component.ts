import * as myGlobals from '../../../globals/global-variable';
import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Renderer2, ViewChild,} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {DatePipe, NgClass, PlatformLocation, registerLocaleData,} from '@angular/common';
import {FillprofileService} from './fillprofile.service';
import {HttpClient} from '@angular/common/http';
import {BilldeskPay} from '../../../../assets/javascript/billdesk';
import {Common_url, Serverlink, Students_url,} from '../../../globals/global-api';
import {GlobalMessage} from '../../../globals/global.message';
import {CommonService} from '../../../globals/common.service';
import {SessionService} from '../../../globals/sessionstorage';
import {Sessiondata} from '../../../models/Sessiondata';
import {encryptUsingAES256,} from '../../../globals/encryptdata';
import {
  AdmissionQuotasubjectGroups,
  Education_Document,
  Ires_Batchs,
  Ires_education,
  Ires_personaldata,
  Ires_Reciept,
  Ires_registerbatch,
  Ires_Upload_Document,
  PhdBatchs,
  Res_Document,
  Res_ProfileResources,
  Student_Documents_Education,
  Student_ProfileStatus,
  Subjects_group_h,
} from '../../../models/response';
import localeEs from '@angular/common/locales/es';
import {ImageCroppedEvent, ImageCropperComponent, ImageTransform, LoadedImage,} from 'ngx-image-cropper';
import {DomSanitizer} from '@angular/platform-browser';
import {DashboardService} from '../../dashboard/dashboard.service';
import {
  AccordionButtonDirective, AccordionComponent,
  AccordionItemComponent,
  BadgeComponent, ButtonDirective, CalloutComponent,
  CardBodyComponent,
  CardComponent, CardTextDirective, CardTitleDirective,
  ColComponent,
  FormCheckComponent, FormCheckInputDirective,
  FormCheckLabelDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, ImgDirective,
  NavComponent, NavLinkDirective,
  RowComponent,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent, TemplateIdDirective
} from "@coreui/angular-pro";
import {AgGridAngular} from "ag-grid-angular";

registerLocaleData(localeEs);

@Component({
  selector: 'app-fillprofile',
  templateUrl: './fillprofile.component.html',
  styleUrls: ['./fillprofile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    NavComponent,
    TabContentRefDirective,
    TabContentComponent,
    TabPaneComponent,
    ImageCropperComponent,
    NgClass,
    FormSelectDirective,
    FormDirective,
    BadgeComponent,
    NavLinkDirective,
    CalloutComponent,
    CardTitleDirective,
    CardTextDirective,
    ImgDirective,
    AccordionItemComponent,
    TemplateIdDirective,
    AccordionButtonDirective,
    ButtonDirective,
    FormLabelDirective,
    FormControlDirective,
    AccordionComponent,
    AgGridAngular,
    FormCheckComponent,
    FormCheckLabelDirective,
    FormCheckInputDirective
  ]
})
export class FillprofileComponent implements OnInit {
  checkbox_personal: boolean = false;
  items = [1, 2, 3, 4, 5, 6, 7];
  activePane = 0;
  Pagename!: string;
  FormFessBatchcode: number = 0;
  invoice: any;
  ReceiptID: any;
  ReceiptNo: any;
  PersonalBadge = false;
  ReservationBadge = false;
  EducationBadge = false;
  SubjectGroupCode: any;
  changeStateReservation = false;
  changeStatePersonal = false;
  QuotaStatus: AdmissionQuotasubjectGroups[] = [];
  BatchObject!: Ires_Batchs;
  DocumentTypeValue: any;
  optionValue: any = 'none';
  EducationTab = true;
  // EducationDetailsForm!: UntypedFormGroup;
  // reservationDetailsForm!: UntypedFormGroup;
  studentDetailsForm!: FormGroup;
  personalDetailsForm!: FormGroup;
  reservationdetailForm!: FormGroup;
  DocumentTypeForm!: FormGroup;
  finalsubmitForm!: FormGroup;
  educationdetailForm!: FormGroup;
  checkfinalSubmit!: FormGroup;
  Profilepictform!: FormGroup;
  parentDetailsForm!: FormGroup;
  addressDetailsForm!: FormGroup;
  nationalitynomineeForm!: FormGroup;
  otherDetailsForm!: FormGroup;
  documentUploadForm!: FormGroup
  FeesAdmissionForm!: FormGroup;
  checkfinalReservationSubmit!: FormGroup;
  submitted = false;
  SSCSubmit = false;
  reservationSubmit = false;
  modalSubmit = false;
  documentSubmit = false;
  ProfileData: any;
  ReservationData: any;
  res: any;
  data: any;
  rowss: any = [];
  gridOptions: any;
  gridOptions_document: any;
  college!: number;
  marks: any;
  boards: any;
  batch_name: any;
  finyear: any;
  collegecode: any;
  //Images Upload and Fill Profile
  adhaar_img!: Array<File>;
  signature_img!: Array<File>;
  profile_img!: Array<File>;
  doc_pdffile!: Array<File>;
  formData = new FormData();
  date: any;
  percentage: any;
  selectresponse: any;
  imageError: any;
  cardImageBase64: any;
  cardImageBase66: any;
  cardImageBase68: any;
  isImageSaved: boolean = false;
  isImageSaved2: boolean = false;
  isImageSaved3: boolean = false;
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
  selected_batch: Ires_registerbatch = {} as Ires_registerbatch
  selected_document: Res_Document = {} as Res_Document;
  selected_subject: Subjects_group_h = {} as Subjects_group_h;
  batchSubjects: any;
  batchcode: any;
  SubjectGroups: any;
  SubjectGroupID: any;
  formAmount: any;
  portalopenv1: PhdBatchs = {} as PhdBatchs
  BatchCode: any;
  billdeskRequestMsg: any;
  DocumentTab = true;
  changeStateEducation = false;
  showprofileImg: any;
  showaadharImg: any;
  showsignImg: any;
  getBatchCode: any;
  ProfileAadhaar: any;
  ProfileEducation: any;
  ProfileReservation: any;
  public paymentmodalform = false;
  tabfivedisable = true;
  openoneacc = false;
  opentwoacc = false;
  IUStudentDetails: any;
  IU_parentdetails: any;
  documentType!: any;
  //Badge
  res_Reciept = {} as Ires_Reciept
  personalDetailBadge = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  containWithinAspectRatio = false;
  private Uploadfile!: File;
  private pngfilename: string = '';
  public imageURL!: string;
  canvasRotation = 0;
  transform: ImageTransform = {};
  imageChanged_signEvent: any = '';
  croppedsignImage: any = '';
  containWithinsignAspectRatio = false;
  private Uploadsignfile!: File;
  private pngsignfilename: string = '';
  public signimageURL!: string;
  signcanvasRotation = 0;
  signtransform: ImageTransform = {};
  Ires_photo: any;
  selctgen: any
  res_educationsubmitted: any;
  educationdocumenttype!: true;
  doc_name!: Education_Document[];
  documentType_selected!: any;
  upload_documnet!: Ires_Upload_Document[];
  res_table!: Ires_education[];
  oSession!: Sessiondata;
  res_profile = {} as Student_ProfileStatus
  // get_personaldetail!: Ires_personalinfo;
  get_personaldetail!: Ires_personaldata;
  res_documentsubmitted: any
  education!: Ires_education;
  personalsubmitted: any;
  FormFees: any;
  visiblebatch = false;
  visivlebatch_atkt = false;
  regbatchname = '';
  aSubjects!: Subjects_group_h[];
  Ires_ProfileResources!: Res_ProfileResources
  selected_edu!: Ires_education;
  private gridApi: any;
  private gridApi_document: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  public rowSelection_document: 'single' | 'multiple' = 'single';
  gender = [''];
  religion = [''];
  mother_tongue = [''];
  martial_status = [''];
  relation = [''];
  occupation = [''];
  annual_income = [''];
  nominee_relation = [''];
  location_area = [''];
  country = [''];
  state = [''];
  district = [''];
  bloodgroup = [''];
  reservation = [''];
  category = [''];
  specially_abled = [''];
  activity = [''];
  participation_level = [''];
  secured_rank = [''];
  //Badge
  PhotoBadge = false;
  alleducation: boolean = true;
  documentbtn = true;

  constructor(
    private http: HttpClient,
    private sessionservice: SessionService,
    private router: Router,
    private commonService: CommonService,
    private activeroute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    public fillprofileService: FillprofileService,
    private platformLocation: PlatformLocation,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private dashboardservice: DashboardService,
    private globalmessage: GlobalMessage,
    public datepipe: DatePipe,
  ) {
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
    //
    // this.activeroute.queryParams.subscribe((params) => {
    //     this.Pagename = params['page'];
    //     this.FormFessBatchcode = parseInt(params['batch']);
    // });
    this.renderExternalScript(
      'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
    ).onload = () => {
    };
    this.ProfileResource();
    if (this.oSession.formfeesrecieved && !this.oSession.isprofilesubmited) {
      this.CreateForm();
    }
    if (this.oSession.formfeesrecieved == 'NOTPAID') {
      this.AdmissionForm_fees();
    }
  }

  Batch_selected() {
    if (this.selected_batch.Batch_code > 0) {
      this.SelectBatchSubjects(this.selected_batch.Batch_code);
    }
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

  AdmissionForm_fees() {
    this.FeesAdmissionForm = this.formBuilder.group({
      // batch_name: ['', Validators.required],
      batch_name: ['', Validators.required],
      batchSubjects: ['', Validators.required],
    })
    if (this.oSession.register_batchcode! > 0) {
      this.Register_Batch_api()
    } else {
      this.Batch_api();
    }
  }

  CreateForm() {
    this.Profilepictform = this.formBuilder.group({
      picture: [''],
      croped: [''],
      upload: ['', Validators.required],
      upload_signature: ['', Validators.required],
      picture_sign: [''],
      croped_sign: [''],
    });
    this.personalDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      fatherFirstName: ['', Validators.required],
      motherFirstName: ['', Validators.required],
      relationType: ['', Validators.required],
      nameLC: ['', Validators.required],
      nameChange: [''],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      birthPlace: [''],
      religion: [''],
      motherTongue: [''],
      martialStatus: [''],
      // corFlatNo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*'), Validators.maxLength(60)]],
      corFlatNo: ['', Validators.required],
      corArea: ['', [Validators.required, Validators.maxLength(60)]],
      corVillageName: ['', Validators.maxLength(60)],
      corLandmark: ['', Validators.maxLength(60)],
      corLocation: ['', Validators.required],
      corCountry: ['', Validators.required],
      corState: ['', Validators.required],
      corDistrict: ['', Validators.required],
      corTaluka: ['', [Validators.required, Validators.maxLength(60)]],
      corCity: ['', [Validators.required, Validators.maxLength(60)]],
      corPincode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      isPermanentAddress: [''],
      // perFlatNo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*'), Validators.maxLength(60)]],
      perFlatNo: ['', Validators.required],
      perArea: ['', [Validators.required, Validators.maxLength(60)]],
      perVillageName: ['', Validators.maxLength(60)],
      perLandmark: ['', Validators.maxLength(60)],
      perLocation: ['', Validators.required],
      perCountry: ['', Validators.required],
      perState: ['', Validators.required],
      perDistrict: ['', Validators.required],
      perTaluka: ['', [Validators.required, Validators.maxLength(60)]],
      perCity: ['', [Validators.required, Validators.maxLength(60)]],
      perPincode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      country: [''],
      domicile: ['', Validators.required],
      nomineeName: [''],
      nomineeDob: [''],
      nomineeRelation: [''],
      // Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{10,10}$/)
      panNo: [''],
      voterId: [''],
      educationGap: ['', Validators.required],
      bloodGrp: [''],
      maxQualification: [''],
      organDonation: [''],
    });
    this.DocumentTypeForm = this.formBuilder.group({
      document_type: ['', Validators.required],
    });
    // this.DocumentTypeForm.controls.documentType.setValue('none');
    // this.modalForm = this.formBuilder.group({
    //   // grnNo: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
    //   batch: ['', Validators.required],
    //   batchSubjects: ['', Validators.required],
    // });
    this.studentDetailsForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: [''],
      fathername: ['', Validators.required],
      mothername: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      placeofbirth: [''],
      religion: [''],
      mothertongue: [''],
      marital_status: [''],
      applicant_name_on_marksheet: ['', Validators.required],
      name_change_after_passing: [''],
      // nameLCstudent: ['', Validators.required],
      // nameChangestudent: ['', Validators.required],
    });
    this.parentDetailsForm = this.formBuilder.group({
      parentsemailid: [''],
      parentsmobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      relationtype: [''],
      occupation_guardian: ['', Validators.required],
      annual_income: [''],
      ebc: [''],
    });
    this.addressDetailsForm = this.formBuilder.group({
      correpondence_flatno: ['', Validators.required],
      correpondence_colonyname: [
        '',
        [Validators.required, Validators.maxLength(60)],
      ],
      correpondence_villagename: ['', Validators.maxLength(60)],
      correpondence_landmark: ['', Validators.maxLength(60)],
      correpondence_location_area: ['', Validators.required],
      correpondence_country: ['', Validators.required],
      correpondence_state: ['', Validators.required],
      correpondence_district: ['', Validators.required],
      correpondence_taluka: [
        '',
        [Validators.required, Validators.maxLength(60)],
      ],
      correpondence_city: ['', [Validators.required, Validators.maxLength(60)]],
      correpondence_pincode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      permanent_flatno: ['', Validators.required],
      permanent_colonyname: [
        '',
        [Validators.required, Validators.maxLength(60)],
      ],
      permanent_villagename: ['', Validators.maxLength(60)],
      permanent_landmark: ['', Validators.maxLength(60)],
      permanent_location_area: ['', Validators.required],
      permanent_country: ['', Validators.required],
      permanent_state: ['', Validators.required],
      permanent_district: ['', Validators.required],
      permanent_taluka: ['', [Validators.required, Validators.maxLength(60)]],
      permanent_city: ['', [Validators.required, Validators.maxLength(60)]],
      permanent_pincode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      same_as_permenant: [''],
    });
    this.nationalitynomineeForm = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      nomineename: ['', Validators.required],
      nomineedob: [''],
      nomineerelation: [''],
    });
    this.otherDetailsForm = this.formBuilder.group({
      Pan: [''],
      voterid: [''],
      educationgap: ['', Validators.required],
      bloodgroup: [''],
      maxqualification_family: [''],
      organ_donation: [''],
    });
    this.reservationdetailForm = this.formBuilder.group({
      parallel_reservation: [''],
      category: ['', Validators.required],
      subcategory: [''],
      specially_abled: [''],
      percentage: [''],
      udid_no: [''],
      activity: [''],
      activityname: [''],
      participationlevels: [''],
      securedrank: [''],
    });
    this.educationdetailForm = this.formBuilder.group({
      board: ['', Validators.required],
      state: ['', Validators.required],
      education_board: ['', Validators.required],
      college_name: [''],
      datepass: ['', Validators.required],
      rollno: ['', Validators.required],
      marksheetno: ['', Validators.required],
      gradesormarks: [''],
      marksobtained: ['', Validators.required],
      outoff: ['', Validators.required],
      percentage: [''],
      checkprofile_education: ['', Validators.required],
    });
    this.finalsubmitForm = this.formBuilder.group({
      checkOne: ['', Validators.required],
      checktwo: ['', Validators.required],
      checkthree: ['', Validators.required],
    });
    this.documentUploadForm = this.formBuilder.group({
      documentUpload: ['', Validators.required],
      checkprofile_document: ['', Validators.required],
    });
    this.checkfinalSubmit = this.formBuilder.group({
      checkprofile: ['', Validators.required],
    });
    this.checkfinalReservationSubmit = this.formBuilder.group({
      checkprofilereservation: ['', Validators.required],
    });
    this.getPersonalInfo();
  }

  Finalsubmit_enable() {
    if (
      this.get_personaldetail.parentsubmited == true &&
      this.get_personaldetail.reservationsubmited == true &&
      this.get_personaldetail.educationsubmited == true
    ) {
      this.tabfivedisable = false;
    }
  }

  get sdf() {
    return this.studentDetailsForm.controls;
  }

  get pdf() {
    return this.parentDetailsForm.controls;
  }

  get adf() {
    return this.addressDetailsForm.controls;
  }

  get nnf() {
    return this.nationalitynomineeForm.controls;
  }

  get odf() {
    return this.otherDetailsForm.controls;
  }

  // get f5() {
  //   return this.EducationDetailsForm.controls;
  // }
  get rdf() {
    return this.reservationdetailForm.controls;
  }

  get edf() {
    return this.educationdetailForm.controls;
  }

  Admission_formpayment() {
    this.paymentmodalform = !this.paymentmodalform;
    //ShiVam
    // this.modalService.open(this.content, this.NgbModalOptions);
    //Harsh
    // this.modalSelectBatch();
  }

  StudentProfileStatus() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
      studenttype: this.oSession.studenttype,
      webportname: myGlobals.Global_Webportname,
    };
    let jsonin_input = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<Student_ProfileStatus>(Students_url.StudentProfileStatus_url, jsonin)
      .subscribe((response) => {
        if (response != null) {
          this.ProfileAadhaar = this.res_profile.Profile.Aadhaar;
          this.ProfileEducation = this.res_profile.Education;
          this.ProfileReservation = this.res_profile.Reservation.Aadhaar;
          if (response.data.Profile.Aadhaar != 0) {
            this.ProfileData = response.data.Profile;
            this.personalDetailsForm.controls['firstName'].setValue(
              this.ProfileData.FirstName
            );
            this.personalDetailsForm.controls['lastName'].setValue(
              this.ProfileData.LastName
            );
            this.personalDetailsForm.controls['fatherFirstName'].setValue(
              this.ProfileData.FatherName
            );
            this.personalDetailsForm.controls['motherFirstName'].setValue(
              this.ProfileData.MotherName
            );
            this.personalDetailsForm.controls['relationType'].setValue(
              this.ProfileData.RelationType
            );
            this.personalDetailsForm.controls['nameLC'].setValue(
              this.ProfileData.Applicant_Name_On_Marksheet
            );
            this.personalDetailsForm.controls['nameChange'].setValue(
              this.ProfileData.Name_Change_after_passing
            );
            this.personalDetailsForm.controls['gender'].setValue(
              this.ProfileData.Gender
            );
            this.personalDetailsForm.controls['dob'].setValue(
              this.ProfileData.DOB
            );
            this.personalDetailsForm.controls['birthPlace'].setValue(
              this.ProfileData.PlaceOfBirth
            );
            this.personalDetailsForm.controls['religion'].setValue(
              this.ProfileData.Religion
            );
            this.personalDetailsForm.controls['motherTongue'].setValue(
              this.ProfileData.MotherTongue
            );
            this.personalDetailsForm.controls['martialStatus'].setValue(
              this.ProfileData.Marital_Status
            );
            this.personalDetailsForm.controls['guradianMobilenumber'].setValue(
              this.ProfileData.ParentsMobile
            );
            this.personalDetailsForm.controls['guradianEmailId'].setValue(
              this.ProfileData.ParentsEmailID
            );
            this.personalDetailsForm.controls['occupation'].setValue(
              this.ProfileData.Occupation_Guardian
            );
            this.personalDetailsForm.controls['annualIncome'].setValue(
              this.ProfileData.Annual_Income
            );
            this.personalDetailsForm.controls['ebc'].setValue(
              this.ProfileData.EBC
            );
            this.personalDetailsForm.controls['corFlatNo'].setValue(
              this.ProfileData.Correpondence_FlatNo
            );
            this.personalDetailsForm.controls['corArea'].setValue(
              this.ProfileData.Correpondence_ColonyName
            );
            this.personalDetailsForm.controls['corVillageName'].setValue(
              this.ProfileData.Correpondence_VillageName
            );
            this.personalDetailsForm.controls['corLandmark'].setValue(
              this.ProfileData.Correpondence_Landmark
            );
            this.personalDetailsForm.controls['corLocation'].setValue(
              this.ProfileData.Correpondence_Location_Area
            );
            this.personalDetailsForm.controls['corCountry'].setValue(
              this.ProfileData.Correpondence_Country
            );
            this.personalDetailsForm.controls['corState'].setValue(
              this.ProfileData.Correpondence_State
            );
            this.personalDetailsForm.controls['corDistrict'].setValue(
              this.ProfileData.Correpondence_District
            );
            this.personalDetailsForm.controls['corTaluka'].setValue(
              this.ProfileData.Correpondence_Taluka
            );
            this.personalDetailsForm.controls['corCity'].setValue(
              this.ProfileData.Correpondence_City
            );
            this.personalDetailsForm.controls['corPincode'].setValue(
              this.ProfileData.Correpondence_Pincode
            );
            // Prakash 21 may 2023
            // Prakash 21 may 2023
            this.personalDetailsForm.controls['isPermanentAddress'].setValue(
              this.ProfileData.Same_As_Permenant
            );
            if (this.ProfileData.Same_As_Permenant == 'YES') {
              this.personalDetailsForm.controls['perFlatNo'].setValue(
                this.ProfileData.Permanent_FlatNo
              );
              this.personalDetailsForm.controls['perArea'].setValue(
                this.ProfileData.Permanent_ColonyName
              );
              this.personalDetailsForm.controls['perVillageName'].setValue(
                this.ProfileData.Permanent_VillageName
              );
              this.personalDetailsForm.controls['perLandmark'].setValue(
                this.ProfileData.Permanent_Landmark
              );
              this.personalDetailsForm.controls['perLocation'].setValue(
                this.ProfileData.Permanent_Location_Area
              );
              this.personalDetailsForm.controls['perCountry'].setValue(
                this.ProfileData.Permanent_Country
              );
              this.personalDetailsForm.controls['perState'].setValue(
                this.ProfileData.Permanent_State
              );
              this.personalDetailsForm.controls['perDistrict'].setValue(
                this.ProfileData.Permanent_District
              );
              this.personalDetailsForm.controls['perTaluka'].setValue(
                this.ProfileData.Permanent_Taluka
              );
              this.personalDetailsForm.controls['perCity'].setValue(
                this.ProfileData.Permanent_City
              );
              this.personalDetailsForm.controls['perPincode'].setValue(
                this.ProfileData.Permanent_Pincode
              );
            }
            ///
            this.personalDetailsForm.controls['country'].setValue(
              this.ProfileData.Country
            );
            this.personalDetailsForm.controls['domicile'].setValue(
              this.ProfileData.State
            );
            this.personalDetailsForm.controls['nomineeName'].setValue(
              this.ProfileData.NomineeName
            );
            this.personalDetailsForm.controls['nomineeDob'].setValue(
              this.ProfileData.NomineeDOB
            );
            this.personalDetailsForm.controls['nomineeRelation'].setValue(
              this.ProfileData.NomineeRelation
            );
            this.personalDetailsForm.controls['panNo'].setValue(
              this.ProfileData.PAN
            );
            this.personalDetailsForm.controls['voterId'].setValue(
              this.ProfileData.VoterID
            );
            this.personalDetailsForm.controls['educationGap'].setValue(
              this.ProfileData.EducationGap
            );
            this.personalDetailsForm.controls['bloodGrp'].setValue(
              this.ProfileData.BloodGroup
            );
            this.personalDetailsForm.controls['maxQualification'].setValue(
              this.ProfileData.MaxQualification_Family
            );
            this.personalDetailsForm.controls['organDonation'].setValue(
              this.ProfileData.Organ_Donation
            );
            this.showprofileImg =
              Serverlink + '/' + this.ProfileData.PhotoFileName;
            this.showaadharImg =
              Serverlink + '/' + this.ProfileData.AadhaarFilename;
            this.showsignImg =
              Serverlink + '/' + this.ProfileData.SignatureFileName;
            this.personalDetailsForm.disable();
            this.PersonalBadge = true;
            this.changeStatePersonal = true;
          } else {
            //this.openYesNoDialog('Pending Personal Details');
            Swal.fire({
              title: 'Message!',
              text: 'Pending Personal Details',
              icon: 'info',
              confirmButtonText: 'OK',
            });
            this.PersonalBadge = false;
          }
          if (response.data.Education == true) {
            this.Update_EducationDetails();
            this.EducationBadge = true;
          } else {
            //this.openYesNoDialog('Pending Education Details');
            Swal.fire({
              title: 'Message!',
              text: 'Pending Education Details',
              icon: 'info',
              confirmButtonText: 'OK',
            });
            this.EducationBadge = false;
          }
          if (response.data.ProfileCount > 1) {
            this.DocumentTab = true;
            // this.EducationDetailsForm.disable();
            this.changeStateEducation = true;
          } else {
          }
        }
      });
  }

  ProfileSubmited() {
    this.StudentProfileStatus();
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
      BatchCode: this.oSession.register_batchcode,
    };
    if (
      this.ProfileAadhaar != 0 &&
      this.ProfileEducation != false &&
      this.ProfileReservation != 0
    ) {
      this.commonService
        .Post_json_data(Students_url.ProfileSubmited, jsonin)
        .subscribe((response) => {
          if (response.data == true) {
            this.globalmessage.Show_message(
              'Complete Profile Saved Successfully!'
            );
            this.personalDetailsForm.disable();
            // this.EducationDetailsForm.disable();
            // this.reservationDetailsForm.disable();
            this.DocumentTypeForm.disable();
            this.changeStateReservation = true;
            this.changeStateEducation = true;
            this.changeStatePersonal = true;
            this.router.navigate(['/dashboard']);
          }
        });
    } else {
      // this.changeStateFinalSubmit = true;
      this.globalmessage.Show_error(
        'Profile Not Submitted! Please Complete Your Personal/Reservation/Education Details!'
      );
    }
  }

  GetEducationDocuments() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Batchcode: this.oSession.register_batchcode,
      Aadhaar: this.oSession.aadhaar,
    };
    this.commonService
      .Post_json_data<Student_Documents_Education>(Students_url.EducationDocuments_URL, jsonin)
      .subscribe((response) => {
        this.Education = response.data;
        this.doc_name = response.data.Education;
        this.upload_documnet = response.data.UploadDocuments;
        if (this.Education.Education == null) {
          this.EducationTab = false;
        }
      });
  }

  Batch_api() {
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
        this.resp_Abatchs = response.data;
      });
  }

  Register_Batch_api() {
    let jsonin = {
      Batch_code: this.oSession.register_batchcode
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<Ires_registerbatch>(Students_url.Registerbatch, input_json)
      .subscribe((response) => {
        // this.resp_Abatchs.push(single_batch)
        this.resp_Abatchs.push(response.data)
        // const hasKey = 'data' in response;
        // if (hasKey) {
        //
        //   single_batch = response.data
        //   this.resp_Abatchs = single_batch
        // } else {
        //   single_batch = response
        //   this.resp_Abatchs = single_batch;
        // }
        this.SelectBatchSubjects(this.oSession.register_batchcode!);
      });
  }

  modalSelectBatchSubjects() {
    let jsonin = {
      collegecode: this.oSession.collegecode,
      finyear: this.oSession.finyear,
      Batchcode: this.oSession.register_batchcode,
      aadhaar: this.oSession.aadhaar,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data(Students_url.StudentSubjectGroup, input_json)
      .subscribe((response) => {
        if (response != null) {
          this.batchSubjects = response.data;
        }
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
        if (response.data == null) {
          return
        }
        this.QuotaStatus = response.data
        if (this.QuotaStatus[0].Quota_status != 'OPEN') {
          this.globalmessage.Show_message(
            'Quota Closed! Select Different Group Code.'
          );
          this.FeesAdmissionForm.controls['batchSubjects'].setValue('');
          this.SubjectGroups = '';
        }
      });
  }

  Btn_Payment() {
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
      .Post_json_data(Students_url.IU_Admission, input_json)
      .subscribe((response) => {
        if (response != null) {
          this.ReceiptID = this.res_Reciept.ReceiptID;
          this.ReceiptNo = this.res_Reciept.ReceiptNo;
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
      nTranscationamount = String(this.formAmount);
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
      TxnAmount: nTranscationamount,
      //TxnAmount: String(this.formAmount),
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
      .Post_json_data(Students_url.BillDeskcheckSum, input_json)
      .subscribe((response) => {
        this.billdeskRequestMsg = response.data;
        if (this.billdeskRequestMsg != null) {
          BilldeskPay(this.billdeskRequestMsg, '', '');
        }
      });
  }

  Update_EducationDetails() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.oSession.aadhaar,
      Document_Type: '',
    };
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg') {
      return true;
    } else {
      return false;
    }
  }

  Aadhar_fileChange(element: any) {
    this.adhaar_img = element.target.files;
    if (
      this.adhaar_img[0].type == 'image/jpeg' ||
      this.adhaar_img[0].type == 'image/png'
    ) {
      if (this.adhaar_img[0].size < 2400000) {
        this.fileChangeEvent(element, 3);
      } else {
        //this.openYesNoDialog('File size should be less than 2MB');
        Swal.fire({
          title: 'Message!',
          text: 'File size should be less than 2MB',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } else {
      //this.openYesNoDialog('Only JPG/JPEG/PNG files allowed!');
      Swal.fire({
        title: 'Message!',
        text: 'Only JPG/JPEG/PNG files allowed!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  }

  Sign_fileChange(element: any) {
    this.signature_img = element.target.files;
    if (
      this.signature_img[0].type == 'image/jpeg' ||
      this.signature_img[0].type == 'image/png'
    ) {
      if (this.signature_img[0].size < 2400000) {
        this.fileChangeEvent(element, 2);
      } else {
        //this.openYesNoDialog('File size should be less than 2MB!');
        Swal.fire({
          title: 'Message!',
          text: 'File size should be less than 2MB',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } else {
      //this.openYesNoDialog('Only JPG/JPEG/PNG files allowed!');
      Swal.fire({
        title: 'Message!',
        text: 'Only JPG/JPEG/PNG files allowed!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  }

  Profile_fileChange(element: any) {
    this.profile_img = element.target.files;
    if (
      this.profile_img[0].type == 'image/jpeg' ||
      this.profile_img[0].type == 'image/png'
    ) {
      if (this.profile_img[0].size < 2400000) {
        this.fileChangeEvent(element, 1);
      } else {
        //this.openYesNoDialog('File size should be less than 2MB!');
        Swal.fire({
          title: 'Message!',
          text: 'File size should be less than 2MB',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } else {
      //this.openYesNoDialog('Only JPG/JPEG/PNG files allowed');
      Swal.fire({
        title: 'Message!',
        text: 'Only JPG/JPEG/PNG files allowed!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  }

  fileChangeEvent(fileInput: any, id: number) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      // const max_size = 20971520;
      // const allowed_types = ['image/png', 'image/jpeg'];
      // const max_height = 15200;
      // const max_width = 25600;
      // if (fileInput.target.files[0].size > max_size) {
      //   this.imageError =
      //     'Maximum size allowed is ' + max_size / 1000 + 'Mb';
      //   return false;
      // }
      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //   this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //   return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          if (id == 1) {
            this.cardImageBase64 = e.target.result;
            this.isImageSaved = true;
          } else if (id == 2) {
            this.cardImageBase66 = e.target.result;
            this.isImageSaved2 = true;
          } else if (id == 3) {
            this.cardImageBase68 = e.target.result;
            this.isImageSaved3 = true;
          }
          // this.previewImagePath = imgBase64Path;
          // }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage(id: any) {
    if (id == 1) {
      this.cardImageBase64 = null;
      this.isImageSaved = false;
    } else if (id == 2) {
      this.cardImageBase66 = null;
      this.isImageSaved2 = false;
    } else if (id == 3) {
      this.cardImageBase68 = null;
      this.isImageSaved3 = false;
    }
  }

  PortalOpen(event: any) {
    this.BatchCode = event.Batch_Code;
    this.formAmount = event.FormAmount;
    if (this.oSession.demo == 'true') {
      this.formAmount = '1';
    }
    let jsonin = {
      finyear: this.oSession.finyear,
      collegecode: this.oSession.collegecode,
      batchcode: this.BatchCode,
    };
    this.commonService.Post_json_data<PhdBatchs>(Students_url.PortalOpenv1, jsonin).subscribe((response) => {
      if (response === null) {
        return;
      }
      if (this.portalopenv1.Admissionstarted == true) {
        this.modalSelectBatchSubjects();
      } else {
        // this.FeesAdmissionForm.controls['batch'].setValue('');
        this.globalmessage.Show_message(
          'Admission Closed for this Particular Batch!'
        );
        this.FeesAdmissionForm.controls['batchSubjects'].setValue('');
        this.SubjectGroups = '';
      }
    });
  }

  handleLiveDemoChange(event: any) {
    this.paymentmodalform = event;
  }

  onSavedetails() {
    this.studentDetailsForm.addControl('finyear', new FormControl('', []));
    this.studentDetailsForm.controls['finyear'].setValue(this.oSession.finyear);
    this.studentDetailsForm.addControl('college_code', new FormControl('', []));
    this.studentDetailsForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );
    this.studentDetailsForm.addControl('aadhaar', new FormControl('', []));
    this.studentDetailsForm.controls['aadhaar'].setValue(this.oSession.aadhaar);
    let input_json = {
      Input: encryptUsingAES256(this.studentDetailsForm.value),
    };
    this.commonService
      .Post_json_data(Students_url.IU_Personalinfo, input_json)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your details');
        }
        this.IUStudentDetails = response;
        this.globalmessage.Show_successmessage('Data updated successfully')
      });
  }

  IU_Parents() {
    this.parentDetailsForm.addControl('finyear', new FormControl('', []));
    this.parentDetailsForm.controls['finyear'].setValue(this.oSession.finyear);
    this.parentDetailsForm.addControl('college_code', new FormControl('', []));
    this.parentDetailsForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );
    this.parentDetailsForm.addControl('aadhaar', new FormControl('', []));
    this.parentDetailsForm.controls['aadhaar'].setValue(this.oSession.aadhaar);
    let input_json = {
      Input: encryptUsingAES256(this.parentDetailsForm.value),
    };
    this.commonService
      .Post_json_data(Students_url.IU_Parents, input_json)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your details');
        }
        this.IU_parentdetails = response;
        this.globalmessage.Show_message('Data uploaded successfully');
      });
  }

  IU_Address() {
    this.addressDetailsForm.addControl('finyear', new FormControl('', []));
    this.addressDetailsForm.controls['finyear'].setValue(this.oSession.finyear);
    this.addressDetailsForm.addControl('college_code', new FormControl('', []));
    this.addressDetailsForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );
    this.addressDetailsForm.addControl('aadhaar', new FormControl('', []));
    this.addressDetailsForm.controls['aadhaar'].setValue(this.oSession.aadhaar);
    let input_json = {
      Input: encryptUsingAES256(this.addressDetailsForm.value),
    };
    this.commonService
      .Post_json_data(Students_url.IU_Address, input_json)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your details');
        }
        this.IU_parentdetails = response;
        this.globalmessage.Show_successmessage('Data uploaded successfully');
        this.getPersonalInfo()
      });
  }

  //Get Details
  getPersonalInfo() {
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Aadhaar: this.oSession.aadhaar,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<Ires_personaldata>(Students_url.get_personalinfo, input_json)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('No data found');
          return
        }
        this.get_personaldetail = response.data;
        if (this.get_personaldetail.parentsubmited && this.get_personaldetail.othersubmited &&
          this.get_personaldetail.nationalitysubmited &&
          this.get_personaldetail.addresssubmited && this.get_personaldetail.photosubmited
        ) {
          this.checkbox_personal = true;
        }
        if (this.get_personaldetail.firstname.length <= 0) {
          // this.studentDetailsForm.disable();
          this.parentDetailsForm.disable();
          this.addressDetailsForm.disable();
          this.nationalitynomineeForm.disable();
          this.otherDetailsForm.disable();
          this.reservationdetailForm.disable();
        } else {
          this.Check_alldocument_filled();
          this.Check_alleducation_filled();
          //
          this.studentDetailsForm.patchValue(this.get_personaldetail);
          this.parentDetailsForm.patchValue(this.get_personaldetail.parents);
          this.addressDetailsForm.patchValue(this.get_personaldetail.address);
          this.nationalitynomineeForm.patchValue(
            this.get_personaldetail.nationality
          );
          this.otherDetailsForm.patchValue(this.get_personaldetail.other);
          this.reservationdetailForm.patchValue(
            this.get_personaldetail.reservation
          );
          this.Finalsubmit_enable();
          // this.Check_alldocument_filled();
        }
      });
  }

  IU_Nationalty() {
    this.nationalitynomineeForm.addControl('finyear', new FormControl('', []));
    this.nationalitynomineeForm.controls['finyear'].setValue(
      this.oSession.finyear
    );
    this.nationalitynomineeForm.addControl(
      'college_code',
      new FormControl('', [])
    );
    this.nationalitynomineeForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );
    this.nationalitynomineeForm.addControl('aadhaar', new FormControl('', []));
    this.nationalitynomineeForm.controls['aadhaar'].setValue(
      this.oSession.aadhaar
    );
    let input_json = {
      Input: encryptUsingAES256(this.nationalitynomineeForm.value),
    };
    this.commonService
      .Post_json_data(Students_url.IU_Nationalty, input_json)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your details');
        }
        this.IU_parentdetails = response;
        this.globalmessage.Show_message('Data uploaded successfully');
      });
  }

  IU_Others() {
    this.otherDetailsForm.addControl('finyear', new FormControl('', []));
    this.otherDetailsForm.controls['finyear'].setValue(this.oSession.finyear);
    this.otherDetailsForm.addControl('college_code', new FormControl('', []));
    this.otherDetailsForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );
    this.otherDetailsForm.addControl('aadhaar', new FormControl('', []));
    this.otherDetailsForm.controls['aadhaar'].setValue(this.oSession.aadhaar);
    let input_json = {
      Input: encryptUsingAES256(this.otherDetailsForm.value),
    };
    this.commonService
      .Post_json_data(Students_url.IU_Others, input_json)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your details');
        }
        this.IU_parentdetails = response;
        this.globalmessage.Show_message('Data uploaded successfully');
      });
  }

  saveReservDetails() {
    this.reservationdetailForm.addControl('finyear', new FormControl('', []));
    this.reservationdetailForm.controls['finyear'].setValue(
      this.oSession.finyear
    );
    this.reservationdetailForm.addControl(
      'college_code',
      new FormControl('', [])
    );
    this.reservationdetailForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );
    this.reservationdetailForm.addControl('aadhaar', new FormControl('', []));
    this.reservationdetailForm.controls['aadhaar'].setValue(
      this.oSession.aadhaar
    );
    let input_json = {
      Input: encryptUsingAES256(this.reservationdetailForm.value),
    };
    this.commonService
      .Post_json_data(Students_url.IU_Reservations, input_json)
      .subscribe((response) => {
        if (response) {
          this.globalmessage.Show_message('Data uploaded successfully');
        }
      });
  }

  saveEDUdetails() {
    if (this.doc_pdffile[0].size < 100000) {
      this.globalmessage.Show_error('File size should be less than 1MB')
      return
    }
    this.educationdetailForm.addControl('finyear', new FormControl('', []));
    this.educationdetailForm.controls['finyear'].setValue(
      this.oSession.finyear
    );
    this.educationdetailForm.addControl(
      'college_code',
      new FormControl('', [])
    );
    this.educationdetailForm.controls['college_code'].setValue(
      this.oSession.collegecode
    );
    this.educationdetailForm.addControl('aadhaar', new FormControl('', []));
    this.educationdetailForm.controls['aadhaar'].setValue(
      this.oSession.aadhaar
    );
    this.educationdetailForm.addControl('batchstream', new FormControl('', []));
    this.educationdetailForm.controls['batchstream'].setValue('NONE');
    this.educationdetailForm.addControl('inhouse', new FormControl('', []));
    this.educationdetailForm.controls['inhouse'].setValue('NO');
    this.educationdetailForm.addControl(
      'hindilinguistic',
      new FormControl('', [])
    );
    this.educationdetailForm.controls['hindilinguistic'].setValue('NO');
    this.educationdetailForm.addControl(
      'document_type',
      new FormControl('', [])
    );
    this.educationdetailForm.controls['document_type'].setValue(
      this.selected_edu.document_type
    );
    this.educationdetailForm.addControl('document_code', new FormControl('', []));
    this.educationdetailForm.controls['document_code'].setValue(this.selected_edu.document_code);
    // let x  = this.educationdetailForm.controls['datepass'].value
    //
    // this.educationdetailForm.get('datepass')!.setValue(
    //   this.datepipe.transform(x, 'yyyy-MM-dd'))
    // let input_json = {
    //     Input: encryptUsingAES256(this.educationdetailForm.value),
    // };
    let formdata = new FormData();
    formdata.append('input_form', encryptUsingAES256(this.educationdetailForm.value))
    formdata.append('file', this.doc_pdffile[0])
    this.commonService
      .Post_formdata(Students_url.IU_StudentEducation, formdata)
      .subscribe((response) => {
        if (response != null) {
          if (response.data == true) {
            // this.get_documentdetail();
            this.globalmessage.Show_message('Education Details Saved.');
          }
        }
      });
  }

  Check_alleducation_filled() {
    this.alleducation = false
    for (const edu of this.get_personaldetail.education) {
      if (edu.percentage <= 0) {
        this.alleducation = true
        break;
      }
    }
  }

  Check_alldocument_filled() {
    // this.documentbtn = false
    // this.documentbtn = true
    this.documentbtn = false
    for (const documentstatus of this.get_personaldetail.document) {
      if (documentstatus.document_status.length <= 0) {
        this.documentbtn = true
        break;
      }
    }
  }

  get_documentdetail() {
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Aadhaar: this.oSession.aadhaar,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data<Ires_education[]>(Students_url.Get_educationdetails, input_json)
      .subscribe((response) => {
        this.res_table = response.data;
      });
  }

  selecteddoctype(event: any) {
    this.documentType = event;
  }

  get picture_fld() {
    return this.Profilepictform.get('picture');
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    const filebeforecorp = this.imageChangedEvent.target.files[0];
    this.Uploadfile = new File([event.blob!], filebeforecorp.name, {
      type: 'PNG',
    });
  }

  image_signCropped(event: ImageCroppedEvent) {
    this.croppedsignImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl!
    );
    const filebeforecorp = this.imageChanged_signEvent.target.files[0];
    this.Uploadsignfile = new File([event.blob!], filebeforecorp.name, {
      type: 'PNG',
    });
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  imagesignLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  cropperSignReady() {
    // cropper ready
  }

  loadImageFailed() {
    this.globalmessage.Show_message('Issue while loading image.');
    // show message
  }

  loadSignImageFailed() {
    this.globalmessage.Show_message('Issue while loading image.');
    // show message
  }

  showPreview(event: any) {
    this.pngsignfilename = (this.oSession.aadhaar! + Math.random()).toString();
    this.imageChangedEvent = event;
    const file = (event.target as HTMLInputElement).files![0];
    /*
    if (file.size > 50000) {
      this.globalmessage.Show_error('File size is more than 5 MB.');
      this.Profilepictform.reset();
      return;
    }
    */
    /*
    if (file.type != 'image/png') {
      this.globalmessage.Show_error('Only .png file allowed!');
      this.Profilepictform.reset();
      return;
    }
    */
    this.Profilepictform.patchValue({picture: file});
    this.Profilepictform.get('picture')!.updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      this.croppedImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  showPreview_sign(event: any) {
    this.pngfilename = (this.oSession.aadhaar! + Math.random()).toString();
    this.imageChanged_signEvent = event;
    const file = (event.target as HTMLInputElement).files![0];
    this.Profilepictform.patchValue({picture: file});
    this.Profilepictform.get('picture')!.updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.signimageURL = reader.result as string;
      this.croppedsignImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  picture_fld_sign() {
    return this.Profilepictform.get('picture');
  }

  UploadImage() {
    let jsonin = {
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
      Aadhaar: this.oSession.aadhaar,
    };
    let formdata = new FormData();
    formdata.append('input_form', encryptUsingAES256(jsonin));
    formdata.append('files', this.Uploadfile);
    formdata.append('files', this.Uploadsignfile);
    this.commonService
      .Post_formdata(Students_url.Upload_profile_photo, formdata)
      .subscribe((response: any) => {
        this.Ires_photo = response.data;
        this.globalmessage.Show_message('Data uploaded successfully.');
      });
  }

  xlsxUpload(element: any) {
    this.doc_pdffile = element.target.files;
  }

  PersonalSubmit() {
    // if()
    // this.submitpage = 1
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar: this.oSession.aadhaar,
      // pagesubmited: pagesubmitted
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data(Students_url.IU_personalsubmited, input_json)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your data');
        }
        const hasKey = 'data' in response;
        if (hasKey) {
          this.personalsubmitted = response.data;
        } else {
          this.personalsubmitted = response;
        }
        this.globalmessage.Show_successmessage('Data submitted successfully.')
      });
  }

  EducationSubmit() {
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar: this.oSession.aadhaar,
      educationsubmited: this.educationdetailForm.controls['checkprofile_education'].value
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService
      .Post_json_data(Students_url.IU_educationsubmited, input_json)
      .subscribe((response) => {
        if (response == null) {
          this.globalmessage.Show_error('Please check your data');
        }
        const hasKey = 'data' in response;
        if (hasKey) {
          this.res_educationsubmitted = response.data;
        } else {
          this.res_educationsubmitted = response;
        }
        this.globalmessage.Show_successmessage('Data submitted successfully.')
      });
  }

  Documentupload_Submit() {
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar: this.oSession.aadhaar,
      documentsubmited: this.documentUploadForm.controls['checkprofile_document'].value
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService.Post_json_data(Students_url.IU_documentsubmited, input_json).subscribe((response) => {
      const hasKey = 'data' in response;
      if (hasKey) {
        this.res_documentsubmitted = response.data;
      } else {
        this.res_documentsubmitted = response;
      }
      this.globalmessage.Show_successmessage('Documents uploaded successfully')
    })
  }

  SelectBatchSubjects(nBatchcode: number) {
    let jsonin = {
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

  ProfileResource() {
    this.commonService
      .Post_json_data
    < Res_ProfileResources > (Students_url.ProfileResources, "")
      .subscribe((response) => {
        this.Ires_ProfileResources = response.data
        this.relation = this.Ires_ProfileResources.Relation_Type
        this.occupation = this.Ires_ProfileResources.occupation_guardian
        this.annual_income = this.Ires_ProfileResources.annual_income
        this.location_area = this.Ires_ProfileResources.Location_Area
        this.country = this.Ires_ProfileResources.country
        this.state = this.Ires_ProfileResources.State
        this.district = this.Ires_ProfileResources.district
        this.bloodgroup = this.Ires_ProfileResources.BloodGroup
        this.nominee_relation = this.Ires_ProfileResources.Nominee_Relation
        this.gender = this.Ires_ProfileResources.sex
        this.religion = this.Ires_ProfileResources.religion
        this.mother_tongue = this.Ires_ProfileResources.mother_tongue
        this.martial_status = this.Ires_ProfileResources.marital_status
        this.reservation = this.Ires_ProfileResources.parallel_horizontal_reservation
        this.category = this.Ires_ProfileResources.category
        this.specially_abled = this.Ires_ProfileResources.specially_abled
        this.activity = this.Ires_ProfileResources.activity
        this.participation_level = this.Ires_ProfileResources.participation_level
        this.secured_rank = this.Ires_ProfileResources.secured_rank
        this.board = this.Ires_ProfileResources.College_University
      });
  }

  updateAddress(event: any) {
    if (event == 'Yes') {
      this.addressDetailsForm.controls['permanent_flatno'].setValue(
        this.addressDetailsForm.controls['correpondence_flatno'].value)
      this.addressDetailsForm.controls['permanent_colonyname'].setValue(
        this.addressDetailsForm.controls['correpondence_colonyname'].value)
      this.addressDetailsForm.controls['permanent_villagename'].setValue(
        this.addressDetailsForm.controls['correpondence_villagename'].value)
      this.addressDetailsForm.controls['permanent_landmark'].setValue(
        this.addressDetailsForm.controls['correpondence_landmark'].value)
      this.addressDetailsForm.controls['permanent_location_area'].setValue(
        this.addressDetailsForm.controls['correpondence_location_area'].value)
      this.addressDetailsForm.controls['permanent_country'].setValue(
        this.addressDetailsForm.controls['correpondence_country'].value)
      this.addressDetailsForm.controls['permanent_state'].setValue(
        this.addressDetailsForm.controls['correpondence_state'].value)
      this.addressDetailsForm.controls['permanent_district'].setValue(
        this.addressDetailsForm.controls['correpondence_district'].value)
      this.addressDetailsForm.controls['permanent_taluka'].setValue(
        this.addressDetailsForm.controls['correpondence_taluka'].value)
      this.addressDetailsForm.controls['permanent_city'].setValue(
        this.addressDetailsForm.controls['correpondence_city'].value)
      this.addressDetailsForm.controls['permanent_pincode'].setValue(
        this.addressDetailsForm.controls['correpondence_pincode'].value)
    } else {
      this.addressDetailsForm.controls['permanent_flatno'].setValue('')
      this.addressDetailsForm.controls['permanent_colonyname'].setValue('')
      this.addressDetailsForm.controls['permanent_villagename'].setValue('')
      this.addressDetailsForm.controls['permanent_landmark'].setValue('')
      this.addressDetailsForm.controls['permanent_location_area'].setValue('')
      this.addressDetailsForm.controls['permanent_country'].setValue('')
      this.addressDetailsForm.controls['permanent_state'].setValue('')
      this.addressDetailsForm.controls['permanent_district'].setValue('')
      this.addressDetailsForm.controls['permanent_taluka'].setValue('')
      this.addressDetailsForm.controls['permanent_city'].setValue('')
    }
  }

  columnDefs = [
    {
      field: '', maxWidth: 50, checkboxSelection: true
    },
    {headerName: "Document type", field: "document_type", resizable: true},
    {headerName: "Board", field: "board", resizable: true},
    {headerName: "State", field: "state", resizable: true},
    {headerName: "Education Board", field: "education_board", resizable: true},
    {headerName: "College name", field: "college_name", resizable: true},
    {headerName: "Date Pass", field: "datepass", resizable: true},
    {headerName: "Roll No", field: "rollno", resizable: true},
    {headerName: "Marksheet", field: "marksheetno", resizable: true},
    {headerName: "Grade or Marks", field: "gradesormarks", resizable: true},
    {headerName: "Marks Obtained", field: "marksobtained", resizable: true},
    {headerName: "Out Off Marks", field: "outoff", resizable: true},
    {headerName: "Percentage", field: "percentage", resizable: true},
    // {headerName: "BatchStream", field: "batchstream", resizable: true},
    // {headerName: "Inhouse", field: "inhouse", resizable: true},
    // {headerName: "Hindilinguistic", field: "hindilinguistic", resizable: true},
  ];
  columnDefs_document = [
    {
      field: '', maxWidth: 50, checkboxSelection: true
    },
    {headerName: "Document Name", flex: 1, field: "document_name", resizable: true},
    {headerName: "Document Code", flex: 1, field: "document_code", resizable: true},
    {headerName: "Upload Status", flex: 1, field: "document_status", resizable: true},
  ];

  onRowSelectedEvent(event: any) {//on checkbox selection
  }

  onRowSelected_documentEvent(event: any) {//on checkbox selection
  }

  onSelectionChanged(event: any) {
    let SelectedDoc = this.gridApi.getSelectedRows()
    this.selected_edu = SelectedDoc[0]
    // this.educationdocumenttype = true;
  }

  onSelectiondocument_Changed(event: any) {
    let selected_document = this.gridApi_document.getSelectedRows();
    this.selected_document = selected_document[0]
  }

  onGridReady(params: any) {
    this.gridApi = params.api
  };

  onGridReady_document(params: any) {
    this.gridApi_document = params.api
  };

  Upload_studentDocument() {
    if (this.selected_document.document_status == "UPLOADED") {
      this.globalmessage.Show_error('You have already uploaded the current document.')
      return;
    }
    let jsonin = {
      finyear: this.oSession.finyear,
      college_code: this.oSession.collegecode,
      aadhaar: this.oSession.aadhaar,
      Batch_code: this.selected_document.batch_code,
      document_code: this.selected_document.document_code,
      document_name: this.selected_document.document_name
    };
    let formdata = new FormData();
    formdata.append('input_form', encryptUsingAES256(jsonin))
    formdata.append('file', this.doc_pdffile[0])
    this.commonService.Post_formdata(Students_url.UploadDocuments, formdata).subscribe((response) => {
      const hasKey = 'data' in response;
      if (hasKey) {
        this.res_documentsubmitted = response.data;
      } else {
        this.res_documentsubmitted = response;
      }
      this.globalmessage.Show_successmessage('Documents uploaded successfully')
    })
  }

  PercentageCalculater() {
    let obtainedmarks;
    let outoff;
    let percentage;
    let value;
    obtainedmarks = parseInt(
      this.educationdetailForm.controls['marksobtained'].value
    );
    outoff = parseInt(this.educationdetailForm.controls['outoff'].value);
    if (outoff <= 0) {
      return;
    }
    if (obtainedmarks <= 0) {
      return;
    }
    if (obtainedmarks < 100) {
      this.globalmessage.Show_error('Obtain marks should be > than 100')
      return;
    }
    if (obtainedmarks > outoff) {
      this.globalmessage.Show_error('Obtain marks should be < than out off marks')
      this.educationdetailForm.controls['marksobtained'].setValue('0');
      this.educationdetailForm.controls['outoff'].setValue('0');
      this.educationdetailForm.controls['percentage'].setValue('0');
      return;
    }
    percentage = (obtainedmarks / outoff) * 100;
    this.educationdetailForm.controls['percentage'].setValue(parseFloat(
      percentage.toFixed(2))
    );
  }

  res_finalsubmitprofile: any;

  Final_ProfileSubmitted() {
    let jsonin = {
      Finyear: this.oSession.finyear,
      Collegecode: this.oSession.collegecode,
      Aadhaar: this.oSession.aadhaar,
      BatchCode: this.oSession.register_batchcode,
    };
    let jsonin_input = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService.Post_json_data(Students_url.ProfileSubmited, jsonin_input).subscribe((response) => {
      this.res_finalsubmitprofile = response
      this.globalmessage.Show_successmessage("Data uploaded successfully.")
      // this.parentDetailsForm.disable();
      // this.addressDetailsForm.disable();
      // this.nationalitynomineeForm.disable();
      // this.otherDetailsForm.disable();
      // this.reservationdetailForm.disable();
    });
  }

  protected readonly get_personalinfo = Students_url.get_personalinfo;
}



