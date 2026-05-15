import {Component, OnInit, Renderer2} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    BorderDirective, ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective, FormLabelDirective, FormSelectDirective,
    ListGroupItemDirective,
    RowComponent,
    TableDirective
} from "@coreui/angular-pro";
import { JsonPipe, KeyValuePipe } from "@angular/common";
import {Sessiondata} from "../../../models/Sessiondata";
import {SessionService} from "../../../globals/sessionstorage";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {Common_url, Fees_url, Students_url} from "../../../globals/global-api";
import Swal from "sweetalert2";
import {CommonService} from "../../../globals/common.service";
import {DynamiccheckboxService} from "./dynamiccheckbox.service";
import {
    ApiResponse_data,
    Ires_PhdBatchs,
    Ires_Reciept,
    Ires_subjectlist,
    Ires_subjects,
    res_singlebatch,
    Send_jsonstudentsubject
} from "../../../models/response";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {IBatchs} from "../../../models/request";
import {filter} from "rxjs/operators";
import {NgxSearchFilterModule} from "ngx-search-filter";
import {GlobalMessage} from "../../../globals/global.message";
import * as myGlobals from "../../../globals/global-variable";
import {BilldeskPay} from "../../../../assets/javascript/billdesk";
import {Router} from "@angular/router";
import {Global_CurrentFinYear} from "../../../globals/global-variable";
import {v4 as uuidv4} from "uuid";

@Component({
    selector: 'app-dynamicchekbox',
    imports: [
        ReactiveFormsModule,
        ListGroupItemDirective,
        KeyValuePipe,
        FormCheckInputDirective,
        FormCheckLabelDirective,
        ColComponent,
        AutocompleteLibModule,
        RowComponent,
        CardBodyComponent,
        CardComponent,
        TableDirective,
        NgxSearchFilterModule,
        BorderDirective,
        FormsModule,
        ButtonDirective,
        FormSelectDirective,
        FormLabelDirective
    ],
    standalone: true,
    templateUrl: './dynamicchekbox.component.html',
    styleUrl: './dynamicchekbox.component.scss'
})
export class DynamicchekboxComponent implements OnInit {
    form!: FormGroup;
    Batchs!: IBatchs[];
    Batchkeyword = 'Batch_Name';
    BatchCode: number = 0;
    Subjects!: Ires_subjects[]
    Selected_subjects!: Ires_subjects
    groupedData: any = {};
    subject_group_list: Ires_subjectlist[] = []
    oSession!: Sessiondata;
    selected_subject!: Ires_subjectlist
    arraypush: Ires_subjectlist[] = []
    table_one: Ires_subjectlist[] = [];
    table_two: Ires_subjectlist[] = [];
    Viewtable = false
    incremental_batch = {} as res_singlebatch;
    resp_singlebatch: res_singlebatch = {} as res_singlebatch;
    // majorsubject: Subjects_group_h = {} as Subjects_group_h;
    majorsubject: Ires_subjects[] = [];
    res_Reciept = {} as Ires_Reciept
    portal = {} as Ires_PhdBatchs;
    billdeskRequestMsg: string = '';
    submit_diabl = true
    show_selected_table = false
    subjectlist = true
    table_one_selected: Ires_subjectlist[] = [];
    table_two_selected: Ires_subjectlist[] = [];

    constructor(private fb: FormBuilder, private router: Router,
                private globalmessage: GlobalMessage,
                private commonService: CommonService, private renderer: Renderer2,
                private dynamicService: DynamiccheckboxService,
                private sessionservice: SessionService) {
    }

