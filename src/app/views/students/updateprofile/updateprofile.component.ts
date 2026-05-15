//https://www.positronx.io/angular-show-image-preview-with-reactive-forms-tutorial/
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalMessage} from '../../../globals/global.message';
import {UpdateprofileService} from './updateprofile.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageCroppedEvent, ImageCropperComponent, ImageTransform, LoadedImage} from 'ngx-image-cropper';
import {Global_CurrentFinYear} from '../../../globals/global-variable';
import {GlobalDownloadfiles} from '../../../globals/download_global';
import {CompressImageService} from '../../../globals/global_compressimage';
import {CommonService} from "../../../globals/common.service";
import {Common_url, Students_url} from "../../../globals/global-api";
import {Sessiondata} from "../../../models/Sessiondata";
import {SessionService} from "../../../globals/sessionstorage";
import {encryptUsingAES256} from '../../../globals/encryptdata';
import {Ires_personaldata, Res_ProfileResources} from '../../../models/response';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardTextDirective,
    CardTitleDirective,
    ColComponent,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    RowComponent,
    SharedModule,
    SmartTableModule,
    SpinnerComponent,
    TabDirective,
    TabPanelComponent,
    TabsComponent,
    TabsContentComponent,
    TabsListComponent
} from "@coreui/angular-pro";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-updateprofile',
    templateUrl: './updateprofile.component.html',
    styleUrls: ['./updateprofile.component.scss'],
    imports: [
        CardComponent,
        CardBodyComponent,
        ReactiveFormsModule,
        RowComponent,
        ColComponent,
        SpinnerComponent,
        ImageCropperComponent,
        NgClass,
        SmartTableModule,
        SharedModule,
        CardTitleDirective,
        CardTextDirective,
        FormLabelDirective,
        FormControlDirective,
        ButtonDirective,
        FormSelectDirective,
        FormDirective,
        TabDirective,
        TabPanelComponent,
        TabsComponent,
        TabsContentComponent,
        TabsListComponent
    ],
    standalone: true
})
export class UpdateprofileComponent implements OnInit {
    imageChangedEvent: any = '';
    croppedImage: any = '';
    private cropped_blob: any;
    public cropped_base64: any;
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    submitted = false;
    transform: ImageTransform = {};
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
    board: any;
    visibleEmail: boolean = false;
    visibleMobile: boolean = false;
    public imageURL!: string;
    public imageDestination!: string;
    private emailotp: string = '';
    private mobileotp: string = '';
    private mobileno: string = '';
    private whatsapp: string = '';
    public Emailform: FormGroup;
    public Mobileform: FormGroup;
    public Profilepictform: FormGroup;
    public addressDetailsForm!: FormGroup;
    private pngfilename: string = '';
    private Imagefile!: File;
    private Uploadfile!: File;
    public pictureloader: boolean = false;
    IU_parentdetails: boolean = true;
    addressloader = false;
    activePane = 0;
    Ires_ProfileResources!: Res_ProfileResources;
    get_personaldetail!: Ires_personaldata;
    oSession!: Sessiondata;
    @ViewChild('ngx_mobile', {static: false}) ng_ref_mobile: any;
    @ViewChild('ngx_whatsapp', {static: false}) ng_ref_whatsapp: any;
    @ViewChild('ngx_mobile_otp', {static: false}) ng_ref_mobileotp: any;
    @ViewChild('ngx_email_otp', {static: false}) ng_ref_emailotp: any;
    config = {
        x: true,
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
    picturedisable: string = 'false';
    mobiledisable: string = 'false';
    emaildisable: string = 'false';
    addressdisable: string = 'false';

    constructor(
        private router: Router, private commonService: CommonService,
        private formBuilder: FormBuilder, private sessionservice: SessionService,
        private globalmessage: GlobalMessage,
        private updateprofileservice: UpdateprofileService,
        private sanitizer: DomSanitizer,
        private globaldownloadfiles: GlobalDownloadfiles,
        private compressimageservice: CompressImageService
    ) {
        this.Emailform = this.formBuilder.group({
            emailid: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            emailotp: ['', Validators.required],
        });
        this.Mobileform = this.formBuilder.group({
            mobile: ['', [Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(10), Validators.maxLength(10)]],
            whatsapp: ['', [Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(10), Validators.maxLength(10)]],
            mobileotp: ['', [Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(6), Validators.maxLength(6)]],
        });
        this.Profilepictform = this.formBuilder.group({
            picture: ['', Validators.required],
            croped: ['', Validators.required],
        });
        this.addressDetailsForm = this.formBuilder.group({
            correpondence_flatno: ['', Validators.required],
            correpondence_colonyname: [
                '',
                [Validators.required, Validators.maxLength(60)],
            ],
            correpondence_villagename: ['', Validators.maxLength(60)],
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
            permanent_villagename: ['', Validators.maxLength(60)],
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
    }

    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();
        if (this.oSession.formfeesrecieved == 'NOTPAID' || this.oSession.formfeesrecieved == '') {
            if (this.oSession.registerfinyear == Global_CurrentFinYear) {
                this.router.navigate(['dashboard']);
            }
        }
        // if(ValidateFormfeesnotpaidProfilenotsubmitted(this.oSession.isprofilesubmited!,this.oSession.formfeesrecieved!)){
        //   this.router.navigate(['dashboard']);
        // }
        // if (this.oSession.registerfinyear !== myGlobals.Global_CurrentFinYear) {
        //   this.globalmessage.Show_error('No data found')
        //   this.router.navigate(['/dashboard'])
        //   return
        // }
        this.ProfileResource();
        this.UpdateResource()
    }

    Createform() {
    }

    get frmEmail() {
        return this.Emailform.controls;
    }

    get email_fld() {
        return this.Emailform.get('emailid');
    }

    get emailotp_fld() {
        return this.Emailform.get('emailotp');
    }

    get frmMobile() {
        return this.Mobileform.controls;
    }

    get mobile_fld() {
        return this.Mobileform.get('mobile');
    }

    get whatsapp_fld() {
        return this.Mobileform.get('whatsapp');
    }

    get mobileotp_fld() {
        return this.Mobileform.get('mobileotp');
    }

    get frmProfile() {
        return this.Profilepictform.controls;
    }

    get picture_fld() {
        return this.Profilepictform.get('picture');
    }

    get adf() {
        return this.addressDetailsForm.controls;
    }

    OnSubmit_uploadpicture_compress() {
        //this.Uploadfile = this.blobToFile(this.cropped_blob, this.pngfilename);
        //this.globalmessage.Show_message(this.Uploadfile.name);
        // if (this.Uploadfile.name == '') {
        //     this.globalmessage.Show_message('Image not cropped');
        //     return;
        // }
        //ShiVam
        // this.compressimageservice
        //     .compress(this.Uploadfile)
        //     .pipe(take(1))
        //     .subscribe((compressedImage: any) => {
        //         let compressfile = compressedImage;
        //
        //         let formData = new FormData();
        //         formData.append('collegecode', '1');
        //         formData.append('finyear', this.FinyearSession.toString());
        //         formData.append('aadhaar', this.AadharSession.toString());
        //         formData.append('picture', compressfile);
        //
        //         this.pictureloader = true;
        //         this.updateprofileservice
        //             .studentpictureupload(formData)
        //             .subscribe((response) => {
        //                 this.pictureloader = false;
        //                 if (response == null) {
        //                     return;
        //                 }
        //                 if (response.data == true) {
        //                     this.globalmessage.Show_message('File Uploaded Successfully!');
        //                 } else {
        //                     this.globalmessage.Show_message('Failed to Upload!');
        //                 }
        //                 this.Profilepictform.reset();
        //             });
        //     });
    }

    OnSubmit_uploadpicture() {
        //this.Uploadfile = this.blobToFile(this.cropped_blob, this.pngfilename);
        //this.globalmessage.Show_message(this.Uploadfile.name);
        if (this.Uploadfile.name == '') {
            this.globalmessage.Show_message('Image not cropped');
            return;
        }
        /*
        if (this.Uploadfile.size <= 0) {
          this.globalmessage.Show_message('Image not cropped');
          return;
        }
        */
        let formData = new FormData();
        let jsonin = {
            'collegecode': this.oSession.collegecode,
            'finyear': this.oSession.finyear,
            // 'aadhaar': this.oSession.aadhaar
        };
        formData.append('input_form', encryptUsingAES256(jsonin));
        formData.append('file', this.Uploadfile);
        this.pictureloader = true;
        this.commonService.Post_formdata(Common_url.studentpictureupload, formData)
            .subscribe((response) => {
                this.pictureloader = false;
                if (response == null) {
                    return;
                }
                if (response.data == true) {
                    this.globalmessage.Show_message('File Uploaded Successfully!');
                } else {
                    this.globalmessage.Show_message('Failed to Upload!');
                }
                this.Profilepictform.reset();
            });
    }

    rotateLeft() {
    }

    showPreview(event: any) {
        this.pngfilename = (this.oSession.aadhaar! + Math.random()).toString();
        this.imageChangedEvent = event;
        const file = (event.target as HTMLInputElement).files![0];
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
        this.Profilepictform.patchValue({picture: file,});
        this.Profilepictform.get('picture')!.updateValueAndValidity();
        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.imageURL = reader.result as string;
            this.croppedImage = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    //ShivAm Image Cropper
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
        const filebeforecorp = this.imageChangedEvent.target.files[0];
        this.Uploadfile = new File([event.blob!], filebeforecorp.name, {
            type: 'PNG',
        });
    }

    imageLoaded(image: LoadedImage) {
        // show cropper
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        this.globalmessage.Show_message('Issue while loading image.');
        // show message
    }

    emailOtpChange(event: any) {
        this.emailotp = event;
    }

    mobileOtpChange(event: any) {
        this.mobileotp = event;
    }

    toggleCollapse(): void {
        this.visibleEmail = !this.visibleEmail;
    }

    emailtoggleCollapse(): void {
        //this.globalmessage.Show_message(this.email_fld.value);
        if (this.email_fld!.invalid) {
            this.globalmessage.Show_message('Enter email id');
            return;
        }
        if (this.email_fld!.value.length <= 0) {
            this.globalmessage.Show_message('Enter email id');
            return;
        }
        let jsonin = {
            // aadhaar: this.oSession.aadhaar,
            Email: this.email_fld!.value,
        };
        this.visibleEmail = false;
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.updateprofileservice.sendotpemailv2(input_json).subscribe((response) => {
            if (response == null) {
                this.visibleEmail = false;
                return;
            }
            if (response.data == true) {
                this.email_fld!.disable();
                this.visibleEmail = true;
                this.globalmessage.Show_message('OTP sent on new email id');
            }
        });
        //this.visibleEmail = !this.visibleEmail;
    }

    mobiletoggleCollapse(): void {
        //if (otp.length === 6) {
        if (this.mobileno.length < 10) {
            this.globalmessage.Show_message('Enter 10 digit number mobile number ');
            return;
        }
        if (this.whatsapp.length < 10) {
            this.globalmessage.Show_message('Enter 10 digit number whatsapp number');
            return;
        }
        if (this.mobileno == '') {
            this.globalmessage.Show_message('Enter Mobile no');
            return;
        }
        if (this.whatsapp == '') {
            this.globalmessage.Show_message('Enter Whatsapp no');
            return;
        }
        let jsonin = {
            // aadhaar: this.oSession.aadhaar,
            mobile: parseInt(this.mobileno),
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        // console.log('jsonin', jsonin)
        this.visibleMobile = false;
        this.updateprofileservice.sendotpsmsv2(input_json).subscribe((response) => {
            if (response == null) {
                this.visibleMobile = false;
                return;
            }
            if (response.data == true) {
                this.Mobileform.get('mobile')?.disable();
                this.Mobileform.get('whatsapp')?.disable();
                this.visibleMobile = true;
                this.globalmessage.Show_message('Otp sent on new number');
            }
        });
        //this.visibleMobile = !this.visibleMobile;
    }

    verifymobileotp() {
        if (this.mobileotp == '') {
            this.globalmessage.Show_message('Enter mobile otp');
            return;
        }
        let jsonin = {
            // aadhaar: this.oSession.aadhaar,
            mobile: parseInt(this.mobileno),
            whatsapp: parseInt(this.whatsapp),
            otp: parseInt(this.mobileotp),
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.updateprofileservice.verifymobileotpv2(input_json).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response.data == true) {
                this.globalmessage.Show_message('Mobile Number updated');
                this.resetmobilescreen();
            }
        });
    }

    resetmobilescreen() {
        this.Mobileform.reset();
        this.visibleMobile = false;
        this.ng_ref_mobileotp.setValue('');
        this.ng_ref_mobile.setValue('');
        this.ng_ref_whatsapp.setValue('');
        this.mobileno = '';
        this.whatsapp = '';
        this.ng_ref_mobile.otpForm.enable();
        this.ng_ref_whatsapp.otpForm.enable();
    }

    resetemailform() {
        this.visibleEmail = false;
        this.email_fld!.enable();
        this.email_fld!.setValue('');
        this.ng_ref_emailotp.setValue('');
        this.Emailform.reset();
    }

    Verifyemailotp() {
        if (this.emailotp == '') {
            this.globalmessage.Show_message('Enter email otp');
            return;
        }
        let jsonin = {
            // aadhaar: this.oSession.aadhaar,
            email: this.email_fld!.value,
            otp: parseInt(this.Emailform.controls['emailotp'].value),
        };
        this.commonService.Post_json_data(Common_url.verifyemailotpv2, jsonin).subscribe(
            (response) => {
                if (response == null) {
                    return;
                }
                if (response.data == true) {
                    this.globalmessage.Show_message('Email updated');
                    this.resetemailform();
                }
            },
            // (error) => {
            //
            //     console.log('err',error)
            //   this.globalmessage.Show_message(error.exception.toString());
            // }
        );
    }

    // mobilenochange($event: string) {
    //     this.mobileno = $event;
    // }
    //
    // whatsappChange($event: string) {
    //     this.whatsapp = $event;
    // }

    mobilenochange() {
        const value = this.Mobileform.get('mobile')?.value || '';

        const mobilenumber = value.replace(/[^0-9]/g, '');

        this.mobileno = mobilenumber;
        this.Mobileform.get('mobile')?.setValue(mobilenumber, {emitEvent: false});
    }

    whatsappChange() {
        const value = this.Mobileform.get('whatsapp')?.value || '';

        const whatsappnumber = value.replace(/[^0-9]/g, '');

        this.whatsapp = whatsappnumber;
        this.Mobileform.get('whatsapp')?.setValue(whatsappnumber, {emitEvent: false});
    }


    Download_previewfile() {
        if (this.cropped_blob == '') {
            return;
        }
        this.globaldownloadfiles.Downloadfromblob(
            this.cropped_blob,
            this.pngfilename
        );
    }

    Compress_file(event: any) {
        this.Uploadfile = (event.target as HTMLInputElement).files![0];
        if (this.Uploadfile.name != this.pngfilename + '.PNG') {
            this.globalmessage.Show_message(
                'Downloaded file not matching with preview file'
            );
            return;
        }
    }

    mybase64ToFile(data: any, filename: any) {
        const arr = data.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

    ProfileResource() {
        this.updateprofileservice
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
                this.category = this.Ires_ProfileResources.category
                this.specially_abled = this.Ires_ProfileResources.specially_abled
                this.activity = this.Ires_ProfileResources.activity
                this.participation_level = this.Ires_ProfileResources.participation_level
                this.secured_rank = this.Ires_ProfileResources.secured_rank
                this.board = this.Ires_ProfileResources.college_university
            });
    }

