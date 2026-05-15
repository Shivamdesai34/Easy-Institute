import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardService} from './dashboard.service';
import * as myGlobals from '../../globals/global-variable';
import {Global_NONE} from '../../globals/global-variable';
import Swal from 'sweetalert2';
import {GlobalMessage} from "../../globals/global.message";
import {DomSanitizer} from '@angular/platform-browser';
import {SessionService} from "../../globals/sessionstorage";
import {EncryptData, encryptUsingAES256} from "../../globals/encryptdata";
import {Billdesk_url, Common_url, queryapi_URl, Students_url} from "../../globals/global-api";
import {CommonService} from "../../globals/common.service";
import {Sessiondata} from "../../models/Sessiondata";
import {
    Admissionbatchs, Ires_eligibility,
    IRes_myprofilemultiplebatchs,
    Ires_Profilesubmited,
    Ires_validateadmissionstarted,
    Ires_validateEligiblestudents,
    Iresp_Formfees,
    Res_Outstanding,
    res_singlebatch
} from "../../models/response";
import {Ireq_eligibilitydata} from "../../models/request";
import {
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    ImgDirective,
    RowComponent,
    TableDirective
} from "@coreui/angular-pro";

import {ReactiveFormsModule} from "@angular/forms";
import {Extractguid} from "../../globals/global_utility";
import {environment} from "../../../environments/environment";
import {AppStateService} from "../../globals/appstateservice";
import { firstValueFrom } from 'rxjs';


// import {Subscription} from "rxjs";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [
        ColComponent,
        CardComponent,
        CardBodyComponent,
        RowComponent,
        ReactiveFormsModule,
        ImgDirective,
        TableDirective,
        CardHeaderComponent
    ],
    standalone: true
})
export class DashboardComponent implements OnInit, OnDestroy {
    data: any;
    finyear: any;
    collegecode: any;
    res: any;
    Batch_code: any;
    BatchData: Admissionbatchs[] = [];
    res_formfeesrecieved = {} as Iresp_Formfees;
    MyImage: any;
    res_outstand = {} as Res_Outstanding;
    oSession!: Sessiondata;
    res_myprofilemultiplebatchs = {} as IRes_myprofilemultiplebatchs;
    res_Profilesubmited = {} as Ires_Profilesubmited;
    res_admissionstarted = {} as Ires_validateadmissionstarted
    // res_validateeligibility = {} as Ires_validateEligiblestudents;
    res_validateeligibility = {} as Ires_eligibility
    resp_singlebatch = {} as res_singlebatch;
    Incremental_batch!: number;
    res_changeprofilesubmit: any;


    constructor(
        private commonService: CommonService,
        private appState: AppStateService,
        private dashboardService: DashboardService, private route: ActivatedRoute,
        private router: Router, private sessionservice: SessionService,
        private globalmessage: GlobalMessage,
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit(): void {
        this.initialize()
    }

    async initialize() {

        this.appState.updateState({
            admissionstarted: 65
        });

        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();

        console.log('Sess',this.oSession)

        if (this.oSession.registerfinyear != myGlobals.Global_CurrentFinYear) {
            this.LastYearoutstanding();
        }

        this.Run_query()

        await this.Atkt_found();

        // await this.Get_yeargap();

        await this.onlyregister_students();

        if (this.oSession.formfeesrecieved == "NOTPAID" || this.oSession.formfeesrecieved == "") {
            if (this.oSession.currentformfeesboardlevel == "") {

                if (this.oSession.registeradmissionboard == 'CERT') {
                    this.router.navigate(['formfeesCERT'], { queryParams: { page: 'CERT' } });
                    return;
                }

                if (this.oSession.registeradmissionboard == 'PGD') {
                    this.router.navigate(['formfeesPGD'], { queryParams: { page: 'PGD' } });
                    return;
                }
            }
        }

        await this.formfeesreceived();


        await this.Student_currentbatch();


        if (this.oSession.formfeesrecieved == "PAID" &&
            this.oSession.currentformfeesbatchlevel == "1" &&
            this.oSession.isprofilesubmited == "false") {

            this.router.navigate(['studentprofilenew']);
        }


        await this.Checkend()
    }



    loadDashboardData() {

        // this.MyStudentProfile();
    }

    ngOnDestroy() {

    }

    LastYearoutstanding(): any {
        if (this.oSession.maxfinyear == this.oSession.finyear || this.oSession.maxfinyear == 0) {
            return
        }
        let nOutstanding_finyear = -1;
        nOutstanding_finyear = this.oSession.maxfinyear!
        let jsonin = {
            finyear: nOutstanding_finyear,
            college_code: this.oSession.collegecode,
            // aadhaar: this.oSession.aadhaar,
            batch_code: -99,
            studenttype: this.oSession.studenttype,
            currentfinyear: this.oSession.finyear,
            batchuuid: this.oSession.currentbatchuuid
        };
        let input_jsonin = {
            Input: encryptUsingAES256(jsonin)
        };
        this.dashboardService
            .checkoutstanding(input_jsonin)
            .subscribe((response) => {
                this.res_outstand = response.data;
                this.sessionservice.SaveData('lastyearoutstanding', EncryptData('false'));
                if (this.res_outstand.outstanding == true) {
                    this.finyear = this.res_outstand.finyear;
                    this.Batch_code = this.res_outstand.lastyearbatchcode;
                    this.sessionservice.SaveData('batchcode', EncryptData(this.Batch_code.toString()));
                    this.sessionservice.SaveData('finyear', EncryptData(this.finyear.toString()));
                    this.sessionservice.SaveData('lastyearoutstanding', EncryptData('true'));

                }
                if (this.res_outstand.outstanding == false) {
                    //Prakash-Shivam
                    // this.Batch_code_current = this.res_outstand.Batch_code;
                    // this.sessionservice.SaveData('batchcode', EncryptData(this.Batch_code_current.toString()));
                    this.MyStudentProfile();
                }
            });
    }

    formfeesreceived() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
            // Aadhaar: this.oSession.aadhaar,
        };
        let input_jsonin = {
            Input: encryptUsingAES256(jsonin)
        };

