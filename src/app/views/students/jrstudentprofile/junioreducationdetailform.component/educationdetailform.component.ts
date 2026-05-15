import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    RowComponent
} from "@coreui/angular-pro";
import {NgFor, NgIf} from "@angular/common";
import {z} from 'zod';
import {Ires_education, Res_ProfileResources} from "../../../../models/response";
import {CommonService} from "../../../../globals/common.service";
import {Students_url} from "../../../../globals/global-api";
import {FileuploadversiontwoComponent} from "../../fileuploadversiontwo/fileuploadversiontwo.component";
import {encryptUsingAES256} from "../../../../globals/encryptdata";
import {Sessiondata} from "../../../../models/Sessiondata";
import {SessionService} from "../../../../globals/sessionstorage";
import {GlobalMessage} from "../../../../globals/global.message";

@Component({
    selector: 'education-detail-form',
    imports: [
        CardBodyComponent,
        CardComponent,
        CardHeaderComponent,
        ReactiveFormsModule,
        ColComponent,
        NgIf, NgFor,
        RowComponent, FileuploadversiontwoComponent, FormCheckComponent, FormCheckInputDirective
    ],
    standalone: true,
    templateUrl: './educationdetailform.component.html',
    styleUrl: './educationdetailform.component.scss'
})
export class EducationdetailformComponent implements OnInit {
    @Input() inputFromParent: Ires_education[] = [];
    formgroup_edu!: FormGroup;
    // Zod Schema
    // schema = z.object({
    //     name: z.string().min(3, 'Name must be at least 3 characters long'),
    //     email: z.string().email('Invalid email address'),
    //     age: z
    //         .number({invalid_type_error: 'Age must be a number'})
    //         .min(18, 'You must be 18 or older'),
    //     totalMarks: z.number().min(1, 'Total marks must be at least 1'),
    //     actualMarks: z.number().min(0, 'Actual marks must be at least 0'),
    //     percentage: z.number().min(0, 'Percentage must be at least 0').max(100, 'Percentage must be at most 100')
    // });
    schema = z.object({
        // document_code: z.number({invalid_type_error: 'Age must be a number'}),
        batchstream: z.string().min(3, 'Stream muts'),
        document_type: z.string().min(3, 'Name must be at least 3 characters long'),
        board: z.string().min(3, 'board muts'),
        state: z.string().min(3, 'board muts'),
        education_board: z.string().min(3, 'Boards muts'),
        college_name: z.string().min(3, 'College name must be a string'),
        datepass: z.string().min(3, 'Date passed must be a string'),
        rollno: z.string().min(3, 'Rollno must be a string'),
        marksheetno: z.string().min(3, 'Marksheet must be a string'),
        checkpercentagesgpa: z.string().min(1, 'Checkpercentages must be a string'),
        // name: z.string().min(3, 'Name must be at least 3 characters long'),
        // email: z.string().email('Invalid email address'),
        // age: z
        //     .number({invalid_type_error: 'Age must be a number'})
        //     .min(18, 'You must be 18 or older'),

        //Shivam15042026
        // sgpa: z.number({invalid_type_error: 'Age must be a number'}),

        // totalMarks: z.number().min(1, 'Total marks must be at least 1'),
        outoff: z.number().min(1, 'Total marks must be at least 1'),
        marksobtained: z.number().min(0, 'Actual marks must be at least 0'),
        percentage: z.number().min(0, 'Percentage must be at least 0').max(100, 'Percentage must be at most 100'),
        sgpa_percentage: z.number().min(0, 'Actual marks must be at least 0'),
    });
    Ires_ProfileResources!: Res_ProfileResources
    imagefile: any
    save_edudetails!: boolean
    educationdeailssaved: boolean = false
    @Output() childEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
    oSession!: Sessiondata;
    edu_submit: boolean = true;

    constructor(private fb: FormBuilder, private globalmessage: GlobalMessage,
                private sessionservice: SessionService,
                private commonService: CommonService) {
    }

    ngOnInit(): void {
        //this.createEducationForm()
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();
        this.formgroup_edu = this.fb.group({
            education: this.fb.array([]),
            checkeducationsubmitted: [false, [Validators.required]]
        });
        this.CreateEducation_object()
        this.ProfileResources()
        this.Checked_sgpa()
    }

    get Checked_field() {
        return this.formgroup_edu.get('checkeducationsubmitted');
    }

    get education_field(): FormArray {
        return this.formgroup_edu.get('education') as FormArray;
    }

