import {HttpHeaders} from "@angular/common/http";

export var Aadhaar: number = -99;
export var EmailID: string = '-99';
export var MobileNumber: number = -99;
export const Golbal_CollegeCode: number = 1;
export const Global_LastFinYear: number = 2025;
export const Global_CurrentFinYear: number = 2026;

export const Admissionyear: string = '2023-2024';
export const Global_Webportname: string = 'STUDENTS';
export const Global_OUTSIDE = 'OUTSIDE';
export const Global_ATKT = 'ATKT';
export const Global_NONE = 'NONE';

// secret key : 467bd06c266d46bf

export const Global_FORMFEESTERMNAME = 9999;

export const Domainname = location.origin + location.pathname;

export const encrypt_key: string = '467bd06c266d46bf';
export const iv_key: string = '467bd06c266d46bf';

export const billdeskjs = 'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'


export const HTTP_json = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + sessionStorage.getItem("Token")
    })
}

new HttpHeaders({
    Authorization: 'token ' + sessionStorage.getItem('token'),
});
