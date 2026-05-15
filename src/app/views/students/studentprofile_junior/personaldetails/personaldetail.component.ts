import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {
    AccordionButtonDirective, AccordionComponent, AccordionItemComponent, BadgeComponent, ButtonDirective,
    CalloutComponent,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent, CardTextDirective, CardTitleDirective,
    ColComponent, FormCheckComponent, FormCheckInputDirective,
    FormCheckLabelDirective, FormControlDirective, FormDirective, FormLabelDirective,
    FormSelectDirective,
    RowComponent, SpinnerComponent, TabContentComponent, TabPaneComponent, TemplateIdDirective
} from "@coreui/angular-pro";
import {ImageCroppedEvent, ImageCropperComponent, ImageTransform, LoadedImage} from "ngx-image-cropper";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    Ires_parents,
    Ires_personaldata,
    Ires_personalinfo,
    Parents,
    Res_ProfileResources
} from "../../../../models/response";
import {Sessiondata} from "../../../../models/Sessiondata";
import {encryptUsingAES256} from "../../../../globals/encryptdata";
import {GlobalMessage} from "../../../../globals/global.message";
import {StudentprofileService} from "../../studentprofile/studentprofile.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Students_url} from "../../../../globals/global-api";
import {CommonService} from "../../../../globals/common.service";
import {mobileValidator} from "../../../../globals/aadhaar_validator";
import {Router} from "@angular/router";
import {SessionService} from "../../../../globals/sessionstorage";
import {Uppercase} from "../../../../uppercase";
import {DOC_ORIENTATION, NgxImageCompressService} from "ngx-image-compress";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

declare var Tesseract: any;

@Component({
    selector: "app-personaldetail",
    templateUrl: './personaldetail.component.html',
    styleUrls: ['./personaldetail.component.scss'],
    standalone: true,
    imports: [
        CardBodyComponent,
        CardComponent,
        ColComponent,
        RowComponent,
        AccordionButtonDirective,
        AccordionComponent,
        AccordionItemComponent,
        BadgeComponent,
        ButtonDirective,
        CalloutComponent,
        CardTextDirective,
        CardTitleDirective,
        FormCheckComponent,
        FormCheckInputDirective,
        FormControlDirective,
        FormDirective,
        ImageCropperComponent,
        ReactiveFormsModule,
        SpinnerComponent,
        TemplateIdDirective,
        Uppercase,
        FormLabelDirective,
        FormSelectDirective,
        FormCheckLabelDirective
    ]
})
export class PersonalDetailsComponent implements OnInit {
    // studentDetailsForm!: FormGroup;
    Profilepictform!: FormGroup;
    @Output() reloadApi_personal = new EventEmitter<boolean>();

    @Input() parentDetailsForm!: FormGroup;
    @Input() addressDetailsForm!: FormGroup;
    @Input() nationalitynomineeForm!: FormGroup;
    @Input() otherDetailsForm!: FormGroup;
    // @Input() reservationdetailForm!: FormGroup;
    @Input() checkfinalSubmit!: FormGroup;

    @Input() relation = ['']
    @Input() occupation = ['']
    @Input() annual_income = ['']
    @Input() location_area = ['']
    @Input() country = [""]
    @Input() state = [""]
    @Input() nominee_relation = [""]
    @Input() bloodgroup = [""]

