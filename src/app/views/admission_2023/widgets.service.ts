import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {
  Students_url

} from '../../globals/global-api';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  constructor(private http: HttpClient) {}


  // Http Options
  httpOptionsToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.getItem('Token'),
    }),
  };

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
