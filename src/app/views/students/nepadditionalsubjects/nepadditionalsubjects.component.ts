import * as myGlobals from '../../../globals/global-variable';
import {GlobalMessage} from '../../../globals/global.message';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NepadditionalsubjectsService} from './nepadditionalsubjects.service';
import Swal from 'sweetalert2';
import {BilldeskPay} from './../../../../assets/javascript/billdesk';
import {CommonService} from "../../../globals/common.service";
import {Common_url, Students_url,} from "../../../globals/global-api";
import {Sessiondata} from "../../../models/Sessiondata";
import {SessionService} from "../../../globals/sessionstorage";
import {
    Fees_Receiptmaster,
    Ires_Courseapplied,
    Ires_nepminorsubjects,
    Ires_PhdBatchs,
    Ires_Reciept,
    res_singlebatch,
    Subject_group_d,
    Subjects_group_h
} from "../../../models/response";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent, CardHeaderComponent,
    ColComponent, FormLabelDirective,
    FormSelectDirective, RowComponent
} from "@coreui/angular-pro";
import { NgClass } from "@angular/common";
import {Global_CurrentFinYear} from "../../../globals/global-variable";
import { v4 as uuidv4 } from 'uuid';


@Component({
    selector: 'app-additionalsubjects',
    templateUrl: './nepadditionalsubjects.component.html',
    styleUrls: ['./nepadditionalsubjects.component.scss'],
    imports: [
        CardComponent,
        ReactiveFormsModule,
        ColComponent,
        NgClass,
        ButtonDirective,
        FormSelectDirective,
        CardBodyComponent,
        CardHeaderComponent,
        RowComponent,
        FormLabelDirective
    ],
    standalone: true
})
export class NepadditionalsubjectsComponent implements OnInit {
    Demoversion: boolean = false;
    billdeskmsg: any;
    SubjectGroupCode: any;
    billdeskquerymsg: any;
    QuotaStatus = {} as Ires_nepminorsubjects;
    portal = {} as Ires_PhdBatchs;
    AppliedCourses: Ires_Courseapplied[] = [];
    minorsubjects: Ires_nepminorsubjects[] = [];
    modalBatch: res_singlebatch[] = [];
    BatchObject = {} as res_singlebatch;
    res_single_subject: any;
    additionalSubjectsForm!: FormGroup;
    //jk
    NepAdditionalsubjectForm!: FormGroup;
    modalSubmit = false;
    selected_major = {} as Subjects_group_h;
    selected_minor = {} as Ires_nepminorsubjects;
    selected_oe = {} as Ires_nepminorsubjects;
    selected_vsc = {} as Ires_nepminorsubjects;
    selected_vec = {} as Ires_nepminorsubjects;
    selected_sec = {} as Ires_nepminorsubjects;
    selected_aec = {} as Ires_nepminorsubjects;
    selected_iks = {} as Ires_nepminorsubjects;
    selected_cc = {} as Ires_nepminorsubjects;
    selected_fp = {} as Ires_nepminorsubjects;
    major_subjectgroup: any;
    majorsubjects: Subjects_group_h[] = [];
    Form_fees_Receiptmaster = {} as Fees_Receiptmaster
    majorsubjects_nep = [];
    oesubjects: any = [];
    vscsubjects: any = [];
    vecsubjects: any = [];
    secsubjects: any = [];
    aecsubjects: any = [];
    ikssubjects: any = [];
    ccsubjects: any = [];
    fpsubjects: any = [];
    Tokenfound!: boolean;
/////
    submitted = false;
    SubjectGroups: any;
    SubjectGroupID: any;
    batchSubjects: any;
    BatchCode: any;
    formAmount: any;
    data: any;
    ReceiptID: any;
    ReceiptNo: any;
    billdeskRequestMsg: string = '';
    selectedObject: any;
    res_Reciept = {} as Ires_Reciept
    pageType: any;
    formtype!: string;
    resp_singlebatch = {} as res_singlebatch;
    oSession!: Sessiondata;
    subjectselection = false;

    constructor(
        private http: HttpClient,
        private router: Router, private sessionservice: SessionService,
        private formBuilder: FormBuilder,
        private additionalsubjectsService: NepadditionalsubjectsService,
        private commonService: CommonService,
        private activeroute: ActivatedRoute,
        private renderer: Renderer2,
        private globalmessage: GlobalMessage,
    ) {
        let xDomain = myGlobals.Domainname.toUpperCase();
        if (xDomain.search('LOCALHOST') != -1) {
            this.Demoversion = true;
        }
        if (xDomain.search('DEMO') != -1) {
            this.Demoversion = true;
        }
    }

