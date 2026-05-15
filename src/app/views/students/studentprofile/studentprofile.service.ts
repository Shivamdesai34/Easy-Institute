import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import Swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';
import {
  Common_url,
  Fees_url, Students_url,
} from '../../../globals/global-api';
import {
  ApiResponse, Ires_education,
  Ires_personaldata,
  Iresp_Login,
  Res_ProfileResources,
  res_singlebatch, Subjects_group_h
} from "../../../models/response";

@Injectable({
    providedIn: 'root',
})
export class StudentprofileService implements HttpInterceptor {
    constructor(private http: HttpClient) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(catchError((error) => this.handleError(error)));
    }

    data: any;
    loginResponse: any;

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Token ' + sessionStorage.getItem('Token'),
        }),
    };
    httpOptionswithoutToken = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    httpOptionsFormdata = {
        headers: new HttpHeaders({
            Authorization: 'Token ' + sessionStorage.getItem('Token'),
        }),
    };

  header_Api={
  headers: {
    'Anonymous': 'mytoken',
  }
}

    BillDeskTransactionPay(billdeskmsg: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.BillDeskcheckSum, JSON.stringify(billdeskmsg), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    BillDeskcheckSumQuery(billdeskquerymsg: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(
              Students_url.BillDeskcheckSumQuery,
                JSON.stringify(billdeskquerymsg),
                httpFormOptions
            )
            .pipe(catchError(this.handleError));
    }

    CheckAdmission(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.CheckAdmission_URL, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    formfeesreceived(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.formfeesreceivedv1_url, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    ProfileSubmited(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.ProfileSubmited, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }



    AdmissionPayment(data: any): Observable<any> {

        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.IU_Admission, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    ProfileResources(): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.ProfileResources, '', httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    StudentBatch(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.StudentBatch, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    GetModalBatchSubjects(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.StudentSubjectGroup, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    CheckSubjectGroupQuota(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(Students_url.CheckSubjectGroupQuota, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    StudentProfileStatus(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(
              Students_url.StudentProfileStatus_url,
                JSON.stringify(data),
                httpFormOptions
            )
            .pipe(catchError(this.handleError));
    }

    displayportalmessage(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(
                Fees_url.ValidatePortalmessage_URL,
                JSON.stringify(data),
                httpFormOptions
            )
            .pipe(catchError(this.handleError));
    }

    // HttpClient API post() method => Create employee
    SavePersonalDetails(FormData: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.IU_StudentProfile, FormData, httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    SaveEducationDetails(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(Students_url.IU_StudentEducation, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    EducationDocuments(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(Students_url.EducationDocuments_URL, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    StudentUploadDocuments(documentsformData: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(Students_url.UploadDocuments, documentsformData, httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    SaveReservationDetails(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(Students_url.IU_Reservations, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    GetEducationDetails(data: any): Observable<any> {

        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.GetEducationDetails, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    PortalOpenv1(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Students_url.PortalOpenv1, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

  get_personalinfo(input_json:any):Observable<ApiResponse<Ires_personaldata>> {
    return this.http
      .post<ApiResponse<Ires_personaldata>>(Students_url.get_personalinfo, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }

  getsinglebatch(input_json:any):Observable<ApiResponse<res_singlebatch>> {

    return this.http
      .post<ApiResponse<res_singlebatch>>(Common_url.batch,  input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  Final_profileSubmitted(jsonin_input: any): Observable<boolean> {

    return this.http
      .post<boolean>(Students_url.ProfileSubmited,   jsonin_input, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  ProfileResource(data:any):Observable<ApiResponse<Res_ProfileResources>> {
    return this.http
      .post<ApiResponse<Res_ProfileResources>>(Students_url.ProfileResources,   data)
      .pipe(catchError(this.handleError));
  }

    StudentSubjectGroup(input_json:any): Observable<ApiResponse<Subjects_group_h[]>>{
      return this.http
        .post<ApiResponse<Subjects_group_h[]>>(Students_url.StudentSubjectGroup,  input_json, this.header_Api)
        .pipe(catchError(this.handleError));
    }
  BillDeskcheckSum(input_json:any): Observable<any>{
    return this.http
      .post<any>(Students_url.BillDeskcheckSum, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_Personalinfo(input_json:any): Observable<boolean>{
    return this.http
      .post<boolean>(Students_url.IU_Personalinfo, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_Parents(input_json:any): Observable<boolean>{
    return this.http
      .post<boolean>(Students_url.IU_Parents, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_Address(input_json:any): Observable<boolean>{
    return this.http
      .post<boolean>(Students_url.IU_Address, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_Nationalty(input_json:any): Observable<boolean>{
    return this.http
      .post<boolean>(Students_url.IU_Nationalty, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_Others(input_json:any): Observable<boolean>{
    return this.http
      .post<boolean>(Students_url.IU_Others, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_Reservations_new(formdata:any): Observable<any>{
    return this.http
      .post<any>(Students_url.IU_Reservations_new, formdata, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_StudentEducation(formdata:any): Observable<any>{
    return this.http
      .post<any>(Students_url.IU_StudentEducation, formdata, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  Get_educationdetails(input_json:any): Observable<ApiResponse<Ires_education>>{
    return this.http
      .post<ApiResponse<Ires_education>>(Students_url.Get_educationdetails, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  Upload_profile_photo(formdata:any): Observable<any>{
    return this.http
      .post<any>(Students_url.Upload_profile_photo, formdata, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_personalsubmited(input_json:any): Observable<boolean[]>{
    return this.http
      .post<boolean[]>(Students_url.IU_personalsubmited, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_educationsubmited(input_json:any): Observable<any>{
    return this.http
      .post<any>(Students_url.IU_educationsubmited, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  BatchSubjects(input_json:any): Observable<ApiResponse<Subjects_group_h>>{
    return this.http
      .post<ApiResponse<Subjects_group_h>>(Common_url.BatchSubjects, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
    // Error handling
    handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error !== null) {
            Swal.fire({
                title: 'Message!',
                text: error.error.exception,
                icon: 'error',
                confirmButtonText: 'OK',
            }); //alert
        } else {
            Swal.fire({
                title: 'Error!',
                text: error.status + 'Server Error!',
                icon: 'error',
                confirmButtonText: 'OK',
            }); //alert
        }
        return throwError(error);
    }

    // async loadModels() {
    //     const MODEL_URL = '/assets/models';
    //     await Promise.all([
    //         faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    //         faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    //         faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    //     ]);
    // }
    //
    // async detectFaces(image: HTMLImageElement | HTMLVideoElement) {
    //     return await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions());
    // }
}