    ngOnInit(): void {
        // this.globalmessage.Show_message('Admission not started!')
        // this.router.navigate(['dashboard']);
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();
        this.form = this.fb.group({
            selectedItems: this.fb.array([]),
            // Subject_Name: ['', Validators.required],
            selection_checked: ['']
        });
        if (this.oSession.formfeesrecieved == 'PAID') {
            this.show_selected_table = true
            this.subjectlist = false
            this.student_selectedsubjectthird()
            // alert('PAID')
        }
        this.renderExternalScript(
            'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
        ).onload = () => {
        };
        // this.groupItems();
        // this.GetBatchApi();
        this.single_batch()
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

    GetBatchApi() {
        //Batch select list displaying
        this.commonService.getBatches().subscribe((response: any) => {
            if (response['data'] == '' || response['data'] == null) {
                // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
                Swal.fire({
                    title: 'Error!',
                    text: 'No data found! Please Configure Marksheet..',
                    icon: 'error',
                    confirmButtonText: 'OK',
                }); //alert
            } else {
                this.Batchs = response['data'];
            }
        });
    }

    single_batch() {
        let jsonin = {
            Batchcode: this.oSession.maxbatchcode,
            batchuuid: this.oSession.maxbatchuuid,
        };
        this.commonService.Post_json_data<res_singlebatch>(Common_url.batch, jsonin).subscribe((response) => {

            this.incremental_batch = response.data

            console.log('vbbb',this.incremental_batch)
            this.single_subject()
            if (this.incremental_batch.batch_level >= 1 &&
                this.incremental_batch.admissionboard == 'UG') {
                if (this.oSession.maxfinyear! < myGlobals.Global_CurrentFinYear) {
                    //FYBCom to SYBCom
                    this.Incremental_batch(this.incremental_batch.next_batch,this.incremental_batch.nextbatchuuid)
                }
            }
        })
    }


    single_subject() {
        let batch_code = 0
        if (this.incremental_batch.next_batch == 11103 ||
            this.incremental_batch.next_batch == 10603
            ||
            this.incremental_batch.next_batch == 12203
        ) {
            batch_code = this.incremental_batch.next_batch
        } else {
            batch_code = this.incremental_batch.batch_code
        }
        let jsonin = {
            Batch_code: batch_code,
            // batchuuid: this.oSession.maxbatchcode,
            Subject_group_code: this.oSession.maxsubjectgroupcode,
            Subject_group_id: this.oSession.maxsubjectgroupid,
        }
        //Changes made by Shivam
        if (this.incremental_batch.next_batch == 11103 ||
            this.incremental_batch.next_batch == 10603
            ||
            this.incremental_batch.next_batch == 12203
        ) {
            this.commonService
                .Post_json_data<Ires_subjects[]>(Fees_url.bms_subject, jsonin)
                .subscribe((response) => {
                    this.majorsubject = response.data
                });
            return
        }

        this.majorsubject = []
        this.commonService
            .Post_json_data<Ires_subjects>(Fees_url.single_subject, jsonin)
            .subscribe((response) => {
                // this.majorsubject = response.data
                let singlesubject_array = response.data
                this.majorsubject.push(singlesubject_array)
            });

    }

    Incremental_batch(nIncbatch: number,nIncbatch_uuid: string) {

        // this.current_batch_api(nIncbatch)

        let jsonin = {
            Batchcode: nIncbatch,
            batchuuid: nIncbatch_uuid,
        };

        console.log('jjd',jsonin)

        this.commonService
            .Post_json_data<res_singlebatch>(Common_url.batch, jsonin)
            .subscribe((response) => {
                this.resp_singlebatch = response.data;
                this.subject_list(nIncbatch_uuid)
                // this.PortalOpen()
            });
    }



    selectBatch(bat: any) {
        this.BatchCode = bat.Batch_Code;
        // this.subject_list()
    }

    subjectgroup_d_list() {
        this.subject_group_list = []
        this.arraypush = []
        this.groupedData = {}
        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            // aadhaar: this.oSession.aadhaar,
            batch_code: this.resp_singlebatch.batch_code,
            subject_group_code: this.Selected_subjects.subject_group_code,
             semester: 0,
            // subject_group_id: 788
        };

        console.log('inpurjss',jsonin)
        let input_jsonin = {
            Input: encryptUsingAES256(jsonin),
        };
        // this.dynamicService
        //     .subjectgroup_d_list(Fees_url.subjectgroup_d_list, input_jsonin)
        this.commonService
            .Post_json_normal<Ires_subjectlist[]>(Fees_url.subjectgroup_d_list, jsonin)
            .subscribe((response) => {
                this.subject_group_list = response
                if (this.subject_group_list == null) {
                    return
                }
                this.Viewtable = true
                this.subject_group_list.forEach(item => {
                    if (!this.groupedData[item.semester]) {
                        this.groupedData[item.semester] = {};
                    }
                    if (!this.groupedData[item.semester][item.verticalname]) {
                        this.groupedData[item.semester][item.verticalname] = [];
                    }
                    //
                    this.groupedData[item.semester][item.verticalname].push(item);
                    if (item.mandatory === 1) {
                        const selected = this.form.get('selectedItems') as FormArray;
                        const uniqueKey = `${item.semester}_${item.verticalname}_${item.subject_detail_id}`;
                        if (!selected.value.includes(uniqueKey)) {
                            selected.push(this.fb.control(uniqueKey));
                            this.arraypush.push(item);
                        }
                    }
                });
            });
    }

