import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {GlobalMessage} from '../../../globals/global.message';
import {SessionService} from "../../../globals/sessionstorage";
import {Sessiondata} from "../../../models/Sessiondata";
import {CommonService} from "../../../globals/common.service";
import {abcd_details, Students_url} from "../../../globals/global-api";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {
  ButtonDirective, CardBodyComponent,
  CardComponent,
  ColComponent,
  FormControlDirective, FormDirective, FormLabelDirective,
  FormSelectDirective,
  RowComponent
} from "@coreui/angular-pro";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import { NgClass } from "@angular/common";
import {Student_abcdid} from "../../../models/response";
import {AbcdFormService} from "./abcd-form.service";
import {aadhaarValidator, abcdidValidator, mobileValidator} from "../../../globals/aadhaar_validator";

@Component({
  templateUrl: './abcid-form.component.html',
  styleUrls: ['./abcid-form.component.scss'],
  imports: [
    CardComponent,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    AutocompleteLibModule,
    FormControlDirective,
    ButtonDirective,
    FormSelectDirective,
    FormDirective,
    FormLabelDirective,
    CardBodyComponent
  ],
  standalone: true
})
export class AbcidFormComponent implements OnInit {

  data: any;
  Abcid_aadhaar_name: any;
  ABCDForm!: FormGroup;
  private mobileabcd: string = '';
  abcdlist = {} as Student_abcdid;

  submitted = false;
  BatchCode = parseInt(sessionStorage.getItem('BatchCode')!);
  res: any;
  imgFile!: Array<File>;
  oSession!: Sessiondata;



  constructor(private router: Router, private sessionservice: SessionService,
              private commonService: CommonService,
              private abcdformservice: AbcdFormService,
              private globalmessage: GlobalMessage,
              private formBuilder: UntypedFormBuilder) {
  }

  // @ViewChild('ngx_aadhaar', {static: false}) ng_ref_aadhaar: any;
  // @ViewChild('ngx_mobile', {static: false}) ng_ref_mobile: any;
  // @ViewChild('ngx_abcid', {static: false}) ng_ref_abcid: any;



  ngOnInit() {

      // console.log('abc222');

    this.oSession = new Sessiondata(this.sessionservice)
    this.oSession.Getdatafromstroage();

    // if (!this.AadharSession) {
    //   this.openYesNoDialog('Please Login!');
    //   // alert("Please Login!")
    //   this.router.navigate(['login']);
    // } else {

  //  this.auth_abcd_detail()

    // if(this.abcdlist == )
    this.ABCDForm = this.formBuilder.group({
      aadhaar: ['', [aadhaarValidator]
      ],
     // abcid: ['', Validators.required],
     // upload: ['', Validators.required],
      mobileabcd: ['',[mobileValidator]],
      nameabcd: ['', Validators.required],
      fromdate: ['', Validators.required],
      genderabcd: ['', Validators.required],



      //rollnoabcd: ['', Validators.required],
      //idabcd: ['', [abcdidValidator]]
    });

      this.getstudent();
  }

  // get f() {
  //   return this.ABCDForm.controls;
  // }

  // get aadhaar() {
  //     return this.ABCDForm.get('aadhaar');
  // }
  openYesNoDialog(msg: any) {
    this.globalmessage.Show_message('Delete');
  }

