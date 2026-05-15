import * as myGlobals from '../../../globals/global-variable';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Renderer2,} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { registerLocaleData } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Students_url,} from '../../../globals/global-api';
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
    Ires_Profilesubmited,
    Ires_Reciept,
    Ires_registerbatch,
    Ires_Upload_Document,
    PhdBatchs,
    Res_ProfileResources,
    res_singlebatch,
    Student_Documents_Education,
    Subjects_group_h,
} from '../../../models/response';
import localeEs from '@angular/common/locales/es';
import {ImageCroppedEvent, ImageCropperComponent, ImageTransform, LoadedImage,} from 'ngx-image-cropper';
import {DomSanitizer} from '@angular/platform-browser';
import {DashboardService} from '../../dashboard/dashboard.service';
import {
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    BadgeComponent,
    ButtonDirective,
    CalloutComponent,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    CardTextDirective,
    CardTitleDirective,
    ColComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    FormControlDirective,
    FormDirective,
    FormSelectDirective,
    NavComponent,
    NavLinkDirective,
    RowComponent,
    SpinnerComponent,
    TabContentComponent,
    TabContentRefDirective,
    TabPaneComponent,
    TemplateIdDirective
} from "@coreui/angular-pro";
import {StudentprofileService} from "./studentprofile.service";
import {mobileValidator} from "../../../globals/aadhaar_validator";
import {AgGridAngular} from "ag-grid-angular";
import {AllCommunityModule, ColDef, ModuleRegistry} from 'ag-grid-community';
import {FileuploadversiontwoComponent} from "../fileuploadversiontwo/fileuploadversiontwo.component";

registerLocaleData(localeEs);
type MyArrayType = Array<{ value: string }>;
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
    selector: 'app-fillprofile',
    templateUrl: './studentprofile.component.html',
    styleUrls: ['./studentprofile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    CardComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    SpinnerComponent,
    NavComponent,
    TabContentRefDirective,
    TabContentComponent,
    TabPaneComponent,
    ImageCropperComponent,
    FormDirective,
    FormControlDirective,
    BadgeComponent,
    AccordionItemComponent,
    AccordionButtonDirective,
    CardTitleDirective,
    CardTextDirective,
    CalloutComponent,
    AccordionComponent,
    NavLinkDirective,
    ButtonDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    TemplateIdDirective,
    AgGridAngular,
    CardHeaderComponent,
    FileuploadversiontwoComponent
],
    standalone: true
})
export class StudentprofileComponent implements OnInit {
    checkbox_personal: boolean = false;
    checkbox_percentage: boolean = true;
    items = [1, 2, 3, 4, 5, 6, 7];
    activePane = 0;
    Pagename!: string;
    FormFessBatchcode: number = 0;
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
    openpercentage = false
    select_sgpa: any
    hidepersonaltab = false;
    invoice: any;
    res_reciept = {} as Ires_Reciept;
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
    eduButtonDisableTab = true
    // EducationDetailsForm!: UntypedFormGroup;
    // reservationDetailsForm!: UntypedFormGroup;
    checkfinaleducationSubmit!: FormGroup;
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
    RecieptID: any
    RecieptNo: any
    documentSubmit = false;
    ProfileData: any;
    ReservationData: any;
    res: any;
    data: any;
    res_singlebatch!: res_singlebatch;
    rowss: any = [];
    gridOptions: any;
    gridOptions_document: any;
    college!: number;
    marks: any;
    boards: any;
    batch_name: any;
    finyear: any;
    collegecode: any;
    CheckPercentagesgpa: any;
    Value_Sgpapercentage: any
    //Images Upload and Fill Profile
    adhaar_img!: Array<File>;
    signature_img!: Array<File>;
    profile_img!: Array<File>;
    doc_pdffile!: Array<File>;
    doc_category!: File;
    doc_eligible!: File;
    doc_reservatino!: File;
    doc_ration!: File;
    formData = new FormData();
    date: any;
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
    uploaddocuments: any;
    //Modal
    resp_Abatchs: Ires_registerbatch[] = [];
    selected_batch!: Ires_registerbatch
    selected_document!: Ires_education;
    selected_subject!: Subjects_group_h;
    batchSubjects: Subjects_group_h[] = [];
    batchcode: any;
    SubjectGroups: any;
    imagefile: any
    selected_batchstream: any;
    studentpercent = 0;
    SubjectGroupID: any;
    formAmount: any;
    portalopenv1: PhdBatchs = {} as PhdBatchs
    BatchCode: any;
    billdeskRequestMsg: string = '';
    DocumentTab = true;
    changeStateEducation = false;
    public paymentmodalform = false;
    tabfivedisable = true;
    openoneacc = false;
    opentwoacc = false;
    IUStudentDetails: boolean = false;
    IU_parentdetails: boolean = false;
    documentType!: any;
    //Badge
    personalDetailBadge = false;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    containWithinAspectRatio = false;
    private Uploadprofilepicture!: File;
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
    selctgen!: any;
    select_inhouse!: any;
    select_hindiling!: any;
    res_educationsubmitted: boolean = true;
    educationdocumenttype!: true;
    doc_name!: Education_Document[];
    documentType_selected!: any;
    upload_documnet!: Ires_Upload_Document[];
    res_education!: Ires_education;
    oSession!: Sessiondata;
    // get_personaldetail!: Ires_personalinfo;
    get_personaldetail!: Ires_personaldata;
    res_documentsubmitted: boolean = true
    education!: Ires_education;
    personalsubmitted: boolean = true;
    FormFees: any;
    visiblebatch = false;
    visivlebatch_atkt = false;
    regbatchname = '';
    aSubjects!: Subjects_group_h;
    Ires_ProfileResources!: Res_ProfileResources
    selected_edu!: Ires_education;
    private gridApi: any;
    res_finalsubmitprofile!: boolean;
    private gridApi_document: any;
    public rowSelection: 'single' | 'multiple' = 'single';
    public rowSelection_document: 'single' | 'multiple' = 'single';
    Selected_cat!: any
    Selected_abled!: any
    Selected_otherreservation!: any;
    batchstream!: "NONE";
    hindilinguistic!: 'NO';
    inhouse!: 'NO';
    //Badge
    PhotoBadge = false;
    alleducation: boolean = false;
    documentbtn = true;
    res_Profilesubmited!: Ires_Profilesubmited;
    //Runtime Form
    formGroup!: FormGroup;
    CASTECODE = '70'
    DISABILITYCODE = '80'
    RESERVATIONCODE = '888'
    RATIONCODE = '130'
    ProfilephotoImage: any;
    SignatureImage: any;
    //loader
    savepersonalloader = false
    uploadphotoloader = false;
    saveparentsloader = false;
    addressloader = false;
    nationalitynomineeloader = false;
    otherdetailsloader = false;
    finalsubmitloader = false
    saveEducationloader = false
    reservationsaveloader = false