    filreddata() {
        this.table_one = this.arraypush.filter((item) => item.semester === 5);
        this.table_two = this.arraypush.filter((item) => item.semester === 6);
    }

    subject_list(batch_uuid: string) {
        let jsonin = {
            Finyear: this.oSession.finyear,
            College_code: this.oSession.collegecode,
            // Aadhaar: this.oSession.aadhaar,
            Batch_code: this.resp_singlebatch.batch_code,
            Batchuuid: batch_uuid
        };
        let input_jsonin = {
            Input: encryptUsingAES256(jsonin),
        };
        this.dynamicService
            .subject_list(Fees_url.subjectgroup_list, input_jsonin)
            .subscribe((response) => {
                this.Subjects = response.data
            })
    }

    onCheckboxChange(e: any, item: Ires_subjectlist): void {
        if (item == null) {
            return;
        }

        let selected = this.form.get('selectedItems') as FormArray;
        let uniqueKey = `${item.semester}_${item.verticalname}_${item.subject_detail_id}`;
        let selectedItemsInCategory = selected.controls
            .map(control => control.value)
            .filter((val: string) =>
                val?.startsWith(`${item.semester}_${item.verticalname}_`)
            );
        let mandatory = this.subject_group_list.filter((man_object: Ires_subjectlist) =>
            man_object.semester === item.semester &&
            man_object.subjectcatid === item.subjectcatid &&
            man_object.mandatory === 1);
        if (e.target.checked) {
            if (selectedItemsInCategory.length - mandatory.length < item.noofoptionalsubject) {
                selected.push(this.fb.control(uniqueKey));
                this.arraypush.push(item)
            } else {
                e.target.checked = false;
                this.globalmessage.Show_error(`You can only select up to ${item.noofoptionalsubject} item(s) in category "${item.verticalname}" of semester ${item.semester}`)
                return
            }
        } else {
            const index = selected.controls.findIndex(control => control.value === uniqueKey);
            if (index !== -1) {
                this.arraypush = this.arraypush.filter(array_item => array_item.subject_detail_id !== item.subject_detail_id);
                selected.removeAt(index);
            }
        }
        /*
        this.arraypush = this.arraypush.filter(
          (subject) =>
            !(
              subject.Semester === item.Semester &&
              subject.Categoryname === item.Categoryname &&
              subject.Subject_detail_id === item.Subject_detail_id
            )
        );
        */
        this.filreddata()
    }