  //Upload File
  png_jpeg_Upload(element: any) {
    this.imgFile = element.target.files;
    if (this.imgFile[0].type == 'image/png' || this.imgFile[0].type == 'image/jpeg') {
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Only jpeg or png file allowed!',
        icon: 'error',
        confirmButtonText: 'OK'
      });//alert
      // this.resetAll();
    }
  }

  get mobile_fld() {
    return this.ABCDForm.get('mobileabcd');
  }

  get aadhaar_fld() {
    return this.ABCDForm.get('aadhaarabcd');
  }

  // get mobile_fld() {
  //     return this.ABCDForm.get('mobileabcd');
  // }


  // mobilenochange($event: string) {
  //   this.mobileabcd = $event;
  //   console.log('mobb',this.mobileabcd)
  // }

  config = {
    allowNumbersOnly: true,
    length: 12,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '30px',
      height: '30px',
    },
    containerStyles: {
      'display': 'flex',
      'padding': '0px 0px 0px 0px',
    },
    inputClass: 'each_input',
    containerClass: 'all_inputs'
  };
  configmobile = {
    allowNumbersOnly: true,
    length: 10,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '30px',
      height: '30px',
    },
    containerStyles: {
      'display': 'flex',
      'padding': '0px 0px 0px 0px',
    },
    inputClass: 'each_input',
    containerClass: 'all_inputs'
  };
  configabcid = {
    allowNumbersOnly: true,
    length: 12,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '30px',
      height: '30px',
    },
    containerStyles: {
      'display': 'flex',
      'padding': '0px 0px 0px 0px',
    },
    inputClass: 'each_input',
    containerClass: 'all_inputs'
  };

  getstudent() {
    let jsonin = {
      'Aadhaar': this.oSession.aadhaar,
      'Collegecode': this.oSession.collegecode,
      'Finyear': this.oSession.finyear,
    };
    let input_json = {
      Input: encryptUsingAES256(jsonin),
    };
    this.commonService.Post_json_normal<Student_abcdid>(Students_url.studentabcdid_get, input_json).subscribe((response) => {
      if (response == null) {
        this.globalmessage.Show_error('No data found');
      }
      this.abcdlist = response;

      this.get_abcdapproval(this.abcdlist.abcdid)
      if (this.abcdlist.approved_status == 'APPROVED') {
        this.globalmessage.Show_message('Your data is approved.You cannot modify the data.');
        this.router.navigate(['/dashboard']);
        return;
      }
      if (this.abcdlist.approved_status == 'NONE') {
        this.globalmessage.Show_message('sorry you cannot modify data since you have already submitted the ABC ID');
        this.router.navigate(['/dashboard']);
        return;
      }
      // this.ABCDForm.controls['nameabcd'].setValue(this.abcdlist.Aadhaarname);
      // this.ABCDForm.controls['fromdate'].setValue(this.abcdlist.Dob);
      // this.ABCDForm.controls['genderabcd'].setValue(this.abcdlist.Gender);
      // this.ng_ref_aadhaar.setValue(this.abcdlist.Studentaadhaar);
      // this.ng_ref_mobile.setValue(this.abcdlist.Mobileno);
      // this.ABCDForm.controls['rollnoabcd'].setValue(this.abcdlist.Rollno);
      // this.ng_ref_abcid.setValue(this.abcdlist.Abcdid);
      //this.ABCDForm.controls['idabcd'].setValue(parseInt(this.abcdlist.Abcdid))
    });
  }

  onSubmit() {


    if (this.ABCDForm.controls['nameabcd'].value == "") {
      this.globalmessage.Show_message('Enter Name');
      return;
    }
    if (this.ABCDForm.controls['fromdate'].value == "") {
      this.globalmessage.Show_message('Enter date of birth');
      return;
    }
    if (this.ABCDForm.controls['genderabcd'].value == "") {
      this.globalmessage.Show_message('Select Gender');
      return;
    }

    // if (this.imgFile == null) {
    //   this.globalmessage.Show_message('Select File ');
    //   return;
    // }
    let jsonin = {
      //Collegecode: this.oSession.collegecode,
      //Finyear: this.oSession.finyear,
      //Loginaadhaar: this.oSession.aadhaar,
      aadhaar_name: this.ABCDForm.controls['nameabcd'].value,
      dob: this.ABCDForm.controls['fromdate'].value,
      gender: this.ABCDForm.controls['genderabcd'].value,
      aadhaar_number: this.oSession.aadhaar,
      mobile: parseInt(this.ABCDForm.controls['mobileabcd'].value),
      Rollno: 99,
      //formData.append('Rollno', this.ABCDForm.controls['rollnoabcd'].value);
     // Abcdid: parseInt(this.ABCDForm.controls['idabcd'].value)
    }
    let formdata = new FormData();
    formdata.append('input_form', encryptUsingAES256(jsonin))
    // formdata.append('file', this.imgFile[0])
    formdata.append('file', '')

    // let formData = new FormData();
    // formData.append('Collegecode', '1');
    // formData.append('Finyear', sessionStorage.getItem('Finyear')!);
    // formData.append('Loginaadhaar', sessionStorage.getItem('Aadhaar')!);
    // formData.append('Aadhaarname', this.ABCDForm.controls['nameabcd'].value);
    // formData.append('Dob', this.ABCDForm.controls['fromdate'].value);
    // formData.append('Gender', this.ABCDForm.controls['genderabcd'].value);
    // formData.append('Studentaadhaar', this.aadhaar);
    // formData.append('Mobileno', this.mobileabcd);
    // formData.append('Rollno', '99');
    // //formData.append('Rollno', this.ABCDForm.controls['rollnoabcd'].value);
    // formData.append('Abcdid', this.idabcd);
    // //formData.append("Abcdid", this.ABCDForm.controls['idabcd'].value);
    // formData.append('Files', this.imgFile[0]);
    this.commonService.Post_json_normal(abcd_details.createabcidbyaadhaar, jsonin).subscribe((response) => {
      if (response == null) {
        this.globalmessage.Show_error('No data found');
        return
      }

      // console.log('rs',response)
      this.globalmessage.Show_message(`${this.Abcid_aadhaar_name} you have successfully submitted the ABC ID details on college Portal.
             Please keep checking your mail or mobile for status whether it is approved or rejected.`);
     // this.router.navigate(['/dashboard']);
      //this.getstudent();
    });
  }

  auth_abcd_detail(){

    let jsonin = {
      customer_id: 'in.edu.rjcollege',
      customer_secret_key: 'Y8ZMHIzsipPgD1keLda7TFKvCouxjh9c',
    }
    this.abcdformservice.auth_abcd(jsonin)
  }

  get_abcdapproval(abcid: string){


      // console.log('jss')

    let jsonin ={
      abc_account_id: '249578549093'
    }


    this.commonService.Post_json_normal(abcd_details.abcaccountsbasicdetails, jsonin).subscribe((response) => {
      // console.log('rsppp',response)
    })

  }

  // abcdlist!: IAbcd_list[];
}
