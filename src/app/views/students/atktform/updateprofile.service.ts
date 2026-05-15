import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {GlobalMessage} from '../../../globals/global.message';
import {catchError} from 'rxjs/operators';
import {

  Billdesk_url, Common_url, Marksheet_url
} from '../../../globals/global-api';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class AtktformService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Token ' + sessionStorage.getItem('Token'),
        }),
    };

    httpOptionsFormdata = {
        headers: new HttpHeaders({
            Authorization: 'Token ' + sessionStorage.getItem('Token'),
        }),
    };

    constructor(private http: HttpClient,
                private globalmessage: GlobalMessage) {
    }
    Finyears(): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(Common_url.finyear, '', httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    getallBatches(): Observable<any> {
        return this.http.post<any>(Common_url.allbatchs, '', this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    Atkt_Formamount(): Observable<any> {
        return this.http.post<any>(Marksheet_url.atkt_formamount, '', this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }
    get_atktprefix(jsonin: any): Observable<any> {
        return this.http
            .post<any>(
                Marksheet_url.get_atktprefix,
                jsonin,
                this.httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    Billdeskchecksum_atkt(jsonin: any): Observable<any> {
        return this.http.post<any>(Billdesk_url.Billdeskchecksum_atkt, jsonin, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }
    batchwise_semester(jsonin: any): Observable<any> {
        return this.http
            .post<any>(Marksheet_url.batchwise_semester, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    atktstudentspaper_semesterwise(jsonin : any) : Observable<any> {
        return this.http
            .post<any>(Marksheet_url.atktstudentspaper_semesterwise, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }


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
        return throwError(() => {
            return error;
        });
    }

}