    get_personaldetail!: Ires_personaldata;
    ires_parents!: Ires_personalinfo
    oSession!: Sessiondata;
    Ires_ProfileResources!: Res_ProfileResources
    private pngsignfilename: string = '';
    public imageURL!: string;
    public signimageURL!: string;
    croppedImage: any = '';
    imageChangedEvent: any = '';
    private pngfilename: string = '';
    imageChanged_signEvent: any = '';
    croppedsignImage: any = '';
    Files!: Array<File>;
    // occupation = [''];
    // annual_income = [''];
    // location_area = [''];
    // country = [''];
    // state = [''];
    // nominee_relation = [''];
    // bloodgroup = [''];
    district = [''];
    gender = [''];
    religion = [''];
    mother_tongue = [''];
    martial_status = [''];
    reservation = [''];
    category = [''];
    specially_abled = [''];
    activity = [''];
    participation_level = [''];
    secured_rank = [''];
    board: any;
    originalImageSrc: string | null = null;
    compressedFile!: File;
    ProfilephotoImage: any;
    SignatureImage: any;
    Ires_photo: any;
    transform: ImageTransform = {};
    signtransform: ImageTransform = {};
    containWithinAspectRatio = false;
    tabfivedisable = true;
    checkbox_personal: boolean = false;
    hidepersonaltab = false;
    checkbox_percentage: boolean = true;
    uploadphotoloader = false;
    openoneacc = false;
    opentwoacc = false;
    submitted = false;
    saveparentsloader = false;
    IU_parentdetails: boolean = false;
    addressloader = false;
    nationalitynomineeloader = false;
    otherdetailsloader = false;
    personalsubmitted: boolean = true;
    private Uploadprofilepicture!: File;
    private Uploadsignfile!: File;
    canvasRotation = 0;
    signcanvasRotation = 0;

    constructor(
        private commonService: CommonService,
        private globalmessage: GlobalMessage,
        private studentprofieservice: StudentprofileService,
        private sanitizer: DomSanitizer,
        private formBuilder: FormBuilder,
        private router: Router,
        private sessionservice: SessionService,
        private imageCompress: NgxImageCompressService,
        private http: HttpClient,
    ) {
    }

    ngOnInit() {
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();
        this.Createform();
       // this.ProfileResource();
    }

    Createform() {
        this.Profilepictform = this.formBuilder.group({
            upload: ['', Validators.required],
            upload_signature: ['', Validators.required],
            picture: [''],
            croped: [''],
            picture_sign: [''],
            croped_sign: [''],
        });
        this.parentDetailsForm = this.formBuilder.group({
            parentsemailid: ['', [Validators.required,Validators.email]],
            parentsmobile: [0, [mobileValidator]],
            relationtype: ['', Validators.required],
            occupation_guardian: ['', Validators.required],
            annual_income: [''],
            ebc: [''],
        });
        this.addressDetailsForm = this.formBuilder.group({
            correpondence_flatno: ['', Validators.required],
            correpondence_colonyname: [
                '',
                Validators.required,
            ],
            correpondence_villagename: ['', Validators.required],
            correpondence_landmark: ['', Validators.required],
            correpondence_location_area: ['', Validators.required],
            correpondence_country: ['', Validators.required],
            correpondence_state: ['', Validators.required],
            correpondence_district: ['', Validators.required],
            correpondence_city: ['', Validators.required],
            correpondence_pincode: [
                '',
                [Validators.required],
            ],
            permanent_flatno: ['', Validators.required],
            permanent_colonyname: [
                '',
                [Validators.required, Validators.required],
            ],
            permanent_villagename: ['', Validators.required],
            permanent_landmark: ['', Validators.required],
            permanent_location_area: ['', Validators.required],
            permanent_country: ['', Validators.required],
            permanent_state: ['', Validators.required],
            permanent_district: ['', Validators.required],
            permanent_city: ['', Validators.required],
            permanent_pincode: [
                '',
                Validators.required,
            ],
            same_as_permenant: [''],
        });
        this.nationalitynomineeForm = this.formBuilder.group({
            country: ['', Validators.required],
            state: ['', Validators.required],
            nomineename: ['', Validators.required],
            nomineedob: ['', Validators.required],
            nomineerelation: ['', Validators.required],
        });
        this.otherDetailsForm = this.formBuilder.group({
            Pan: ['', Validators.required],
            voterid: ['', Validators.required],
            educationgap: ['', Validators.required],
            bloodgroup: [''],
            maxqualification_family: ['', Validators.required],
            organ_donation: [''],
        });
        this.checkfinalSubmit = this.formBuilder.group({
            checkprofile: [false, Validators.requiredTrue],
        });


        if (this.oSession.isprofilesubmited == 'true') {
            this.tabfivedisable = true
            this.Profilepictform.disable();
            this.parentDetailsForm.disable();
            this.addressDetailsForm.disable();
            this.nationalitynomineeForm.disable();
            this.otherDetailsForm.disable();
            this.checkfinalSubmit.disable();
        }
        if (this.oSession.formfeesrecieved == 'NOTPAID') {
            //Shivam12012026
            this.router.navigate(['/formfees'])
        }
        this.personalInfo();
        // this.getPersonalInfo();
    }

