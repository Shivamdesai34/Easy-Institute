import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {
    ButtonDirective, CardBodyComponent,
    CardComponent,
    ColComponent,
    FormCheckComponent,
    FormCheckInputDirective, FormCheckLabelDirective, FormDirective, RowComponent, SpinnerComponent
} from "@coreui/angular-pro";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {encryptUsingAES256} from "../../../../globals/encryptdata";
import {Students_url} from "../../../../globals/global-api";
import {Sessiondata} from "../../../../models/Sessiondata";
import {CommonService} from "../../../../globals/common.service";
import {GlobalMessage} from "../../../../globals/global.message";
import {Router} from "@angular/router";
import {SessionService} from "../../../../globals/sessionstorage";

@Component({
    selector: "app-finalsubmit",
    templateUrl: "./finalsubmit.component.html",
    styleUrls: ["./finalsubmit.component.scss"],
    standalone: true,
    imports: [
        CardComponent,
        ButtonDirective,
        ColComponent,
        FormCheckComponent,
        FormCheckInputDirective,
        FormCheckLabelDirective,
        FormDirective,
        ReactiveFormsModule,
        RowComponent,
        SpinnerComponent,
        CardBodyComponent

    ]
})

export class FinalSubmitComponent implements OnInit {

    @Input() profilesubmitted: boolean = false

    @Output() reloadApi_finalsubmit = new EventEmitter<boolean>();

    finalsubmitForm!: FormGroup;

    oSession!: Sessiondata;
    res_finalsubmitprofile!: boolean;

    finalsubmitloader = false

    constructor(
        private formBuilder : FormBuilder,
        private commonService: CommonService,
        private globalmessage : GlobalMessage,
        private sessionservice: SessionService,
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();

        this.createForm();

        // console.log('mfinalsubmit')
    }

    // ngOnChanges(changes: SimpleChanges) {
    //     if (changes) {
    //         console.log('changes', changes);
    //     }
    // }

    createForm(){
        this.finalsubmitForm = this.formBuilder.group({
            checkOne: ['',Validators.requiredTrue],
            checktwo: ['', Validators.requiredTrue],
            checkthree: ['', Validators.requiredTrue],
        });
    }

    Final_ProfileSubmitted() {
        let jsonin = {
            Finyear: this.oSession.finyear,
            Collegecode: this.oSession.collegecode,
            // Aadhaar: this.oSession.aadhaar,
            BatchCode: this.oSession.register_batchcode,
            // batchuuid:
        };
        this.finalsubmitloader = true
        this.commonService.Post_json_data<boolean>(Students_url.ProfileSubmited, jsonin).subscribe((response) => {
            this.res_finalsubmitprofile = response.data
            if (this.res_finalsubmitprofile) {
                this.globalmessage.Show_successmessage("Data uploaded successfully.")
                this.submitSuccess()
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

    submitSuccess() {
        // when your save / submit API is successful
        this.reloadApi_finalsubmit.emit(true);
    }

}
