import {environment}from '../../environments/environment';

const API_URL = environment.API_URL;

export var Serverlink = 'https://admission.rjcollege.edu.in';
export var ServerURL = location.origin + location.pathname;

const student_base_url = `${API_URL}/v1/Students/`;
const fees_base_url = `${API_URL}/v1/Fees/`;
const marksheet_base_url = `${API_URL}/v1/marksheet/`;
const marksheetprinting_base_url = `${API_URL}/v1/marksheetprinting/`;
const atkt_base_url = `${API_URL}/v1/atkt/`;
const abc_appar = `${API_URL}/v1/abc/`;
const common_base_url = `${API_URL}/v1/Common/`;
const billdesk_base_url = `${API_URL}/v1/Billdesk/`;
const eazy_base_url = `${API_URL}/v2/eazy/`;
const reports_base_url = `${API_URL}/v1/reports/`;

const query_URL = `${API_URL}queryapi`

// const myinstallments = `${API_URL}/v1/myinstallments/`;


// export const downloadstudentreceipt = 'https://admission.rjcollege.edu.in:7001/download_student_receipt';
// export const print_profile = 'https://admission.rjcollege.edu.in:7001/print_profile';
export const downloadstudentreceipt = environment.API_URL_RECIEPT + 'download_student_receipt';
export const print_profile = environment.API_URL_RECIEPT + 'print_profile';

export const Easy_url = {
  studentlogin: `${eazy_base_url}studentlogin`,
  sendotp: `${eazy_base_url}sendotp`,
  identifiervalidation: `${eazy_base_url}identifiervalidation`,
};

export const Billdesk_url = {
  atkt_formcallback: `${billdesk_base_url}atkt_formcallback`,
  Billdeskchecksum_atkt: `${billdesk_base_url}Billdeskchecksum_atkt`,
  run_queryapi_singlestudent: `${billdesk_base_url}run_queryapi_singlestudent`

};

export const Fees_url = {
  Feeslogin: `${fees_base_url}FeesLogin`,
  single_subject: `${fees_base_url}single_subject`,
  // paymentterms: `${fees_base_url}paymentterms`,
  ticketaction: `${fees_base_url}ticketaction`,
  ticketreplay: `${fees_base_url}ticketreplay`,
  ValidatePortalmessage_URL: `${fees_base_url}displayportalmessage`,
  ticketcategory: `${fees_base_url}ticketcategory`,
  meritlist: `${fees_base_url}meritlist`,
  formfees: `${fees_base_url}formfees`,
  Login: `${fees_base_url}FeesLogin`,
  subjectgroup_d_list: `${fees_base_url}subjectgroup_d_list`,
  subjectgroup_list: `${fees_base_url}subjectgroup_list`,
  bms_subject: `${fees_base_url}bms_subject`
}

export const Common_url = {
  finyear: `${common_base_url}Finyear`,
  Getselectedbatchs_url: `${common_base_url}Getselectedbatchs`,
  Pg_batchs_URL: `${common_base_url}pg_batchs`,
  BatchSubjects: `${common_base_url}BatchSubjects`,
  Bankmasters: `${common_base_url}Bankmasters`,
  Captch: `${common_base_url}Captch`,
  GetAllFirstYearBatchs: `${common_base_url}GetAllFirstYearBatchs`,
  College: `${common_base_url}College`,
  Batchs: `${common_base_url}GetAllBatchs`,
  studentuploadimage: `${common_base_url}studentuploadimage`,
  updateemail: `${common_base_url}updateemail`,
  sendemail: `${common_base_url}sendemail`,
  studentpictureupload: `${common_base_url}studentpictureupload`,
  sendotpemail: `${common_base_url}sendotpemail`,
  verifyemailotp: `${common_base_url}verifyemailotp`,
  sendotpsms: `${common_base_url}sendotpsms`,
  verifymobileotp: `${common_base_url}verifymobileotp`,
  sendotpemailv2: `${common_base_url}sendotpemailv2`,
  sendotpsmsv2: `${common_base_url}sendotpsmsv2`,
  verifymobileotpv2: `${common_base_url}verifymobileotpv2`,
  verifyemailotpv2: `${common_base_url}verifyemailotpv2`,
  Captchimage: `${common_base_url}Captchimage`,
  registertionbatchs: `${common_base_url}registertionbatchs`,
  batch: `${common_base_url}batch`,
  allbatchs: `${common_base_url}allbatchs`,
  GetAllBatchs: `${common_base_url}GetAllBatchs`,
  get_pincode: `${common_base_url}get_pincode`,
  dron_education: `${common_base_url}dron_education`,
  dron_exampattern: `${common_base_url}dron_exampattern`,
  dron_marksheetdetails: `${common_base_url}dron_marksheetdetails`,

  education_level: `${common_base_url}education_level`,
  marksheet_type: `${common_base_url}marksheet_type`,
}

