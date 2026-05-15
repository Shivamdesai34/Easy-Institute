import {Component, OnInit, Renderer2} from "@angular/core";
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent, ColComponent, FormFeedbackComponent, FormLabelDirective,
    FormSelectDirective,
    RowComponent, SpinnerComponent
} from "@coreui/angular-pro";
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {UsersService} from "../newformfees/users.service";
import {
    AdmissionQuotasubjectGroups, ApiResponse_data,
    Fees_Receiptmaster, Ires_Courseapplied, Ires_education, Ires_personaldata,
    Ires_Reciept, Ires_registerbatch, Ires_subjectlist, res_singlebatch,
    Student_Documents_Education, Subjects_group_h
} from "../../../models/response";
import {ImageTransform} from "ngx-image-cropper";
import {Sessiondata} from "../../../models/Sessiondata";
import {SessionService} from "../../../globals/sessionstorage";
import {CommonService} from "../../../globals/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormfeesService} from "../formfees/formfees.service";
import {GlobalMessage} from "../../../globals/global.message";
import {Sharedservice} from "../../../services/sharedservice";
import * as myGlobals from "../../../globals/global-variable";
import {Common_url, Students_url} from "../../../globals/global-api";
import {v4 as uuidv4} from "uuid";
import {BilldeskPay} from "../../../../assets/javascript/billdesk";
import {Ires_registrationbatchs} from "../../pages/register/register.requestmodel";
import {GapStudentservice} from "./gapstudentregistrationbatchchange.service";

@Component({
    selector: 'app-newformfees',
    imports: [
        CardBodyComponent,
        CardComponent,
        CardHeaderComponent,
        ReactiveFormsModule,
        RowComponent,
        FormSelectDirective,
        ButtonDirective,
        ColComponent,
        FormLabelDirective,
    ],
    providers: [UsersService],
    standalone: true,
    templateUrl: './gapstudentregistrationbatchchange.component.html',
    styleUrl: './gapstudentregistrationbatchchange.component.scss'
})
export class GapstudentregistrationbatchchangeComponent implements OnInit {

    GapRegistrationForm!: FormGroup;

    oSession!: Sessiondata;

    BatchNames: Ires_registerbatch[] = [];
    res_gapsubmit!: any

    constructor(
        private formBuilder: UntypedFormBuilder,
        private sessionservice: SessionService,
        private commonService: CommonService, private router: Router,
        private renderer: Renderer2,private globalmessage: GlobalMessage,
        private gapstudentservice: GapStudentservice
    ) {
    }


    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();
        console.log('mcxcx',this.oSession);

        this.CreateForm();

    }

    async CreateForm() {
        this.GapRegistrationForm = this.formBuilder.group({
            // batch_name: ['', Validators.required],
            coursetype: ['',Validators.required],
            batch_code: ['', Validators.required],
        })
    }

    Coursetypechange(){
        this.Show_registrationbatchs()
    }

    Show_registrationbatchs() {
        let jsoninbatch = {
            Boardlevel: this.GapRegistrationForm.controls['coursetype'].value,
        };

        // let jsonin = {
        //     Input: encryptUsingAES256(jsoninbatch)
        // };

        console.log('djvsk',jsoninbatch)
        this.gapstudentservice.registertionbatchs(jsoninbatch).subscribe((response) => {
            if (response == null) {
                return;
            }
            //this.RES_registration = response;
            this.BatchNames = response.data;
        });

    }


    Submit_Payment(){

      this.commonService.Post_json_data<boolean>(Students_url.update_registration,this.GapRegistrationForm.value).subscribe((response) => {

          if(response == null) {
              return;
          }

          let res_gapsubmit = response.data;

          if(res_gapsubmit){
              this.globalmessage.Show_successmessage('Data updated successfully.Please login again!');
              this.router.navigate(['login']);
          }
      })
    }

}
