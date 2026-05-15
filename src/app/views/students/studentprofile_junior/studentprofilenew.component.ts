import {Component, HostListener, OnInit, signal, ViewChild} from "@angular/core";
import {
    BadgeComponent,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    RowComponent,
    SpinnerComponent,
    StepperComponent,
    StepperStepComponent
} from "@coreui/angular-pro";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {GlobalMessage} from "../../../globals/global.message";
import {Sessiondata} from "../../../models/Sessiondata";
import {SessionService} from "../../../globals/sessionstorage";
import {StudentprofileService} from "../studentprofile/studentprofile.service";
import {
    Ires_accountbasicdetails, Ires_accountdetails,
    Ires_education,
    Ires_personaldata,
    Ires_personalinfo,
    Res_ProfileResources
} from "../../../models/response";
import {EducationDetailsComponent} from "./educationdetails/educationdetails.component";
import {Uppercase} from "../../../uppercase";
import {FinalSubmitComponent} from "./finalsubmit/finalsubmit.component";
import {ReservationDetailsComponent} from "./reservationdetails/reservationdetails.component";
import {PersonalDetailsComponent} from "./personaldetails/personaldetail.component";
import {JsonPipe, NgIf, NgStyle, NgTemplateOutlet} from "@angular/common";
import {CommonService} from "../../../globals/common.service";
import {abcd_details, Students_url} from "../../../globals/global-api";
import * as myGlobals from "../../../globals/global-variable";
import {ImageCompressComponent} from "./imageCompress/imageCompress.component";
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {DomSanitizer} from "@angular/platform-browser";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
    templateUrl: './studentprofilenew.component.html',
    styleUrls: ['./studentprofilenew.component.scss'],
    standalone: true,
    imports: [
        ButtonDirective,
        ColComponent,
        FormDirective,
        FormSelectDirective,
        ReactiveFormsModule,
        RowComponent,
        SpinnerComponent,
        CardComponent,
        CardBodyComponent,
        CardHeaderComponent,
        EducationDetailsComponent,
        Uppercase,
        FormLabelDirective,
        FormControlDirective,
        StepperComponent,
        StepperStepComponent,
        ReservationDetailsComponent,
        PersonalDetailsComponent,
        FinalSubmitComponent,
        NgStyle
    ],
})

export class StudentProfileNewComponent implements OnInit {

    @ViewChild('step2', {static: false}) step2_ref: any;
    // public stepperLayout: 'horizontal' | 'vertical' = 'horizontal';


    studentDetailsForm!: FormGroup;
    oSession!: Sessiondata;
    Ires_ProfileResources!: Res_ProfileResources
    ires_personalinfo!: Ires_personalinfo
    get_personaldetail!: Ires_personaldata;

    board: any;

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

    savepersonalloader = false;
    IUStudentDetails: boolean = false;
    submitted = false;
    tabfivedisable = true;

    studentdetails: boolean = false;


    stepperone_disabled: boolean = false;
    steppertwo_disabled: boolean = false;
    stepperthree_disabled: boolean = false;
    stepperfour_disabled: boolean = true;

    stepperLayout: 'horizontal' | 'vertical' = 'horizontal';

    activestep: number = 0;

    stepperLoaded = false;

    ProfilephotoImage: any;
    SignatureImage: any;

    basicdetails_account = {} as Ires_accountdetails;

    uploaddydeA!: File

    uploaddydeB!: File

    constructor(
        private formBuilder: FormBuilder,
        private globalmessage: GlobalMessage,
        private sessionservice: SessionService,
        private commonService: CommonService,
        private sanitizer: DomSanitizer,
        private studentprofieservice: StudentprofileService,
        private router: Router,
        private breakpointObserver: BreakpointObserver
    ) {
    }

    ngOnInit() {

        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();
        this.CreateForm();

        // this.setLayout(window.innerWidth);
        this.ProfileResource();

    }