    constructor(
        private http: HttpClient,
        private sessionservice: SessionService,
        private router: Router,
        private commonService: CommonService,
        private activeroute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private sanitizer: DomSanitizer,
        private renderer: Renderer2, private faceService: StudentprofileService,
        private cd: ChangeDetectorRef,
        private studentprofieservice: StudentprofileService,
        private dashboardservice: DashboardService,
        private globalmessage: GlobalMessage,
    ) {
    }

    /*
        @ViewChild('content') content: any;
        @ViewChild('item1') item1: any;
        @ViewChild('res_table') res_tablehtml: any;
        @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
    */
    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();


        this.CreateForm();
        /*
        if (this.oSession.formfeesrecieved == 'NOTPAID') {
            this.globalmessage.Show_error("Formfees not paid.Please pay your form fees.")
            this.router.navigate(['/dashboard'])
            return
        }
        if (this.oSession.registerfinyear == myGlobals.Global_CurrentFinYear) {
            if (this.oSession.formfeesrecieved == 'PAID') {
                this.CreateForm();
            }
        } else {
            if (this.oSession.currentformfeesbatchcode! > 0) {
                this.single_batch();
            }
        }
         */
        this.ProfileResource();
    }

    DynamicForm() {
        //https://stackblitz.com/edit/angular-dynamic-form-loop?file=src%2Fapp%2Fapp.component.html
        this.formGroup = this.formBuilder.group({
            participant: this.formBuilder.array([
                // this.getParticipant()
            ])
        });
        const control = <FormArray>this.formGroup.controls['participant'];
        for (const data of this.get_personaldetail.education) {
            control.push(this.getParticipant(data));
        }
        let nLoop = 0
        for (let edu_data of this.get_personaldetail.education) {
            let control = <FormArray>this.formGroup.controls['participant'];
            control.controls[nLoop].patchValue(edu_data)
            nLoop++
        }
    }

    private getParticipant(data: Ires_education) {
        return this.formBuilder.group({
                board: ['', [Validators.required]],
                state: ['', [Validators.required]],
                education_board: ['', [Validators.required]],
                college_name: ['', [Validators.required]],
                datepass: ['', [Validators.required]],
                rollno: ['', [Validators.required]],
                marksheetno: ['', [Validators.required]],
                marksobtained: [''],
                outoff: [''],
                percentage: [''],
                file: [''],
                sgpa: ['', [Validators.required]],
                checkpercentagesgpa: ['', [Validators.required]],
                sgpa_percentage: ['', [Validators.required]],
                document_code: data.document_code,
                document_type: data.document_type,
                document_type_name: data.document_type,
                finyear: data.finyear,
                college_code: data.college_code,
                aadhaar: data.aadhaar,
                // batchstream: this.batchstream,
                // inhouse: ['NO'],
                // hindilinguistic: this.hindilinguistic,
            }
        )
    }

    Batch_selected() {
        if (this.selected_batch.batch_code > 0) {
            this.SelectBatchSubjects(this.selected_batch.batch_code);
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

    CreateForm() {
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
            hindilinguistic: ['', Validators.required],
            inhouse: ['', Validators.required],
            // governmentmou: ['',Validators.required]
            // nameLCstudent: ['', Validators.required],
            // nameChangestudent: ['', Validators.required],
        });
        this.Profilepictform = this.formBuilder.group({
            picture: [''],
            croped: [''],
            upload: ['', Validators.required],
            upload_signature: ['', Validators.required],
            picture_sign: [''],
            croped_sign: [''],
        });
        this.parentDetailsForm = this.formBuilder.group({
            parentsemailid: [''],
            parentsmobile: ['', [mobileValidator]],
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
            correpondence_villagename: [''],
            correpondence_landmark: ['', Validators.maxLength(60)],
            correpondence_location_area: ['', Validators.required],
            correpondence_country: ['', Validators.required],
            correpondence_state: ['', Validators.required],
            correpondence_district: ['', Validators.required],
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
            permanent_villagename: [''],
            permanent_landmark: ['', Validators.maxLength(60)],
            permanent_location_area: ['', Validators.required],
            permanent_country: ['', Validators.required],
            permanent_state: ['', Validators.required],
            permanent_district: ['', Validators.required],
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
            nomineedob: ['', Validators.required],
            nomineerelation: ['', Validators.required],
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
            opencategory: [''],
            parallel_reservation: [''],
            category: ['', Validators.required],
            subcategory: [''],
            specially_abled: [''],
            percentage: [0,],
            udid_no: [''],
            checkotherreservation: [''],
            checkspeciallyabled: [''],
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
        this.checkfinaleducationSubmit = this.formBuilder.group({
            checkeducationsubmitted: ['', Validators.required],
        });
        this.formGroup = this.formBuilder.group({
            board: ['', [Validators.required]],
            state: ['', [Validators.required]],
            education_board: ['', [Validators.required]],
            college_name: ['', [Validators.required]],
            datepass: ['', [Validators.required]],
            rollno: ['', [Validators.required]],
            marksheetno: ['', [Validators.required]],
            marksobtained: [''],
            outoff: [''],
            percentage: [''],
            file: [''],
            sgpa: ['', [Validators.required]],
            checkpercentagesgpa: ['', [Validators.required]],
            sgpa_percentage: ['', [Validators.required]],
            document_type: ['', [Validators.required]],
            batchstream: [''],
        });
        if (this.oSession.isprofilesubmited == 'true') {
            this.tabfivedisable = true
            this.parentDetailsForm.disable();
            this.addressDetailsForm.disable();
            this.nationalitynomineeForm.disable();
            this.otherDetailsForm.disable();
            this.reservationdetailForm.disable();
            this.studentDetailsForm.disable();
        }
        if (this.oSession.formfeesrecieved == 'NOTPAID') {
            this.router.navigate(['/formfees'])
        }
        this.getPersonalInfo();
    }

    Finalsubmit_enable() {
        // if (
        //     this.get_personaldetail.pagesubmited == true &&
        //     this.get_personaldetail.reservationsubmited == true &&
        //     this.get_personaldetail.educationsubmited == true
        // ) {
        //
        //
        //
        //
        // }
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
        return this.formGroup.controls;
    }

    Admission_formpayment() {
        this.paymentmodalform = !this.paymentmodalform;
        //ShiVam
        // this.modalService.open(this.content, this.NgbModalOptions);
        //Harsh
        // this.modalSelectBatch();
    }

    // ProfileSubmited() {
    //     this.StudentProfileStatus();
    //     let jsonin = {
    //         Finyear: this.oSession.finyear,
    //         Collegecode: this.oSession.collegecode,
    //         Aadhaar: this.oSession.aadhaar,
    //         BatchCode: this.oSession.register_batchcode,
    //     };
    //
    //     if (
    //         this.ProfileAadhaar != 0 &&
    //         this.ProfileEducation != false &&
    //         this.ProfileReservation != 0
    //     ) {
    //         this.commonService
    //             .Post_json(ProfileSubmited, jsonin)
    //             .subscribe((response) => {
    //                 if (response.data == true) {
    //                     this.globalmessage.Show_message(
    //                         'Complete Profile Saved Successfully!'
    //                     );
    //                     this.personalDetailsForm.disable();
    //                     // this.EducationDetailsForm.disable();
    //                     // this.reservationDetailsForm.disable();
    //                     this.DocumentTypeForm.disable();
    //                     this.changeStateReservation = true;
    //                     this.changeStateEducation = true;
    //                     this.changeStatePersonal = true;
    //
    //                     this.router.navigate(['/dashboard']);
    //                 }
    //             });
    //     } else {
    //         // this.changeStateFinalSubmit = true;
    //         this.globalmessage.Show_error(
    //             'Profile Not Submitted! Please Complete Your Personal/Reservation/Education Details!'
    //         );
    //     }
    // }


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
                this.doc_name = response.data.education;
                this.upload_documnet = response.data.uploaddocuments;
                if (this.Education.education == null) {
                    this.EducationTab = false;
                }
            });
    }

    getDatafromfileupload(e: any) {
        this.imagefile = e
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
                const hasKey = 'data' in response;
                if (hasKey) {
                    this.resp_Abatchs = response.data;
                } else {
                    this.resp_Abatchs = response;
                }
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
        this.studentprofieservice
            .StudentSubjectGroup(input_json)
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
            batchcode: this.selected_batch.batch_code,
            subjectgroupid: this.selected_subject.subject_group_id,
            subject_group_code: this.selected_subject.subject_group_code,
            quota_status: 'XXXX',
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.commonService
            .Post_json_data<AdmissionQuotasubjectGroups[]>(Students_url.CheckSubjectGroupQuota, input_json)
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

    // Btn_Payment() {
    //     this.modalSubmit = true;
    //     let jsonin = {
    //         finyear: this.oSession.finyear,
    //         college_code: myGlobals.Golbal_CollegeCode,
    //         aadhaar: this.oSession.aadhaar,
    //         batch_code: this.selected_batch.batch_code,
    //         subject_group_id: this.selected_subject.Subject_group_id,
    //         subject_group_code: this.selected_subject.Subject_group_code,
    //         term_code: myGlobals.Global_FORMFEESTERMNAME,
    //     };
    //     let input_json = {
    //         Input: encryptUsingAES256(jsonin),
    //     };
    //     this.commonService
    //         .Post_json_data<Ires_Reciept>(Students_url.IU_Admission, input_json)
    //         .subscribe((response) => {
    //             if (response != null) {
    //                 this.RecieptID = this.res_reciept.ReceiptID;
    //                 this.RecieptNo = this.res_reciept.ReceiptNo;
    //                 if (this.res_reciept.ReceiptID > 0) {
    //                     this.RegistrationPayment();
    //                 }
    //             }
    //         });
    // }
    // RegistrationPayment() {
    //     let nTranscationamount: string = '';
    //     if (this.oSession.demo == 'true') {
    //         nTranscationamount = '1';
    //         this.formAmount = '1';
    //     } else {
    //         nTranscationamount = String(this.formAmount);
    //     }
    //     let billdeskmsg = {
    //         collegecode: this.oSession.collegecode,
    //         finyear: this.oSession.finyear,
    //         batchcode: this.selected_batch.batch_code,
    //         aadhaar: this.oSession.aadhaar,
    //         termcode: myGlobals.Global_FORMFEESTERMNAME,
    //         MerchantID: '',
    //         CustomerID: String(this.res_reciept.ReceiptNo),
    //         Filler1: 'NA',
    //         TxnAmount: nTranscationamount,
    //         //TxnAmount: String(this.formAmount),
    //         // "TxnAmount": "1",
    //         BankID: 'NA',
    //         Filler2: 'NA',
    //         Filler3: 'NA',
    //         CurrencyType: 'INR',
    //         ItemCode: 'NA',
    //         TypeField1: 'R',
    //         SecurityID: '',
    //         Filler4: 'NA',
    //         Filler5: 'NA',
    //         TypeField2: 'F',
    //         AdditionalInfo1: String(this.oSession.finyear),
    //         AdditionalInfo2: '',
    //         AdditionalInfo3: String(this.selected_batch.batch_code),
    //         AdditionalInfo4: String(this.oSession.aadhaar),
    //         AdditionalInfo5: '9999',
    //         AdditionalInfo6: '1',
    //         AdditionalInfo7: String(this.res_reciept.ReceiptID),
    //         TypeField3: 'NA',
    //         Feestype: 'FORMFEES',
    //     };
    //     let input_json = {
    //         Input: encryptUsingAES256(billdeskmsg),
    //     };
    //     this.studentprofieservice
    //         .BillDeskcheckSum(input_json)
    //         .subscribe((response) => {
    //             this.billdeskRequestMsg = response.data;
    //             if (this.billdeskRequestMsg != null) {
    //                 BilldeskPay(this.billdeskRequestMsg, '', '');
    //             }
    //         });
    // }
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
        this.BatchCode = event.batch_code;
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
            if (response != null) {
                if (this.portalopenv1.admissionstarted == true) {
                    this.modalSelectBatchSubjects();
                } else {
                    // this.FeesAdmissionForm.controls['batch'].setValue('');
                    this.globalmessage.Show_message(
                        'Admission Closed for this Particular Batch!'
                    );
                    this.FeesAdmissionForm.controls['batchSubjects'].setValue('');
                    this.SubjectGroups = '';
                }
            }
        });
    }

    handleLiveDemoChange(event: any) {
        this.paymentmodalform = event;
    }

    onSavedetails() {
        if (this.selctgen == null) {
            this.globalmessage.Show_error('Please select gender.')
            return
        }
        this.studentDetailsForm.addControl('finyear', new FormControl('', []));
        this.studentDetailsForm.controls['finyear'].setValue(this.oSession.finyear);
        this.studentDetailsForm.addControl('college_code', new FormControl('', []));
        this.studentDetailsForm.controls['college_code'].setValue(this.oSession.collegecode);
        this.studentDetailsForm.addControl('aadhaar', new FormControl('', []));
        this.studentDetailsForm.controls['aadhaar'].setValue(this.oSession.aadhaar);
        this.savepersonalloader = true
        let input_json = {
            Input: encryptUsingAES256(this.studentDetailsForm.value),
        };
        this.studentprofieservice
            .IU_Personalinfo(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your details');
                }
                this.IUStudentDetails = response;
                this.globalmessage.Show_successmessage('Data updated successfully')
                this.savepersonalloader = false
                this.getPersonalInfo();
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
        this.saveparentsloader = true;
        let input_json = {
            Input: encryptUsingAES256(this.parentDetailsForm.value),
        };
        this.studentprofieservice
            .IU_Parents(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your details');
                }
                this.IU_parentdetails = response;
                this.getPersonalInfo();
                this.globalmessage.Show_message('Data uploaded successfully');
                this.saveparentsloader = false;
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
        this.addressloader = true
        let input_json = {
            Input: encryptUsingAES256(this.addressDetailsForm.value),
        };
        this.studentprofieservice
            .IU_Address(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your details');
                }
                this.IU_parentdetails = response;
                this.globalmessage.Show_successmessage('Data uploaded successfully');
                this.addressloader = false;
                this.getPersonalInfo()
            });
    }

    //Get Details
    getPersonalInfo() {
        let nBatchcode = 0;
        let nBatchuuid = '';
        if (this.oSession.currentformfeesbatchcode! <= 0) {
            nBatchcode = this.oSession.maxbatchcode!
            nBatchuuid = this.oSession.maxbatchuuid!
        } else {
            nBatchcode = this.oSession.currentformfeesbatchcode!
            nBatchuuid = this.oSession.currentbatchuuid!
        }
        let jsonin = {
            College_code: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            Aadhaar: this.oSession.aadhaar,
            batch_code: nBatchcode,
            batchuuid: nBatchuuid
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.studentprofieservice
            .get_personalinfo(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('No data found');
                    return
                }
                this.get_personaldetail = response.data
                const blob_first_photoimg = this.get_personaldetail.photo_image.substring(0, 200)
                // const cut_data = blobdata.substring(201,33)
                const last_date_photoimg = this.get_personaldetail.photo_image.substring(232, this.get_personaldetail.photo_image.length)
                const mystring_photoimg = blob_first_photoimg + last_date_photoimg
                const blob_first_signature = this.get_personaldetail.signature_image.substring(0, 200)
                // const cut_data = blobdata.substring(201,33)
                const last_date_signature = this.get_personaldetail.signature_image.substring(232, this.get_personaldetail.signature_image.length)
                const mystring_signature = blob_first_signature + last_date_signature
                this.ProfilephotoImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${mystring_photoimg}`);
                this.SignatureImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${mystring_signature}`);
                // if(this.get_personaldetail.pagesubmited == false){
                //     this.ProfilephotoImage = ''
                //     this.SignatureImage = ''
                // }else{
                //
                // }
                // if (this.get_personaldetail.firstname.length > 0) {
                //
                //   this.studentDetailsForm.controls['gender'].setValue(this.get_personaldetail.gender)
                //   this.studentDetailsForm.patchValue(this.get_personaldetail);
                //   this.studentDetailsForm.disable();
                //   this.hidepersonaltab = true;
                //
                // }
                if (this.get_personaldetail.pagesubmited == true &&
                    this.get_personaldetail.reservationsubmited == true &&
                    this.get_personaldetail.educationsubmited == true) {
                    this.tabfivedisable = false;
                }
                if (this.get_personaldetail.parentsubmited && this.get_personaldetail.othersubmited &&
                    this.get_personaldetail.nationalitysubmited &&
                    this.get_personaldetail.addresssubmited && this.get_personaldetail.photosubmited
                ) {
                    this.checkbox_personal = true;
                }
                //
                if (this.get_personaldetail.firstname.length > 0) {
                    this.hidepersonaltab = true;
                    // this.studentDetailsForm.disable();
                    // this.parentDetailsForm.disable();
                    // this.addressDetailsForm.disable();
                    // this.nationalitynomineeForm.disable();
                    // this.otherDetailsForm.disable();
                    // this.reservationdetailForm.disable();
                }
                this.Check_alleducation_filled();
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
                if (this.oSession.isprofilesubmited == 'true') {
                    this.tabfivedisable = true;
                }
                //this.DynamicForm();
                this.Finalsubmit_enable();
                // this.Check_alldocument_filled();
            });
    }

    Educationtabechange() {
        // const control = <FormArray>this.formGroup.controls['participant'];
        //
        // let nLoop = 0
        // for (const responseElement of this.get_personaldetail.education) {
        //
        //   if (responseElement.rowsubmited == true) {
        //     control.controls[nLoop].disable();
        //   }
        //
        //   nLoop++
        //
        // }
        // for (const responseElement of this.get_personaldetail.education) {
        //
        //   if (responseElement.rowsubmited == true) {
        //     this.formGroup.disable();
        //   }
        // }
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
        this.nationalitynomineeloader = true
        let input_json = {
            Input: encryptUsingAES256(this.nationalitynomineeForm.value),
        };
        this.studentprofieservice
            .IU_Nationalty(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your details');
                }
                this.IU_parentdetails = response;
                this.getPersonalInfo();
                this.globalmessage.Show_message('Data uploaded successfully');
                this.nationalitynomineeloader = false
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
        this.otherdetailsloader = true
        let input_json = {
            Input: encryptUsingAES256(this.otherDetailsForm.value),
        };
        this.studentprofieservice
            .IU_Others(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your details');
                }
                this.IU_parentdetails = response;
                this.getPersonalInfo();
                this.globalmessage.Show_message('Data uploaded successfully');
                this.otherdetailsloader = false
            });
    }

    Opencategory() {
        if (this.reservationdetailForm.controls['opencategory'].value == 'OPEN') {
            this.reservationdetailForm.controls['category'].removeValidators(Validators.required)
            this.reservationdetailForm.controls['category'].updateValueAndValidity();
        }
    }

    saveReservDetails() {
        if (this.res_singlebatch.rationcard == 1) {
            if (this.doc_ration == null) {
                this.globalmessage.Show_error('Please upload ration card')
                return
            }
        }
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
        if (this.reservationdetailForm.controls['opencategory'].value == 'RESERVED') {
            if (this.doc_category == null) {
                this.globalmessage.Show_error('Please upload category document.')
            }
            if (this.doc_category.name.length > 0) {
                this.reservationdetailForm.addControl('Castecode', new FormControl('', []));
                this.reservationdetailForm.controls['Castecode'].setValue(
                    this.CASTECODE
                );
            }
        }
        if (this.reservationdetailForm.controls['checkspeciallyabled'].value == 'YES') {
            if (this.doc_eligible == null) {
                this.globalmessage.Show_error('Please upload Specially abled document.')
            }
            if (this.doc_eligible.name.length > 0) {
                this.reservationdetailForm.addControl('disabilitycode', new FormControl('', []));
                this.reservationdetailForm.controls['disabilitycode'].setValue(
                    this.DISABILITYCODE
                );
            }
        }
        if (this.reservationdetailForm.controls['checkotherreservation'].value == 'YES') {
            if (this.doc_reservatino == null) {
                this.globalmessage.Show_error('Please upload reservaton document.')
            }
            if (this.doc_reservatino.name.length > 0) {
                this.reservationdetailForm.addControl('reservationcode', new FormControl('', []));
                this.reservationdetailForm.controls['reservationcode'].setValue(
                    this.RESERVATIONCODE
                );
            }
        }
        if (this.res_singlebatch.rationcard == 1) {
            this.reservationdetailForm.addControl('rationcode', new FormControl('', []));
            this.reservationdetailForm.controls['rationcode'].setValue(
                this.RATIONCODE
            );
        }
        this.reservationsaveloader = true
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(this.reservationdetailForm.value));
        if (this.reservationdetailForm.controls['opencategory'].value == 'RESERVED') {
            if (this.doc_category.name.length > 0) {
                formdata.append(this.CASTECODE, this.doc_category);
            }
        }
        if (this.reservationdetailForm.controls['checkspeciallyabled'].value == 'YES') {
            if (this.doc_eligible.size > 0) {
                formdata.append(this.DISABILITYCODE, this.doc_eligible);
            }
        }
        if (this.reservationdetailForm.controls['checkotherreservation'].value == 'YES') {
            if (this.doc_reservatino.size > 0) {
                formdata.append(this.RESERVATIONCODE, this.doc_reservatino);
            }
        }
        if (this.res_singlebatch.rationcard == 1) {
            formdata.append(this.RATIONCODE, this.doc_ration);
        }
        this.studentprofieservice.IU_Reservations_new(formdata).subscribe((response) => {
            if (response.data == true) {
                this.globalmessage.Show_message('Data uploaded successfully');
                this.reservationsaveloader = false
                this.getPersonalInfo();
            }
        });
    }

    saveEDUdetails() {
        if (this.imagefile == null) {
            this.globalmessage.Show_error('Please select the document')
            return
        }
        if (this.selected_document.document_type == 'HSC') {
            if (this.formGroup.controls['batchstream'].value == "") {
                this.globalmessage.Show_error('Please select stream for HSC Marksheet.')
                return
            }
        }
        if (this.formGroup.controls['datepass'].value == "") {
            this.globalmessage.Show_error('Please select Date of Passing.')
            return;
        }
        if (this.formGroup.controls['checkpercentagesgpa'].value == "YES") {
            if (this.formGroup.controls['sgpa'].value > 0) {
                if (this.formGroup.controls['sgpa'].value > 10) {
                    this.formGroup.controls['sgpa'].setValue(0)
                    this.globalmessage.Show_error('SGPA should be less than 10.')
                    return;
                }
                this.formGroup.controls['sgpa_percentage'].setValue(this.formGroup.controls['sgpa'].value)
            } else {
                this.globalmessage.Show_error('Enter sgpa ')
                return;
            }
        } else {
            if (this.formGroup.controls['percentage'].value > 0) {
                this.formGroup.controls['sgpa_percentage'].setValue(this.formGroup.controls['percentage'].value)
            } else {
                this.formGroup.controls['sgpa_percentage'].setValue(0)
                this.globalmessage.Show_error('Enter percentage ')
                return;
            }
        }
        this.formGroup.addControl('finyear', new FormControl('', []));
        this.formGroup.controls['finyear'].setValue(this.selected_document.finyear);
        this.formGroup.addControl('college_code', new FormControl('', []));
        this.formGroup.controls['college_code'].setValue(this.selected_document.college_code);
        this.formGroup.addControl('aadhaar', new FormControl('', []));
        this.formGroup.controls['aadhaar'].setValue(this.selected_document.aadhaar);
        this.formGroup.addControl('document_code', new FormControl('', []));
        this.formGroup.controls['document_code'].setValue(this.selected_document.document_code);
        this.formGroup.addControl('uploadedfilename', new FormControl('', []));
        this.formGroup.controls['uploadedfilename'].setValue(this.imagefile.name);
        /*
        if (this.selected_document.document_type == "HSC" || this.selected_document.document_type == "SSC") {

            this.formGroup.controls['uploadedfilename'].setValue(this.imagefile[0].name);

            this.formGroup.controls['checkpercentagesgpa'].setValue("NO")
            this.formGroup.controls['checkpercentagesgpa'].disable()
        }
        */
        this.saveEducationloader = true
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(this.formGroup.getRawValue()))
        formdata.append('file', this.imagefile)
        this.studentprofieservice
            .IU_StudentEducation(formdata)
            .subscribe((response) => {
                if (response != null) {
                    if (response.data == true) {
                        // this.get_documentdetail();
                        this.globalmessage.Show_message('Education Details Saved.');
                        this.saveEducationloader = false
                        this.formGroup.disable()
                        this.formGroup.controls['file'].setValue('')
                        this.imagefile = null;
                        this.getPersonalInfo();
                    }
                }
            });
    }

    Check_alleducation_filled() {
        let lBreak = false
        this.checkbox_percentage = true    //disable
        for (const edu of this.get_personaldetail.education) {
            if (edu.sgpa_percentage <= 0) {
                lBreak = true
                break;
                //this.checkbox_percentage = false
                //break;
            }
        }
        if (!lBreak) {
            this.checkbox_percentage = false
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
        this.studentprofieservice
            .Get_educationdetails(input_json)
            .subscribe((response) => {
                this.res_education = response.data
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
        this.Uploadprofilepicture = new File([event.blob!], filebeforecorp.name, {
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
        // if (!file) return;
        // const img = new Image();
        // img.src = URL.createObjectURL(file);
        // img.onload = async () => {
        //     const result = await this.detectFace(img);
        //     let faceCount = await this.getFaceCount(img);
        //     if (faceCount > 1) {
        //         alert(`Total face Found: ${faceCount}`); // Will show Yes or No
        //         return
        //     }
        //     alert(`Face Found: ${result}`); // Will show Yes or No
        // };
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

    // async detectFace(image: HTMLImageElement): Promise<string> {
    //     await this.studentprofieservice.loadModels();
    //     const detections = await faceapi.detectAllFaces(
    //         image,
    //         new faceapi.TinyFaceDetectorOptions()
    //     );
    //     return detections.length > 0 ? 'Yes' : 'No';
    // }
    // async getFaceCount(image: HTMLImageElement): Promise<number> {
    //     await this.studentprofieservice.loadModels(); // make sure models are loaded
    //     const detections = await faceapi.detectAllFaces(
    //         image,
    //         new faceapi.TinyFaceDetectorOptions()
    //     );
    //     return detections.length; // Number of faces detected
    // }
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
        this.uploadphotoloader = true
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(jsonin));
        formdata.append('files', this.Uploadprofilepicture);
        formdata.append('files', this.Uploadsignfile);
        this.studentprofieservice
            .Upload_profile_photo(formdata)
            .subscribe((response: any) => {
                this.Ires_photo = response.data;
                this.globalmessage.Show_message('Data uploaded successfully.');
                this.uploadphotoloader = false
                this.getPersonalInfo();
            });
    }

    xlsxUpload(element: any) {
        this.doc_pdffile = element.target.files;
        //this.doc_pdffile[0].name = 'prakash.dbf'
    }

    xlsxUpload_category(element: any) {
        this.doc_category = element.target.files[0];
        //this.doc_pdffile[0].name = 'prakash.dbf'
    }

    xlsxUpload_eligible(element: any) {
        this.doc_eligible = element.target.files[0];
        //this.doc_pdffile[0].name = 'prakash.dbf'
    }

    xlsxUpload_reservation(element: any) {
        this.doc_reservatino = element.target.files[0];
        //this.doc_pdffile[0].name = 'prakash.dbf'
    }

    xlsxUpload_ration(element: any) {
        this.doc_ration = element.target.files[0];
        //this.doc_pdffile[0].name = 'prakash.dbf'
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
            .Post_json_data<boolean>(Students_url.IU_personalsubmited, input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your data');
                }
                this.personalsubmitted = response.data;
                this.globalmessage.Show_successmessage('Data submitted successfully.')
                this.getPersonalInfo();
            });
    }

    EducationSubmit() {
        if (this.get_personaldetail.educationsubmited == true) {
            this.globalmessage.Show_error('You have already submitted education details.')
            return
        }
        if (this.get_personaldetail.educationsubmited == null) {
            this.globalmessage.Show_error('Please accept the terms and conditions.')
            return
        }
        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            aadhaar: this.oSession.aadhaar,
            educationsubmited: this.checkfinaleducationSubmit.controls['checkeducationsubmitted'].value
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.commonService
            .Post_json_data<boolean>(Students_url.IU_educationsubmited, input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your data');
                }
                this.res_educationsubmitted = response.data;
                if (response.data == true) {
                    this.getPersonalInfo();
                    this.globalmessage.Show_successmessage('Data submitted successfully.')
                }
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
        this.commonService.Post_json_data<boolean>(Students_url.IU_documentsubmited, input_json).subscribe((response) => {
            this.res_documentsubmitted = response.data;
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
        this.studentprofieservice
            .BatchSubjects(jsonin_input)
            .subscribe((response) => {
                this.aSubjects = response.data
                this.DisplaySubjects();
            });
    }

    ProfileResource() {
        this.studentprofieservice
            .ProfileResource("")
            .subscribe((response) => {
                this.Ires_ProfileResources = response.data
                this.relation = this.Ires_ProfileResources.relation_type
                this.occupation = this.Ires_ProfileResources.occupation_guardian
                this.annual_income = this.Ires_ProfileResources.annual_income
                this.location_area = this.Ires_ProfileResources.location_area
                this.country = this.Ires_ProfileResources.country
                this.state = this.Ires_ProfileResources.state
                this.district = this.Ires_ProfileResources.district
                this.bloodgroup = this.Ires_ProfileResources.bloodgroup
                this.nominee_relation = this.Ires_ProfileResources.nominee_relation
                this.gender = this.Ires_ProfileResources.sex
                this.religion = this.Ires_ProfileResources.religion
                this.mother_tongue = this.Ires_ProfileResources.mother_tongue
                this.martial_status = this.Ires_ProfileResources.marital_status
                this.reservation = this.Ires_ProfileResources.parallel_horizontal_reservation
                this.category = this.Ires_ProfileResources.category.slice(1)
                this.specially_abled = this.Ires_ProfileResources.specially_abled
                this.activity = this.Ires_ProfileResources.activity
                this.participation_level = this.Ires_ProfileResources.participation_level
                this.secured_rank = this.Ires_ProfileResources.secured_rank
                this.board = this.Ires_ProfileResources.college_university
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
        {headerName: "Document Name", field: "document_type", resizable: true, maxWidth: 150},
        {headerName: "Uploaded File", flex: 1, field: "uploadedfilename", resizable: true},
        {headerName: "SGPA/Percentage", flex: 1, field: "sgpa_percentage", resizable: true},
    ];

    defaultColDef: ColDef = {
        flex: 1,
        minWidth: 120,
        filter: true,
        floatingFilter: true,
        sortable: true,
        resizable: true,
    };

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
        this.openpercentage = false
        this.formGroup.patchValue(this.selected_document)
        if (this.selected_document.rowsubmited == true) {
            this.formGroup.disable();
        } else {
            //Reset control value
            this.formGroup.controls['file'].setValue('')
            this.studentDetailsForm.controls['inhouse'].setValue('')
            this.studentDetailsForm.controls['hindilinguistic'].setValue('')
            this.formGroup.enable();
            if (this.selected_document.document_type == "HSC" || this.selected_document.document_type == "SSC") {
                this.formGroup.controls['checkpercentagesgpa'].setValue("NO")
                this.formGroup.controls['checkpercentagesgpa'].disable()
            }
        }
    }

    onGridReady(params: any) {
        this.gridApi = params.api
    };

    onGridReady_document(params: any) {
        this.gridApi_document = params.api
    };

    // Upload_studentDocument() {
    //
    //   if (this.selected_document.document_status == "UPLOADED") {
    //     this.globalmessage.Show_error('You have already uploaded the current document.')
    //     return;
    //   }
    //
    //   let jsonin = {
    //     finyear: this.oSession.finyear,
    //     college_code: this.oSession.collegecode,
    //     aadhaar: this.oSession.aadhaar,
    //     Batch_code: this.selected_document.batch_code,
    //     document_code: this.selected_document.document_code,
    //     document_name: this.selected_document.document_name
    //   };
    //
    //
    //   let formdata = new FormData();
    //   formdata.append('input_form', encryptUsingAES256(jsonin))
    //   formdata.append('file', this.doc_pdffile[0])
    //
    //   this.commonService.Post_formdata(uploaddocuments, formdata).subscribe((response) => {
    //
    //     const hasKey = 'data' in response;
    //     if (hasKey) {
    //       this.res_documentsubmitted = response.data;
    //     } else {
    //       this.res_documentsubmitted = response;
    //     }
    //
    //     this.globalmessage.Show_successmessage('Documents uploaded successfully')
    //
    //   })
    //
    // }
    sgpa(rownumber: number) {
        let sSGPA = 0;
        const control = <FormArray>this.formGroup.controls['participant'];
        sSGPA = control.value[rownumber].sgpa
        let fSGPA = 0;
        if (typeof (sSGPA)) {
            fSGPA = parseFloat(sSGPA.toFixed(2))
        }
        // control.controls[rownumber].get('sgpa')?.setValue(fSGPA)
    }

    PercentageCalculater() {
        // let obtainedmarks;
        // let outoff;
        // let percentage;
        // let value;
        // obtainedmarks = parseInt(
        //   this.formGroup.controls['marksobtained'].value
        // );
        // outoff = parseInt(this.formGroup.controls['outoff'].value);
        //
        // if (outoff <= 0) {
        //   return;
        // }
        //
        // if (obtainedmarks <= 0) {
        //   return;
        // }
        //
        // if (obtainedmarks < 100) {
        //   this.globalmessage.Show_error('Obtain marks should be > than 100')
        //   return;
        // }
        //
        //
        // if (obtainedmarks > outoff) {
        //   this.globalmessage.Show_error('Obtain marks should be < than out off marks')
        //
        //   this.formGroup.controls['marksobtained'].setValue('0');
        //   this.formGroup.controls['outoff'].setValue('0');
        //   this.formGroup.controls['percentage'].setValue('0');
        //   return;
        // }
        // percentage = (obtainedmarks / outoff) * 100;
        //
        //
        // this.formGroup.controls['percentage'].setValue(parseFloat(
        //   percentage.toFixed(2))
        // );
        let obtainedmarks = 0;
        let outoff = 0;
        let nper = 0;
        obtainedmarks = this.formGroup.controls['marksobtained'].value
        outoff = this.formGroup.controls['outoff'].value
        // control.value[rownumber].percentage
        if (outoff <= 0) {
            this.formGroup.controls['percentage'].setValue(parseFloat(nper.toFixed(2)))
            return;
        }
        if (obtainedmarks <= 0) {
            this.formGroup.controls['percentage'].setValue(parseFloat(nper.toFixed(2)))
            return;
        }
        /* if (obtainedmarks > 100) {
           this.globalmessage.Show_error('Obtain marks should be < than 100')
           return;
         }*/
        nper = (obtainedmarks / outoff) * 100;
        if (nper > 100) {
            nper = 0
            this.formGroup.controls['percentage'].setValue(parseFloat(nper.toFixed(2)))
            return
        }
        this.formGroup.controls['percentage'].setValue(parseFloat(nper.toFixed(2)))
    }

    percentCalc() {
        // if(this.formGroup.controls['percentage'].value > 100){
        //   this.globalmessage.Show_error('kkkk')
        // }
    }

    Final_ProfileSubmitted() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
            Aadhaar: this.oSession.aadhaar,
            BatchCode: this.oSession.register_batchcode,
        };
        this.finalsubmitloader = true
        let jsonin_input = {
            Input: encryptUsingAES256(jsonin),
        };
        this.commonService.Post_json_data<boolean>(Students_url.ProfileSubmited, jsonin_input).subscribe((response) => {
            this.res_finalsubmitprofile = response.data
            if (this.res_finalsubmitprofile) {
                this.globalmessage.Show_successmessage("Data uploaded successfully.")
                this.finalsubmitloader = false;
                this.router.navigate(['/dashboard']);
            } else {
                this.globalmessage.Show_error('Please check your data.')
            }
            // this.parentDetailsForm.disable();
            // this.addressDetailsForm.disable();
            // this.nationalitynomineeForm.disable();
            // this.otherDetailsForm.disable();
            // this.reservationdetailForm.disable();
        });
    }

    Categorydata: MyArrayType = [
        {value: 'YES'},
        {value: 'NO'},
    ]

    isProfileSubmited() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
            Aadhaar: this.oSession.aadhaar,
            BatchCode: this.oSession.register_batchcode,
        };
        let jsonin_input = {
            Input: encryptUsingAES256(jsonin)
        };
        this.commonService
            .Post_json_data<Ires_Profilesubmited>(Students_url.IsProfileSubmited_URL, jsonin_input)
            .subscribe((response) => {
                this.res_Profilesubmited = response.data
                if (this.res_Profilesubmited.profilesubmited == true) {
                    this.parentDetailsForm.disable();
                    this.addressDetailsForm.disable();
                    this.nationalitynomineeForm.disable();
                    this.otherDetailsForm.disable();
                    this.reservationdetailForm.disable();
                    this.educationdetailForm.disable();
                }
            });
    }

    onFileChange(event: any) {
        this.imagefile = event.target.files;
    }

    single_batch() {
        let nBatchcode: number | undefined = 0
        if (myGlobals.Global_CurrentFinYear == this.oSession.registerfinyear) {
            nBatchcode = this.oSession.register_batchcode
        } else {
            // nBatchcode = this.oSession.currentformfeesbatchcode
            nBatchcode = 2700
        }

        console.log(nBatchcode)
        // if (nBatchcode! <= 0 || nBatchcode == undefined) {
        //     this.globalmessage.Show_message('Single Batch not found')
        //     return
        // }
        let jsonin = {
            Batchcode: nBatchcode
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.studentprofieservice
            .getsinglebatch(input_json)
            .subscribe((response) => {
                this.res_singlebatch = response.data;
                // if (this.res_singlebatch.Admissionboard == 'UG') {
                //     if (this.res_singlebatch.Batch_level > 1) {
                //         this.globalmessage.Show_error('Profile change not allowed.')
                //         // this.router.navigate(['/dashboard'])
                //     }
                // }
                // if (this.res_singlebatch.Admissionboard == 'JR') {
                //     if (this.res_singlebatch.Batch_level == 2) {
                //         this.globalmessage.Show_error('Profile change not allowed.')
                //         // this.router.navigate(['/dashboard'])
                //     }
                // }
                // if (this.res_singlebatch.Admissionboard == 'PG') {
                //     if (this.res_singlebatch.Batch_level == 2) {
                //         this.globalmessage.Show_error('Profile change not allowed.')
                //         // this.router.navigate(['/dashboard'])
                //     }
                // }
                // this.CreateForm()
            });
    }

    onTabChange($event: number) {
        this.activePane = $event;
        if (this.activePane == 1) {
            this.single_batch()
        }
        if (this.activePane == 2) {
            this.Educationtabechange()
        }
    }

    Sgpa_Percentage(i: number) {
        const control = <FormArray>this.formGroup.controls['participant'];
        if (control.value[i].percentage || control.value[i].Sgpa_percentage) {
        }
    }

    CheckBox_input(i: number) {
        const control = <FormArray>this.formGroup.controls['participant'];
        control.value[i].disableEdubtn = true
    }

    Focusout_input() {
    }

    // onSelectedItemsChange_atkt_gridtwo(selectedItems: Req_IAtktsubects_inhouse[]){
    //
    //   // let selected_document = this.gridApi_document.getSelectedRows();
    //   // this.selected_document = selected_document[0]
    //
    //
    //   // this.selected_document = selectedItems
    //
    //   this.openpercentage = false
    //
    //   this.formGroup.patchValue(this.selected_document)
    //
    //   if (this.selected_document.rowsubmited == true) {
    //     this.formGroup.disable();
    //   } else {
    //
    //     //Reset control value
    //     this.formGroup.controls['file'].setValue('')
    //     this.studentDetailsForm.controls['inhouse'].setValue('')
    //     this.studentDetailsForm.controls['hindilinguistic'].setValue('')
    //     this.formGroup.enable();
    //
    //     if (this.selected_document.document_type == "HSC" || this.selected_document.document_type == "SSC") {
    //       this.formGroup.controls['checkpercentagesgpa'].setValue("NO")
    //       this.formGroup.controls['checkpercentagesgpa'].disable()
    //     }
    //   }
    // }
    protected readonly get_personalinfo = Students_url.get_personalinfo;
}



