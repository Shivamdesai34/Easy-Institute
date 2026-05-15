import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {
    copyData,
    Ires_education,
    Ires_iuupdatededucationtype,
    Ires_personaldata,
    Res_ProfileResources,
    res_singlebatch,
    Student_Educations_new
} from "../../../../models/response";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {encryptUsingAES256} from "../../../../globals/encryptdata";
import {Common_url, Students_url} from "../../../../globals/global-api";
import {GlobalMessage} from "../../../../globals/global.message";
import {CommonService} from "../../../../globals/common.service";
import {Sessiondata} from "../../../../models/Sessiondata";
import {
    CalloutComponent,
    ColComponent,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    InputGroupComponent,
    RowComponent,
    SpinnerComponent
} from "@coreui/angular-pro";
import {StudentprofileService} from "../../studentprofile/studentprofile.service";
import {NgForOf, NgIf} from "@angular/common";
import {SessionService} from "../../../../globals/sessionstorage";
import {NgxImageCompressService} from "ngx-image-compress";
import {Router} from "@angular/router";
import * as myGlobals from "../../../../globals/global-variable";

@Component({
    selector: "app-educationdetails",
    templateUrl: "./educationdetails.component.html",
    styleUrls: ["./educationdetails.component.scss"],
    standalone: true,
    imports: [
        RowComponent,
        ColComponent,
        ReactiveFormsModule,
        FormSelectDirective,
        FormLabelDirective,
        FormControlDirective,
        CalloutComponent,
        NgForOf,
        NgIf,
        FormDirective,
        InputGroupComponent,
        SpinnerComponent,
    ],
    providers: [NgxImageCompressService],
})
export class EducationDetailsComponent implements OnInit {
    @Input() state = [''];
    @Input() board = [''];
    @Output() reloadApi_education = new EventEmitter<boolean>();

    Education_formGroup!: FormGroup;
    Educationselectform!: FormGroup;
    get_personaldetail!: Ires_personaldata;
    selected_document!: Ires_education;
    oSession!: Sessiondata;
    Ires_ProfileResources!: Res_ProfileResources
    student_educations_new!: Student_Educations_new
    // state = [''];
    private copyDataSave: any = {} as copyData;
    gridOptions_document: any;
    private gridApi_document: any;
    // board: any;
    imagefile: File | null | undefined
    BatchCode: any;
    openpercentage = false
    saveEducationloader = false
    res_educationsubmitted: boolean = true;
    tabfivedisable = true;
    checkbox_percentage: boolean = true;
    SSCSubmit = false;
    copied = false;
    public rowSelection_document: 'single' | 'multiple' = 'single';
    res_droneducation = ['']
    selected_res_droneducation = ''
    res_exampattern = ['']
    selected_res_exampattern = ''
    res_singlebatch = {} as res_singlebatch;

    Documentfiles: (File | null)[] = [];

    educationFiles: { [educationCode: number]: File } = {};

    constructor(
        private formBuilder: FormBuilder,
        private fb: FormBuilder,
        private globalmessage: GlobalMessage,
        private commonService: CommonService,
        private sessionservice: SessionService,
        private imageCompress: NgxImageCompressService,
        private studentprofieservice: StudentprofileService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();
        this.Education_formGroup = this.formBuilder.group({
            items: this.formBuilder.array([])
        });
        if (this.oSession.isprofilesubmited == 'true') {
            this.tabfivedisable = true
            this.Education_formGroup.disable();
        }
        if (this.oSession.formfeesrecieved == 'NOTPAID') {
            this.router.navigate(['/formfees'])
        }
        // this.ProfileResource();
        //temp
        // this.Dron_education();
        this.single_batch();
        this.createForm()
    }

    get itemsArray() {
        return this.Education_formGroup.get('items') as FormArray;
    }

    getItemForm(index: number): FormGroup {
        return (this.Education_formGroup.get('items') as FormArray)
            .at(index) as FormGroup;
    }

