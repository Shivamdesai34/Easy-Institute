import {Injectable} from "@angular/core";
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {
    AdmissionQuotasubjectGroups,
    ApiResponse, Ires_Courseapplied,
    Ires_registerbatch,
    res_singlebatch,
    Subjects_group_h
} from "../../../models/response";
import {Common_url, Fees_url, Students_url} from "../../../globals/global-api";
import Swal from 'sweetalert2';



@Injectable({
    providedIn: 'root',
})
export class GapStudentservice implements HttpInterceptor {
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
    header_Api = {
        headers: {
            'Anonymous': 'mytoken',
        }
    }

    registertionbatchs(jsonin: any): Observable<ApiResponse<Ires_registerbatch[]>> {
        return this.http
            .post<ApiResponse<Ires_registerbatch[]>>(Common_url.registertionbatchs, jsonin, this.header_Api)
            .pipe(catchError(this.handleError));
    }



    // HttpClient API post() method => Create employee

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