        this.dashboardService.formfeesreceivedv1_url(input_jsonin).subscribe({
            next: (response) => {
                if (response != null) {
                    this.res_formfeesrecieved = response.data
                    console.log('oiddd',this.res_formfeesrecieved)
                    if (this.res_formfeesrecieved.message.length > 0) {
                        this.sessionservice.SaveData('formfeesnotpaid', EncryptData('NOTPAID'));
                    }
                    if (this.res_formfeesrecieved.fees_receiptmaster.batch_code <= 0) {
                        this.sessionservice.SaveData('formfeesnotpaid', EncryptData('NOTPAID'));
                    } else {
                        this.sessionservice.SaveData('formfeesnotpaid', EncryptData('PAID'));

                        this.sessionservice.SaveData('currentformfeesbatchcode',
                            EncryptData(String(this.res_formfeesrecieved.fees_receiptmaster.batch_code)));

                        this.sessionservice.SaveData('currentformfeesbatchlevel',
                            EncryptData(this.res_formfeesrecieved.fees_receiptmaster.batch_level));

                        this.sessionservice.SaveData('currentformfeesboardlevel',
                            EncryptData(this.res_formfeesrecieved.fees_receiptmaster.boardlevel));

                        this.sessionservice.SaveData('currentformfeesbatchuuid',
                            EncryptData(this.res_formfeesrecieved.fees_receiptmaster.batchuuid));

                         // this.oSession.Getdatafromstroage();

                        // console.log


                        //if formfees is taken from backend
                        if(this.oSession.maxbatchcode == 0
                        && this.res_formfeesrecieved.fees_receiptmaster.finyear == myGlobals.Global_CurrentFinYear){

                            this.sessionservice.SaveData('maxbatchcode',EncryptData(String(this.res_formfeesrecieved.fees_receiptmaster.batch_code)))
                            this.sessionservice.SaveData('maxbatchuuid',EncryptData(this.res_formfeesrecieved.fees_receiptmaster.batchuuid))

                        }


                    }



                    //Shivamprakash0905
                    this.isProfileSubmited();


                }
            },
            error: (err) => {
                console.log(err.error.message);
            }
        });

    }

    isProfileSubmited() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
            // Aadhaar: this.oSession.aadhaar,
            BatchCode: this.res_formfeesrecieved.fees_receiptmaster.batch_code,
        };
        let input_jsonin = {
            Input: encryptUsingAES256(jsonin)
        };
        this.dashboardService
            .IsProfileSubmited_URL(input_jsonin)
            .subscribe((response) => {


                this.res_Profilesubmited = response.data

                console.log("jcj",this.res_Profilesubmited)
                if (this.res_Profilesubmited.profilesubmited) {
                    this.sessionservice.SaveData('isprofilesubmitted',
                        EncryptData(String(this.res_Profilesubmited.profilesubmited)));
                    this.sessionservice.SaveData('submittedyear',
                        EncryptData(String(this.res_Profilesubmited.submitedyear)));
                }

                console.log("ssprofile",this.res_Profilesubmited.profilesubmited);


                console.log("ssprofileyrr",this.res_Profilesubmited.submitedyear);

                //Smallcases Shivam04052026
                if (this.res_Profilesubmited.submitedyear != myGlobals.Global_CurrentFinYear) {
                    //TY to MASTERS(PG)
                    if (this.oSession.maxadmissionboard == 'UG') {
                        if (this.oSession.maxbatchlevel == 3) {

                            if (this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear) {

                                console.log('2IU')

                                this.IU_Changeprofilesubmit();
                            }
                        }
                    }
                    //SYJC to FY(UG)
                    if (this.oSession.maxadmissionboard == 'JR') {
                        if (this.oSession.maxbatchlevel == 2) {
                            if (this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear) {

                                console.log('3IU')

                                this.IU_Changeprofilesubmit();
                            }
                        }
                    }
                }
                // once payment received then call
                // prakash 15/1/2026

                if(this.oSession.registerfinyear == myGlobals.Global_CurrentFinYear &&
                    this.res_Profilesubmited.profilesubmited == false){
                    return
                }

                this.MyStudentProfile();

                // if(this.res_Profilesubmited.profilesubmited){
                //     this.MyStudentProfile();
                // }
            });
    }

    IU_Changeprofilesubmit() {
        let jsonin = {
            finyear: this.oSession.finyear,
            collegecode: this.oSession.collegecode,
            // aadhaar: this.oSession.aadhaar,
        };
        let input_jsonin = {
            Input: encryptUsingAES256(jsonin)
        };


        this.dashboardService
            .IU_Changeprofilesubmit(input_jsonin)
            .subscribe((response) => {
                this.res_changeprofilesubmit = response
                if (this.res_changeprofilesubmit == true) {
                    this.sessionservice.SaveData('isprofilesubmitted',
                        EncryptData('false'));
                }
            });
    }

    MyStudentProfile() {
        if (this.oSession.finyear! > 0) {
            let jsonin = {
                Collegecode: this.oSession.collegecode,
                Finyear: this.oSession.finyear,
            };

            this.commonService.Post_json_data<IRes_myprofilemultiplebatchs>(Students_url.StudentMyProfile_URL, jsonin).subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('No Data Found');
                }
                this.res_myprofilemultiplebatchs = response.data;
                this.BatchData = this.res_myprofilemultiplebatchs.admissionbatchs
                let mystring = Extractguid(response.data.picture_blob)
                this.MyImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response.data.picture_blob}`);
            });
        }
    }

    Get_pincode() {

        let pin = 400092

        let jsonin = {
            pincode: pin
        }

        this.commonService
            .Pincode(pin, jsonin)
            .subscribe(
                (response) => {
                }, error => {
                    this.globalmessage.Show_error(error.error.exception)
                    // this.router.navigate(['/dashboard'])
                });
    }

    async Student_currentbatch() {

        console.log('hfff',this.oSession);


        console.log('vnjjj',this.res_formfeesrecieved)



        // if(this.res_formfeesrecieved.fees_receiptmaster.finyear == myGlobals.Global_CurrentFinYear
        //     && this.res_formfeesrecieved.fees_receiptmaster.billdesktranid.length > 0){
        //
        //     this.router.navigate(['studentprofilenew']);
        //     return;
        // }

        console.log('vnjjj2')

        if(this.oSession.maxbatchcode != 0){
            let jsonin = {
                batchcode: this.oSession.maxbatchcode,
                batchuuid: this.oSession.maxbatchuuid
            };


            console.log('jsssbatch',jsonin)
            this.commonService.Post_json_data<res_singlebatch>(Common_url.batch, jsonin)
                .subscribe(async (response) => {

                    this.resp_singlebatch = response.data;

                    console.log('Eligibility:', this.resp_singlebatch);


                    if (
                        this.resp_singlebatch.batch_level < 3 &&
                        (this.resp_singlebatch.admissionboard == 'UG' ||
                            this.resp_singlebatch.admissionboard == 'JR')
                    ) {
                        const status = await this.ValidateEligibility();
                        console.log('Eligibility:', status);
                    }

                    if (
                        this.resp_singlebatch.batch_level == 1 &&
                        this.resp_singlebatch.admissionboard == 'PG'
                    ) {
                        const status = await this.ValidateEligibility();
                        console.log('Eligibility:', status);
                    }
                });
        }


    }

    async ValidateEligibility(): Promise<boolean> {

        let eligibilitydata: Ireq_eligibilitydata = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
        };

        let jsonin = {
            Input: encryptUsingAES256(eligibilitydata)
        };

        try {
            const response = await firstValueFrom(
                this.dashboardService.validateeliglibity(jsonin)
            );

            this.res_validateeligibility = response.data;
            this.Incremental_batch = 0;

            if(this.res_validateeligibility.eligible){
                    this.sessionservice.SaveData('batchcode', EncryptData(String(this.Incremental_batch)));
                    this.sessionservice.SaveData('iseligible', EncryptData('PASS'));
            }else {
                this.sessionservice.SaveData('iseligible', EncryptData('NOTELIGIBLE'));
            }


            //ShivamPrakash1005 new Eligibility
            // let status = this.res_validateeligibility.eligible;
            //
            // if (status === 'PASS') {
            //     this.Incremental_batch = this.res_validateeligibility.incremental_batch;
            //     this.sessionservice.SaveData('batchcode', EncryptData(String(this.Incremental_batch)));
            //     this.sessionservice.SaveData('iseligible', EncryptData('PASS'));
            // }
            //
            // if (status === 'NOTELIGIBLE') {
            //     this.sessionservice.SaveData('iseligible', EncryptData('NOTELIGIBLE'));
            // }
            //
            // if (status === 'FAIL') {
            //     this.sessionservice.SaveData('iseligible', EncryptData('FAIL'));
            // }

            return this.res_validateeligibility.eligible; // ✅ IMPORTANT

        } catch (error: any) {
            if (error?.error !== null) {
                Swal.fire({
                    title: 'Error!',
                    text: error.error.exception,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                this.router.navigate(['dashboard']);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: error.status + ' Server Error!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }

            throw error; // optional but cleaner
        }
    }

    admissionstartedvalidate() {

        return

        let jsonin = {}
        //Prakash-Shivam
        if (this.oSession.studenttype == Global_NONE) {
            jsonin = {
                finyear: this.oSession.finyear,
                college_code: this.oSession.collegecode,
                batch_code: this.Incremental_batch,
                // batchuuid :
            };
        } else {
            jsonin = {
                finyear: this.oSession.finyear,
                college_code: this.oSession.collegecode,
                batch_code: this.oSession.register_batchcode,
                // batchuuid :
            };
        }

        console.log('jjbjb', jsonin)


        this.commonService
            .Post_json_data<Ires_validateadmissionstarted>(Students_url.validateadmissionstarted, jsonin)
            .subscribe(
                (response) => {
                    this.res_admissionstarted = response.data
                    if (this.res_admissionstarted.admissionstarted == 1) {
                        //this.PaidFormFeesdetail()

                    } else {
                        this.globalmessage.Show_error('Admission not started.')
                        // this.router.navigate(['/dashboard'])
                    }
                }, error => {
                    this.globalmessage.Show_error(error.error.exception)
                    // this.router.navigate(['/dashboard'])
                });
    }

    Get_yeargap(){

        if(this.oSession.currentformfeesbatchuuid?.length! != 2){
            return
        }

            this.commonService.Post_json_data<number>(Students_url.yeargap,"").subscribe((response) => {
                let res = response.data

                if(res >= 2 && this.oSession.registerfinyear != myGlobals.Global_CurrentFinYear){
                    this.router.navigate(['gapregistration']);
                }
            })

    }

    Atkt_found(){
        this.commonService.Post_json_data<number>(Students_url.atktfound,"").subscribe((response) => {
            let res = response.data

            if(res == myGlobals.Global_CurrentFinYear){
                if (this.oSession.currentlevel != 2 && this.oSession.currentlevel != 5)
                this.ValidateEligibility();
            }
        })
    }

    onlyregister_students(){

    }

    Checkend(){
        console.log('Sessionend',this.oSession)
    }

    Run_query(){

        let jsonin = {
             aadhaar: 0,
            collegecode: this.oSession.collegecode,
            finyear : this.oSession.finyear,
        }

        console.log('1run')

        this.dashboardService.Run_aueryapi(jsonin).subscribe((response) => {
        // this.commonService.Post_json_data<boolean>('https://admission.rjcollege.edu.in:7010/v1/Billdesk/run_queryapi_singlestudent',jsonin).subscribe((response) => {
            if(response){
                console.log(response);
            }
        })
    }



    protected readonly environment = environment;
}