    createForm() {
        this.Educationselectform = this.formBuilder.group({
            edulevel_select: [null],
            marksheettype_select: [null],
        });
        this.Educationselectform.controls['edulevel_select'].valueChanges.subscribe((value) => {
            this.selected_res_droneducation = value
        })
        this.Educationselectform.controls['marksheettype_select'].valueChanges.subscribe((value) => {
            this.selected_res_exampattern = value
        })
    }

    createItem(item: Ires_iuupdatededucationtype): FormGroup {
        const isRequired = item.mandatory === 1;

        return this.fb.group({
            document_type: [item.education_details],
            document_code: [item.education_code],
            mandatory: [item.mandatory],

            board: ['', isRequired ? Validators.required : []],
            state: ['', isRequired ? Validators.required : []],
            education_board: ['', isRequired ? Validators.required : []],
            rollno: ['', isRequired ? Validators.required : []],
            marksheetno: ['', isRequired ? Validators.required : []],
            marksobtained: [0],
            file: ['', isRequired ? Validators.required : []],

            // always optional
            college_name: [''],
            datepass: [''],
            checkpercentagesgpa: ['', isRequired ? Validators.required : []],
            sgpa: [0],
            outoff: [0],
            percentage: [0]
        });
    }

    get edf() {
        return this.Education_formGroup.controls;
    }