    outsidechange($event: number) {
        if ($event == 1) {
            this.Clear_firsttabobjects()
        }
    }

    Clear_firsttabobjects() {
    }

    get picture_fld() {
        return this.Profilepictform.get('picture');
    }

    showPreview(event: any) {
        const file: File = event.target.files[0];
        // console.log('firstFile', file)
        this.imageChangedEvent = event;

    }

    showPreview_sign(event: any) {
        this.pngfilename = (this.oSession.aadhaar! + Math.random()).toString();
        this.imageChanged_signEvent = event;
        // const file = (event.target as HTMLInputElement).files![0];
        // this.Profilepictform.patchValue({picture: file});
        // this.Profilepictform.get('picture')!.updateValueAndValidity();
        // // File Preview
        // const reader = new FileReader();
        // reader.onload = () => {
        //     this.signimageURL = reader.result as string;
        //     this.croppedsignImage = reader.result as string;
        // };
        // reader.readAsDataURL(file);
    }

    private base64ToFile(base64Data: string, filename: string): File | null {
        const arr = base64Data.split(',');
        if (arr.length < 2) return null;
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) return null;
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

    private base64ToFile_sign(base64Data: string, filename: string): File | null {
        const arr = base64Data.split(',');
        if (arr.length < 2) return null;
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) return null;
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
        const filebeforecorp = this.imageChangedEvent.target.files[0];
        console.log(filebeforecorp);
        // this.compressing_image(filebeforecorp);

