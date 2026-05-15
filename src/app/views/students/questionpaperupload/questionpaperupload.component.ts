import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CommonService} from "../../../globals/common.service";
import {IYear} from "../../../models/request";

import {Sessiondata} from "../../../models/Sessiondata";

import {Router} from "@angular/router";
import {QuestionpaperuploadService} from "./questionpaperupload.service";
import {GlobalMessage} from "../../../globals/global.message";
import {base64StringToBlob} from "blob-util";
import {Golbal_CollegeCode} from '../../../globals/global-variable';
import {ISubjectName_json} from "../../../models/response";
import {IBat_semsubject, ISem_exam, Isemester} from "./questionpaperupload.responsemodel";
import {IReq_download, Ireq_finyear, Ireq_getsem} from "./questionpaperupload.requestmodel";
import {SessionService} from "../../../globals/sessionstorage";
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  CardModule,
  ColComponent,
  FormLabelDirective,
  FormModule,
  FormSelectDirective,
  GridModule,
  RowComponent,
  SpinnerComponent
} from "@coreui/angular-pro";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {QuestionpaperRoutingModule} from "./questionpaper-routing.module";
import {CommonModule} from "@angular/common";
import {AgGridModule} from "ag-grid-angular";
import {HttpClientModule} from "@angular/common/http";
import {PdfViewerModule} from "ng2-pdf-viewer";

@Component({
  selector: 'app-questionpaperupload',
  templateUrl: './questionpaperupload.component.html',
  styleUrls: ['./questionpaperupload.component.scss'],
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    SpinnerComponent,
    AutocompleteLibModule,
    FormSelectDirective,
    CardHeaderComponent,
    FormLabelDirective,
    QuestionpaperRoutingModule,
    CommonModule,
    AgGridModule,
    HttpClientModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    CardBodyComponent,
    CardComponent,
    AutocompleteLibModule,
    SpinnerComponent,
    CardModule,
    GridModule,
    FormModule,
  ]
})
export class QuestionpaperuploadComponent implements OnInit {

  QuestionpaperForm!: FormGroup;
  DownloadUploadForm!: FormGroup;
  Finfrom!: FormGroup;

  Batchs: any;
  Batchkeyword = 'Batch_Name';
  SelectedSemester: any;
  Semesters: any;
  semester: any;
  finyeardata: any;
  data: any;
  papercode: any;

  currentYear: any;
  GetFinyear: any;
  exam: any;
  res: any;
  xlsxFile!: Array<File>;
  viewfile: any;
  Finyearnew: any
  Finyear_json: IYear[] | undefined;
  SelectedFinyear_json!: IYear | undefined;

  downloadloader = false;
  BatchCode: any;
  loader: any;
  SelectedFinyear: any;
  BatchNames: any;
  SubjectName: any;
  Exam!: Isemester[];
  SelectedSemExam!: Isemester;

  namesubject!: ISubjectName_json[];
  SelectedSemSubjects!: ISubjectName_json;

  oSession!: Sessiondata;

  constructor(private router: Router, private sessionservice: SessionService,
              private commonService: CommonService,
              private questionpaperservice: QuestionpaperuploadService,
              private globalmessage: GlobalMessage
  ) {

  }