export const Marksheet_url = {
  batchsemesterexamsubjects: `${marksheet_base_url}batchsemesterexamsubjects`,
  //IU_ATKTForm: `${marksheet_base_url}IU_ATKTForm`,
  IU_ATKTForm: `${marksheet_base_url}IU_ATKTForm_students`,
  atkt_formamount: `${marksheet_base_url}atkt_formamount`,
  atkt_formamount_batch: `${marksheet_base_url}atkt_formamount_batch`,
  batchuserexam: `${marksheet_base_url}batchuserexam`,
  excludecurrentfinyear: `${marksheet_base_url}excludecurrentfinyear`,
  download_batchsemestersubject: `${marksheet_base_url}download_batchsemestersubject`,
  exams: `${marksheet_base_url}exams`,
  uploadquestionpaper: `${marksheet_base_url}uploadquestionpaper`,
  semester: `${marksheet_base_url}semester`, //all
  batchsemestersubject: `${marksheet_base_url}batchsemestersubject`,
  batchwise_semester: `${marksheet_base_url}batchwise_semester`,
  studentsmarksheetlist: `${marksheet_base_url}studentsmarksheetlist`,
  printmarksheet: `${marksheet_base_url}printmarksheet`,
  printmarksheet_date: `${marksheet_base_url}printmarksheet_date`,
  // atktstudentspaper_semesterwise: `${marksheet_base_url}atktstudentspaper_semesterwise`,
  // check_atkt_close: `${marksheet_base_url}check_atkt_close`,
  // get_atktprefix: `${marksheet_base_url}get_atktprefix`,
  // atkt_formamount_batch: `${marksheet_base_url}atkt_formamount_batch`,

}

