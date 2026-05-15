import {Injectable} from '@angular/core';
import Swal from "sweetalert2";
import {Observable, Subject, throwError} from "rxjs";
import {Common_url, Students_url} from "./global-api";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import * as myGlobals from "./global-variable";
import {Global_handleError} from "./global_utility";
import {ApiResponse, ApiResponse_data, Ires_updateresource, UpdateData} from "../models/response";
import {encryptUsingAES256} from "./encryptdata";

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  Batchs: any;
  private userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient,) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + sessionStorage.getItem("Token"),
    })
  }

  getBatches(): Observable<any> {
    return this.http.post<any>(Common_url.Batchs, '')
      .pipe(
        catchError(Global_handleError)
      )
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  Atkt_studentbatch(): Observable<any> {
    return this.http.post<any>(Students_url.Atkt_studentbatch, '', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  Post_json_data<T>(apiname: string, jsonin: any, isAnonymous = false): Observable<ApiResponse_data<T>> {

    console.log('jsss',jsonin)

    let input_payload = {
      Input: encryptUsingAES256(jsonin)
    };

    console.log('jsssinn',input_payload)


    return this.http
      .post<ApiResponse_data<T>>(apiname, input_payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Post_json_data<T>(apiname: string, jsonin: any, isAnonymous = false): Observable<ApiResponse<T>> {
  //
  //   let input_payload = {
  //     Input: encryptUsingAES256(jsonin)
  //   };
  //
  //   return this.http
  //       .post<ApiResponse<T>>(apiname, input_payload)
  //       .pipe(
  //           catchError(this.handleError)
  //       );
  // }


  Pincode(pincode: number, jsonin: any): Observable<any> {

    let url = `https://api.postalpincode.in/pincode/${pincode}`

    return this.http
        .get(url, jsonin)
        .pipe(
            catchError(this.handleError)
        );
  }

  Post_json_normal<T>(apiname: string, jsonin: any, isAnonymous = false): Observable<T> {

    let input_payload = {
      Input: encryptUsingAES256(jsonin)
    };

    return this.http
      .post<T>(apiname, input_payload, {
        withCredentials: true
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  Post_json_abc<T>(apiname: string, jsonin: any, isAnonymous = false): Observable<T> {


    return this.http
        .post<T>(apiname, jsonin, {
          withCredentials: true
        })
        .pipe(
            catchError(this.handleError)
        );
  }



  Post_json_withouttoken(apiname: string, jsonin: any): Observable<any> {
    let sWebportal = myGlobals.Domainname
    return this.http
      .post<any>(apiname, jsonin, {
        headers: {
          // 'Originname': location.origin,
          // 'Pathname': location.pathname,
          'Anonymous': 'no'
        }
      })
      .pipe(catchError(this.handleError));
  }

  //Post formdata
  Post_formdata_withouttoken(apiname: string, jsonin: any): Observable<any> {
    return this.http
      .post<any>(apiname, jsonin, {headers: {'Anonymous': 'no'}})
      .pipe(catchError(this.handleError));
  }

  Post_formdata(apiname: string, FormData: any): Observable<any> {
    return this.http
      .post<any>(apiname, FormData)
      .pipe(
        catchError(this.handleError));
  }

  Post_json_update_data(apiname: string, jsonin: any, isAnonymous = false): Observable<Ires_updateresource<UpdateData>> {
    return this.http
        .post<Ires_updateresource<UpdateData>>(apiname, jsonin)
        .pipe(
            catchError(this.handleError)
        );
  }

  handleError(error: HttpErrorResponse): Observable<any> {

    console.log('error1',error.error);
    if (error.error !== null) {


      console.log('error2',error.error);

      Swal.fire({title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK'})//alert
    } else {
      Swal.fire({title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK'})//alert
    }
    return throwError(error);
  }
}

// #####################         REDIRECTGUARD SERVICE          ####################
//
// @Injectable({
//   providedIn: 'root',
// })
// export class RedirectGuard implements CanActivate {
//   constructor(private router: Router, private authService: AuthService) {}
//
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     const userRole = this.authService.getUserRole();
//
//     if (userRole) {
//       if (userRole === 'MASTER') {
//         this.router.navigate(['/create-appointment']);
//         return false; // Prevent navigation for MASTER
//       } else if (userRole === 'STAFF') {
//         this.router.navigate(['/dashboard']); // Redirect STAFF to dashboard
//         return false; // Prevent navigation for STAFF
//       }
//     }
//
//     return true; // Allow navigation for other roles or unauthenticated users
//   }
// }
