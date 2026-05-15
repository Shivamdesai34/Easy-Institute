//https://www.cloudsigma.com/managing-http-requests-and-error-handling-with-angular-interceptors/
import {inject, Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {BehaviorSubject, Observable, switchMap, take, throwError} from 'rxjs';
import {catchError, filter} from 'rxjs/operators';
import {Router} from "@angular/router";
import {Common_url} from "../globals/global-api";
import {environment} from "../../environments/environment";
import {GlobalMessage} from "../globals/global.message";

@Injectable()
export class Httpinterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private http = inject(HttpClient);
  private router = inject(Router);
  private globalmessage = inject(GlobalMessage);

  constructor() {
  }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //
  //
  //   // request.headers
  //
  //   if (!(request.body instanceof FormData)) {
  //     request.headers.set('Content-Type','application/json');
  //   }
  //
  //   let authReq = request.clone({withCredentials: true});
  //
  //   console.log('cickc',authReq)
  //
  //   if (request.url.includes('studentlogin') || request.url.includes('refreshtoken')) {
  //     return next.handle(authReq);
  //   }
  //
  //
  //
  //   return next.handle(authReq).pipe(
  //     catchError(error => {
  //       if (error instanceof HttpErrorResponse && error.status === 401) {
  //         // If 401 occurs, attempt to refresh the token
  //         console.log('Unauthorized');
  //         return this.handle401Error(authReq, next);
  //       }
  //       return throwError(() => error);
  //     })
  //   );
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const isFormData = request.body instanceof FormData;

    if (isFormData) {
      console.log('--- FormData inside interceptor ---');

      if (request.method == "POST") {
        if (request.headers.get('Anonymous') == 'no') {

          return next.handle(request);
        }
      }

      (request.body as FormData).forEach((value, key) => {
        console.log(key, value);
      });
    } else {
      console.log('Not FormData:', request.body);
    }

    let modifiedReq = request;

    // ✅ Only set Content-Type for JSON (not FormData)
    if (!(request.body instanceof FormData)) {
      modifiedReq = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
    } else {
      // For FormData, DO NOT set Content-Type (browser sets it automatically)
      modifiedReq = request.clone({
        withCredentials: true
      });
    }

    console.log('request:', modifiedReq);

    if (request.url.includes('studentlogin') || request.url.includes('refreshtoken')) {
      return next.handle(modifiedReq);
    }

    return next.handle(modifiedReq).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            console.log('Unauthorized');
            return this.handle401Error(modifiedReq, next);
          }
          return throwError(() => error);
        })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      console.log('handle401Error')
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshToken = localStorage.getItem('refresh_token');
      // console.log('refresh TOken', refreshToken)
      if (refreshToken == "") {
        // alert("Refesh tolken empty")
        this.logoutUser();
      }

      let refreshtokenUrl = environment.API_URL + '/v1/Common/refreshtoken'

      console.log(refreshtokenUrl);
      return this.http.post<any>(refreshtokenUrl, {refresh_token: refreshToken}, {withCredentials: true}).pipe(
        switchMap((res) => {

          this.isRefreshing = false;
          console.log('1')
          localStorage.removeItem('refresh_token');
          this.refreshTokenSubject.next(res);
          console.log('2')
          return next.handle(request);
        }),
        catchError((err) => {
          console.log('catchError   ', err)
          this.isRefreshing = false;
          if (err.status === 401 || err.status === 400) {
            console.log(err.status)
          //  this.logoutUser();
          }
          else if (err.status === 500) {
            this.logoutUser();
            this.globalmessage.Show_error('Token expired. Please login again!!');
          }
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(() => next.handle(request))
      );
    }
  }

  private logoutUser() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