export const Students_url = {
  StudentReceiptDetailsv2: `${student_base_url}StudentReceiptDetailsv2`, //new
  Atkt_studentbatch: `${student_base_url}Atkt_studentbatch`,
  FormFeesPaid: `${student_base_url}FormFeesPaid`, //new
  StudentReceiptDetails: `${student_base_url}StudentReceiptDetails`, //new
  Paidbatchs: `${student_base_url}Paidbatchs`, //new
  PortalOpen: `${student_base_url}PortalOpen`, //new
  PortalOpenv1: `${student_base_url}PortalOpenv1`, //new
  CheckAdmission: `${student_base_url}CheckAdmission`, //new
  StudentProfileStatus: `${student_base_url}StudentProfileStatus`, //new
  // atktoutsideregistration: `${student_base_url}atktoutsideregistration`, //new

  GetOTP: `${student_base_url}GetOTP`,
  GetOTP_v1_url: `${student_base_url}GetOTPv1`,
  studentsforgotmobile: `${student_base_url}studentsforgotmobile`, //new forgotpasword resendotp
  ValidateOTP: `${student_base_url}ValidateOTP`,
  Validatemobileotp: `${student_base_url}Validatemobileotp`, //forgotpassword validate otp
  StudentLogin: `${student_base_url}Login`, //new
  studentactivefinyear: `${student_base_url}studentactivefinyear`, //new
  Forgotpassword: `${student_base_url}studentsforgotmobile`, //new
  ResetPassword: `${student_base_url}resetpassword`,
  CheckAdmission_URL: `${student_base_url}CheckAdmission`,
  IU_Admission: `${student_base_url}IU_Admission`,
  IU_nepAdmission: `${student_base_url}IU_nepadm`,
  Nepsubjects_url: `${student_base_url}nepsubjects`,
  StudentProfileStatus_url: `${student_base_url}StudentProfileStatus`,
  ProfileResources: `${student_base_url}ProfileResources`,
  IU_StudentProfile: `${student_base_url}IU_StudentProfile`,
  IU_Personalinfo: `${student_base_url}IU_Personalinfo`,
  IU_Personalinfo_junior: `${student_base_url}IU_Personalinfo_junior`,
  IU_Parents: `${student_base_url}IU_Parents`,
  IU_Address: `${student_base_url}IU_Address`,
  IU_Address_only: `${student_base_url}IU_Address_only`,
  IU_Nationalty: `${student_base_url}IU_Nationalty`,
  IU_Others: `${student_base_url}IU_Others`,
  get_personalinfo: `${student_base_url}get_personalinfo`,
  personalinfo: `${student_base_url}personalinfo`,
  education: `${student_base_url}education`,
  reservation: `${student_base_url}reservation`,
  IU_Reservations: `${student_base_url}IU_Reservations`,
  IU_Reservations_new: `${student_base_url}IU_Reservations_new`,
  IU_StudentEducation: `${student_base_url}IU_StudentEducation`,
  IU_StudentEducation_new: `${student_base_url}IU_StudentEducation_new`,

  GetEducationDetails: `${student_base_url}GetEducationDetails`,
  EducationDocuments: `${student_base_url}EducationDocuments`,
  UploadDocuments: `${student_base_url}UploadDocuments`,
  Registerbatch: `${student_base_url}Registerbatch`,
  ProfileSubmited: `${student_base_url}ProfileSubmited`,
  StudentBatch: `${student_base_url}StudentBatch`,
  studentbatchs: `${student_base_url}studentbatchs`, //internal marks
  studentbatchexams: `${student_base_url}studentbatchexams`, //internal marks
  Internalexammarks: `${student_base_url}internalexammarks`, //internal marks
  Studentmaxbatch: `${student_base_url}Studentmaxbatch`, //new
  StudentSubjectGroup: `${student_base_url}Selectbatchsubject`,
  IncrementalBatchSubjects: `${student_base_url}IncrementalBatchSubjects`,
  IncrementalBatchSubjects_v2: `${student_base_url}IncrementalBatchSubjects_v2`,
  Nextbatchsubjects: `${student_base_url}Nextbatchsubjects`,//new
  IsProfileSubmited_URL: `${student_base_url}IsProfileSubmited`,
  StudentMyProfile_URL: `${student_base_url}myprofilemultiplebatchs`,
  StudentAppliedCourses: `${student_base_url}StudentAppliedCourses`,
  Nextbatch: `${student_base_url}Nextbatch`,
  StudentFeesInstallment: `${student_base_url}StudentFeesInstallment`,
  BillDeskcheckSum: `${student_base_url}BillDeskcheckSum`,
  IU_receipt: `${student_base_url}IU_Receipt`,
  BillDeskcheckSumQuery: `${student_base_url}BillDeskcheckSumQuery`,
  CheckSubjectGroupQuota: `${student_base_url}CheckSubjectGroupQuota`,
  nepquotacheck: `${student_base_url}nepquotacheck`,
  StudentReceiptDetails_URL: `${student_base_url}StudentReceiptDetails`,
  AdmissionCancel_Request: `${student_base_url}AdmissionCancel_Request`,
  CancelRequestValidation: `${student_base_url}CancelRequestValidation`,
  Cancelledadmission: `${student_base_url}Cancelledadmission`,
  BilldeskFormPaymentCallback: `${student_base_url}BilldeskFormPaymentCallback`,
  FormFeesPaid_URL: `${student_base_url}FormFeesPaid`,
  Additionalsubjectformfees_URL: `${student_base_url}Additionalsubjectformfees`,
  formfeesreceivedv1_url: `${student_base_url}formfeesreceivedv1`,
  InstallmentValidation: `${student_base_url}InstallmentValidation`,
  checkoutstanding: `${student_base_url}checkoutstanding`,
  validateeliglibity: `${student_base_url}validateeliglibity`,
  Admissionstatus: `${student_base_url}Admissionstatus`,
  Feesattached: `${student_base_url}Feesattached`,
  validateadmissionstarted: `${student_base_url}validateadmissionstarted`,
  Paidfinyear: `${student_base_url}Paidfinyear`,
  Paidbatchs_URL: `${student_base_url}Paidbatchs`,
  StudentApprovedCourses: `${student_base_url}StudentApprovedCourses`,
  abcid: `${student_base_url}abcid`,
  studentabcdid: `${student_base_url}studentabcdid`,
  getabcid: `${student_base_url}getabcid`,
  studentabcdid_get: `${student_base_url}studentabcdid_get`,
  createticket: `${student_base_url}createticket`,
  ticketdetails: `${student_base_url}ticketdetails`,
  ticketmaster: `${student_base_url}ticketmaster`,
  getReciept: `${student_base_url}Atkt_studentreceipt`,
  EducationDocuments_URL: `${student_base_url}EducationDocuments`,
  studentimage: `${student_base_url}studentimage`,
  downloadquestionpaper: `${student_base_url}downloadquestionpaper`,
  Atkt_studentreceipt: `${student_base_url}Atkt_studentreceipt`,
  studentfeesinstallment_new: `${student_base_url}studentfeesinstallment_new`,
  Get_educationdetails: `${student_base_url}Get_educationdetails`,
  Upload_profile_photo: `${student_base_url}Upload_profile_photo`,
  allreceipts: `${student_base_url}allreceipts`,
  IU_personalsubmited: `${student_base_url}IU_personalsubmited`,
  singlereceipt: `${student_base_url}singlereceipt`,
  IU_educationsubmited: `${student_base_url}IU_educationsubmited`,
  IU_documentsubmited: `${student_base_url}IU_documentsubmited`,
  student_approvedlist: `${student_base_url}student_approvedlist`,
  IU_Changeprofilesubmit: `${student_base_url}IU_Changeprofilesubmit`,
  savestudentsubjects: `${student_base_url}savestudentsubjects`,
  student_selectedsubjectthird: `${student_base_url}student_selectedsubjectthird`,
  batchsubject_view: `${student_base_url}batchsubject_view`,
  Updatedata_resource: `${student_base_url}Updatedata_resource`,
  save_abc: `https://admission.rjcollege.edu.in:7005/v1/Students/save_abc`,

  iu_updateeducationtype: `${student_base_url}iu_updateeducationtype`,
  paymentterms: `${student_base_url}paymentterms`,

  StudentRegistration: `${student_base_url}StudentRegistration`, //new

  update_registration: `${student_base_url}update_registration`,
  yeargap:`${student_base_url}yeargap`,
  atktfound: `${student_base_url}atktfound`,

  myinstallments: `${student_base_url}myinstallments`,


  onlyregister_students: `${student_base_url}onlyregister_students`


}

export const Atkt_url = {
  atktstudentspaper_semesterwise: `${atkt_base_url}atktstudentspaper_semesterwise`,
  check_atkt_close: `${atkt_base_url}check_atkt_close`,
  get_atktprefix: `${atkt_base_url}get_atktprefix`,
  atkt_formamount_batch: `${atkt_base_url}atkt_formamount_batch`,
  atkt_formamount: `${atkt_base_url}atkt_formamount`,
  IU_ATKTForm: `${atkt_base_url}IU_ATKTForm_students`,

  // savestudentsubjects: `${atkt_base_url}savestudentsubjects`,

}

export const abcd_details = {
    abcaccountsbasicdetails : `${abc_appar}abcaccountsbasicdetails`,
    abc_oauth : `${abc_appar}abc_oauth`,
    createabcidbyaadhaar: `${abc_appar}createabcidbyaadhaar`,
}

export const MarksheetPrinting_Url = {
  printmarksheet_date: `${marksheetprinting_base_url}printmarksheet_date`,
}

export const reports_URl = {
  receipts: `${reports_base_url}receipts`
}

export const queryapi_URl = {
      run_queryapi_singlestudent: `${query_URL}run_queryapi_singlestudent`
}

