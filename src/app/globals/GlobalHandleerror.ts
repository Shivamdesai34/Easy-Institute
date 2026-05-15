import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

/*
// Error handling
export function handleError(error: HttpErrorResponse): Observable<any> {
  if (error.error !== null) {
    Swal.fire({ title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
  }
  else {
    Swal.fire({ title: 'Error!', text: error.url + error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert
  }
  return throwError(error);
}
*/

export function handleError(error: HttpErrorResponse): Observable<any> {
  if (error.error !== null) {
    Swal.fire({
      title: 'Error!',
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

// // Http Options with json
// export var httpOptionsJson = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   })
// }
// // Http Options With json and Token
// export var httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': "Token " + sessionStorage.getItem("Token")
//   })
// }

// // Http Options With only Token
// export var httpOptionsFormdata = {
//   headers: new HttpHeaders({
//     'Authorization': "Token " + sessionStorage.getItem("Token")
//   })
// }