  Finyear = parseInt(sessionStorage.getItem('Finyear')!);
  CollegeCode = parseInt(sessionStorage.getItem('College')!);
  Aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);
  Token = sessionStorage.getItem('Token');

  ngOnInit(): void {

    this.oSession = new Sessiondata(this.sessionservice)
    this.oSession.Getdatafromstroage();

    if (!this.Token) {
      // this.dialogService.open({ message: 'Please Login', positive: 'Ok', })//alert
      Swal.fire({
        title: 'Success!',
        text: 'Please Login!',
        icon: 'success',
        confirmButtonText: 'OK',
      }); //alert

      this.router.navigate(['login']);
    } else {
      this.currentYear = new Date().getFullYear();
      this.GetBatchAPI();
      // this.GetFinyearApi();
    }
    this.Createform();
    this.selectFinyearApi();

  }

  Createform() {

    this.QuestionpaperForm = new FormGroup({
      // 'Batch_Name': new FormControl('', Validators.required),
      Semester_Name: new FormControl('', Validators.required),
      Exam_Name: new FormControl('', Validators.required),
      SubjectName: new FormControl('', Validators.required),
    })
    this.DownloadUploadForm = new FormGroup({
      upload: new FormControl('', Validators.required),
    });
  }

  GetFinyearApi() {
    let jsonin: Ireq_finyear = {
      finyear: this.Finyear,
      useraadhaar: this.Aadhaar,
      currentfinyear: this.currentYear,
    };
    this.questionpaperservice
      .excludecurrentfinyear(jsonin)
      .subscribe((response: any) => {
        if (response == null) {
          return;
        }
        if (!response.hasOwnProperty('data')) {
          return;
        }
        if (response['data'] == '' || response['data'] == null) {
          // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
          Swal.fire({
            title: 'Error!',
            text: 'No data found! Please Configure Marksheet..',
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        } else {
          this.GetFinyear = response['data'];
        }
      });
  }

  GetBatchAPI() {
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

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  // onChangeSemesterSelect() {
  //   this.GetSemExamApi();
  // }
  xlsxUpload(element: any) {
    this.xlsxFile = element.target.files;
    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    if (
      this.xlsxFile[0].type ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      this.xlsxFile[0].size < 2400000
    ) {
    } else {
      // this.dialogService.open({ message: 'Only .xlsx file allowed!', positive: 'Ok', })
      Swal.fire({
        title: 'Error!',
        text: 'Only .xlsx file allowed!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert

    }
  }

  onChangeSemSubjectsSelect() {
  }

  GetExamSubjectApi() {
    let jsonin: IBat_semsubject = {
      Collegecode: Golbal_CollegeCode,
      finyear: this.Finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.Aadhaar,
      Semester: this.SelectedSemExam.Semester,

    };
    this.questionpaperservice
      .batchsemesterubjects(jsonin)
      .subscribe((response: any) => {
        if (response == null) {
          // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
          Swal.fire({
            title: 'Error!',
            text: 'No data found! Please Configure Marksheet..',
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        } else {
          this.namesubject = response
        }
      });
  }

  onChangeSemExamSelect() {
    this.GetExamSubjectApi();
  }


  GetSemesterApi() {
    let jsonin: Ireq_getsem = {
      college_code: this.CollegeCode,
      finyear: this.Finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.Aadhaar,
    };

    this.questionpaperservice
      .Semesterexam(jsonin)
      .subscribe((response: any) => {
        if (response['data'] == '' || response['data'] == null) {
          // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
          Swal.fire({
            title: 'Error!',
            text: 'No data found! Please Configure Marksheet..',
            icon: 'error',
            confirmButtonText: 'OK',
          }); //alert
        } else {
          this.Semesters = response['data'];
        }
      });
  }

  GetSemExamApi() {
    let jsonin: ISem_exam = {
      college_code: this.CollegeCode,
      finyear: this.Finyear,
      batch_code: this.BatchCode,
      useraadhaar: this.Aadhaar,
      // semester: this.SelectedSemester.Semester,
    };
    this.questionpaperservice.Semesterexam(jsonin).subscribe((response: any) => {
      if (response['data'] == '' || response['data'] == null) {
        // this.dialogService.open({ message: 'No data found! Please Configure Marksheet..', positive: 'Ok', })//alert
        Swal.fire({
          title: 'Error!',
          text: 'No data found! Please Configure Marksheet..',
          icon: 'error',
          confirmButtonText: 'OK',
        }); //alert
      } else {
        this.Exam = response['data'];
      }
    });
  }

  onFinyearSelected() {
    this.GetBatchAPI();
  }

  OnDownloadFile() {
    let jsonin: IReq_download = {
      "Collegecode": Golbal_CollegeCode,
      "Finyear": this.Finyear,
      "batch_code": this.BatchCode,
      "Useraadhaar": this.Aadhaar,
      "Semester": this.SelectedSemExam.Semester,
    }
    this.questionpaperservice.download_examsgpa(jsonin).subscribe(response => {
      this.res = response;
      const contentType = '';
      const blobb = base64StringToBlob(this.res.blobdata, contentType);
      let blob = new Blob([blobb], {type: 'application/blob'});
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.res.excelfile;
      link.click();
    })
  }

  selectFinyearApi() {
    this.questionpaperservice.Finyear().subscribe((response) => {

      if (response == null) {
        return;
      }
      this.Finyear_json = response.data;

    })

  }

  selectBatch(bat: any) {
    this.BatchCode = bat.Batch_Code;
    // this.GetSemesterApi();
    this.GetSemExamApi();
  }

  selectFin() {
    this.GetBatchAPI();
  }
}