        this.compressing_image(filebeforecorp).then((compressedFile) => {
            console.log('Received compressed file:', compressedFile);
            // upload or assign here

            this.Uploadprofilepicture = new File([event.blob!], compressedFile?.name, {
                type: 'PNG',
            });
        });



    }

    async compressing_image(file: File): Promise<File> {
        let originalImageSrc = URL.createObjectURL(file);

        const imageDataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e: any) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        console.log(
            'Original size (bytes):',
            this.imageCompress.byteCount(imageDataUrl)
        );

        const compressedBase64 = await this.imageCompress.compressFile(
            imageDataUrl,
            DOC_ORIENTATION.Up,
            50,
            50
        );

        const compressedFile = this.base64ToFile(
            compressedBase64,
            file.name.split('.')[0] + '_compressed.png'
        );

        console.log('Compressed File:', compressedFile);
        return compressedFile!;
    }

    async compressing_image_signed(file: File): Promise<File> {
        let originalImageSrc = URL.createObjectURL(file);

        const imageDataUrl_sign = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e: any) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        console.log(
            'Original size (bytes):',
            this.imageCompress.byteCount(imageDataUrl_sign)
        );

        const compressedBase64_sign = await this.imageCompress.compressFile(
            imageDataUrl_sign,
            DOC_ORIENTATION.Up,
            50,
            50
        );

        const compressedFile_sign = this.base64ToFile_sign(
            compressedBase64_sign,
            file.name.split('.')[0] + '_compressed.png'
        );

        console.log('Compressed Filessss:', compressedFile_sign);
        return compressedFile_sign!;
    }


    sendImage(imageFile: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', imageFile);
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        return this.http.post(
            'http://localhost:5000/api/ImageDetection', formData, {headers}
        );
    }

    Aadhaarimage_upload() {
        Tesseract.recognize(this.Files[0]).then(function (result: any) {
            // console.log("Aadhaarimage_upload",result.text);
            const inputString = result.text.toString();
            const aadhaar = result.text.includes('Your Aadhaar No.')
            console.log('aadhaar', aadhaar)
            const maleIndex = inputString.indexOf('Your Aadhaar No. :');
            const mm3Index = inputString.indexOf('3113} 3mm,');
            const substring = inputString.substring(maleIndex, mm3Index);
            const numbers = substring.match(/\b\d{4}\b/g);
            const result1 = numbers.join('');
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

    imagesignLoaded(image: LoadedImage) {
        // show cropper
    }

    loadSignImageFailed() {
        this.globalmessage.Show_message('Issue while loading image.');
        // show message
    }

    cropperSignReady() {
        // cropper ready
    }

    }

    get pdf() {
        return this.parentDetailsForm.controls;
    }

    get adf() {
        return this.addressDetailsForm.controls;
    }

    get nnf() {
        return this.nationalitynomineeForm.controls;
    }

    get odf() {
        return this.otherDetailsForm.controls;
    }

    UploadImage() {

        console.log('UploadImage',this.Uploadprofilepicture);
        console.log('UploadImage',this.Uploadsignfile);

        let jsonin = {
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
            // Aadhaar: this.oSession.aadhaar,
        };
        this.uploadphotoloader = true
        let formdata = new FormData();
        formdata.append('input_form', encryptUsingAES256(jsonin));
        formdata.append('photo', this.Uploadprofilepicture);
        formdata.append('signature', this.Uploadsignfile);
        this.commonService
            .Post_formdata(Students_url.Upload_profile_photo,formdata)
        // this.studentprofieservice
        //     .Upload_profile_photo(formdata)
            .subscribe((response: any) => {
                this.Ires_photo = response.data;
                this.globalmessage.Show_message('Data uploaded successfully.');
                this.uploadphotoloader = false
                this.personalInfo();
                // this.getPersonalInfo();
            });
    }

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



    image_signCropped(event: ImageCroppedEvent) {
        this.croppedsignImage = this.sanitizer.bypassSecurityTrustUrl(
            event.objectUrl!
        );
        const filebeforecorp = this.imageChanged_signEvent.target.files[0];

        // this.compressing_image(filebeforecorp)

        console.log('vvbb',filebeforecorp)

        this.compressing_image_signed(filebeforecorp).then((compressedFile) => {
            console.log('Received compressed filesss:', compressedFile);
            // upload or assign here

            this.Uploadsignfile = new File([event.blob!], compressedFile?.name, {
                type: 'PNG',
            });
        });

        // this.Uploadsignfile = new File([event.blob!], filebeforecorp.name, {
        //     type: 'PNG',
        // });
    }

    IU_Parents() {
        this.parentDetailsForm.addControl('finyear', new FormControl('', []));
        this.parentDetailsForm.controls['finyear'].setValue(this.oSession.finyear);
        this.parentDetailsForm.addControl('college_code', new FormControl('', []));
        this.parentDetailsForm.controls['college_code'].setValue(
            this.oSession.collegecode
        );
        // this.parentDetailsForm.addControl('aadhaar', new FormControl('', []));
        // this.parentDetailsForm.controls['aadhaar'].setValue(this.oSession.aadhaar);
        this.saveparentsloader = true;


        let payload = {...this.parentDetailsForm.value,
            parentsmobile: parseInt(this.parentDetailsForm.controls['parentsmobile'].value),
        };

        let input_json = {
            Input: encryptUsingAES256(payload),
        };
        this.studentprofieservice
            .IU_Parents(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your details');
                }
                this.IU_parentdetails = response;
                // this.getPersonalInfo();
                this.globalmessage.Show_message('Data uploaded successfully');
                this.saveparentsloader = false;
                this.personalInfo();
            });
    }

    updateAddress() {
        if (this.addressDetailsForm.controls['same_as_permenant'].value == 'Yes') {
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
            this.addressDetailsForm.controls['permanent_city'].setValue('')
            this.addressDetailsForm.controls['permanent_pincode'].setValue('')
        }
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
        this.studentprofieservice
            .IU_Address(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your details');
                }
                this.IU_parentdetails = response;
                this.globalmessage.Show_successmessage('Data uploaded successfully');
                this.addressloader = false;
                this.personalInfo();
                // this.getPersonalInfo()
            });
    }

    IU_Nationalty() {
        this.nationalitynomineeForm.addControl('finyear', new FormControl('', []));
        this.nationalitynomineeForm.controls['finyear'].setValue(
            this.oSession.finyear
        );
        this.nationalitynomineeForm.addControl(
            'college_code',
            new FormControl('', [])
        );
        this.nationalitynomineeForm.controls['college_code'].setValue(
            this.oSession.collegecode
        );
        // this.nationalitynomineeForm.addControl('aadhaar', new FormControl('', []));
        // this.nationalitynomineeForm.controls['aadhaar'].setValue(
        //     this.oSession.aadhaar
        // );
        this.nationalitynomineeloader = true
        let input_json = {
            Input: encryptUsingAES256(this.nationalitynomineeForm.value),
        };
        this.studentprofieservice
            .IU_Nationalty(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your details');
                }
                this.IU_parentdetails = response;
                // this.getPersonalInfo();
                this.globalmessage.Show_message('Data uploaded successfully');
                this.nationalitynomineeloader = false
                this.personalInfo();
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

    IU_Others() {
        this.otherDetailsForm.addControl('finyear', new FormControl('', []));
        this.otherDetailsForm.controls['finyear'].setValue(this.oSession.finyear);
        this.otherDetailsForm.addControl('college_code', new FormControl('', []));
        this.otherDetailsForm.controls['college_code'].setValue(
            this.oSession.collegecode
        );
        // this.otherDetailsForm.addControl('aadhaar', new FormControl('', []));
        // this.otherDetailsForm.controls['aadhaar'].setValue(this.oSession.aadhaar);
        this.otherdetailsloader = true
        let input_json = {
            Input: encryptUsingAES256(this.otherDetailsForm.value),
        };
        this.studentprofieservice
            .IU_Others(input_json)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your details');
                }
                this.IU_parentdetails = response;
                // this.getPersonalInfo();
                this.globalmessage.Show_message('Data uploaded successfully');
                this.otherdetailsloader = false
                this.personalInfo();
            });
    }

    PersonalSubmit() {
        // if()
        // this.submitpage = 1


        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            // aadhaar: this.oSession.aadhaar,
            // pagesubmited: pagesubmitted
        };
        this.commonService
            .Post_json_data<boolean>(Students_url.IU_personalsubmited, jsonin)
            .subscribe((response) => {
                if (response == null) {
                    this.globalmessage.Show_error('Please check your data');
                }
                this.personalsubmitted = response.data;
                this.globalmessage.Show_successmessage('Data submitted successfully.')
                this.personalInfo();
                this.submitSuccess();
                // this.getPersonalInfo();
            });
    }

    submitSuccess() {
        // when your save / submit API is successful
        this.reloadApi_personal.emit(true);
    }

    personalInfo() {
        let nBatchcode = 0;
        let nBatchuuid = '';
        if (this.oSession.currentformfeesbatchcode! <= 0) {
            nBatchcode = this.oSession.maxbatchcode!
            nBatchuuid = this.oSession.maxbatchuuid!
        } else {
            nBatchcode = this.oSession.currentformfeesbatchcode!
            nBatchuuid = this.oSession.currentbatchuuid!
        }
        let payload = {
            collegecode: this.oSession.collegecode,
            finyear: this.oSession.finyear,
            // Aadhaar: this.oSession.aadhaar,
            batch_code: nBatchcode,
            batchuuid: nBatchuuid
        };

        console.log('payay',payload)
        // let input_json = {
        //     Input: encryptUsingAES256(payload),
        // };
        this.commonService.Post_json_data<Ires_personalinfo>(Students_url.personalinfo, payload).subscribe((response) => {
            this.ires_parents = response.data
            console.log('resspersss', this.ires_parents)
            // this.Profilepictform.patchValue(this.ires_parents);
            this.parentDetailsForm.patchValue(this.ires_parents.parents);
            this.addressDetailsForm.patchValue(this.ires_parents.address);
            this.nationalitynomineeForm.patchValue(this.ires_parents.nationality);
            this.otherDetailsForm.patchValue(this.ires_parents.other);

            if (this.ires_parents.parentsubmited && this.ires_parents.othersubmited &&
                this.ires_parents.nationalitysubmited &&
                this.ires_parents.addresssubmited && this.ires_parents.photosubmited

                //Shivam2504
                // && this.ires_parents.photosubmited
            ) {
                this.checkbox_personal = true;
            }
            // this.reservationdetailForm.patchValue(this.ires_parents.reservation);
        })
    }
}
