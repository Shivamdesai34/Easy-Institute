import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  Fees_url, Students_url,
} from '../../../globals/global-api';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class QueryTicketService implements HttpInterceptor {

  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + sessionStorage.getItem("Token")
    })
  }

  httpOptionsFormdata = {
    headers: new HttpHeaders({
      'Authorization': "Token " + sessionStorage.getItem("Token")
    })
  }

  studentbatchs(data: any): Observable<any> {
    return this.http.post<any>(Students_url.studentbatchs, JSON.stringify(data), this.httpOptions)
      .pipe(

        catchError(this.handleError)
      )
  }

  createticket(FormData: any): Observable<any> {
    return this.http.post<any>(Students_url.createticket,FormData,this.httpOptionsFormdata)
      .pipe(

        catchError(this.handleError)
      )
  }

  ticketDetails(jsonin: any): Observable<any> {
    return this.http.post<any>(Students_url.ticketdetails, JSON.stringify(jsonin), this.httpOptions)
        .pipe(

            catchError(this.handleError)
        )
  }

  ticketMaster(jsonin: any): Observable<any> {
    return this.http.post<any>(Students_url.ticketmaster,JSON.stringify(jsonin))
        .pipe(
            catchError(this.handleError)
        )
  }

  ticketClose(jsonin: any): Observable<any> {
    return this.http.post<any>(Fees_url.ticketaction,JSON.stringify(jsonin))
        .pipe(
            catchError(this.handleError)
        )
  }

  ticketReply(rquery: any): Observable<any> {
    return this.http.post<any>(Fees_url.ticketreplay,JSON.stringify(rquery), this.httpOptions)
        .pipe(
            catchError(this.handleError)
        )
  }

  ticketcategory(): Observable<any> {
    return this.http.post<any>(Fees_url.ticketcategory,'', this.httpOptions)
      .pipe(

        catchError(this.handleError)
      )
  }

  Internalexammarks(data: any): Observable<any> {
    return this.http.post<any>(Students_url.Internalexammarks, JSON.stringify(data), this.httpOptions)
      .pipe(

        catchError(this.handleError)
      )
  }

  studentbatchexams(data: any): Observable<any> {
    return this.http.post<any>(Students_url.studentbatchexams, JSON.stringify(data), this.httpOptions)
      .pipe(

        catchError(this.handleError)
      )
  }

  // Error handling
  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
      Swal.fire({ title: 'Message!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
    }
    else {
      Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert

    }
    return throwError(error);
  }
}