    single_batch() {
        let nBatchcode: number | undefined = 0
        let nBatchuuid : string | undefined = ""

        if (myGlobals.Global_CurrentFinYear == this.oSession.registerfinyear) {
            nBatchcode = this.oSession.register_batchcode,
                nBatchuuid = this.oSession.registrationbatchuuid
        } else {
            nBatchcode = this.oSession.currentformfeesbatchcode,
                nBatchuuid = this.oSession.currentformfeesbatchuuid
        }
        if (nBatchcode! <= 0 || nBatchcode == undefined) {
            this.globalmessage.Show_message('Single Batch not found')
            return
        }
        let jsonin = {
            Batchcode: nBatchcode,
            batchuuid:nBatchuuid
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.studentprofieservice
            .getsinglebatch(input_json)
            .subscribe((response) => {
                this.res_singlebatch = response.data;
                this.Dron_education_level(this.res_singlebatch.batch_code)
            });
    }


    EducationSubmit() {
        if (this.get_personaldetail.educationsubmited) {
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
            // aadhaar: this.oSession.aadhaar,
        };
        let input_json = jsonin
        this.commonService
            .Post_json_data<boolean>(Students_url.IU_educationsubmited, input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your data');
                }
                this.res_educationsubmitted = response.data;
                if (response.data) {
                    // this.getPersonalInfo();
                    this.globalmessage.Show_successmessage('Data submitted successfully.')
                }
            });
    }

    // getPersonalInfo() {
    //     if (this.get_personaldetail.educationsubmited) {
    //         this.tabfivedisable = false;
    //     }
    //     this.Check_alleducation_filled();
    // }

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

    PercentageCalculater(index: number) {


        const itemsArray = this.Education_formGroup.get('items') as FormArray;
        const rowGroup = itemsArray.at(index) as FormGroup;
        const obtainedmarks = Number(rowGroup.get('marksobtained')?.value || 0);
        const outoff = Number(rowGroup.get('outoff')?.value || 0);
        let percentage = 0;
        if (outoff <= 0 || obtainedmarks <= 0) {
            rowGroup.get('percentage')?.setValue(0);
            return;
        }
        percentage = (obtainedmarks / outoff) * 100;
        if (percentage > 100) {
            rowGroup.get('percentage')?.setValue(0);
            return;
        }
        rowGroup.get('percentage')?.setValue(+percentage.toFixed(2));
    }

    getDatafromfileupload(e: any) {
        this.imagefile = e
    }


    //working2026
    saveEDUdetails() {

        const formdata = new FormData();

        let submit_itemsArray = this.Education_formGroup.get('items') as FormArray;
        // console.log(this.imagefile)
        // if (!this.imagefile) {
        //     this.globalmessage.Show_error('Please select the document');
        //     return;
        // }

        const educationPayload: any[] = [];

        for (let i = 0; i < submit_itemsArray.length; i++) {
            const rowGroup = submit_itemsArray.at(i) as FormGroup;
            const checkType = rowGroup.get('checkpercentagesgpa')?.value;
            let checkType_sgpa = Number(rowGroup.get('sgpa')?.value);
            let checkType_sgpa_percentage = Number(rowGroup.get('sgpa_percentage')?.value);

            let checkType_percentage = Number(rowGroup.get('percentage')?.value);




            let mandate = Number(rowGroup.get('mandatory')?.value);

            if(mandate == 1){
                if (checkType == "YES") {
                    if (checkType_sgpa > 0) {
                        if (checkType_sgpa > 10) {
                            rowGroup.get('sgpa')?.setValue(0)
                            this.globalmessage.Show_error('SGPA should be less than 10.')
                            return;
                        }
                        rowGroup.get('sgpa_percentage')?.setValue(checkType_sgpa)
                    } else {
                        this.globalmessage.Show_error('Enter sgpa ')
                        return;
                    }
                } else {
                    if (checkType_percentage > 0) {
                        rowGroup.get('sgpa_percentage')?.setValue(checkType_percentage)
                    } else {
                        rowGroup.get('sgpa_percentage')?.setValue(0)
                        this.globalmessage.Show_error('Enter percentage ')
                        return;
                    }
                }
            }

            rowGroup.addControl('uploadedfilename', new FormControl('', []))
            rowGroup.addControl('finyear', new FormControl('', []))


            rowGroup.get('finyear')?.setValue(this.oSession.finyear);


            // rowGroup.get('uploadedfilename')?.setValue(this.imagefile.name);





            // ✅ push row value into array
            educationPayload.push({
                ...rowGroup.getRawValue()
            });


        }

        console.log('formvalue', educationPayload)
        this.Education_formGroup.addControl('finyear', new FormControl(this.oSession.finyear));
        let formvalue = this.Education_formGroup.getRawValue()
        console.log(formvalue.items[0])

        this.saveEducationloader = true;

        console.log(this.Documentfiles)

        let input_payload_withleveltype = {
            // aadhaar: this.oSession.aadhaar,
            education_level: this.Educationselectform.controls['edulevel_select'].value,
            marksheet_type: this.Educationselectform.controls['marksheettype_select'].value,
            batchcode: this.res_singlebatch.batch_code,
            Education_data: educationPayload,
        }

        console.log(input_payload_withleveltype);

        formdata.append(
            'input_form',
            encryptUsingAES256(input_payload_withleveltype)
        );
        this.Documentfiles.forEach((item: any) => {
            console.log(item)

            if (item) {
                formdata.append('files', item);
            }
        });

        this.commonService
            .Post_formdata(Students_url.IU_StudentEducation_new, formdata)
            .subscribe((response) => {
                if (response?.data === true) {
                    this.globalmessage.Show_message('Education Details Saved.');
                    this.saveEducationloader = false;
                    this.Education_formGroup.disable();
                    this.imagefile = null;
                    // this.getPersonalInfo();

                    this.submitSuccess()

                }
            }, error => {
                this.saveEducationloader = false;
            });
    }

    onFileChange(event: any, index: number) {
        const file = event.target.files[0];

        if (file) {
            this.Documentfiles[index] = file;

            // ✅ THIS LINE FIXES YOUR ISSUE
            this.getItemForm(index).get('file')?.setValue(file);

            // optional but good
            this.getItemForm(index).get('file')?.markAsTouched();
            this.getItemForm(index).get('file')?.updateValueAndValidity();
        }
    }

    ProfileResource() {
        this.studentprofieservice
            .ProfileResource("")
            .subscribe((response) => {
                this.Ires_ProfileResources = response.data
                this.state = this.Ires_ProfileResources.state
                this.board = this.Ires_ProfileResources.college_university
            });
    }

    Dron_education_level(batchcode: number) {
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            // aadhaar: this.oSession.aadhaar,
            batchcode: batchcode,
            batchuuid: this.res_singlebatch.batchuuid
        }
        this.commonService.Post_json_data<string[]>(Common_url.education_level, jsonin).subscribe((response) => {
            this.res_droneducation = response.data
        })
    }

    Dron_exampattern(selected: string) {
        let jsonin = {
            selected
        }
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.commonService.Post_json_data<string[]>(Common_url.dron_exampattern, input_json).subscribe((response) => {
            this.res_exampattern = response.data
        })
    }

    Dron_marksheettype(selected: string) {
        let jsonin = {
            college_code: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            batch_code: this.res_singlebatch.batch_code,
            batchuuid: this.res_singlebatch.batchuuid,
            educationlevel: selected
        }
        console.log(jsonin)
        this.commonService.Post_json_data<string[]>(Common_url.marksheet_type, jsonin).subscribe((response) => {
            this.res_exampattern = response.data
        })
    }

    change_education(event: Event) {
        if (this.res_exampattern != null) {
            this.res_exampattern = []
            this.itemsArray.clear()
        }
        // let selectElement = event.target as HTMLSelectElement;
        // this.selected_res_droneducation = selectElement.value;
        // this.Dron_exampattern(this.selected_res_droneducation);
        this.Dron_marksheettype(this.selected_res_droneducation);
    }

    change_exampattern(event: Event) {
        // let selectElement = event.target as HTMLSelectElement;
        // this.selected_res_exampattern = selectElement.value;
        this.View_forms()
        // this.Dron_marksheetdetails()
    }

    addEducation(res: Ires_iuupdatededucationtype[]): void {
        this.itemsArray.clear();
        this.Documentfiles = [];

        res.forEach(item => {
            const group = this.createItem(item);

            const docType = group.get('document_type')?.value;

            // ✅ APPLY RULE HERE
            if (docType === 'SSC' || docType === 'HSC') {
                group.get('checkpercentagesgpa')?.setValue('NO');
                group.get('checkpercentagesgpa')?.disable(); // lock dropdown
            }

            // ✅ ALSO HANDLE IF VALUE CHANGES LATER (safety)
            group.get('document_type')?.valueChanges.subscribe((value) => {
                if (value === 'SSC' || value === 'HSC') {
                    group.get('checkpercentagesgpa')?.setValue('NO');
                    group.get('checkpercentagesgpa')?.disable();
                } else {
                    group.get('checkpercentagesgpa')?.enable();
                }
            });

            this.itemsArray.push(group);
            this.Documentfiles.push(null);
        });
    }


    Dron_marksheetdetails() {
        let jsonin = {
            lasteducation: this.selected_res_droneducation,
            exampattern: this.selected_res_exampattern,
            batch_code: this.oSession.maxbatchcode
        }
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.commonService.Post_json_data(Common_url.dron_marksheetdetails, input_json).subscribe((response) => {
            console.log(response);
            // let res = response
            //
            // this.addEducation(res)
        })
    }



    get isFormValid(): boolean {
        return this.itemsArray.controls.every(ctrl => {
            const mandatory = ctrl.get('mandatory')?.value;
            return mandatory === 0 || ctrl.valid;
        });
    }

    View_forms() {
        let jsonin = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            // aadhaar: this.oSession.aadhaar,
            education_level: this.selected_res_droneducation,
            marksheet_type: this.selected_res_exampattern,
            batchcode: this.res_singlebatch.batch_code,
            batchuuid: this.res_singlebatch.batchuuid,
        }
        console.log(jsonin)
        // let education_doctype: string[] = [];
        this.commonService
            .Post_json_data<Ires_iuupdatededucationtype[]>(
                Students_url.iu_updateeducationtype,
                jsonin
            )
            .subscribe(response => {
                if (response.data != null) {
                    this.addEducation(response.data);
                }
            });
    }


    submitSuccess() {
        // when your save / submit API is successful
        this.reloadApi_education.emit(true);
    }
}