    createEducationForm(argument?: Ires_education): FormGroup {
        let sChecksgpa = ""
        if (argument?.document_type == 'SSC') {
            sChecksgpa = 'NO'
        } else {
            sChecksgpa = ""
        }
        return this.fb.group({
            document_code: [argument?.document_code, [Validators.required]],
            batchstream: [argument?.batchstream],
            document_type: [argument?.document_type, [Validators.required]],
            board: [argument?.board, [Validators.required]],
            state: [argument?.state, [Validators.required]],
            education_board: [argument?.education_board, [Validators.required]],
            college_name: [argument?.college_name, [Validators.required]],
            datepass: [argument?.datepass, [Validators.required]],
            rollno: [argument?.rollno, [Validators.required]],
            marksheetno: [argument?.marksheetno, [Validators.required]],
            checkpercentagesgpa: ['NO'],
            sgpa: [argument?.sgpa],
            marksobtained: [argument?.marksobtained],
            file: ['', [Validators.required]],
            // totalMarks: [0,],
            outoff: [argument?.outoff],
            percentage: [argument?.percentage, [Validators.required, Validators.min(1)]],
            aadhaar: [this.oSession.aadhaar],
            college_code: [this.oSession.collegecode],
            finyear: [this.oSession.finyear],
            sgpa_percentage: [argument?.sgpa_percentage],
        });
    }

    Checked_sgpa() {
        console.log('jsss', this.education_field.controls)
        // if(this.formgroup_edu.value.education[0].document_type == "SSC"){
        //
        // }
    }

    CreateEducation_object(): void {
        for (const argument of this.inputFromParent) {
            let educationForm = this.createEducationForm(argument);
            console.log(educationForm);
            this.education_field.push(educationForm);
        }
        this.Updatecolor()
    }

    Updatecolor(): void {
        console.log(this.education_field.controls)
        this.education_field.controls.forEach(element => {
            if (element.get('mycolor')?.value === "success") {
                element.get('mycolor')?.setValue('danger')
            } else {
                element.get('mycolor')?.setValue('success')
            }
        });
    }

    ProfileResources() {
        this.commonService.Post_json_data<Res_ProfileResources>(Students_url.ProfileResources, "").subscribe((response) => {
            this.Ires_ProfileResources = response.data
        })
    }

    addStudentForm(form: any): void {
        console.log('vvxzcx', this.education_field.controls.every(group => group.value))
        console.log('singvalue', this.fb)
        //this.students.push(this.createEducationForm());
    }

    onFileChange(event: any, index: number) {
        const file = event.target.files[0];
        if (file) {
            this.education_field.at(index).patchValue({
                file,
                fileName: file.name,
            });
        }
    }

    updatePercentage(index: number): void {
        const student = this.education_field.at(index);
        // const total = +student.get('totalMarks')?.value || 0;
        const outoff = +student.get('outoff')?.value || 0;
        const actual = +student.get('marksobtained')?.value || 0;
        let percentage = 0;
        if (outoff > 0) {
            percentage = (actual / outoff) * 100;
        }
        if (isNaN(percentage) || percentage > 100) {
            percentage = 0;
            // student.get('totalMarks')?.setValue(0);
            student.get('outoff')?.setValue(0);
            student.get('marksobtained')?.setValue(0);
        }
        const percentDisplay = percentage.toFixed(2);
        student.get('percentage')?.setValue(parseFloat(percentDisplay), {emitEvent: false});
        const all_control = this.education_field.at(index);
        all_control.get('sgpa_percentage')?.setValue(parseFloat(all_control.get('percentage')?.value), {emitEvent: false});
    }

    async submitAll() {
        try {
            let loop_break: boolean = false;
            let edu_form = this.formgroup_edu.value
            for (const single_form of edu_form.education) {
                this.childEmitter.emit(this.edu_submit)
                console.log('jss', single_form)
                let formdata = new FormData();
                formdata.append('input_form', encryptUsingAES256(single_form))
                formdata.append('file', this.imagefile)
                console.log('immgg', single_form)



                this.commonService.Post_formdata(Students_url.IU_StudentEducation, formdata).subscribe((response) => {
                    this.save_edudetails = response.data
                    if (this.save_edudetails) {
                        // this.educationdeailssaved = this.save_edudetails
                        // this.childEmitter.emit(this.educationdeailssaved)
                        //Educationsubmit
                        this.Educationsubmit()
                    }
                    console.log('sdata', this.save_edudetails)
                    // this.Ires_ProfileResources = response.data;
                })
                // await firstValueFrom(this.http.post('/api/student/education', single_form));
            }
        } catch (err) {
            console.error('Upload failed for:', err);
        }
    }

    Educationsubmit() {
        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            aadhaar: this.oSession.aadhaar,
            educationsubmited: this.formgroup_edu.controls['checkeducationsubmitted'].value
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.commonService
            .Post_json_data<boolean>(Students_url.IU_educationsubmited, input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('No data found')
                    return
                }
                if (response.data) {
                    this.globalmessage.Show_successmessage('Education details saved successfully.');
                    this.childEmitter.emit(response.data)
                }else{
                    return
                }
            })
    }

    allFormsValid(): boolean {
        let allform: boolean = false
        allform = this.education_field.controls.every(group => group.valid);
        if (allform && this.Checked_field?.value) {
            return true
        }
        return false
    }

    getDatafromfileupload(e: any) {
        this.imagefile = e
        console.log('mbncccc', this.imagefile)
    }

    update_percentage(index: number) {
        const all_control = this.education_field.at(index);
        all_control.get('sgpa_percentage')?.setValue(parseFloat(all_control.get('percentage')?.value), {emitEvent: false});
    }
}