    CreateForm() {
        this.studentDetailsForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            fathername: ['', Validators.required],
            mothername: ['', Validators.required],
            // gender: ['', Validators.required],
             dob: [''],
            gender: ['', Validators.required],
            placeofbirth: ['', Validators.required],
            religion: [''],
            mothertongue: [''],
            marital_status: [''],
            inhouse: ['', Validators.required],
            hindilinguistic: ['', Validators.required],
            applicant_name_on_marksheet: ['', Validators.required],
            name_change_after_passing: [''],
            dydeno:['',Validators.required]
            // abc_account_id: [''],
            // GENDER: [''],
            // DOB: [''],
            // abcid: [''],
            // abcid_aadhaar_name: ['']

        });



        if (this.oSession.isprofilesubmited == 'true' && this.oSession.finyear != myGlobals.Global_CurrentFinYear) {
            this.tabfivedisable = true
            this.studentDetailsForm.disable();
        }

        if (this.oSession.formfeesrecieved == 'NOTPAID') {
            this.router.navigate(['/formfees'])
        }

        this.personalInfo()

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.checkScreenSize();
    }

    get_abcdapproval(stringid: string) {

        let jsonin = {
            abc_account_id: stringid,
        }

        this.commonService.Post_json_abc<Ires_accountdetails>(abcd_details.abcaccountsbasicdetails, jsonin).subscribe((response) => {

            this.basicdetails_account = response

            console.log('sss',this.basicdetails_account)

            if (response && response.GENDER) {
                this.studentDetailsForm.patchValue({
                    GENDER: response.GENDER,
                    DOB: response.DOB,
                    abcid: response.ABC_ACCOUNT_ID,
                    abcid_aadhaar_name: response.CNAME,
                });
            }

        })

    }


    onReloadApi(value: boolean) {
        if (value) {
            this.activestep = 2
            this.steppertwo_disabled = true
        }
    }

    onReloadApi_personal(value: boolean) {
        if (value) {
            this.activestep = 1
            this.stepperone_disabled = true
        }
    }

    onReloadApi_education(value: boolean) {
        if (value) {
            this.activestep = 3
            this.stepperthree_disabled = true
        }
    }

    onReloadApi_finalsubmit(value: boolean) {
        if (value) {
            if (this.ires_personalinfo.profilesubmited) {

                // move beyond last step
                this.activestep = 4;

                this.stepperone_disabled = true;
                this.steppertwo_disabled = true;
                this.stepperthree_disabled = true;
                this.stepperfour_disabled = true;

                this.stepperLoaded = true
                return;
            }
        }

    }

    checkScreenSize() {
        this.breakpointObserver
            .observe([Breakpoints.Handset])
            .subscribe(result => {
                if (result.matches) {
                    this.stepperLayout = 'vertical';
                } else {
                    this.stepperLayout = 'horizontal';
                }
            });
    }



    get sdf() {
        return this.studentDetailsForm.controls;
    }

    formatDate(input: string): string {
        const [day, month, year] = input.split('/');
        return `${year}-${month}-${day}`;
    }

    onSavedetails() {


        const DYDEA = '90'
        const DYDEB = '100'
        // if (this.selctgen == null) {
        //     this.globalmessage.Show_error('Please select gender.')
        //     return
        // }
        if (this.uploaddydeA == null) {
            this.globalmessage.Show_error('Please select document for Dyid A')
            return
        }
        if (this.uploaddydeB == null) {
            this.globalmessage.Show_error('Please select document for Dyid B')
            return
        }
        this.studentDetailsForm.addControl('finyear', new FormControl('', []));
        this.studentDetailsForm.controls['finyear'].setValue(this.oSession.finyear);
        this.studentDetailsForm.addControl('college_code', new FormControl('', []));
        this.studentDetailsForm.controls['college_code'].setValue(
            this.oSession.collegecode
        );
        this.studentDetailsForm.addControl('aadhaar', new FormControl('', []));
        this.studentDetailsForm.controls['aadhaar'].setValue(this.oSession.aadhaar);
        this.savepersonalloader = true
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(this.studentDetailsForm.value));
        formdata.append(DYDEA, this.uploaddydeA);
        formdata.append(DYDEB, this.uploaddydeB);
        this.commonService
            .Post_formdata(Students_url.IU_Personalinfo_junior, formdata)
            .subscribe((response) => {
                this.IUStudentDetails = response.data;
                if (this.IUStudentDetails) {
                    this.globalmessage.Show_successmessage('Data updated successfully')
                    this.savepersonalloader = false
                    this.personalInfo();
                }
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

    readonly stepperForm: FormGroup = new FormGroup({
        step_0: new FormGroup({

            Profilepictform: this.formBuilder.group({}),
            parentDetailsForm: this.formBuilder.group({}),
            addressDetailsForm: this.formBuilder.group({}),
            nationalitynomineeForm: this.formBuilder.group({}),
            otherDetailsForm: this.formBuilder.group({}),
            checkfinalSubmit: this.formBuilder.group({}),

        }),
        step_1: new FormGroup({
            reservationdetailForm: this.formBuilder.group({}),
        }),
        step_2: new FormGroup({
            Education_formGroup: this.formBuilder.group({}),
        }),
        step_3: new FormGroup({
            finalsubmitForm: this.formBuilder.group({})
        }),
        step_4: new FormGroup({})
    });


    readonly formGroups = Object.values(this.stepperForm.controls);
    readonly group_0 = this.stepperForm.get('step_0') as FormGroup;
    readonly group_1 = this.stepperForm.get('step_1') as FormGroup;
    readonly group_2 = this.stepperForm.get('step_2') as FormGroup;
    readonly group_3 = this.stepperForm.get('step_3') as FormGroup;
    readonly group_4 = this.stepperForm.get('step_4') as FormGroup;

    readonly finished = signal(false);
    readonly currentStep = signal(0);

    // currentStep: number = 0;


    handleReset() {
        this.stepperForm.reset();
        this.finished.set(false);
    }

    handleFinish(finish: boolean) {

        // console.log('finnn',finish);
        if (!finish) {
            return false;
        }
        const valid = this.currentFormGroupValid(this.currentStep());
        if (!valid) {
            // return false;
        }
        this.finished.set(finish);
        return true;
    }

    currentFormGroupValid(step: number) {
        const currentGroup = `group_${step}` as keyof StudentProfileNewComponent;
        const currentFormGroup = this[currentGroup] as FormGroup;
        currentFormGroup.markAllAsTouched();
        return currentFormGroup?.valid;
    }

    handleNext(stepper: StepperComponent) {
        // console.log('nmnmnmnm')
        const valid = this.currentFormGroupValid(this.currentStep());

        if (!valid) {
            // return false;
        }
        stepper.next();
    }



    go_previous() {
        if (this.activestep > 0) {
            this.activestep--;
        }
    }

    go_next() {
        this.activestep++;
        // console.log('activestep',this.activestep);
    }



    // PersonalInfo API Calling
    personalInfo() {

        let nBatchcode = 0
        let nBatchuuid = '';
        // vishal


        // debugger
        if (this.oSession.currentformfeesbatchcode! <= 0) {
            nBatchcode = this.oSession.maxbatchcode!
            nBatchuuid = this.oSession.maxbatchuuid!
        } else {
            nBatchcode = this.oSession.currentformfeesbatchcode!
            nBatchuuid = this.oSession.currentformfeesbatchuuid!

        }

        let payload = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            // Aadhaar: this.oSession.aadhaar,
            batch_code: nBatchcode,
            batchuuid: nBatchuuid,
        };

        console.log('payy',payload);

        let input_json = payload

        this.commonService
            .Post_json_data<Ires_personalinfo>(Students_url.personalinfo, input_json)
            .subscribe((response) => {

                // debugger

                this.ires_personalinfo = response.data;
                this.studentDetailsForm.patchValue(this.ires_personalinfo);



                this.ProfilephotoImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png:base64, ${this.ires_personalinfo.photo_image}`)

                this.SignatureImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.ires_personalinfo.signature_image}`)
                // console.log('stppp',this.activestep)


                // if(this.ires_personalinfo.firstname.length > 1){
                //     this.studentDetailsForm.disable()
                // }


                // if(this.)
                //
                if(this.ires_personalinfo.profilesubmited){
                    this.studentDetailsForm.disable()
                }



                if (this.ires_personalinfo.profilesubmited) {

                    // move beyond last step
                    this.activestep = 4;

                    this.stepperone_disabled = true;
                    this.steppertwo_disabled = true;
                    this.stepperthree_disabled = true;
                    this.stepperfour_disabled = true;

                    this.stepperLoaded = true

                    //Shivam2804
                    //Shivam0505
                    // this.studentDetailsForm.disable()

                    return;
                }


                // DEFAULT
                this.activestep = 0;

                // RESET
                this.stepperone_disabled = false;
                this.steppertwo_disabled = false;
                this.stepperthree_disabled = false;
                // this.stepperfour_disabled = true;


                if (
                    this.ires_personalinfo.pagesubmited &&
                    this.ires_personalinfo.reservationsubmited &&
                    this.ires_personalinfo.educationsubmited
                ) {
                    this.activestep = 3;
                    // console.log('1')
                    this.stepperone_disabled = true;
                    this.steppertwo_disabled = true;
                    this.stepperthree_disabled = true;
                    // this.stepperfour_disabled = false;
                } else if (this.ires_personalinfo.educationsubmited) {
                    this.activestep = 3;
                    console.log('2')

                    this.stepperone_disabled = true;
                    this.steppertwo_disabled = true;
                    this.stepperthree_disabled = true;
                } else if (this.ires_personalinfo.reservationsubmited) {
                    this.activestep = 2;
                    console.log('3')

                    this.stepperone_disabled = true;
                    this.steppertwo_disabled = true;
                    this.stepperthree_disabled = false;
                } else if (this.ires_personalinfo.pagesubmited) {
                    this.activestep = 1;
                    console.log('4')

                    this.stepperone_disabled = true;
                    this.steppertwo_disabled = false;
                    this.stepperthree_disabled = true;

                } else {
                    this.activestep = 0;
                    console.log('5')

                    this.steppertwo_disabled = true;
                    this.stepperthree_disabled = true;
                    // this.stepperfour_disabled = true;
                }

                this.stepperLoaded = true;

                console.log('stppp222', this.activestep)

            });
    }

    protected readonly console = console;


    change_stepper(index: number) {

        // let index = event.activeStepIndex()
        console.log(index);

        this.activestep = index;
    }

    check_abcdetails() {
        let formvalue = this.studentDetailsForm.controls['abc_account_id'].value

        let jsonin = {
            abc_account_id: this.studentDetailsForm.controls['abc_account_id'].value,
        }

        formvalue.valueChanges?.pipe(
            debounceTime(200)
        ).subscribe((value: any) => {
            this.filterOptions(value || '');
        });

        // this.commonService.Post_json_normal<Ires_accountbasicdetails>(abcd_details.abcaccountsbasicdetails, jsonin).subscribe((response) => {
        //
        //   console.log('rsppp', response)
        // })
    }

    filterOptions(query: string) {
        const lowerQuery = query.toLowerCase();
    }


    xlsxUpload_dyidA(event: any){
        const file: File = event.target.files[0];

        this.uploaddydeA = file
    }
    xlsxUpload_dyidB(event: any){
        const file: File = event.target.files[0];
        this.uploaddydeB = file

    }
}
