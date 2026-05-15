//https://www.cloudsigma.com/managing-http-requests-and-error-handling-with-angular-interceptors/
import {Injectable} from '@angular/core';

import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

import {Observable, switchMap, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    // private readonly authService = inject(AuthService);

    isRefreshing = false;

    constructor(private router: Router,private http: HttpClient) {

    }

    getAuthToken(): string {
        const userToken = sessionStorage.getItem('token');
        return userToken !== null ? userToken : ''
    }

    //https://www.bezkoder.com/logout-when-token-expired-angular-14/

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string |

        if (request.method == "POST") {
            if (request.headers.get('Anonymous') == 'no') {
                const newRequest = request.clone({
                    headers: request.headers.delete('Anonymous')
                        .set('X-Demo-Mode', environment.demoMode.toString())
                });
                return next.handle(newRequest);
            } else {
                const token = this.getAuthToken();
                if (token) {
                    if (!request.headers.has('Authorization')) {
                        request = request.clone({
                            headers: request.headers.set('Authorization', 'Bearer ' + token)
                                .set('X-Demo-Mode', environment.demoMode.toString())
                        });
                    }
                } else {
                    sessionStorage.clear();
                    this.router.navigate(['/login']);
                }
            }
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {

                    let r_token = request.headers.get('Authorization')

                    // this.handle401Error(request,next,r_token)

                    //Token expired or unauthorized
                    // sessionStorage.clear();
                    // localStorage.clear();
                    // this.router.navigate(['/login']);
                }

                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                Swal.fire({
                    title: 'Message!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                return throwError(() => error);
            }));
    }

    getRefreshToken(){

    }

    // private handle401Error(request: HttpRequest<any>, next: HttpHandler,r_token: string | null): Observable<HttpEvent<any>> {

        // if (!this.isRefreshing) {
        //     this.isRefreshing = true;
        //     // this.refreshTokenSubject.next(null);
        //
        //     return this.http.post<any>('https://103.38.39.204:5200/refresh_token', {
        //         // refresh_token: r_token
        //     }).pipe(
        //         switchMap((response) => {
        //             this.isRefreshing = false;
        //
        //             let newToken = response.accessToken;
        //             let newrefreoken = response.refreshToken;
        //
        //
        //             sessionStorage.setItem('token', newToken);
        //
        //             request.headers.set('Authorization', 'Bearer ' + newToken)
        //             localStorage.setItem('refresh_token', newToken);
        //
        //             this.refreshTokenSubject.next(newToken);
        //
        //             return next.handle(this.addToken(request, newToken));
        //         }),
        //         catchError((err) => {
        //             this.isRefreshing = false;
        //             this.logout();
        //             return throwError(() => err);
        //         })
        //     );
        // } else {
        //     // Wait until refresh is done
        //     return this.refreshTokenSubject.pipe(
        //         filter(token => token != null),
        //         take(1),
        //         switchMap(token => next.handle(this.addToken(request, token!)))
        //     );
        // }
    // }

    // private handle401Error() {
    //     sessionStorage.clear();
    //     localStorage.clear();
    //     this.router.navigate(['/login']);
    // }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //
    //   if (request.method == "POST") {
    //     if (request.headers.get('Anonymous') == 'no') {
    //
    //       const newHeaders = request.headers.delete('Anonymous')
    //       const newRequest = request.clone({headers: newHeaders});
    //       return next.handle(newRequest);
    //     } else {
    //       const token = this.getAuthToken();
    //
    //       if (token) {
    //
    //         if (!request.headers.has('Authorization')) {
    //           request = request.clone({
    //             headers: request.headers.set('Authorization', 'Bearer ' + token),
    //           });
    //
    //         }
    //       } else {
    //         sessionStorage.clear();
    //         this.router.navigate(['/login']);
    //       }
    //     }
    //   }
    //
    //   return next.handle(request).pipe(
    //     map((event: HttpEvent<any>) => {
    //       if (event instanceof HttpResponse) {
    //       }
    //       return event;
    //     }),
    //     catchError((error: HttpErrorResponse) => {
    //       let data = {};
    //       data = {
    //         reason: error && error.error && error.error.reason ? error.error.reason : '',
    //         status: error.status
    //       };
    //       Swal.fire({
    //         title: 'Message!',
    //         text: error.message,
    //         icon: 'error',
    //         confirmButtonText: 'OK',
    //       });
    //       return throwError(() => error);
    //     }));
    //
    //
    // }
}