    submit(): void {
        let table_one = this.arraypush.filter((item) => item.semester === 5);
        let table_two = this.arraypush.filter((item) => item.semester === 6);
        let check_json: any = {};
        let check_json_tabletwo: any = {};


        //Shivam0905
         check_json = table_one.filter((item) => item.mandatory === 0)
         check_json_tabletwo = table_two.filter((item) => item.mandatory === 0)



        //Shivam0905
        const isCheckJson_tableone = Object.keys(check_json).length > 0;
        const isCheckJson_tabletwo = Object.keys(check_json_tabletwo).length > 0;
        //
        //
        // const isCheckJson_tableone = check_json.length > 0;
        // const isCheckJson_tabletwo = check_json_tabletwo.length > 0;


        if (isCheckJson_tableone && isCheckJson_tabletwo) {
            for (const inputJsoninElement of this.arraypush) {
                inputJsoninElement.finyear = this.oSession.finyear
                inputJsoninElement.college_code = this.oSession.collegecode
                // inputJsoninElement.aadhaar = this.oSession.aadhaar
            }
            let jsonin: Send_jsonstudentsubject = {} as Send_jsonstudentsubject
            /*let jsonin = {
              // Inputjsonarray: this.arraypush

            }*/
            // jsonin.aadhaar = this.oSession.aadhaar!
            jsonin.finyear = this.oSession.finyear!
            jsonin.batch_code = this.resp_singlebatch.batch_code
            jsonin.college_code = this.oSession.collegecode!
            jsonin.prefix_code = 9999
            jsonin.subject_group_code = this.Selected_subjects.subject_group_code
            jsonin.subject_group_id = this.Selected_subjects.subject_group_id
            jsonin.applicationmode = 'THIRDYEAR'
            jsonin.term_code = 9999
            jsonin.inputjsonarray = this.arraypush
            let input_jsonin = {
                Input: encryptUsingAES256(jsonin),
            };
            // this.dynamicService
            //     .savestudentsubjects(Students_url.savestudentsubjects, input_jsonin)
            this.commonService.Post_json_data<Ires_Reciept>(Students_url.savestudentsubjects, jsonin)
                .subscribe((response) => {
                    this.res_Reciept = response.data
                    if (this.res_Reciept.receiptid > 0) {
                        this.RegistrationPayment();
                    }
                    // this.Subjects = response.data
                    // this.globalmessage.Show_successmessage('Data saved successfully.')
                })
        } else {
            this.globalmessage.Show_error('Please select from both the semesters');
            return;
        }

    }

    RegistrationPayment() {
        let nTranscationamount = '';

        let installmentuuid= uuidv4();

        let jsonin = {
            collegecode: myGlobals.Golbal_CollegeCode,
            finyear: this.oSession.finyear,
            batchcode: this.resp_singlebatch.batch_code,
            batchuuid: this.resp_singlebatch.batchuuid,

            // aadhaar: this.oSession.aadhaar,
            termcode: 9999,
            merchantID: '',
            customerid: String(this.res_Reciept.receiptno),
            filler1: 'NA',
            txnamount: String(this.resp_singlebatch.formamount),
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
            additionalinfo3: String(this.resp_singlebatch.batch_code),
            // additionalinfo4: String(this.oSession.aadhaar),
            additionalinfo5: '9999',
            additionalinfo6: '1',
            additionalinfo7: String(this.res_Reciept.receiptid),
            typefield3: 'NA',
            feestype: 'FORMFEES',
            installmentuuid: installmentuuid

        };

        console.log('ksss',jsonin)

        // return
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

    onSelect_semester() {
        this.groupedData = {}
        this.arraypush = []
        this.table_one = []
        this.table_two = []
    }

    PortalOpen() {
        // this.portal = "";
        // this.BatchCode = event.Batch_Code;
        // this.formAmount = event.FormAmount;

        this.form.reset()
        let sPortalopenUrl = myGlobals.Domainname
        let jsonin = {
            finyear: this.oSession.finyear,
            collegecode: this.oSession.collegecode,
             batchcode: this.resp_singlebatch.batch_code,
            batchuuid: this.resp_singlebatch.batchuuid,
            Webportal: sPortalopenUrl
        };

        console.log('jsss',jsonin)

        this.commonService
            .Post_json_data<Ires_PhdBatchs>(Students_url.PortalOpenv1, jsonin)
            .subscribe((response) => {
                this.portal = response.data
                if (this.portal.admissionstarted == false && this.portal.admissionyear == Global_CurrentFinYear) {
                    this.globalmessage.Show_error('Admission not started')
                    this.router.navigate(['dashboard'])
                    return
                }
                this.subjectgroup_d_list()
            })
    }

    student_selectedsubjectthird() {

        console.log('vjvk111')
        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            // aadhaar: this.oSession.aadhaar,
            Batch_code: this.oSession.currentformfeesbatchcode,
        };
        this.commonService
            .Post_json_data<Ires_subjectlist[]>(Students_url.student_selectedsubjectthird, jsonin)
            .subscribe((response) => {
                let tdata = response.data
                this.table_one_selected = tdata.filter((item) => item.semester === 5);
                this.table_two_selected = tdata.filter((item) => item.semester === 6);

            })
    }

    protected readonly filter = filter;
}
