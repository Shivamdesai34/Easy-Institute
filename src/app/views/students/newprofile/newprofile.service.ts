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
  Fees_url, Students_url,
} from '../../../globals/global-api';

@Injectable({
    providedIn: 'root',
})
export class NewprofileService implements HttpInterceptor {
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
}
