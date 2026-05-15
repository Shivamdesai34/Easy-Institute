import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, map, switchMap, take} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {CommonService} from "./common.service";
import {environment} from "../../environments/environment";
import {ApiResponse, Ires_refreshtoken} from "../models/response";
import {GlobalMessage} from "./global.message";
// import {refresh_token} from "./global-api";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  demomode : boolean = environment.demoMode

  constructor(private router: Router,
              private http: HttpClient,
              private globalmessage: GlobalMessage,
              private commonService: CommonService) {
  }

  getAuthToken(): string {
    const userToken = sessionStorage.getItem('token');
    return userToken !== null ? userToken : '';
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.getAuthToken();

    // const token = request.headers.get('Authorization')


    // prakash on 28/08/2025
    /*if (token && !request.headers.has('Authorization')) {
      request = this.addTokenToRequest(request, token);
    }*/

    if (request.url.includes('/refreshtoken')) {
      return next.handle(request);
    }

    let accesstoken = sessionStorage.getItem('access_token');

    if (accesstoken) {
      request = this.addTokenToRequest(request, accesstoken);
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {

        console.log('err',error.error)

        if(error.status == 401){

          console.log('err11',error.error.errorcode)
          if( error.error.errorcode > 0){
            this.router.navigate(['login']);
            this.globalmessage.Show_error(error.error.error);
            sessionStorage.clear();
            localStorage.clear();
          }else {

            console.log('err22',error.error.errorcode)

            return this.handle401Error(request, next);
          }
        }
        // Show error
        Swal.fire({
          title: 'Message!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    // return request.clone({
    //   headers: request.headers.set('Authorization', 'Bearer ' + token)
    //
    // });


    // if(environment.demoMode){
    //   this.demomode = true
    // }

    return request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token,
        'X-Demo-Mode': this.demomode.toString(),
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const refreshToken = sessionStorage.getItem('refresh_token');

    console.log('cck',refreshToken)

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.tokenSubject.next(null);

      const refreshUrl = environment.API_URL + '/v1/Common/refreshtoken';

      const headers = new HttpHeaders({
        Authorization: `Bearer ${refreshToken}`,
      });

      // ✅ Debug headers
      headers.keys().forEach(key => {
        // console.log('Refresh Header ->', key + ':', headers.get(key));
      });

      return this.http.post<ApiResponse<Ires_refreshtoken>>(refreshUrl, "", { headers }).pipe(

          switchMap((response) => {

            this.isRefreshing = false;

            if (response.data.accesstoken.length > 0) {

              sessionStorage.setItem("access_token", response.data.accesstoken);
              sessionStorage.setItem("refresh_token", response.data.refreshtoken);

              this.tokenSubject.next(response.data.accesstoken);

              return next.handle(
                  this.addTokenToRequest(request, response.data.accesstoken)
              );

            } else {
              return throwError(() => new Error("Token refresh failed"));
            }
          }),

          catchError(err => {
            this.isRefreshing = false;
            return throwError(() => err);
          })
      );

    } else {
      return this.tokenSubject.pipe(
          filter(token => token != null),
          take(1),
          switchMap(token =>
              next.handle(this.addTokenToRequest(request, token!))
          )
      );
    }
  }
}
