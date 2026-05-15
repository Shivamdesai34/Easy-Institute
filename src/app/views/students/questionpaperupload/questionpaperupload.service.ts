import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {
  Common_url, Marksheet_url, Students_url
} from '../../../globals/global-api'
import Swal from "sweetalert2";
import {handleError} from '../../../globals/GlobalHandleerror';

@Injectable({
  providedIn: 'root'
})
export class QuestionpaperuploadService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + sessionStorage.getItem("Token"),
    })
  }
  httpOptionsFormdata = {
    headers: new HttpHeaders({
      Authorization: 'Token ' + sessionStorage.getItem('Token'),
    }),
  };

  batchuserexam(viewsubject: any): Observable<any> {
    return this.http.post<any>(Marksheet_url.batchuserexam, JSON.stringify(viewsubject), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  Paidfinyear(data: any): Observable<any> {
    return this.http
      .post<any>(Students_url.Paidfinyear, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(handleError));
  }
  batchsemesterexamsubjects(semsubject: any): Observable<any> {
    return this.http
      .post<any>(
        Marksheet_url.batchsemesterexamsubjects,
        JSON.stringify(semsubject),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  download_examsgpa(downloadfile: any): Observable<any> {
    return this.http.post<any>(Marksheet_url.download_batchsemestersubject, JSON.stringify(downloadfile), this.httpOptions)
      .pipe(
        // catchError(this.handleError)
      )
  }

  batchsemesterubjects(semsubject: any): Observable<any> {
    return this.http
      .post<any>(
        Marksheet_url.batchsemestersubject,
        JSON.stringify(semsubject),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  excelmarksentryupload(FormData: any): Observable<any> {
    return this.http
      .post<any>(Marksheet_url.uploadquestionpaper, FormData, this.httpOptionsFormdata)
      .pipe(catchError(this.handleError));
  }
  exams(exam: any): Observable<any> {
    return this.http
      .post<any>(Marksheet_url.exams, JSON.stringify(exam), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  Semesterexam(exam: any): Observable<any> {
    return this.http
      .post<any>(Marksheet_url.semester, JSON.stringify(exam), this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  excludecurrentfinyear(viewsubject: any): Observable<any> {
    return this.http
      .post<any>(
        Marksheet_url.excludecurrentfinyear,
        JSON.stringify(viewsubject),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  paperdownload(downloadfile: any): Observable<any> {
    return this.http.post<any>(Students_url.downloadquestionpaper, JSON.stringify(downloadfile), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  Finyear(): Observable<any> {

    return this.http.post<any>(Common_url.finyear, '')
      .pipe(
        catchError(this.handleError)
      )
  }


  handleError(error: HttpErrorResponse): Observable<any> {

    if (error.error == null) {
      Swal.fire({ title: 'Error!', text: error.status + "Server Error!", confirmButtonText: 'OK' })//alert
    }
    else {
      Swal.fire({ title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
    }
    return throwError(error);
  }
}
