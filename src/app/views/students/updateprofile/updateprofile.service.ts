import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {GlobalMessage} from '../../../globals/global.message';
import {catchError} from 'rxjs';
import {
  Common_url, Students_url,
} from '../../../globals/global-api';
import Swal from 'sweetalert2';
import {ApiResponse, Ires_personaldata, Res_ProfileResources} from "../../../models/response";

@Injectable({
    providedIn: 'root',
})
export class UpdateprofileService {
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

  header_Api={
    headers: {
      'Anonymous': 'mytoken',
    }
  }
    constructor(private http: HttpClient,
                private globalmessage: GlobalMessage) {
    }

    studentuploadimage(FormData: any): Observable<any> {
        return this.http
            .post<any>(Common_url.studentuploadimage, FormData, this.httpOptionsFormdata)
            .pipe(catchError(this.handleError));
    }

    updateemail(jsonin: any): Observable<any> {
        return this.http
            .post<any>(Common_url.updateemail, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    sendemail(jsonin: any): Observable<any> {
        return this.http
            .post<any>(Common_url.sendemail, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    sendotpemail(jsonin: any): Observable<any> {
        return this.http
            .post<any>(Common_url.sendotpemail, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    verifyemailotp(jsonin: any): Observable<any> {
        return this.http
            .post<any>(Common_url.verifyemailotp, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    sendotpmobile(jsonin: any): Observable<any> {
        return this.http
            .post<any>(Common_url.sendotpsms, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    verifymobileotp(jsonin: any): Observable<any> {
        return this.http
            .post<any>(Common_url.verifymobileotp, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    studentpictureupload(FormData: any): Observable<any> {
        return this.http
            .post<any>(Common_url.studentpictureupload, FormData, this.httpOptionsFormdata)
            .pipe(catchError(this.handleError));
    }

    sendotpemailv2(input_json: any): Observable<any> {
        return this.http
            .post<any>(Common_url.sendotpemailv2,input_json, this.header_Api)
            .pipe(catchError(this.handleError));
    }
  sendotpsmsv2(input_json: any): Observable<any> {
    return this.http
      .post<any>(Common_url.sendotpsmsv2,input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  verifymobileotpv2(input_json: any): Observable<any> {
    return this.http
      .post<any>(Common_url.verifymobileotpv2, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  verifyemailotpv2(input_json: any): Observable<any> {
    return this.http
      .post<any>(Common_url.verifyemailotpv2,  input_json, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  ProfileResource(data:any):Observable<ApiResponse<Res_ProfileResources>> {
    return this.http
      .post<ApiResponse<Res_ProfileResources>>(Students_url.ProfileResources,   data)
      .pipe(catchError(this.handleError));
  }
  get_personalinfo(input_json:any):Observable<ApiResponse<Ires_personaldata>> {
    return this.http
      .post<ApiResponse<Ires_personaldata>>(Students_url.get_personalinfo, input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  IU_Address_only(input_json:any):Observable<boolean> {
    return this.http
      .post<boolean>(Students_url.IU_Address_only,  input_json, this.header_Api)
      .pipe(catchError(this.handleError));
  }
  sendotpmobilev2(jsonin: any): Observable<any> {
        return this.http
            .post<any>(Common_url.sendotpsmsv2, JSON.stringify(jsonin), this.httpOptions)
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