    getPersonalInfo() {
        let nBatchcode = 0
        if (this.oSession.currentformfeesbatchcode! <= 0) {
            nBatchcode = this.oSession.maxbatchcode!
        } else {
            nBatchcode = this.oSession.currentformfeesbatchcode!
        }
        let jsonin = {
            College_code: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            // Aadhaar: this.oSession.aadhaar,
            batch_code: nBatchcode
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.updateprofileservice
            .get_personalinfo(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('No data found');
                    return
                }
                this.get_personaldetail = response.data
                this.addressDetailsForm.patchValue(this.get_personaldetail.address);
            });
    }

    IU_Address() {
        this.addressDetailsForm.addControl('finyear', new FormControl('', []));
        this.addressDetailsForm.controls['finyear'].setValue(this.oSession.finyear);
        this.addressDetailsForm.addControl('college_code', new FormControl('', []));
        this.addressDetailsForm.controls['college_code'].setValue(
            this.oSession.collegecode
        );
        // this.addressDetailsForm.addControl('aadhaar', new FormControl('', []));
        // this.addressDetailsForm.controls['aadhaar'].setValue(this.oSession.aadhaar);
        this.addressloader = true
        let input_json = {
            Input: encryptUsingAES256(this.addressDetailsForm.value),
        };
        this.updateprofileservice
            .IU_Address_only(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your details');
                }
                this.IU_parentdetails = response;
                this.globalmessage.Show_successmessage('Data uploaded successfully');
                this.addressloader = false
                // this.getPersonalInfo()
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
            this.addressDetailsForm.controls['permanent_taluka'].setValue('')
            this.addressDetailsForm.controls['permanent_city'].setValue('')
        }
    }

    outsidechange($event: number) {
        this.activePane = $event;
        if ($event == 3) {
            this.getPersonalInfo()
        }
    }

    //ShivAm Cropper
    // zoomOut() {
    //     this.scale -= 0.1;
    //     this.transform = {
    //         ...this.transform,
    //         scale: this.scale,
    //     };
    // }
    //
    // zoomIn() {
    //     this.scale += 0.1;
    //     this.transform = {
    //         ...this.transform,
    //         scale: this.scale,
    //     };
    // }
    protected readonly event = event;

    UpdateResource() {
        this.commonService
            .Post_json_update_data(Students_url.Updatedata_resource, "")
            .subscribe((response) => {
                if (response == null) {
                    return
                }
                let updatedata = response.update_data
                this.mobiledisable = updatedata[0]["mobile"] == 'close' ? 'true' : 'false';
                this.emaildisable = updatedata[1]["email"] == 'close' ? 'true' : 'false';
                this.picturedisable = updatedata[2]["picture"] == 'close' ? 'true' : 'false';
                this.addressdisable = updatedata[3]["profile"] == 'close' ? 'true' : 'false';
                // for (const updatedatum of updatedata) {
                //
                //     if (updatedatum.email == "open") {
                //         this.emaildisable = true;
                //     }
                //
                //     if (updatedatum.mobile == "open") {
                //         this.mobiledisable = true;
                //     }
                //
                //     if (updatedatum.profile == "open") {
                //         this.addressdisable = true;
                //     }
                //
                //     if (updatedatum.picture == "open") {
                //         this.picturedisable = true;
                //     }
                //
                // }
                // if ( updatedata[0].mobile== "open") {
                //     this.mobiledisable = "true";
                // }
                // if (updatedata[0].mobile == "open") {
                //     this.mobiledisable = "true";
                // }
                // if (updatedata.update_data.profile == "open") {
                //     this.addressdisable = "true";
                // }
                // if (updatedata.update_data.picture == "open") {
                //     this.picturedisable = "true";
                // }
            });
    }
}