    ngOnInit() {
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();
        // this.router.navigate(['/marksheet-viewer'], { queryParams:{ page: 'View' } });
        this.activeroute.queryParams
            .subscribe(params => {
                this.pageType = params['page'];
            });
        // this.modalSelectBatch();
        // this.StudentProfileStatus();
        this.formtype = '';
        if (this.pageType == 'R') {
            this.formtype = '';
            // if (this.oSession.maxbatchlevel == 1 && this.oSession.maxadmissionboard == 'UG') {
            //   if (this.oSession.iseligible == 'NOTELIGIBLE' || this.oSession.iseligible == 'FAIL') {
            //     this.globalmessage.Show_error('You are not eligible for this course!')
            //     this.router.navigate(['/dashboard'])
            //   }
            // }
        }
        if (this.pageType == 'A') {
            // if (this.oSession.formfeesrecieved == 'NOTPAID') {
            //   this.globalmessage.Show_error('You are not allowed to apply for this courses.')
            //   this.router.navigate(['/dashboard'])
            // }
            // this.formtype = 'for Additional batch & subjects.';
            // if (this.oSession.maxbatchlevel != 1 &&
            //   this.oSession.maxadmissionboard == 'UG') {
            //   this.globalmessage.Show_error('You are not allowed to apply for this courses.')
            //   this.router.navigate(['/dashboard'])
            // }
            // if (this.oSession.maxbatchlevel == 1 &&
            //   this.oSession.maxadmissionboard == 'JR') {
            //   this.globalmessage.Show_error('You are not allowed to apply for this courses.')
            //   this.router.navigate(['/dashboard'])
            // }
            // if (this.oSession.maxbatchlevel != 1 &&
            //   this.oSession.maxadmissionboard == 'PG') {
            //   this.globalmessage.Show_error('You are not allowed to apply for this courses.')
            //   this.router.navigate(['/dashboard'])
            // }
            this.StudentAppliedCourses();
            /*
            if (this.oSession.isprofilesubmited == 'true') {


            } else {
              this.globalmessage.Show_error('Please complete your profile.')
              this.router.navigate(['/studentprofile'])
            }
            */
        }
        this.CreateForm();
        this.renderExternalScript(
            'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
        ).onload = () => {
        };
        //Shivam
        // if (this.oSession.lastyearoutstanding == 'true') {
        //   this.globalmessage.Show_message('Please pay your last year pending fees!')
        //   this.router.navigate(['/Fees'])
        //   return
        // }
        // if (this.oSession.formfeesrecieved == 'NOTPAID') {
        //   if (this.pageType == 'A') {
        //     this.globalmessage.Show_message('Please complete your profile.')
        //     this.router.navigate(['/dashboard'])
        //     return
        //   }
        // } else {
        //   if (this.pageType == 'R') {
        //     if (this.oSession.formfeesrecieved == 'PAID') {
        //       this.globalmessage.Show_message('Formfees already paid.Please complete your profile.')
        //       this.router.navigate(['/dasbhoard'])
        //     }
        //   }
        // }
        // if (this.oSession.submittedyear != myGlobals.Global_CurrentFinYear) {
        //   if (this.pageType == 'A') {
        //     this.globalmessage.Show_message('Please complete your profile.')
        //     this.router.navigate(['/dasbhoard'])
        //   }
        // }
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

    CreateForm() {

        this.additionalSubjectsForm = this.formBuilder.group({
            batch: ['', Validators.required],
            batchSubjects: ['', Validators.required],
        });
        this.NepAdditionalsubjectForm = this.formBuilder.group({
            batch: ['', Validators.required],
            frm_majorsubjects: ['', Validators.required],
            frm_minorsubjects: ['', Validators.required],
            frm_oesubjects: ['', Validators.required],
            frm_vscsubjects: ['', Validators.required],
            frm_secsubjects: ['', Validators.required],
            frm_aecsubjects: ['', Validators.required],
            frm_vecsubjects: ['', Validators.required],
            frm_ikssubjects: ['', Validators.required],
            frm_ccsubjects: ['', Validators.required],
            frm_fpsubjects: ['', Validators.required]
        });
        //for outside student
        if (this.oSession.registerfinyear == myGlobals.Global_CurrentFinYear) {
            this.NEPSelectBatch();
            // // if (this.pageType == 'R') {
            // //     this.NEPSelectBatch();
            //     this.Register_Batch_api()
            // // } else {
            //     // this.Show_registrationbatchs('PG')
            // }
        } else {
            //for inhouse student
            this.single_batch();
        }
    }

    get frmsubject() {
        return this.NepAdditionalsubjectForm.controls;
    }

    onusermessage(level: any) {
        if (level == 1) {
            let x = `'It is a vertical that strengthens the vertical of Maj. in terms of providing allied dimension to the core subject.
        'All subjects are interrelated as all subjects have originated from a common domain of knowledge which has elements of curiosity,
         utility and necessity and of course, all subjects ponder around understanding the wonders of the nature.
         <p></p>
        <b>Expert Tips: Choose Min. subject as the one which  you think is the subject that best complements your Maj. in enhancing  your learning of Maj.<b>'
`;
            this.globalmessage.Show_message_html(x);
        }
        if (level == 2) {
            let x = `It is a vertical that strengthens the vertical of Maj. in terms of providing allied dimension to the core subject.
        'All subjects are interrelated as all subjects have originated from a common domain of knowledge which has elements of curiosity,
         utility and necessity and of course, all subjects ponder around understanding the wonders of the nature.
         <p></p>
        <b>Expert Tips: Choose Min. subject as the one which  you think is the subject that best complements your Maj. in enhancing  your learning of Maj.</b>`;
            this.globalmessage.Show_message_html(x);
        }
        if (level == 3) {
            let x = `This vertical is the highlight NEP2020 and you will be choosing it from the basket of OE at the beginning of the academic sessions.
It is the vertical that has to be from the faculty other than the Maj. and that is where it opens the doors for you becoming the knowledgeable and
updated person in the society. If you classify all your daily routine activities, then you will realise that every single day,
you deal with little bit of science (food, medicines, electricity, mobile), little bit of commerce (banking, shopping, trading, travelling )
and a little bit of arts (reading, writing, communication, music, movie, painting).
It is a vertical that gives you chance to step out of your core subject boundary in term of utility learning.
<p></p>
<b>Expert Tips: Choose OE/GE based on your attitude towards the life and aptitude towards the learning new things.</b>
`;
            this.globalmessage.Show_message_html(x);
        }
        if (level == 4) {
            let x = `This compulsory vertical includes Hands on Training corresponding mainly to the Maj. Subject.
Whenever applicable, it will also include skill based or advanced laboratory practicals of Maj. This vertical primarily focus on the application oriented learning.
 <p></p>
<b>Expert Tips: make sure you have chosen your Maj. carefully.</b>

`;
            this.globalmessage.Show_message_html(x);
        }
        if (level == 5) {
            let x = `This compulsory vertical includes Hands on Training corresponding mainly to the Maj. Subject.
Whenever applicable, it will also include skill based or advanced laboratory practicals of Maj. This vertical primarily focus on the application oriented learning.
 <p></p>
<b>Expert Tips: make sure you have chosen your Maj. carefully.</b>

`;
            this.globalmessage.Show_message_html(x);
        }
        if (level == 6) {
            let x = `This vertical aims at enhancing your linguistic and the communication skills.
It is a compulsory vertical because the effective communication is a key to success in life in every field.
 For the Arts and Science students, Communication skills and for Commerce students, Business Communication will be taught in this vertical.
  <p></p>
<b>Expert Tips:  Good communication is the bridge between confusion and clarity.</b>


`;
            this.globalmessage.Show_message_html(x);
        }
        if (level == 7) {
            let x = `This vertical will be offered only in the first year of under graduate program and
      shall primarily focus in sensitizing you to the importance of values in life which also includes nurturing the mother-earth which unconditionally
       nurtures all of us. Environmental studies shall be taught in this vertical.
        <p></p>
<b>Expert Tips: Covid19 pandemic taught us the importance of clean green environment,
 conservation and protection of natural resources and importance of oxygen. We must love our environment.</b>
`;
            this.globalmessage.Show_message_html(x);
        }
        if (level == 8) {
            let x = `This vertical connects you back to your roots.
It aims at educating the youth today to the rich heritage of our country and traditional knowledge in the field of Arts and literature,
 Agriculture, Basic sciences, Engineering and Technology Architecture, Management, Economics etc.
 If it is well preserved and widely disseminated, this knowledge can help in further research and societal applications.
 <p></p>
<b>Expert Tips: A unique opportunity to get enlightened and enjoy and appreciate the perfect amalgamation of contemporary learning and traditional legacy. <b>
`;
            this.globalmessage.Show_message_html(x);
        }
        if (level == 9) {
            let x = `This vertical includes courses such as Health and Wellness, Yoga education, Sports and fitness, Cultural activities, NSS/NCC and Fine / Applied/ Visual/Performing Arts.
At a later stage, this vertical shall also encompass Field Projects/ Internship/Apprenticeship/ Community
 Engagement and service corresponding to the Maj.( Core) subject.
  <p></p>
<b>Expert Tips: An opportunity to look into your own self and search for your hidden talents, capabilities, commitment and multitasking ability.<b>
`;
            this.globalmessage.Show_message_html(x);
        }
    }

    Resetcontrols(level: number) {

        if (level == 0) {
            this.majorsubjects = [];
            this.minorsubjects = [];
            this.oesubjects = [];
            this.vscsubjects = [];
            this.secsubjects = [];
            this.aecsubjects = [];
            this.vecsubjects = [];
            this.ikssubjects = [];
            this.ccsubjects = [];
            this.fpsubjects = [];
            this.selected_major = {} as Subjects_group_h;
            // let jsonin: Ireq_checksubjectgroupquota = {
            this.selected_minor = {} as Ires_nepminorsubjects;
            this.selected_oe = {} as Ires_nepminorsubjects;
            this.selected_vsc = {} as Ires_nepminorsubjects;
            this.selected_sec = {} as Ires_nepminorsubjects;
            this.selected_aec = {} as Ires_nepminorsubjects;
            this.selected_vec = {} as Ires_nepminorsubjects;
            this.selected_iks = {} as Ires_nepminorsubjects;
            this.selected_cc = {} as Ires_nepminorsubjects;
            this.selected_fp = {} as Ires_nepminorsubjects;
            this.NepAdditionalsubjectForm.controls['frm_majorsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_minorsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_oesubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_majorsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_minorsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_oesubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');
        }
        if (level == 1) {
            this.oesubjects = [];
            this.vscsubjects = [];
            this.secsubjects = [];
            this.aecsubjects = [];
            this.vecsubjects = [];
            this.ikssubjects = [];
            this.ccsubjects = [];
            this.fpsubjects = [];

            console.log('vxxxx1',this.vecsubjects)

            this.selected_minor = {} as Ires_nepminorsubjects;
            this.selected_oe = {} as Ires_nepminorsubjects;
            this.selected_vsc = {} as Ires_nepminorsubjects;
            this.selected_sec = {} as Ires_nepminorsubjects;
            this.selected_aec = {} as Ires_nepminorsubjects;
            this.selected_vec = {} as Ires_nepminorsubjects;
            this.selected_iks = {} as Ires_nepminorsubjects;
            this.selected_cc = {} as Ires_nepminorsubjects;
            this.selected_fp = {} as Ires_nepminorsubjects;

            this.NepAdditionalsubjectForm.controls['frm_minorsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_oesubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_minorsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_oesubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');
        }
        if (level == 2) {
            this.vscsubjects = [];
            this.secsubjects = [];
            this.aecsubjects = [];
            this.vecsubjects = [];
            this.ikssubjects = [];
            this.ccsubjects = [];
            this.fpsubjects = [];

            console.log('vxxxx2',this.vecsubjects)

            this.selected_oe = {} as Ires_nepminorsubjects;
            this.selected_vsc = {} as Ires_nepminorsubjects;
            this.selected_sec = {} as Ires_nepminorsubjects;
            this.selected_aec = {} as Ires_nepminorsubjects;
            this.selected_vec = {} as Ires_nepminorsubjects;
            this.selected_iks = {} as Ires_nepminorsubjects;
            this.selected_cc = {} as Ires_nepminorsubjects;
            this.selected_fp = {} as Ires_nepminorsubjects;
            this.NepAdditionalsubjectForm.controls['frm_oesubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset('');
            this.NepAdditionalsubjectForm.controls['frm_oesubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');
        }
        if (level == 3) {
            this.secsubjects = [];
            this.aecsubjects = [];
            this.vecsubjects = [];
            this.ikssubjects = [];
            this.ccsubjects = [];
            this.fpsubjects = [];

            console.log('vxxxx3',this.vecsubjects)

            this.selected_vsc = {} as Ires_nepminorsubjects;
            this.selected_sec = {} as Ires_nepminorsubjects;
            this.selected_aec = {} as Ires_nepminorsubjects;
            this.selected_vec = {} as Ires_nepminorsubjects;
            this.selected_iks = {} as Ires_nepminorsubjects;
            this.selected_cc = {} as Ires_nepminorsubjects;
            this.selected_fp = {} as Ires_nepminorsubjects;
            this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');
        }
        if (level == 4) {
            this.aecsubjects = [];
            this.vecsubjects = [];
            this.ikssubjects = [];
            this.ccsubjects = [];
            this.fpsubjects = [];

            console.log('vxxxx4',this.vecsubjects)

            this.selected_sec = {} as Ires_nepminorsubjects;
            this.selected_aec = {} as Ires_nepminorsubjects;
            this.selected_vec = {} as Ires_nepminorsubjects;
            this.selected_iks = {} as Ires_nepminorsubjects;
            this.selected_cc = {} as Ires_nepminorsubjects;
            this.selected_fp = {} as Ires_nepminorsubjects;
            this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');
        }
        if (level == 5) {
            this.vecsubjects = [];
            this.ikssubjects = [];
            this.ccsubjects = [];
            this.fpsubjects = [];
            this.selected_aec = {} as Ires_nepminorsubjects;
            this.selected_vec = {} as Ires_nepminorsubjects;
            this.selected_iks = {} as Ires_nepminorsubjects;
            this.selected_cc = {} as Ires_nepminorsubjects;
            this.selected_fp = {} as Ires_nepminorsubjects;
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');
        }
        if (level == 6) {
            this.ikssubjects = [];
            this.ccsubjects = [];
            this.fpsubjects = [];
            this.selected_vec = {} as Ires_nepminorsubjects;
            this.selected_iks = {} as Ires_nepminorsubjects;
            this.selected_cc = {} as Ires_nepminorsubjects;
            this.selected_fp = {} as Ires_nepminorsubjects;
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');
        }
        if (level == 7) {
            this.ccsubjects = [];
            this.fpsubjects = [];
            this.selected_iks = {} as Ires_nepminorsubjects;
            this.selected_cc = {} as Ires_nepminorsubjects;
            this.selected_fp = {} as Ires_nepminorsubjects;
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].reset();
            this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
            this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');
        }
    }

    minor_subject(level: number) {

        console.log('jjkbatch')
        this.Resetcontrols(level + 1);
        let jsonin = {}

        if(this.oSession.maxbatchlevel == 2){
            if(this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear){
                jsonin = {
                    collegecode: this.oSession.collegecode,
                    finyear: myGlobals.Global_CurrentFinYear,
                    batch_code: this.BatchObject.batch_code,
                    aadhaar: this.oSession.aadhaar,
                    subject_group_code: this.selected_major.subject_group_code,
                    levelno: level,
                    webportal: myGlobals.Global_Webportname,
                    otherlevelcode: 0
                };
            }
        }


        if (this.pageType == 'A') {
            if (this.resp_singlebatch?.batch_level == 1 &&
                this.resp_singlebatch?.admissionboard == 'UG') {
                jsonin = {
                    collegecode: this.oSession.collegecode,
                    finyear: myGlobals.Global_CurrentFinYear,
                    batch_code: this.BatchObject.batch_code,
                    aadhaar: this.oSession.aadhaar,
                    subject_group_code: this.selected_major.subject_group_code,
                    levelno: level,
                    webportal: myGlobals.Global_Webportname,
                    otherlevelcode: 0
                };
            }
        }
        if (this.oSession.studenttype == 'OUTSIDE') {
            jsonin = {
                collegecode: this.oSession.collegecode,
                finyear: myGlobals.Global_CurrentFinYear,
                batch_code: this.BatchObject.batch_code,
                aadhaar: this.oSession.aadhaar,
                subject_group_code: this.selected_major.subject_group_code,
                levelno: level,
                webportal: myGlobals.Global_Webportname,
                otherlevelcode: 0
            };
        }
        //SYJC to FYbcom
        if (this.resp_singlebatch?.batch_level == 2 &&
            this.resp_singlebatch?.admissionboard == 'JR') {
            jsonin = {
                collegecode: this.oSession.collegecode,
                finyear: myGlobals.Global_CurrentFinYear,
                batch_code: this.BatchObject.batch_code,
                aadhaar: this.oSession.aadhaar,
                subject_group_code: this.selected_major.subject_group_code,
                levelno: level,
                webportal: myGlobals.Global_Webportname,
                otherlevelcode: 0
            };
        }
        //Fy to SY (UG)
        if (this.resp_singlebatch?.batch_level == 2 &&
            this.resp_singlebatch?.admissionboard == 'UG') {
            jsonin = {
                collegecode: this.oSession.collegecode,
                finyear: myGlobals.Global_CurrentFinYear,
                batch_code: this.BatchObject.batch_code,
                aadhaar: this.oSession.aadhaar,
                subject_group_code: this.oSession.maxsubjectgroupcode,
                levelno: level,
                webportal: myGlobals.Global_Webportname,
                otherlevelcode: this.oSession.minor
            };
        }
        this.commonService
            .Post_json_data<Subject_group_d[]>(Students_url.Nepsubjects_url, jsonin)
            .subscribe((response) => {
                if (response === null) {
                    return;
                }
                if (response != null) {
                    if (level == 2) {
                        this.minorsubjects = response.data;
                        return;
                    }
                    if (level == 3) {
                        this.oesubjects = response.data;
                        return;
                    }
                    if (level == 4) {
                        this.vscsubjects = response.data;
                        return;
                    }
                    if (level == 5) {
                        this.secsubjects = response.data;
                        return;
                    }
                    if (level == 6) {
                        this.aecsubjects = response.data;
                        return;
                    }
                    if (level == 7) {
                        this.vecsubjects = response.data;
                        return;
                    }
                    if (level == 8) {
                        this.ikssubjects = response.data;
                        return;
                    }
                    if (level == 9) {
                        this.ccsubjects = response.data;
                        return;
                    }
                    if (level == 10) {
                        this.fpsubjects = response.data;
                        return;
                    }
                }
            });
    }

    modal_Nepsubjects(level: number) {
        if (level <= 2) {
            return
        }
        let notherlevelcode = 0
        this.Resetcontrols(level + 1);
        let jsonin = {}


        console.log("finn",this.oSession.finyear)
        if (this.oSession.finyear == myGlobals.Global_CurrentFinYear) {
            jsonin = {
                collegecode: this.oSession.collegecode,
                finyear: myGlobals.Global_CurrentFinYear,
                batch_code: this.BatchObject.batch_code,
                aadhaar: this.oSession.aadhaar,
                subject_group_code: this.selected_major.subject_group_code,
                levelno: level,
                webportal: myGlobals.Global_Webportname,
                otherlevelcode: 0
            };
        } else {
            jsonin = {
                collegecode: this.oSession.collegecode,
                finyear: myGlobals.Global_CurrentFinYear,
                batch_code: this.BatchObject.batch_code,
                aadhaar: this.oSession.aadhaar,
                subject_group_code: this.oSession.maxsubjectgroupcode,
                levelno: level,
                webportal: myGlobals.Global_Webportname,
                otherlevelcode: 0
            };
        }

        console.log('jsssnep',jsonin)

        this.commonService
            .Post_json_data<Subject_group_d[]>(Students_url.Nepsubjects_url, jsonin)
            .subscribe((response) => {
                if (response === null) {
                    return;
                }
                if (response != null) {
                    if (level == 2) {
                        this.minorsubjects = response.data;
                        return;
                    }
                    if (level == 3) {
                        this.oesubjects = response.data;
                        return;
                    }
                    if (level == 4) {
                        this.vscsubjects = response.data;
                        return;
                    }
                    if (level == 5) {
                        this.secsubjects = response.data;
                        return;
                    }
                    if (level == 6) {
                        this.aecsubjects = response.data;
                        return;
                    }
                    if (level == 7) {
                        this.vecsubjects = response.data;
                        return;
                    }
                    if (level == 8) {
                        this.ikssubjects = response.data;
                        return;
                    }
                    if (level == 9) {
                        this.ccsubjects = response.data;
                        return;
                    }
                    if (level == 10) {
                        this.fpsubjects = response.data;
                        return;
                    }
                }
            });
    }

    single_subject() {

        let jsonin = {}
        //Changes made by Shivam
        if (this.pageType == 'A') {
            jsonin = {
                batch_code: this.BatchObject.batch_code,
                Subject_group_code: this.selected_major.subject_group_code,
                Subject_group_id: this.selected_major.subject_group_id,
            };
        } else {
            jsonin = {
                batch_code: this.BatchObject.batch_code,
                Subject_group_code: this.oSession.maxsubjectgroupcode,
                Subject_group_id: this.oSession.maxsubjectgroupid,
            };
        }
        let jsonin_input = {
            Input: encryptUsingAES256(jsonin),
        };
        this.additionalsubjectsService
            .single_subject(jsonin_input)
            .subscribe((response) => {
                this.majorsubjects.push(response.data)
            });
    }

    onLevelSelect(level: number) {
        if (level <= 0) {
            return;
        }
        if (level == 2) {
            // this.Check_nepquota(level);
        }
        this.modal_Nepsubjects(level);
    }

    StudentAppliedCourses() {
        let jsonin = {
            Finyear: myGlobals.Global_CurrentFinYear,
            Collegecode: 1,
            Aadhaar: this.oSession.aadhaar,
        };
        let jsonin_input = {
            Input: encryptUsingAES256(jsonin),
        };
        this.additionalsubjectsService
            .StudentAppliedCourses(jsonin_input)
            .subscribe((response) => {
                this.AppliedCourses = response.data;
            });
    }

    modalSelectBatch() {
        let jsonin = {
            webportal: 'DEGREE',
            Studenttype: this.oSession.studenttype,
            Coursetype: 'UG',
        };
        this.commonService.Post_json_data<res_singlebatch[]>(Common_url.Pg_batchs_URL, jsonin).subscribe((response) => {
            this.modalBatch = response.data;
        });
    }

    NEPSelectBatch() {
        let sOutsideUrl = myGlobals.Domainname
        let jsonin = {
            Boardlevel: 'UG',
            Firstyear: 1,
            Webportal: sOutsideUrl
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.additionalsubjectsService.registertionbatchs(jsonin).subscribe((response) => {
            this.modalBatch = response.data;

            // this.single_batch();
        });
    }

    nep_select() {
    }

    PortalOpen() {
        // this.portal = "";
        // this.BatchCode = event.batch_code;
        // this.formAmount = event.FormAmount;


        this.selected_major = {} as Subjects_group_h
        this.selected_minor = {} as Ires_nepminorsubjects
        this.selected_oe = {} as Ires_nepminorsubjects
        this.selected_vsc = {} as Ires_nepminorsubjects
        this.selected_sec = {} as Ires_nepminorsubjects
        this.selected_aec = {} as Ires_nepminorsubjects
        this.selected_vec = {} as Ires_nepminorsubjects
        this.selected_iks = {} as Ires_nepminorsubjects
        this.selected_cc = {} as Ires_nepminorsubjects
        this.selected_fp = {} as Ires_nepminorsubjects

        let sPortalopenUrl = myGlobals.Domainname
        let jsonin = {
            finyear: this.oSession.finyear,
            collegecode: this.oSession.collegecode,
            batchcode: this.BatchObject.batch_code,
            Webportal: sPortalopenUrl
        };
        let jsonin_input = {
            Input: encryptUsingAES256(jsonin),
        };
        this.additionalsubjectsService
            .PortalOpenv1(jsonin_input)
            .subscribe((response) => {
                this.Resetcontrols(0);
                this.portal = response.data;

                if (this.portal.admissionstarted == true && this.portal.admissionyear == Global_CurrentFinYear) {

                    if (this.pageType == 'A') {
                        if (this.oSession.maxbatchlevel == 1 &&
                            this.oSession.maxadmissionboard == 'UG') {
                            this.modalSelectBatchSubjects();
                        }
                        if (this.oSession.maxbatchlevel == 2 &&
                            this.oSession.maxadmissionboard == 'JR') {
                            this.modalSelectBatchSubjects();
                        }
                        //Changes made by Shivam
                        if (this.oSession.registerfinyear == myGlobals.Global_CurrentFinYear) {
                            this.modalSelectBatchSubjects();
                        }
                    }
                    if (this.pageType == 'R') {
                        // this.single_subject()
                        if (this.oSession.maxbatchlevel == 1 &&
                            this.oSession.maxadmissionboard == 'UG') {
                            this.single_subject()
                        } else {
                            this.modalSelectBatchSubjects();
                        }
                    }
                } else {
                    // this.portal = '';
                    this.SubjectGroups = '';
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
        this.commonService
            .Post_json_data<Fees_Receiptmaster>(Students_url.Additionalsubjectformfees_URL, jsonin)
            .subscribe((response) => {

                this.Form_fees_Receiptmaster = response.data
                if (this.Form_fees_Receiptmaster.receipt_id <= 0) {
                    this.commonService
                        .Post_json_data<Subjects_group_h[]>(Students_url.StudentSubjectGroup, jsonin)
                        .subscribe((response) => {
                            this.majorsubjects = response.data;
                            if (this.oSession.maxadmissionboard == 'UG' &&
                                this.oSession.maxbatchlevel == 2) {
                                // this.selected_major.setValue(this.oSession.maxsubjectgroupcode)
                            }
                            // this.majorsubjects.push(this.oSession.maxsubjectgroupcode)
                            // this.portal = '';
                            this.NepAdditionalsubjectForm.controls['frm_majorsubjects'].setValue('');
                        });
                } else {
                    // this.portal = '';
                    this.SubjectGroups = '';
                    this.NepAdditionalsubjectForm.controls['batch'].setValue('');
                    this.NepAdditionalsubjectForm.controls['frm_majorsubjects'].setValue('');
                    Swal.fire({
                        title: 'Error!',
                        text:
                            'Form fees Already Paid for this Batch!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    this.onLevelSelect(0);
                    //this.Resetcontrols(0);
                }
            });
    }

    onMajorSelected(event: any) {

        this.Controlreset();
        console.log('subbj',this.vecsubjects)

        let MINORLEVEL: number = 2;
        this.major_subjectgroup = event.Subject_group_name;
        this.SubjectGroupID = event.Subject_group_id;
        this.SubjectGroupCode = event.subject_group_code;
        // this.Check_nepquota(MINORLEVEL);
        //ShivamPrakashcommented
         this.modal_Nepsubjects(MINORLEVEL);
        //this.CheckSubjectGroupQuota();
    }

    Check_nepquota(level: number) {
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batchcode: this.BatchObject.batch_code,
            subjectgroupid: this.oSession.maxsubjectgroupid,
            subject_group_code: this.oSession.maxsubjectgroupcode,
            otherlevelcode: level,
        };
        this.commonService
            .Post_json_data<Ires_nepminorsubjects>(Students_url.nepquotacheck, jsonin)
            .subscribe((response) => {
                if (response == null) {
                    return;
                }
                this.QuotaStatus = response.data;
                if (this.QuotaStatus.quota_status != 'OPEN') {
                    Swal.fire({
                        title: 'Message!',
                        text: 'Quota Closed! Select Different Group Code.',
                        icon: 'info',
                        confirmButtonText: 'OK',
                    }); //alert
                    this.NepAdditionalsubjectForm.controls['frm_majorsubjects'].setValue('');
                    this.major_subjectgroup = '';
                } else {
                    this.Resetcontrols(2);
                    this.modal_Nepsubjects(2);
                }
            });
    }

    addSubjectsPayment() {
        this.submitted = true;
        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            aadhaar: this.oSession.aadhaar,
            batch_code: parseInt(this.BatchCode),
            subject_group_id: parseInt(this.SubjectGroupID),
            subject_group_code: this.SubjectGroupCode,
            term_code: 9999,
        };
        this.commonService
            .Post_json_data<Ires_Reciept>(Students_url.IU_nepAdmission, jsonin)
            .subscribe((response) => {
                this.ReceiptID = this.res_Reciept.receiptid;
                this.ReceiptNo = this.res_Reciept.receiptno;
                if (this.ReceiptID > 0) {
                    this.RegistrationPayment();
                }
            });
    }

    asPayment() {


        if (this.selected_major.subject_group_code == '') {
            this.globalmessage.Show_error('Please select major subject.')
            return
        }
        if (this.selected_minor.otherlevelcode <= 0 || this.selected_minor.otherlevelcode == undefined) {
            this.globalmessage.Show_error('Please select minor subject.')
            return
        }
        if (this.selected_oe.otherlevelcode <= 0 || this.selected_oe.otherlevelcode == undefined ) {
            this.globalmessage.Show_error('Please select oe subject.')
            return
        }
        if (this.selected_vsc.otherlevelcode <= 0 || this.selected_vsc.otherlevelcode == undefined) {
            this.globalmessage.Show_error('Please select vsc subject.')
            return
        }
        if (this.selected_sec.otherlevelcode <= 0 || this.selected_sec.otherlevelcode == undefined) {
            this.globalmessage.Show_error('Please select sec subject.')
            return
        }
        if (this.selected_aec.otherlevelcode <= 0 || this.selected_aec.otherlevelcode == undefined) {
            this.globalmessage.Show_error('Please select aec subject.')
            return
        }
        if (this.selected_vec.otherlevelcode <= 0 || this.selected_vec.otherlevelcode == undefined) {
            this.globalmessage.Show_error('Please select vec subject.')
            return
        }
        if (this.selected_iks.otherlevelcode <= 0 || this.selected_iks.otherlevelcode == undefined) {
            this.globalmessage.Show_error('Please select iks subject.')
            return
        }
        if (this.selected_cc.otherlevelcode <= 0 || this.selected_cc.otherlevelcode == undefined) {
            this.globalmessage.Show_error('Please select cc subject.')
            return
        }
        if (this.selected_fp.otherlevelcode <= 0 || this.selected_fp.otherlevelcode == undefined) {
            this.globalmessage.Show_error('Please select fp subject.')
            return
        }

        this.modalSubmit = true;
        let jsonin = {}
        if (this.oSession.studenttype == 'OUTSIDE') {
            jsonin = {
                finyear: this.oSession.finyear,
                college_code: this.oSession.collegecode,
                aadhaar: this.oSession.aadhaar,
                batch_code: this.BatchObject.batch_code,
                subject_group_id: this.selected_major.subject_group_id,
                subject_group_code: this.selected_major.subject_group_code,
                term_code: myGlobals.Global_FORMFEESTERMNAME,
                minor: this.selected_minor.otherlevelcode,
                oe: this.selected_oe.otherlevelcode,
                vsc: this.selected_vsc.otherlevelcode,
                sec: this.selected_sec.otherlevelcode,
                aec: this.selected_aec.otherlevelcode,
                vec: this.selected_vec.otherlevelcode,
                iks: this.selected_iks.otherlevelcode,
                cc: this.selected_cc.otherlevelcode,
                fp: this.selected_fp.otherlevelcode,
                applicationmode: 'ADDITIONALPAPPER'
            };
        }
        if (this.oSession.maxadmissionboard == 'JR' && this.oSession.maxbatchlevel == 2) {
            jsonin = {
                finyear: this.oSession.finyear,
                college_code: this.oSession.collegecode,
                aadhaar: this.oSession.aadhaar,
                batch_code: this.BatchObject.batch_code,
                subject_group_id: this.selected_major.subject_group_id,
                subject_group_code: this.selected_major.subject_group_code,
                term_code: myGlobals.Global_FORMFEESTERMNAME,
                minor: this.selected_minor.otherlevelcode,
                oe: this.selected_oe.otherlevelcode,
                vsc: this.selected_vsc.otherlevelcode,
                sec: this.selected_sec.otherlevelcode,
                aec: this.selected_aec.otherlevelcode,
                vec: this.selected_vec.otherlevelcode,
                iks: this.selected_iks.otherlevelcode,
                cc: this.selected_cc.otherlevelcode,
                fp: this.selected_fp.otherlevelcode,
                applicationmode: 'ADDITIONALPAPPER'
            };
        }
        //FY to SY
        if (this.oSession.maxadmissionboard == 'UG' && this.oSession.maxbatchlevel == 1) {
            jsonin = {
                finyear: this.oSession.finyear,
                college_code: this.oSession.collegecode,
                aadhaar: this.oSession.aadhaar,
                batch_code: this.BatchObject.batch_code,
                subject_group_id: this.oSession.maxsubjectgroupid,
                subject_group_code: this.oSession.maxsubjectgroupcode,
                term_code: myGlobals.Global_FORMFEESTERMNAME,
                minor: this.selected_minor.otherlevelcode,
                oe: this.selected_oe.otherlevelcode,
                vsc: this.selected_vsc.otherlevelcode,
                sec: this.selected_sec.otherlevelcode,
                aec: this.selected_aec.otherlevelcode,
                vec: this.selected_vec.otherlevelcode,
                iks: this.selected_iks.otherlevelcode,
                cc: this.selected_cc.otherlevelcode,
                fp: this.selected_fp.otherlevelcode,
                applicationmode: 'ADDITIONALPAPPER'
            };
        }
        jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            aadhaar: this.oSession.aadhaar,
            batch_code: this.BatchObject.batch_code,
            subject_group_id: this.selected_major.subject_group_id,
            subject_group_code: this.selected_major.subject_group_code,
            term_code: myGlobals.Global_FORMFEESTERMNAME,
            minor: this.selected_minor.otherlevelcode,
            oe: this.selected_oe.otherlevelcode,
            vsc: this.selected_vsc.otherlevelcode,
            sec: this.selected_sec.otherlevelcode,
            aec: this.selected_aec.otherlevelcode,
            vec: this.selected_vec.otherlevelcode,
            iks: this.selected_iks.otherlevelcode,
            cc: this.selected_cc.otherlevelcode,
            fp: this.selected_fp.otherlevelcode,
            applicationmode: 'ADDITIONALPAPPER'
        };
        this.commonService.Post_json_data<Ires_Reciept>(Students_url.IU_nepAdmission, jsonin).subscribe((response) => {
            // this.ReceiptID = this.res_Reciept.ReceiptID;
            // this.ReceiptNo = this.res_Reciept.ReceiptNo;
            this.res_Reciept = response.data
            if (this.res_Reciept.receiptid > 0) {
                this.RegistrationPayment();
            }
        });
    }

    RegistrationPayment() {
        let nTranscationamount = '';
        if (this.oSession.demo == 'true') {

            nTranscationamount = '1';
            this.formAmount = '1';
        } else {
            nTranscationamount = String(this.formAmount);
        }

        let installmentuuid= uuidv4();


        this.billdeskmsg = {
            collegecode: myGlobals.Golbal_CollegeCode,
            finyear: this.oSession.finyear,
            batchcode: this.BatchObject.batch_code,

            batchuuid: this.BatchObject.batchuuid,

            // aadhaar: this.oSession.aadhaar,
            termcode: 9999,
            merchantID: '',
            customerid: String(this.res_Reciept.receiptno),
            filler1: 'NA',
            txnamount: String(this.BatchObject.formamount),
            // TxnAmount: nTranscationamount,
            // "TxnAmount": "1",
            bankID: 'NA',
            filler2: 'NA',
            filler3: 'NA',
            currencytype: 'INR',
            itemcode: 'NA',
            typefield1: 'R',
            securityid: '',
            filler4: 'NA',
            filler5: 'NA',
            typefield2: 'F',
            additionalinfo1: String(this.oSession.finyear),
            additionalinfo2: '',
            additionalinfo3: String(this.BatchObject.batch_code),
            additionalinfo4: String(this.oSession.aadhaar),
            additionalinfo5: '9999',
            additionalinfo6: '1',
            additionalinfo7: String(this.res_Reciept.receiptid),
            typeFfeld3: 'NA',
            feestype: 'FORMFEES',
            installmentuuid: installmentuuid

        };
        // let input_json = {
        //     Input: encryptUsingAES256(this.billdeskmsg),
        // };
        this.commonService
            .Post_json_data<string>(Students_url.BillDeskcheckSum, this.billdeskmsg)
            .subscribe((response) => {
                this.billdeskRequestMsg = response.data;
                if (this.billdeskRequestMsg != null) {
                    BilldeskPay(this.billdeskRequestMsg, "", "");
                }
                // this.StudentAppliedCourses();
            });
    }

    single_batch() {

        let jsonin = {
            Batchcode: this.oSession.maxbatchcode,
            batchuuid: this.oSession.maxbatchuuid
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.additionalsubjectsService
            .batch(input_json)
            .subscribe((response) => {
                this.resp_singlebatch = response.data;
                // Admission for 2024 junior to senior ( ug batch )
                if (this.resp_singlebatch.batch_level == 2 &&
                    this.resp_singlebatch.admissionboard == 'JR') {
                    if (this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear) {
                        // this.modalSelectBatch();
                        this.NEPSelectBatch();
                    }
                } else {
                    //Admission for 2024 ug student
                    if (this.resp_singlebatch.batch_level >= 1 &&
                        this.resp_singlebatch.admissionboard == 'UG') {
                        if (this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear) {

                            console.log('bjccjc',this.resp_singlebatch)
                            //FYBCom to SYBCom
                            this.Incremental_batch(this.resp_singlebatch.next_batch,this.resp_singlebatch.nextbatchuuid)
                        }
                    }

                    if (this.resp_singlebatch.batch_level == 1 &&
                        this.resp_singlebatch.admissionboard == 'UG') {
                        if (this.oSession.formfeesrecieved == 'PAID') {
                            // this.modalSelectBatch();
                            this.NEPSelectBatch();
                        }
                    }
                    // if (this.pageType == 'A') {
                    //   this.globalmessage.Show_error('You are not eligible for additional courses.')
                    //   this.router.navigate(['/dashboard'])
                    // }
                    // this.Incremental_Batchapi()
                }
            });
    }

    Incremental_batch(nIncbatch: number,nIncbatchuuid: string) {
        let jsonin = {
            Batchcode: nIncbatch,
            batchuuid: nIncbatchuuid
        };
        console.log('hgfff',jsonin)
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.additionalsubjectsService
            .batch(input_json)
            .subscribe((response) => {
                this.resp_singlebatch = response.data;
                this.modalBatch.push(response.data)
            });
    }

    formreset() {

        this.NepAdditionalsubjectForm.reset()
    }


    Controlreset_1(){

    }

    Controlreset(){
        this.minorsubjects = [];
        this.oesubjects = [];
        this.vscsubjects = [];
        this.secsubjects = [];
        this.aecsubjects = [];
        this.vecsubjects = [];
        this.ikssubjects = [];
        this.ccsubjects = [];
        this.fpsubjects = [];
        this.selected_minor = {} as Ires_nepminorsubjects;
        this.selected_oe = {} as Ires_nepminorsubjects;
        this.selected_vsc = {} as Ires_nepminorsubjects;
        this.selected_sec = {} as Ires_nepminorsubjects;
        this.selected_aec = {} as Ires_nepminorsubjects;
        this.selected_vec = {} as Ires_nepminorsubjects;
        this.selected_iks = {} as Ires_nepminorsubjects;
        this.selected_cc = {} as Ires_nepminorsubjects;
        this.selected_fp = {} as Ires_nepminorsubjects;
        this.NepAdditionalsubjectForm.controls['frm_minorsubjects'].reset();
        this.NepAdditionalsubjectForm.controls['frm_oesubjects'].reset();
        this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].reset();
        this.NepAdditionalsubjectForm.controls['frm_secsubjects'].reset();
        this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].reset();
        this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].reset();
        this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].reset();
        this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].reset();
        this.NepAdditionalsubjectForm.controls['frm_minorsubjects'].setValue('');
        this.NepAdditionalsubjectForm.controls['frm_oesubjects'].setValue('');
        this.NepAdditionalsubjectForm.controls['frm_vscsubjects'].setValue('');
        this.NepAdditionalsubjectForm.controls['frm_secsubjects'].setValue('');
        this.NepAdditionalsubjectForm.controls['frm_aecsubjects'].setValue('');
        this.NepAdditionalsubjectForm.controls['frm_vecsubjects'].setValue('');
        this.NepAdditionalsubjectForm.controls['frm_ikssubjects'].setValue('');
        this.NepAdditionalsubjectForm.controls['frm_ccsubjects'].setValue('');
        this.NepAdditionalsubjectForm.controls['frm_fpsubjects'].setValue('');
    }
}
