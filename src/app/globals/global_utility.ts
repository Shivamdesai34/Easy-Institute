import {base64StringToBlob} from 'blob-util';
import * as CryptoJS from "crypto-js";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import Swal from "sweetalert2";
import {SessionService} from "./sessionstorage";

export function UDownloadfiles(blobdata: string, filename: string) {

  const contentType = '';

  const blob_first = blobdata.substring(0, 200)
  // const cut_data = blobdata.substring(201,33)
  const last_date = blobdata.substring(232, blobdata.length)

  const mystring = blob_first + last_date
  const blobb = base64StringToBlob(mystring, contentType);
  let blob = new Blob([blobb], {type: 'application/blob'});
  var downloadURL = window.URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = downloadURL;
  link.download = filename;
  link.click();

}

export function systemdatav1(jsonstring: string) {

  const key = CryptoJS.enc.Utf8.parse('03c1e3bca08d4d61909de12baa0af4a9');
  const iv = CryptoJS.enc.Utf8.parse('4af59cac351a44e7');

  const encrypted = CryptoJS.AES.encrypt(jsonstring, key, {iv: iv});

  const encryptedData = encrypted.toString();

  return encryptedData;
}

export function systemdata(jsonstring: string): string {
  let _key = CryptoJS.enc.Utf8.parse('03c1e3bca08d4d61909de12baa0af4a9');
  let _iv = CryptoJS.enc.Utf8.parse('4af59cac351a44e7');
  let encrypted = CryptoJS.AES.encrypt(
    jsonstring, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();
}

export function systemdata_dec(jsonstring: string) {
  let _key = CryptoJS.enc.Utf8.parse('03c1e3bca08d4d61909de12baa0af4a9');
  let _iv = CryptoJS.enc.Utf8.parse('4af59cac351a44e7');
  /*
  this.decrypted = CryptoJS.AES.decrypt(
    this.encrypted, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

   */
}

export function Global_handleError(error: HttpErrorResponse): Observable<any> {
  if (error.status != 200) { //or whatever condition you like to put
    if (error.error !== null) {
      if (error.error.exception != "") {
        Swal.fire({
          title: 'Error exception', text: error.error.exception, icon: 'error',
          confirmButtonText: 'OK'
        })//alert
      }
    } else {
      Swal.fire({
        title: 'Error!', text: error.status + "Server Error!", icon: 'error',
        confirmButtonText: 'OK'
      })//alert
    }
  }

  return throwError(() => new Error('Something bad happened; please try again later.'));
}

export function Extractguid(blobstring: string): string {

  let blob_first = blobstring.substring(0, 200)
  let last_date = blobstring.substring(232, blobstring.length)
  let mystring = blob_first + last_date
  return mystring
}

export function ValidateFormfeesnotpaidProfilenotsubmitted( isprofilesubmitted: string,validate: string){
  // return false
  if(isprofilesubmitted == '' || isprofilesubmitted == 'false') return true;
  if(validate == 'NOTPAID' || isprofilesubmitted == '') return true;
  return true
}

export function  emailOrMobileValidator(control: any) {
  const value = control.value;

  if (!value) return null;

  const mobilePattern = /^[0-9]{10}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (mobilePattern.test(value) || emailPattern.test(value)) {
    return null;
  }

  return { invalidIdentifier: true };
}


