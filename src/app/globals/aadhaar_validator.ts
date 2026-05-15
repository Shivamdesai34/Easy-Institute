import {AbstractControl, ValidationErrors} from "@angular/forms";

export function aadhaarValidator(control: AbstractControl): ValidationErrors | null {
  const aadhaar = control.value;
  const aadhaarRegex = /^[2-9]{1}[0-9]{11}$/; // Aadhaar starts with 2-9 and is 12 digits

  if (!aadhaar) return null; // don't validate empty fields here
  return aadhaarRegex.test(aadhaar) ? null : { invalidAadhaar: true };
}

export function mobileValidator(control: AbstractControl): ValidationErrors | null {
  const mobile = control.value;
  const mobileRegex = /^[6-9]\d{9}$/;

  if (!mobile) return null; // don't validate empty field
  return mobileRegex.test(mobile) ? null : { invalidMobile: true };
}

export function abcdidValidator(control: AbstractControl): ValidationErrors | null {
  const abcd_id = control.value;
  const abcdidRegex = /^[0-9]{1}[0-9]{11}$/; // Aadhaar starts with 2-9 and is 12 digits

  if (!abcd_id) return null; // don't validate empty fields here
  return abcdidRegex.test(abcd_id) ? null : { invalidAbcdid: true };
}

export function otpValidator(control: AbstractControl): ValidationErrors | null {
  const otp = control.value;
  const otpRegex = /^[0-9]{1}[0-9]{5}$/; // Aadhaar starts with 2-9 and is 6 digits

  if (!otp) return null; // don't validate empty fields here
  return otpRegex.test(otp) ? null : { invalidOTp: true };
}
