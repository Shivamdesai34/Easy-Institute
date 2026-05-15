
export interface ApiResponse<T> {
    statuscode: number;
    success: boolean;
    message: string;
    timestamp: string;
    data: T;
}

export interface ApiResponse_data<T> {
    data: T;
}

// export interface Ires_MarksheetLogin {
//     refreshtoken: string
//     menu_json: string,
//     access_token:string,
// }

export interface Ires_captcha {
    id: string
    image: string
}

export interface ISubjectName_json {
    "batch_code": number,
    "semester": number,
    "subject_code": number,
    "subject_name": string,
}

export class Paymentterms {
    message2!: string
    message3!: string
    message1!: string
    message4!: string
    paymentdetails!: Paymentdetail[]
}

export class Country {
    countryid!: number;
    countrycode!: string;
    countryname!: string;
    currencycode!: string;
}

export class Data {
    country!: Country[]
}


export interface AtktSubject {
    batchexam_id: number
    batch_code: number
    batch_name: string
    aadhaar: string
    subject_order: string
    subject_name: string
    semester: string
    papercode: string
    finyear: number
    college_code: number
    boardlevel: string
    examcode: number,
    examttype: string
}

export class Formamount {
    "formid": number
    "formamount": number
    "formcount": number
}

export interface Ires_atkt_formamount_batch {
    formid: number
    formamount: number
    formcount: number
    boardlevel: string
    examtype: string
}

export interface Iprefix_month {
    prefix_code: number
    prefix_month: string
    startdate: string
    enddate: string
    active: number
    perdaypenalty: number
    examtype: string
    penaltyamount: number
}

export interface IStudentpaymentIU {
    receipt_id: number
    receiptno: number
    transactionguid: string
    fullname: string
    billdeskaccountid: string
}

export class CSemester_outside {
    semester!: number
    totalcount!: number
    semesteramount!: number
}

export interface Istudentdetails {
    "batch_code": number,
    "batch_name": string,
    "batch_short": string,
    "course_code": number,
    "course_name": string,
    "batch_level": number,
    "batch_level_group": string,
    "old_batch_code": number,
    "formamount": number,
    "merchant": string,
    "merchant_accountid": string,
    "next_batch": number,
    "active": number,
    "stream": string,
    "udise_no": string,
    "boardlevel": string,
    "webportal": string,
    "admissionstarted": number,
    "outside_admission": number,
    "atkt_admission": number,
    "outside_message": string,
    "atkt_message": string,
    "previous_exambatchs": string,
    "semesters": string
}

export interface Istudentdetails_semesterwise {
    "batchexam_id": number,
    "batch_code": number,
    "batch_name": string,
    "aadhaar": number,
    "subject_order": number,
    "subject_name": string,
    "semester": number,
    "papercode": string,
    "boardlevel": string,
    "finyear": number
}

export type Req_IAtktsubects_inhouse = {
    atkt_formid: number,
    receipt_id: number,
    batchexam_id: number,
    batch_code: number,
    semester: number,
    subject_order: number,
    subject_name: string,
    papercode: string,
    finyear: number,
    subject_finyear: string,
    college_code: number,
    aadhaar: number,
    boardlevel: string,
    marksheet: number,
    specialisation: string,
    scale: string,
}

export interface IAtktsubjectdetails {
    "receipt_id": number,
    "finyear": number,
    "college_code": number,
    "aadhaar": number,
    "prefix_code": number,
    "receiptno": number,
    "transactionguid": string,
    "accountno": string,
    "billdeskid": number,
    "billdesktranid": string,
    "billdeskdate": string,
    "payment_mode": string,
    "receiptamount": number,
    "bank": string,
    "chequeno": string,
    "chequedate": string,
    "narration": string,
    "transcationmode": string,
    "errcode": string,
    "errorname": string,
    "batchexamid": string,
    "billdeskstatus": string,
    "billdeskerror": string,
    "createddate": string,
    "createdby": number,
    "formtype": string,
    "firstname": string,
    "lastname": string,
    "fathername": string,
    "mothername": string,
    "gender": string,
    "rollno": string,
    "prnno": string,
    "prefix_month": string,
    "batch_code": number,
    "semester": number,
    "mobileno": string,
    "subjects": number
}

export class AtktSubject_additional {
    "batchexam_id": number
    "batch_code": number
    "batch_name": string
    "aadhaar": string
    "subject_order": string
    "subject_name": string
    "semester": string
    "papercode": string
}

export class IgetAllBatchs {
    "batch_code": number
    "batch_name": string
    "batch_short": string
    "course_code": number
    "course_name": string
    "batch_level": number
    "batch_level_group": string
    "old_batch_code": number
    "formamount": number
    "merchant": string
    "merchant_accountid": string
    "next_batch": number
    "active": number
    "stream": string
    "udise_no": string
    "boardlevel": string
    "webportal": string
    "admissionstarted": number
    "outside_admission": number
    "atkt_admission": number
    "outside_message": string
    "atkt_message": string
    "previous_exambatchs": string
    "semesters": string
}

export interface IStudent_registration_new {
    college_code: number
    finyear: number
    aadhaar: number
    emailid: string
    mobilenumber: number
    student_password: string
    student_guid: string
    forgottoken: string
    otp: number
    otp_starttime: string
    otp_endtime: string
    existingstudent: number
    existingsubjectgroupcode: string
    existingbatchcode: number
    created_date: string
    inhouse: string
    hindilinguistic: string
    otp_validated: number
    studenttype: string
    coursetype: string
    batch_code: number
}

export interface Ires_logindata {
    collegecode: number
    aadhaar: number
    user_pwd: string
    creationdate: string
    createdby: string
    ipaddr: string
    editedby: string
    userrole: string
    user_name: string
    forgottoken: string
    imei: string
    approved: boolean
    student_registration_new: IStudent_registration_new
    token: string
    lastbatchcode: number
    lastfinyear: number
    admissionboard: string
}

export interface Imaxbatch {
    batch_code: number;
    batch_name: string;
    batch_short: string;
    course_code: number;
    course_name: string;
    batchlevel: number;
    batchlevelgroup: string;
    formamount: number;
    merchant: string;
    merchant_accountid: string;
    next_batch: number;
    active: boolean;
}

//Installment
export interface Ires_installments {
    freeship: string;
    installmentalreadypaid: boolean;
    installments: Installment[];
    message: string;
    terms: string

}

export interface Installment {
    header: Header;
    lineitem: Lineitem[];
}

export interface Lineitem {
    installment_id: number;
    lineitem: number;
    finyear: number;
    college_code: number;
    batch_code: number;
    term_code: number;
    term_name: string;
    fees_code: number;
    fees_name: string;
    installment: string;
    installmentuuid: string;
    amount: number;
}

export interface Header {
    batchname: string;
    batchuuid: string;
    fullname: string;
    emailid: string;
    mobile: string;
    installment_id: number;
    finyear: number;
    college_code: number;
    batch_code: number;
    term_code: number;
    term_name: string;
    installmentid: number;
    installmentuuid: string;
    installment: string;
    amount: number;
}

export interface Paymentterms {
    message1: string;
    message2: string;
    message3: string;
    message4: string;
    paymentdetails: Paymentdetail[];
}

export interface Paymentdetail {
    keyfieldname: string;
    keyvalue: string;
}

export interface Ires_batchinternal {
    batch_code: number;
    batch_name: string;
    batch_short: string;
    course_code: number;
    course_name: string;
    batch_level: number;
    batch_level_group: string;
    old_batch_code: number;
    formamount: number;
    merchant: string;
    merchant_accountid: string;
    next_batch: number;
    active: number;
    admissionstarted: number;
    stream: string;
    udise_no: string;
    outside_admission: boolean;
    atkt_admission: boolean;
    outside_message: string;
    atkt_message: string;
    previous_exambatchs: string;
    boardlevel: string;
}

export interface Ires_validateadmissionstarted {
    batch_code: number;
    batch_name: string;
    batch_short: string;
    course_code: number;
    course_name: string;
    batch_level: number;
    batch_level_group: string;
    old_batch_code: number;
    formamount: number;
    merchant: string;
    merchant_accountid: string;
    next_batch: number;
    active: number;
    stream: string;
    udise_no: string;
    boardlevel: string;
    webportal: string;
    admissionstarted: number;
    outside_admission: number;
    atkt_admission: number;
    outside_message: string;
    atkt_message: string;
    previous_exambatchs: string;
    semesters: string;
    documents: string;
    educationdetails: string;
    meritlist: string;
    admissionyear: number;
    profilereq: number;
    atkt_profilereq: number;
    outside_profilereq: number;
    useraadhaar: number;
    modifydate: string;
}

export interface Ires_allreciepts {
    receipt_id: number
    finyear: number
    college_code: number
    batch_code: number
    aadhaar: number
    term_code: number
    installment: number
    receiptno: number
    prefix_code: number
    billdeskid: number
    billdesktranid: string
    billdeskdate: string
    payment_mode: string
    transactionguid: string
    receiptamount: number
    createddate: string
    bank: string
    chequeno: string
    chequedate: string
    createdby: number
    narration: string
    transcationmode: string
    termmessage: string
    batch_name: string
    _selected?: boolean;
}


export interface IRes_singlereceipt {
    billdesktranid: string;
    receipt_id: number;
    installment_id: number;
    finyear: number;
    college_code: number;
    batch_code: number;
    term_code: number;
    term_name: string;
    installmentid: number;
    installment: string;
    amount: number;
    prefix_name: string;
    receiptno: string;
    receiptdate: string;
    aadhaar: number;
    fullname: string;
    batchname: string;
    mobile: number;
    email: string;
    totalfees: number;
    termmessage: string;
    lineitem: Lineitem_new[];
}

export interface Lineitem_new {
    installment_id: number;
    lineitem: number;
    finyear: number;
    college_code: number;
    batch_code: number;
    term_code: number;
    term_name: string;
    fees_code: number;
    fees_name: string;
    installment: string;
    amount: number;
}

export interface ApiResponse<T> {
    data: T;
}

export interface Iresp_Login {
    student_registration_new: StudentRegistrationNew
    minbatch: Minbatch
    maxbatch: Maxbatch
    updated_status: Ires_loginupdatedstatus
    noofyeargap: number
    studentstaus: string
    refreshtoken: string
    accesstoken:string,
    securitykey: string
}

export interface StudentRegistrationNew {
    college_code: number
    finyear: number
    aadhaar: number
    emailid: string
    mobilenumber: number
    student_password: string
    student_guid: string
    forgottoken: string
    otp: number
    otp_starttime: string
    otp_endtime: string
    existingstudent: number
    existingsubjectgroupcode: string
    existingbatchcode: number
    created_date: string
    inhouse: string
    hindilinguistic: string
    otp_validated: number
    studenttype: string
    coursetype: string
    batch_code: number
    batch_name: string
    admissionboard: string
    rationcard: number
    batch_level: number
    batchuuid: string
}

export interface Minbatch {
    finyear: number
    batch_name: string
    aadhaar: number
    batch_code: number
    admissionboard: string
    rationcard: number
    batch_level: number
    subject_group_code: string
    subject_group_id: string
    minor: number
    batchuuid: string
}

export interface Maxbatch {
    finyear: number
    batch_name: string
    aadhaar: number
    batch_code: number
    admissionboard: string
    rationcard: number
    batch_level: number
    subject_group_code: string
    subject_group_id: number
    minor: number
    batchuuid: string
}

export interface I_check_atkt {
    exam_Status: string
    penaltyamount: number
    tabstatus: string
}

export interface Send_jsonstudentsubject  {
    inputjsonarray :Ires_subjectlist[]
    finyear: number
    college_code: number
    aadhaar: number
    batch_code: number
    subject_group_id: number
    subject_group_code: string
    term_code: number
    applicationmode: string
    prefix_code: number
}


export interface Ires_subjectlist {
    finyear: number | undefined
    college_code: number | undefined
    aadhaar: number | undefined
    subject_detail_id: number
    batch_code: number
    batch_name: string
    subject_group_code: string
    major: string
    otherlevel: string
    otherlevelcode: number
    levelno: number
    levelnomenclature: string
    message: string
    quota_status: string
    subject_group_id: number
    subjectcatid: number
    subject_code: string
    subject_name: string
    semester: number
    subject_creditpoint: number
    practical_code: string
    practical_name: string
    practical_creditpoint: number
    mandatory: number
    createdby: number
    modifyby: number
    createdon: string
    modifyon: string
    verticalname: string
    noofoptionalsubject: number
}

export interface Ires_subjects {
    subject_group_id: number
    batch_code: number
    subject_group_code: string
    subject_group_name: string
    quota_status: string
    admission_quota: string
    feespaid_quota: string
    term_code: number
    creditpoints: number
}

export interface res_Batchs {
    batch_code: number
    batch_name: string
    batch_short: string
    course_code: number
    course_name: string
    batch_level: number
    batch_level_group: string
    formamount: number
    merchant: string
    merchant_accountid: string
    next_batch: string
    active: boolean
}

export interface Allbatchs {
    batch_code: number
    batch_name: string
    batch_short: string
    course_code: number
    course_name: string
    batch_level: number
    batch_level_group: string
    old_batch_code: number
    formamount: number
    merchant: string
    merchant_accountid: string
    next_batch: number
    active: number
    stream: string
    udise_no: string
    boardlevel: string
    webportal: string
    admissionstarted: number
    outside_admission: number
    atkt_admission: number
    outside_message: string
    atkt_message: string
    previous_exambatchs: string
    semesters: string
    documents: string
    educationdetails: string
    meritlist: string
}

export interface Ires_PhdBatchs {
    batch_code: number
    batch_name: string
    batch_short: string
    course_code: number
    course_name: string
    batch_level: number
    batch_level_group: string
    formamount: number
    merchant: string
    merchant_accountid: string
    next_batch: number
    active: boolean
    admissionstarted: boolean
    admissionyear: number
    outside_admission: boolean
    atkt_admission: boolean
}

export interface College {
    //CollegeCode : number
    collegecode: number
    name: string
    add1: string
    add2: string
    add3: string
    website: string
    logopath: string
}

export interface Ires_Reciept {
    receiptid: number
    receiptno: string
    msg: string
}

export interface PhdBatchs {
    batch_code: number
    batch_name: string
    batch_short: string
    course_code: number
    course_name: string
    batch_level: number
    batch_level_group: string
    formamount: number
    merchant: string
    merchant_accountid: string
    next_batch: number
    active: boolean
    admissionstarted: boolean
    outside_admission: boolean
    atkt_admission: boolean
}

export interface Childlevel_menu {
    arrayindex: number
    parent_order: number
    parent_name: string
    childlevel1_order: number
    childlevel2_order: number
    childlevel2_name: string
    childlevel2_url: string
    childlevel2_icon: string
    childlevel2_badge: string
    menukeys: string
}

export interface Child_menu {
    arrayindex: number
    parent_order: number
    parent_name: string
    childlevel1_order: number
    childlevel1_name: string
    childlevel1_url: string
    childlevel1_icon: string
    childlevel1_badge: string
    menukeys: string
    children: Childlevel_menu[]
}

export interface OTP {
    errormessage: string
    flag: number
    message: string
    aadhaar: number
    emailid: string
    mobile: string
    otp: string
    starttime: string
    endtime: string
}

export interface AdmissionQuotasubjectGroups {
    batch_code: number
    subject_group_id: number
    subject_group_code: string
    subject_group_name: string
    quota_status: string
}


export interface Ires_Courseapplied {
    batch_code: string
    batch_name: string
    subject_group_id: string
    subject_group_code: string
    subject_group_name: string
    receiptamount: number
    admission_status: string
}

export interface Ires_ApprovedCourse {
    batch_code: string
    batch_name: string
    subject_group_id: string
    subject_group_code: string
    subject_group_name: string
    atkt_message : string
    subjectgroupuuid : string
}

export interface Dashboard {
    batch_code: number
    batch_short: string
    batch_name: string
    subject_group_code: string
    subject_group_name: string
    formfeespaid: number
    profilecompleted: number
    documentapproved: number
    feesattached: number
    feespaid: number
}
export interface SubjectwiseStatus {
    batch_code: number
    batch_short: string
    batch_name: string
    subject_group_code: string
    subject_group_name: string
    formfeespaid: number
    profilecompleted: number
    documentapproved: number
    feesattached: number
    feespaid: number
    cancelled: number
    totaladmission: number
}

export interface Feesdetails {
    fees_code: number
    fees_name: string
    amount: number
}

export interface Tally_yearwise {
    billdeskdate: string
    fin_year: number
    total: number
}

export interface Tally_Feesdetails {
    billdeskdate: string
    fees_code: number
    fees_name: string
    fees_short: string
    amount: number
}

export interface Fees_Receiptmaster {
    receipt_id: number
    finyear: number
    college_code: number
    batch_code: number
    batch_name: string
    batch_level: string
    boardlevel: string
    batchuuid:string
    aadhaar: number
    term_code: number
    installment: number
    receiptno: number
    prefix_code: number
    billdeskid: number
    billdesktranid: string
    billdeskdate: string
    payment_mode: string
    transactionguid: string
    receiptamount: number
    createddate: string
    bank: string
    chequeno: string
    chequedate: string
    createdby: number
    narration: string
    transcationmode: string
    printreceiptno: string
}

export interface Ires_PaidBatchs {
    finyear: number
    batch_code: number
    batch_name: string
    installment: number
}

export interface Fees_receiptatkt {
    receipt_id: number
    finyear: number
    college_code: number
    aadhaar: number
    prefix_code: number
    receiptno: number
    transactionguid: string
    accountno: string
    billdeskid: number
    billdesktranid: string
    billdeskdate: string
    payment_mode: string
    receiptamount: number
    bank: string
    chequeno: string
    chequedate: string
    narration: string
    transcationmode: string
    errcode: string
    errorname: string
    batchexam_id: number
    billdeskstatus: string
    billdeskerror: string
    createddate: string
    createdby: number
    formtype: string
    firstname: string
    lastname: string
    fathername: string
    mothername: string
    gender: string
    rollno: string
    prnno: string
    prefix_month: string
    batch_code: number
    semester: number
    mobileno: string
    fullname: string
    batch_name: string
    billdeskresponse: string
    penaltyamt: number
    refund: number
    subjects: Resp_Atkt_subjects[]
    _selected?: boolean
}

export interface Resp_Atkt_subjects {
    atkt_formid: number
    receipt_id: number
    batchexam_id: number
    batch_code: number
    semester: number
    subject_order: number
    subject_name: string
    papercode: string
    finyear: number
    subject_finyear: string
    college_code: number
    aadhaar: number
    boardlevel: string
    batch_name: number
}

export interface Student_abcdid {
    studentaadhaar: string
    loginaadhaar: number
    finyear: number
    collegecode: number
    aadhaarname: string
    dob: string
    gender: string
    rollno: number
    mobileno: string
    abcdid: string
    approved_status: string
    useraadhaar: number
    createddate: string
    modifieddate: string
    reason: string
    blobdata: string
}

//3
export interface Students_marks {
    subject_order: number
    aadhaar: number
    marks: number
    examcode: number
    grade: string
    showgrade: number
    manual_grace: number
    atktfailpass: string
    totalmarks: number
}

export interface Student_subject {
    aadhaar: number
    subject_short: string
    subject_name: string
    subject_order: number
    papercode: string
    marks: Students_marks[]
}

export interface Semester {
    semester: number
}

export class Ires_Studentmarklist {
    finyear!: number;
    batch_code!: number;
    semester!: number;
    batchexam_id!: number;
    userexamname!: string;
    batch_name!: string;
    template!: string;
    aadhaar!: number;
    nextyeareligbility!: number;
    outstanding!: number;
    boardlevel!: string;
    batchuuid!: string;
    _selected?: boolean;
}

export interface Marksheet_convert {
    marks_id: number
    college_code: number
    finyear: number
    batch_code: number
    semester: number
    examcode: number
    subject_order: number
    aadhaar: number
    marks: number
    manual_grace: number
    manual_symbol: string
    subjectgrace: number
    nss_grace: number
    nss_symbol: string
    subject_grace: number
    subject_symbol: string
    condonation_grace: number
    condonation_symbol: string
    totalmarks: number
    pass_fail: number
    present_absent: string
    presentabsent: number
    subject_group_code: string
    useraadhaar: number
    grade: string
    gradepoint: number
    credit_points: number
    cg: number
    sgpa: number
    finalgrade: string
    createdon: string
    subject_short: string
    subject_name: string
    min_marks: number
    max_marks: number
    papercode: string
    totalorders: number
    batchexam_id: number
    rowtotal: number
    marks_required: number
    marks_requredcount: number
    data_id: number
    gracerule: string
    exempted: string
    atktfailpass: string
    creditearned: number
    converted_marks: number
    printmax: string
    printmin: string
    apecm: string
    totalgracemarks: number
    showdash: boolean
    showgrade: boolean
    convocation: string
    createddate: string
    modifydate: string
    percentage: number
}

export interface Marksheet_sgpaaadhaar {
    sgpa_id: number
    college_code: number
    finyear: number
    batch_code: number
    semester: number
    aadhaar: number
    sgpa: number
    creditearned: number
    overall_creditmulsgpa: number
    overall_cgpa: number
    overall_grade: string
    data_id: number
    batchexam_id: number
    fullname: string
    creditpoints: number
}

export interface Ires_Marksheet_marksinternal {
    marks_id: number
    data_id: number
    college_code: number
    finyear: number
    batch_code: number
    userexamid: number
    subject_order: number
    aadhaar: number
    marks: number
    present_absent: string
    presentabsent: number
}









export interface Fees_receiptatkt {
    receipt_id: number
    finyear: number
    college_code: number
    aadhaar: number
    prefix_code: number
    receiptno: number
    transactionguid: string
    accountno: string
    billdeskid: number
    billdesktranid: string
    billdeskdate: string
    payment_mode: string
    receiptamount: number
    bank: string
    chequeno: string
    chequedate: string
    narration: string
    transcationmode: string
    errcode: string
    errorname: string
    batchexamid: string
    billdeskstatus: string
    billdeskerror: string
    createddate: string
    createdby: number
    formtype: string
    firstname: string
    lastname: string
    fathername: string
    mothername: string
    gender: string
    rollno: string
    prnno: string
    prefix_month: string
    batch_code: number
    semester: number
    mobileno: string
    fullname: string
    batch_name: string
    billdeskresponse: string
    penaltyamt: number
    refund: number
    description: string
    subjects: Resp_Atkt_subjects[]
}

export interface Atkt_prefix {
    Prefix_code: number
    Prefix_month: string
    Startdate: string
    Enddate: string
    Active: number
    Perdaypenalty: number
    Examtype: string
    Penaltyamount: number
}

export interface Marksheet_atktstudents_formd {
    Atkt_formid: number
    Receipt_id: number
    College_code: number
    Finyear: number
    Aadhaar: string
    Batch_code: number
    Batchexam_id: number
    Semester: number
    Subject_order: number
    Papercode: string
    Subject_name: string
    Subject_finyear: string
    Boardlevel: string
    Registerfinyear: string
    Marksheetno: string
}

//55
export interface Mobileloggedin {
    Registered: number
    Token: string
}

export interface CreateUser {
    CollegeCode: number
    Aadhaar: number
    UserPwd: string
    UserRole: string
}

export interface Tickets {
    Ticketid: number
    Collegecode: number
    Finyear: number
    Aadhaar: number
    Ticketdate: string
    Category: string
    Ticketsubject: string
    Ticketdescription: string
    Replayuser: number
    Ticketstatus: string
    Assigneduser: number
}

export interface Ticketdetails {
    Ticketid: number
    Detailid: number
    Aadhaar: number
    Ticketdate: string
    Ticketdescription: string
    Replayuser: string
    Studentname: string
    Adminname: string
}

export interface Student_registration {
    Aadhaar: number
    EmailID: string
    MobileNumber: number
    StudentPassword: string
    CreatedDate: string
    StudentGuid: string
    Finyear: number
    College_code: number
    Forgottoken: string
    Otp: string
    OTP_starttime: string
    OTP_endtime: string
    ExistingStudent: number
    ExistingSubjectGroupCode: string
    Existingbatchcode: number
    Inhouse: string
    Hindilinguistic: string
}

export interface StudentRegistrationFees {
    Paid: number
}

export interface MyProfile {
    FullName: string
    Aadhaar: string
    Email: string
    Mobile: string
    Batch: string
    DOB: string
    PRN: string
    Gender: string
    MotherTongue: string
    Marital_Status: string
    Createdate: string
}

export interface Myprofile_new {
    FullName: string
    Aadhaar: string
    Email: string
    Mobile: string
    Batch: string
    DOB: string
    PRN: string
    Gender: string
    MotherTongue: string
    Marital_Status: string
    Createdate: string
}

export interface Admissionbatchs {
    batch_name: string
    aadhaar: number
    subject_group_code: string
    subject_group_name: string
    rollno: number
    batch_division: string
    totalpaid: number
    boardlevel: string
    otherlevel: string
}

export interface Education_Document {
    batch_code: number
    education_details: string
}

export interface Education_Document_new {
    batch_code: number
    education_details: string
    education_code: string
}

export interface Ires_Upload_Document {
    batch_code: number
    document_code: number
    document_name: string
    document_filename: string
    upload_status: string
}

export interface Installments_M {
    BatchName: string
    FullName: string
    Emailid: string
    Mobile: string
    Installment_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Term_code: number
    Term_Name: string
    Installmentid: number
    Installment: string
    Amount: number
}

export interface Fees_Installment {
    installment_id: number
    lineitem: number
    finyear: number
    college_code: number
    batch_code: number
    term_code: number
    term_name: string
    fees_code: number
    fees_name: string
    installment: string
    amount: number
}

export interface PaidInstallments_M {
    billdesktranid: string
    receipt_id: number
    installment_id: number
    finyear: number
    college_code: number
    batch_code: number
    term_code: number
    term_name: string
    installmentid: number
    installment: string
    amount: number
    prefix_name: string
    receiptno: string
    receiptdate: string
    fullname: string
    batchname: string
    mobile: string
    email: string
    totalfees: number
    lineitem: Fees_Installment[]
}

export interface Student_ProfileStatus {
    profile: Student_Profile
    education: boolean
    reservation: Student_Reservations
    profilecount: number
    profilesubmited: boolean
}

export interface Student_Profile {
    errormessage: string
    batch_name: string
    batch_code: number
    nextbatchcode: number
    finyear: number
    college_code: number
    aadhaar: number
    student_guid: string
    firstname: string
    lastname: string
    fathername: string
    mothername: string
    relationtype: string
    applicant_name_on_marksheet: string
    name_change_after_passing: string
    gender: string
    dob: string
    placeofbirth: string
    religion: string
    mothertongue: string
    marital_status: string
    nomineename: string
    nomineedob: string
    nomineerelation: string
    voterid: string
    pan: string
    educationgap: number
    maxqualification_family: string
    bloodgroup: string
    organ_donation: string
    correpondence_flatno: string
    correpondence_colonyname: string
    correpondence_villagename: string
    correpondence_landmark: string
    correpondence_location_area: string
    correpondence_country: string
    correpondence_state: string
    correpondence_district: string
    correpondence_taluka: string
    correpondence_city: string
    correpondence_pincode: number
    permanent_flatno: string
    permanent_colonyname: string
    permanent_villagename: string
    permanent_landmark: string
    permanent_location_area: string
    permanent_country: string
    permanent_state: string
    permanent_district: string
    permanent_taluka: string
    permanent_city: string
    permanent_pincode: number
    photo_path: string
    sign_path: string
    parentsemailid: string
    upload_aadhaar: string
    parentsmobile: number
    same_as_permenant: string
    country: string
    state: string
    fullname: string
    createddate: string
    editeddate: string
    occupation_guardian: string
    annual_income: string
    ebc: string
    abcid_aadhaar: number
    abcid_aadhaar_name: string
    aadhaarfilename: string
    signaturefilename: string
    photofilename: string
    profilesubmited: boolean
    profilesubmiteddate: string
}

export interface Student_Educations {
    aadhaar: number
    document_type: string
    board: string
    state: string
    education_board: string
    college_name: string
    datepass: string
    rollno: string
    marksheetno: string
    gradesormarks: string
    marksobtained: number
    outoff: number
    percentage: number
    finyear: number
    college_code: number
    createddate: string
    batchstream: string
}

export interface Student_Educations_new {
    aadhaar: number
    document_type: string
    board: string
    state: string
    education_board: string
    college_name: string
    datepass: string
    rollno: string
    marksheetno: string
    gradesormarks: string
    marksobtained: number
    outoff: number
    percentage: number
    finyear: number
    college_code: number
    createddate: string
    batchstream: string
    inhouse: string
    hindilinguistic: string
}

export interface Student_Reservations {
    errormessage: string
    aadhaar: number
    parallel_reservation: string
    category: string
    subcategory: string
    specially_abled: string
    percentage: number
    udid_no: string
    occupation_guardian: string
    annual_income: string
    ebc: string
    activity: string
    activityname: string
    participationlevels: string
    securedrank: string
    finyear: number
    college_code: number
}

export interface Students_FeesPaid {
    ErrorMessage: string
    Finyear: number
    CollegeCode: number
    Aadhaar: number
    BatchCode: number
    BatchName: string
    Subject_group_ID: number
    Subject_group_Code: string
    FormFeesPaid: number
    FeesPaid: number
    TermCode: number
}

export interface Students_FeesPaid_junior {
    ErrorMessage: string
    Finyear: number
    CollegeCode: number
    Aadhaar: number
    BatchCode: number
    BatchName: string
    Subject_group_ID: number
    Subject_group_Code: string
    FormFeesPaid: number
    FeesPaid: number
    TermCode: number
}

export interface BilldeskCallbackResponse {
    ErrorMessage: string
    Flag: number
    Msg: string
    Transactionid: number
    ReceiptNo: string
    Prefix: string
    Receiptdate: string
    Amount: string
    Mobile: string
    Email: string
    Fullname: string
    Aadhaar: string
}

export interface CancelAdmission {
    cancel_id: number
    finyear: number
    college_code: number
    batch_code: number
    aadhaar: number
    reason: string
    bankname: string
    accountholdername: string
    bankbranch: string
    ifsccode: string
    accountno: number
    createddate: string
    approvedby: number
    approveddate: string
}

export interface Ires_validateEligiblestudents {
    college_code: number;
    finyear: number;
    batch_code: number;
    aadhaar: number;
    eligiblestatus: number;
    eligible: string;
    message: string;
    admissionstated: number;
    incremental_batch: number;
}

export interface Res_Outstanding {
    lastyearbatchcode: number
    batch_code: number
    finyear: number
    outstanding: boolean
    amount: number
    aadhaar: number
}

export interface Login {
    Aadhaar: string
    UserRole: string
    User_Name: string
    Studenttype: string
    Coursetype: string
    Registerbatch: string
    Token: string
}

export interface Studenteducationdetails {
    Finyear: number
    College_code: number
    Aadhaar: number
    Document_Type: string
    Board: string
    State: string
    Education_board: string
    College_name: string
    Datepass: string
    RollNo: string
    MarksheetNo: string
    GradesOrMarks: string
    MarksObtained: number
    OutOff: number
    Percentage: number
    Createddate: string
    BatchStream: string
    Inhouse: string
    Hindilinguistic: string
}

export interface Fees_Installment_d {
    installment_id: number
    lineitem: number
    finyear: number
    college_code: number
    batch_code: number
    term_code: number
    term_name: string
    fees_code: number
    installment: string
    amount: number
}

export interface Fees_Installment_d_new {
    installment_id: number
    lineitem: number
    finyear: number
    college_code: number
    batch_code: number
    term_code: number
    term_name: string
    fees_code: number
    installmentid: number
    installment: string
    amount: number
}

export interface Student_profile_new {
    picture_blob: string
    aadhaar: number
    finyear: number
    college_code: number
    student_guid: string
    firstname: string
    lastname: string
    fathername: string
    mothername: string
    relationtype: string
    applicant_name_on_marksheet: string
    name_change_after_passing: string
    gender: string
    dob: string
    placeofbirth: string
    religion: string
    mothertongue: string
    marital_status: string
    nomineename: string
    nomineedob: string
    nomineerelation: string
    voterid: string
    pan: string
    educationgap: number
    maxqualification_family: string
    bloodgroup: string
    organ_donation: string
    correpondence_flatno: string
    correpondence_colonyname: string
    correpondence_villagename: string
    correpondence_landmark: string
    correpondence_location_area: string
    correpondence_country: string
    correpondence_state: string
    correpondence_district: string
    correpondence_taluka: string
    correpondence_city: string
    correpondence_pincode: number
    permanent_flatno: string
    permanent_colonyname: string
    permanent_villagename: string
    permanent_landmark: string
    permanent_location_area: string
    permanent_country: string
    permanent_state: string
    permanent_district: string
    permanent_taluka: string
    permanent_city: string
    permanent_pincode: number
    photo_path: string
    sign_path: string
    parentsemailid: string
    upload_aadhaar: string
    parentsmobile: number
    same_as_permenant: string
    country: string
    state: string
    fullname: string
    occupation_guardian: string
    annual_income: string
    ebc: string
    createddate: string
    editeddate: string
    profilesubmited: number
    profilesubmiteddate: string
    admissionbatchs: Admissionbatchs[]
}

export interface Student_registration_new {
    college_code: number
    finyear: number
    aadhaar: number
    emailid: string
    mobilenumber: number
    student_password: string
    student_guid: string
    forgottoken: string
    otp: string
    otp_starttime: string
    otp_endtime: string
    existingstudent: number
    existingsubjectgroupcode: string
    existingbatchcode: number
    created_date: string
    inhouse: string
    hindilinguistic: string
    otp_validated: number
    studenttype: string
    coursetype: string
    batch_code: number
}

export interface Ires_nepminorsubjects {
    batch_code: number
    batch_name: string
    subject_group_code: string
    major: string
    otherlevel: string
    otherlevelcode: number
    levelno: number
    levelnomenclature: string
    message: string
    quota_status: string
}

export interface Ires_Profilesubmited {
    profilesubmited: boolean
    submitedyear: number
}

export interface Res_ProfileResources {
    bloodgroup: string[];
    college_university: string[];
    college_code: number;
    finyear: number;
    freeship: string[];
    grade_marks: string[];
    list_of_boards: string[];
    location_area: string[];
    marital_status: string[];
    nominee_relation: string[];
    relation_type: string[];
    religion: string[];
    state: string[];
    activity: string[];
    annual_income: string[];
    category: string[];
    country: string[];
    district: string[];
    mother_tongue: string[];
    occupation_guardian: string[];
    parallel_horizontal_reservation: string[];
    participation_level: string[];
    secured_rank: string[];
    sex: string[];
    specially_abled: string[];
}

export interface copyData {
    board: string;
    state : string;
}

export interface Iresp_Formfees {
    message: string;
    fees_receiptmaster: Fees_Receiptmaster
    student_registration_new: Student_registration_new
}

export interface Student_Documents_Education {
    education: Education_Document[]
    uploaddocuments: Ires_Upload_Document[]
}

export interface Ires_Batchs {
    batch_code: number;
    batch_name: string;
    batch_short: string;
    course_code: number;
    course_name: string;
    batchlevel: number;
    batchlevelgroup: string;
    formamount: number;
    merchant: string;
    merchant_accountid: string;
    next_batch: number;
    active: boolean;
}

export interface Ires_personalinfo {
    aadhaar: number;
    finyear: number;
    college_code: number;
    firstname: string;
    lastname: string;
    fathername: string;
    mothername: string;
    relationtype: string;
    applicant_name_on_marksheet: string;
    name_change_after_passing: string;
    gender: string;
    dob: string;
    mothertongue: string;
    marital_status: string;
    placeofbirth: string;
    religion: string;
    parentsubmited: boolean
    addresssubmited: boolean
    nationalitysubmited: boolean
    othersubmited: boolean
    photosubmited: boolean
    pagesubmited: boolean
    educationsubmited: boolean
    documentsubmited: boolean
    reservationsubmited: boolean
    inhouse: string
    hindilinguistic: string
    profilesubmited: boolean
    profilesubmiteddate: string
    dydeno: string
    apaarid: string
    photo_image: string
    signature_image: string
    address: Ires_getAddress
    nationality: Ires_Nationality
    parents: Ires_parents
    other: Ires_others
    reservation: Ires_reservation
}

export interface Ires_getAddress {
    finyear: number;
    college_code: number;
    aadhaar: number;
    correpondence_flatno: string;
    correpondence_colonyname: string;
    correpondence_villagename: string;
    correpondence_landmark: string;
    correpondence_location_area: string;
    correpondence_country: string;
    correpondence_state: string;
    correpondence_district: string;
    correpondence_taluka: string;
    correpondence_city: string;
    correpondence_pincode: number;
    permanent_flatno: string;
    permanent_colonyname: string;
    permanent_villagename: string;
    permanent_landmark: string;
    permanent_location_area: string;
    permanent_country: string;
    permanent_state: string;
    permanent_district: string;
    permanent_taluka: string;
    permanent_city: string;
    permanent_pincode: number;
    same_as_permenant: string;
}

export interface Ires_others {
    finyear: number;
    college_code: number;
    aadhaar: number;
    voterid: string;
    pan: string;
    educationgap: string;
    bloodgroup: string;
    maxqualification_family: string;
    organ_donation: string;
}

export interface Ires_parents {
    finyear: number;
    college_code: number;
    aadhaar: number;
    parentsemailid: string;
    parentsmobile: number;
    relationtype: string;
    occupation_guardian: string;
    annual_income: string;
    ebc: string;
}

export interface Ires_Nationality {
    finyear: number;
    college_code: number;
    aadhaar: number;
    nomineename: string;
    nomineedob: string;
    nomineerelation: string;
    country: string;
    state: string;
}

export interface Ires_reservation {
    finyear: number;
    college_code: number;
    aadhaar: number;
    parallel_reservation: string;
    category: string;
    subcategory: string;
    specially_abled: string;
    percentage: number;
    udid_no: string;
    activity: string;
    activityname: string;
    participationlevels: string;
    securedrank: string;
    reservation_submited: string;
}

export interface Ires_education {
    finyear: number;
    college_code: number;
    aadhaar: number;
    document_type: string;
    document_code: number;
    checkpercentagesgpa: string;
    sgpa: number;
    sgpa_percentage: number;
    board: string;
    state: string;
    education_board: string;
    college_name: string;
    datepass: string;
    rollno: string;
    marksheetno: string;
    gradesormarks: string;
    marksobtained: number;
    outoff: number;
    percentage: number;
    createddate: string;
    batchstream: string;
    inhouse: string;
    hindilinguistic: string;
    rowsubmited: boolean;
    uploadedfilename: string
}

export interface Student_abcdid {
    studentaadhaar: string
    loginaadhaar: number
    finyear: number
    collegecode: number
    aadhaarname: string
    dob: string
    gender: string
    rollno: number
    mobileno: string
    abcdid: string
    approved_status: string
    useraadhaar: number
    createddate: string
    modifieddate: string
    reason: string
    blobdata: string
}

export interface Ires_registerbatch {
    batch_code: number;
    batch_name: string;
    batch_short: string;
    batchuuid: string;
    course_code: number;
    course_name: string;
    batch_level: number;
    batch_level_group: string;
    old_batch_code: number;
    formamount: number;
    merchant: string;
    merchant_accountid: string;
    next_batch: number;
    active: number;
    stream: string;
    udise_no: string;
    boardlevel: string;
    webportal: string;
    admissionstarted: number;
    outside_admission: number;
    atkt_admission: number;
    outside_message: string;
    atkt_message: string;
    previous_exambatchs: string;
    semesters: string;
    documents: string;
    educationdetails: string;
    meritlist: string;
    admissionyear: number;
    profilereq: number;
    atkt_profilereq: number;
    outside_profilereq: number;
    useraadhaar: number;
    modifydate: string;
    runtime_incrementalbatch: boolean;
}

//PErsonal detail
export interface Ires_education {
    finyear: number
    college_code: number
    aadhaar: number
    document_type: string
    board: string
    state: string
    education_board: string
    college_name: string
    datepass: string
    rollno: string
    marksheetno: string
    gradesormarks: string
    marksobtained: number
    outoff: number
    percentage: number
    createddate: string
    batchstream: string
    inhouse: string
    hindilinguistic: string
}

export interface Res_Document {
    college_code: number
    finyear: number
    aadhaar: number
    batch_code: number
    document_code: number
    document_name: string
    document_status: string;
}

export interface Ires_personaldata {
    finyear: number
    college_code: number
    aadhaar: number
    firstname: string
    lastname: string
    fathername: string
    mothername: string
    relationtype: string
    applicant_name_on_marksheet: string
    name_change_after_passing: string
    gender: string
    dob: string
    mothertongue: string
    marital_status: string
    placeofbirth: string
    religion: string
    profilesubmiteddate: string
    profilesubmited: boolean
    parentsubmited: boolean
    addresssubmited: boolean
    nationalitysubmited: boolean
    othersubmited: boolean
    photosubmited: boolean
    educationsubmited: boolean
    documentsubmited: boolean
    pagesubmited: boolean
    reservationsubmited: boolean
    photo_image: string
    signature_image: string
    address: Address
    parents: Parents
    nationality: Nationality
    other: Other
    reservation: Reservation
    education: Ires_education[]
    document: Res_Document[]
}

export interface Address {
    finyear: number
    college_code: number
    aadhaar: number
    correpondence_flatno: string
    correpondence_colonyname: string
    correpondence_villagename: string
    correpondence_landmark: string
    correpondence_location_area: string
    correpondence_country: string
    correpondence_state: string
    correpondence_district: string
    correpondence_taluka: string
    correpondence_city: string
    correpondence_pincode: number
    permanent_flatno: string
    permanent_colonyname: string
    permanent_villagename: string
    permanent_landmark: string
    permanent_location_area: string
    permanent_country: string
    permanent_state: string
    permanent_district: string
    permanent_taluka: string
    permanent_city: string
    permanent_pincode: number
    same_as_permenant: string
}

export interface Parents {
    finyear: number
    college_code: number
    aadhaar: number
    parentsemailid: string
    parentsmobile: number
    occupation_guardian: string
    annual_income: string
    relationtype: string
    ebc: string
}

export interface Nationality {
    finyear: number
    college_code: number
    aadhaar: number
    nomineename: string
    nomineedob: string
    nomineerelation: string
    country: string
    state: string
}

export interface Other {
    finyear: number
    college_code: number
    aadhaar: number
    voterid: string
    pan: string
    educationgap: string
    bloodgroup: string
    maxqualification_family: string
    organ_donation: string
}

export interface Reservation {
    finyear: number
    college_code: number
    aadhaar: number
    parallel_reservation: string
    category: string
    subcategory: string
    specially_abled: string
    percentage: number
    udid_no: string
    activity: string
    activityname: string
    participationlevels: string
    securedrank: string
    "opencategory": boolean,
    "checkotherreservation": boolean,
    "checkspeciallyabled": boolean
}

// export interface IRes_myprofilemultiplebatchs {
//     picture_blob: string
//     aadhaar: number
//     finyear: number
//     college_code: number
//     student_guid: string
//     firstname: string
//     lastname: string
//     fathername: string
//     mothername: string
//     relationtype: string
//     applicant_name_on_marksheet: string
//     name_change_after_passing: string
//     gender: string
//     dob: string
//     placeofbirth: string
//     religion: string
//     mothertongue: string
//     marital_status: string
//     nomineename: string
//     nomineedob: string
//     nomineerelation: string
//     voterid: string
//     pan: string
//     educationgap: number
//     maxqualification_family: string
//     bloodgroup: string
//     organ_donation: string
//     correpondence_flatno: string
//     correpondence_colonyname: string
//     correpondence_villagename: string
//     correpondence_landmark: string
//     correpondence_location_area: string
//     correpondence_country: string
//     correpondence_state: string
//     correpondence_district: string
//     correpondence_taluka: string
//     correpondence_city: string
//     correpondence_pincode: number
//     permanent_flatno: string
//     permanent_colonyname: string
//     permanent_villagename: string
//     permanent_landmark: string
//     permanent_location_area: string
//     permanent_country: string
//     permanent_state: string
//     permanent_district: string
//     permanent_taluka: string
//     permanent_city: string
//     permanent_pincode: number
//     photo_path: string
//     sign_path: string
//     parentsemailid: string
//     upload_aadhaar: string
//     parentsmobile: number
//     same_as_permenant: string
//     country: string
//     state: string
//     fullname: string
//     occupation_guardian: string
//     annual_income: string
//     ebc: string
//     createddate: string
//     editeddate: string
//     profilesubmited: number
//     profilesubmiteddate: string
//     admissionbatchs: Admissionbatchs[]
// }

export interface IRes_myprofilemultiplebatchs {
    picture_blob: string
    student_profile_new: StudentProfileNew
    admissionbatchs: Admissionbatch[]
}

export interface StudentProfileNew {
    aadhaar: number
    finyear: number
    college_code: number
    student_guid: string
    firstname: string
    lastname: string
    fathername: string
    mothername: string
    relationtype: string
    applicant_name_on_marksheet: string
    name_change_after_passing: string
    gender: string
    dob: string
    placeofbirth: string
    religion: string
    mothertongue: string
    marital_status: string
    nomineename: string
    nomineedob: string
    nomineerelation: string
    voterid: string
    pan: string
    educationgap: number
    maxqualification_family: string
    bloodgroup: string
    organ_donation: string
    correpondence_flatno: string
    correpondence_colonyname: string
    correpondence_villagename: string
    correpondence_landmark: string
    correpondence_location_area: string
    correpondence_country: string
    correpondence_state: string
    correpondence_district: string
    correpondence_taluka: string
    correpondence_city: string
    correpondence_pincode: number
    permanent_flatno: string
    permanent_colonyname: string
    permanent_villagename: string
    permanent_landmark: string
    permanent_location_area: string
    permanent_country: string
    permanent_state: string
    permanent_district: string
    permanent_taluka: string
    permanent_city: string
    permanent_pincode: number
    photo_path: string
    sign_path: string
    parentsemailid: string
    upload_aadhaar: string
    parentsmobile: number
    same_as_permenant: string
    country: string
    state: string
    fullname: string
    occupation_guardian: string
    annual_income: string
    ebc: string
    createddate: string
    editeddate: string
    profilesubmited: number
    profilesubmiteddate: string
}

export interface Admissionbatch {
    batch_name: string
    aadhaar: number
    subject_group_code: string
    subject_group_name: string
    rollno: number
    batch_division: string
    totalpaid: number
    boardlevel: string
    otherlevel: string
}


export interface res_singlebatch {
    batch_code: number
    batch_name: string
    batch_short: string
    course_code: number
    course_name: string
    batch_level: number
    batch_level_group: string
    old_batch_code: number
    formamount: number
    merchant: string
    merchant_accountid: string
    next_batch: number
    nextbatchuuid: string
    active: number
    stream: string
    udise_no: string
    boardlevel: string
    webportal: string
    admissionstarted: number
    outside_admission: number
    atkt_admission: number
    outside_message: string
    atkt_message: string
    previous_exambatchs: string
    semesters: string
    documents: string
    educationdetails: string
    meritlist: string
    admissionyear: number
    profilereq: number
    atkt_profilereq: number
    outside_profilereq: number
    useraadhaar: number
    modifydate: string
    rationcard: number
    admissionboard: string
    nep: number
    batchuuid: string
}

export interface Ires_pgBatchs {
    Batch_Code: number
    Batch_Name: string
    Batch_Short: string
    Course_Code: number
    Course_Name: string
    Batch_Level: number
    Batch_Level_Group: string
    FormAmount: number
    Merchant: string
    Merchant_AccountID: string
    Next_Batch: number
    Active: boolean
    Admissionstarted: boolean
    Outside_admission: boolean
    Atkt_admission: boolean
}

export interface Ires_studentapprovelist {
    college_code: number;
    finyear: number;
    aadhaar: number;
    batch_code: number;
    rollno: number;
    admission_status: string;
    batch_name: string;
}

export class CSemester {
    Semester!: number
    Totalcount!: number
    Semesteramount!: number
}

export interface Ires_login_v2 {
    College_code: number
    Finyear: number
    EmailID: string
    MobileNumber: number
    Student_Password: string
    Student_Guid: string
    Forgottoken: string
    OTP: number
    OTP_starttime: string
    OTP_endtime: string
    ExistingStudent: number
    ExistingSubjectGroupCode: string
    Existingbatchcode: number
    Created_Date: string
    Inhouse: string
    Hindilinguistic: string
    OTP_Validated: number
    Studenttype: string
    Coursetype: string
    Batch_code: number
    Batch_name: string
    Admissionboard: string
    Rationcard: number
    Batch_level: number
    Collegecode: number
    User_pwd: string
    Creationdate: string
    Createdby: string
    Ipaddr: string
    Edit: string
    Userrole: string
    User_name: string
    Imei: string
    Approved: boolean
    Token: string
}

export interface Allbatchs {
    batch_code: number
    batch_name: string
    batch_short: string
    course_code: number
    course_name: string
    batch_level: number
    batch_level_group: string
    old_batch_code: number
    formamount: number
    merchant: string
    merchant_accountid: string
    next_batch: number
    active: number
    stream: string
    udise_no: string
    boardlevel: string
    webportal: string
    admissionstarted: number
    outside_admission: number
    atkt_admission: number
    outside_message: string
    atkt_message: string
    previous_exambatchs: string
    semesters: string
    documents: string
    educationdetails: string
    meritlist: string
    admissionyear: number
    profilereq: number
    atkt_profilereq: number
    outside_profilereq: number
    useraadhaar: number
    modifydate: string
    rationcard: number
    admissionboard: string
    nep: number
}

export interface AdmissionQuotasubjectGroups {
    batch_code: number
    subject_group_id: number
    subject_group_code: string
    subject_group_name: string
    quota_status: string
}

export interface Banks_new {
    bank: string
}

export interface ApprovedCourse {
    batch_code: string
    batch_name: string
    subject_group_id: string
    subject_group_code: string
    subject_group_name: string
}

export interface Subjects_group_h {
    subject_group_id: number
    batch_code: number
    subject_group_code: string
    subject_group_name: string
    subjectgroupuuid: string
    quota_status: string
    admission_quota: string
    feespaid_quota: string
    term_code: number
    creditpoints: number
}

export interface Fees_Receiptmaster {
    receipt_id: number
    finyear: number
    college_code: number
    batch_code: number
    aadhaar: number
    term_code: number
    installment: number
    receiptno: number
    prefix_code: number
    billdeskid: number
    billdesktranid: string
    billdeskdate: string
    payment_mode: string
    transactionguid: string
    receiptamount: number
    createddate: string
    bank: string
    chequeno: string
    chequedate: string
    createdby: number
    narration: string
    transcationmode: string
    printreceiptno: string
}

export interface download_files {
    excelfile: string
    blobdata: string
}

export interface Subject_group_d {
    batch_code: number
    batch_name: string
    subject_group_code: string
    major: string
    otherlevel: string
    otherlevelcode: number
    levelno: number
    levelnomenclature: string
    message: string
    quota_status: string
}

export interface IRes_downloadsinglereceipt {
    image: string
    filename: string
}

export interface IRes_profileprint {
    image: string
    filename: string
}

export interface IRes_batchviewsubject {
    subject_detail_id: number
    batch_code: number
    batch_name: string
    subject_group_code: string
    major: string
    otherlevel: string
    otherlevelcode: number
    levelno: number
    levelnomenclature: string
    message: string
    quota_status: string
    subject_group_id: number
    subjectcatid: number
    subject_code: string
    subject_name: string
    semester: number
    subject_creditpoint: number
    practical_code: string
    practical_name: string
    practical_creditpoint: number
    messages: string
    mandatory: number
    createdby: number
    modifyby: number
    createdon: string
    modifyon: string
    subject_active: number
}

export interface Ires_updateresource<UpdateData> {
    update_data: UpdateData[];
}

export interface UpdateData {
    mobile?: string
    email?: string
    picture?: string
    profile?: string
}

export interface Ires_authabcd {
    access_token: string
    token_type: string
    expires_in: string
    encrypt_key: string
}

export interface Ires_accountbasicdetails{
    status: number
    statuscode: string
    message: string
    abc_account_id: string
    cname: string
    gender: string
    dob: string
    credit_points: number
    phone_number: string
    created_date: string
    university_name: string
    course_name: string
    program_name: string
    enrollment_no: string
}

export interface Ires_accountdetails{
    status: number
    statuscode: string
    message: string
    ABC_ACCOUNT_ID: string
    CNAME: string
    GENDER: string
    DOB: string
    CREATED_DATE: string
    UNIVERSITY_NAME: string
    COURSE_NAME: string
    PROGRAM_NAME: string
    ENROLLMENT_NO: string
    ROLL_NO: string
    REGN_NO: string
}

export interface Ires_createabcd {
    status: string
    statuscode: string
    message: string
    abc_account_id: string
}

export interface gender{
    value: string | undefined
    label: string | undefined
}

export interface Ires_loginupdatedstatus {
    aadhaar: number
    admission_batch: number
    admission_batchlevel: number
    admission_year: number
    admission_boardlevel: string
    admission_batchuuid: string
    current_batch: number
    current_level: number
    current_year: number
    current_boardlevel: string
    current_batchuuid: string
}

export interface Ires_iuupdatededucationtype {
    batch_code: number,
    education_code: number,
    mandatory: number,
    color: string,
    education_details: string,
    education_level: string,
    marksheet_type: string
}


// Not Used

export interface IYear {
    "Finyear": number,
    "FinyearName": string,
    "Fromdate": string,
    "Todate": string,
    "Lockfinyear": null
    Name: string,
}

export interface ILogindetail {
    "Aadhaar": string,
    "UserRole": string,
    "User_Name": string,
    "Studenttype": string,
    "Coursetype": string,
    "Registerbatch": string,
    "Token": string,
}

export class Paymentdetails {
    keyfieldname!: string
    keyvalue!: string
}

export interface Fin_year_new {
    Finyear: number
    Finyear_name: string
    Fromdate: string
    Todate: string
    Lockfinyear: number
}

export interface Ires_installment {
    Freeship: string
    InstallmentAlreadyPaid: boolean
    Installments: string
    Message: string
}

export interface Ires_droneducation {
    data:string[]
    status: boolean
}

export interface Enrollment {
    Enrollmentno: number
    Abcid_aadhaar: number
    Abcid_aadhaar_name: string
}

export interface Ssgpa {
    Aadhaar: number
    Semester: number
    Sgpa: number
    Creditearned: number
    Overall_creditmulsgpa: number
    Overall_cgpa: number
    Overall_grade: string
    Examdate: string
    Userexamname: string
    Fullname: string
    Mul_sgpa_ce: number
    Key_as: string
}

export interface SMarks {
    Batchexam_id: number
    Aadhaar: number
    Examcode: number
    Subject_order: number
    Marks: number
    Present_absent: string
    Grade: string
    Gradepoint: number
    Credit_points: number
    Cg: number
    Sgpa: number
    Finalgrade: string
    Atktfailpass: string
    Creditearned: number
    Totalmarks: number
    Semester: number
    Condonation_grace: number
    Converted_marks: number
    Printmarks: string
    Manual_grace: string
    Juniormarks: string
    Fullname: string
    RollNo: number
    Batchdivision: string
}

export interface SStudents {
    Aadhaar: number
    Batch_division: string
    Rollno: number
    Fullname: string
    Semester: number
    Examcode: number
    Subject_order: number
    Sportstaken: boolean
    Nss_ncc: boolean
    Markscale: string
    Prnno: string
    Grnno: string
    Convocation: string
}

export interface SStudentsubjects {
    Subject_order: number
    Aadhaar: number
}

export interface SGroupsubjects {
    Subjectorder: string
    Subjectname: string
    Subjectcomma: string
    Maxmarks: string
    Minmarks: string
    Rollno: number
    Maxtotal: number
    Mintotal: number
}

export interface SMarksheetconfig {
    Subject_order: string
    Subject_name: string
    Papercode: string
    Examcode: number
    Max_marks: number
    Min_marks: number
}

export interface Marksheet_overallslab {
    Slab_id: number
    Min_gpa: number
    Max_gpa: number
    Grade: string
    Seven_min_cgpa: number
    Seven_max_cgpa: number
    Seven_grade: string
}

export interface StatementMarks {
    Aadhaar: string
    Minmarks: number
    Maxmarks: number
    Marks: string
}

export interface TStatementmarks {
    Aadhaar: string
    Subject_order: string
    Examcode: string
    Marks: string
    Min_marks: string
    Max_marks: string
    Converted_marks: string
    Condonation_grace: string
    Credit_points: string
    Gradepoint: string
    Grade: string
    Sgpa: string
}

export interface Verify_students {
    Rollno: string
    Batch_division: string
    Fullname: string
}

export interface System_userroles_menus {
    Rolenames: string
    Menus: string
}

export interface System_documents {
    Document_code: number
    Document_name: string
}

export interface Student_educations_new {
    Aadhaar: number
    Document_Type: string
    Board: string
    State: string
    Education_board: string
    College_name: string
    Datepass: string
    RollNo: string
    MarksheetNo: string
    GradesOrMarks: string
    MarksObtained: number
    OutOff: number
    Percentage: number
    Finyear: number
    College_code: number
    CreatedDate: string
    BatchStream: string
    Inhouse: string
    Hindilinguistic: string
}

export interface Batchs_new {
    Batch_code: number
    Batch_name: string
    Batch_short: string
    Course_code: number
    Course_name: string
    Batch_level: number
    Batch_level_group: string
    Old_batch_code: number
    Formamount: number
    Merchant: string
    Merchant_accountid: string
    Next_batch: number
    Active: number
    Admissionstarted: number
    Stream: string
    Udise_no: string
    Outside_admission: boolean
    Atkt_admission: boolean
    Outside_message: string
    Atkt_message: string
    Previous_exambatchs: string
    Boardlevel: string
}

export interface Fees_Installment_head {
    Installment_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Term_code: number
    Installmentid: number
    Installment: string
    Amount: number
    Activedeactive: number
}

export interface Fees_Installment_detail {
    Installment_ID: number
    Lineitem: number
    Finyear: number
    College_code: number
    Batch_code: number
    Term_code: number
    Term_Name: string
    Fees_code: number
    Fees_Name: string
    Installment: string
    Amount: number
}

export interface Students_new {
    College_code: number
    Finyear: number
    Aadhaar: number
    Batch_code: number
    Rollno: number
    Admission_status: string
    Subject_group_id: number
    Subject_group_code: string
    Billdesk: string
    Rejection_reason: string
    Term_code: number
    Term_name: string
    Createddate: string
    Batch_division: string
    Cancelledby: number
    Canceldate: string
    Prnno: number
    Sportstaken: number
    Grnno: number
    Freeship: string
    Specialisation: string
    Minor: number
    Oe: number
    Vsc: number
    Sec: number
    Aec: number
    Vec: number
    Iks: number
    Cc: number
}

export interface Student_reservations_new {
    Finyear: number
    College_code: number
    Aadhaar: number
    Parallel_reservation: string
    Category: string
    Subcategory: string
    Specially_abled: string
    Percentage: number
    Udid_no: string
    Occupation_guardian: string
    Annual_income: string
    Ebc: string
    Activity: string
    Activityname: string
    Participationlevels: string
    Securedrank: string
}

export interface Inrernalexamrelease {
    Released_id: number
    Data_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Userexamid: number
}

export interface Admissionformfees {
    Receipt_id: number
    Batch_code: number
    Admissionformfesspaid: boolean
}

export interface Abcid {
    Aadhaar: number
    Abcid: number
    Abcid_aadhaar: string
}

export interface Internalexamnames {
    Userexamid: number
    Userexamname: string
}

export interface Aadhaar_grade {
    Aadhaar: number
    Semester: number
    Sgpa: number
    Creditearned: number
    Overall_cgpa: number
    Overall_grade: string
}

export interface SemsterSubjects {
    Subject_Group: string
    Subject_order: string
    Subject_name: string
    Subject_short: string
}

export interface Studentsubjects {
    Aadhaar: number
    Subject_short: string
    Subject_name: string
    Subject_order: number
    Papercode: string
}

export interface Value_earned {
    Aadhaar: number
    Totalearned: number
}

export interface Marksheet_new {
    College_code: number
    Finyear: number
    Aadhaar: number
    Batch_code: number
    Rollno: number
    Admission_status: string
    Subject_group_id: number
    Subject_group_code: string
    Billdesk: string
    Rejection_reason: string
    Term_code: number
    Term_name: string
    Createddate: string
    Batch_division: string
    Cancelledby: number
    Canceldate: string
    Prnno: number
    Sportstaken: number
    Grnno: number
    Freeship: string
    Specialisation: string
    Profile: Student_profile_new
    Marks: Marksheet_convert[]
    Sgpa: Marksheet_sgpaaadhaar[]
    Valueadded: number
}

export interface Convercation {
    Aadhaar: string
    Convocation: string
}

export interface Marksheet_dse {
    Batchcode: number
    Semester: string
    Subjectname: string
}

export interface Marksheet_dsesemester {
    Semester: string
}

export interface Marksheet_dsesubjects {
    Subjectname: string
}

export interface Marksheet_student_dse {
    Studentdse_id: number
    Finyear: number
    Collegecode: number
    Batchcode: number
    Aadhaar: number
    Semester: string
    Subjectname: string
    Finalsubmited: number
}

export interface Atkt_student {
    Batchexam_id: number
    Finyear: number
    Batch_code: number
    Aadhaar: number
    Semester: number
    Failcount: number
    Batch_name: string
    Fullname: string
    Userexamname: string
    Fail: number
    Amount: number
    Subjects: string
}

export interface Atkt_subjects {
    Subject_name: string
}

export interface Atkt_aadhaar {
    Aadhaar: string
}

export interface Atkt_failsubjects {
    Finyear: number
    Batch_code: number
    Aadhaar: number
    Semester: number
    Subject_order: number
    Subject_name: string
    Batchexam_id: number
    Userexamname: string
    Fullname: string
}

export interface Resp_Atktoutside {
    Student_id: number
    College_code: number
    Finyear: number
    Batchexam_id: number
    Batch_code: number
    Semester: number
    Aadhaar: number
    Firstname: string
    Lastname: string
    Fathername: string
    Mothername: string
    Gender: string
    Rollno: number
    Fullname: string
    Prnno: string
    Specialisation: string
    Markscale: number
    Formtype: string
    Lastexamyear: number
}

export interface Resp_Atktsubjects {
    Finyear: number
    Studentsubject_id: number
    Studentdetail_id: number
    Batch_name: string
    Semester: string
    Subject_order: number
    Subject_name: string
}

export interface Resp_marksheet_outsidesgpa {
    Aadhaar: number
    Semester: number
    Sgpa: number
    Creditearned: number
    Createddate: string
    Modifydate: string
    Useraadhaar: number
    Finyear: number
}

export interface Marksheet_batch_sem_subjects {
    Batch_code: number
    Semester: number
    Subject_code: number
    Subject_name: string
}

export interface Outside_students_subjects {
    Batch_code: number
    Semester: number
    Subject_code: number
    Papercode: string
    Subject_name: string
    Subject_order: number
    Subject_finyear: string
    Finyear: number
    Displayname: string
}

export interface All_marks {
    Batch_name: string
    Semester: string
    Subject_order: string
    Papercode: string
    Subject_name: string
    Marks: number
}

export interface Fail_subjects {
    Batchexam_id: number
    Batch_code: number
    Batch_name: string
    Aadhaar: number
    Subject_order: number
    Subject_name: string
    Semester: number
    Papercode: string
    Boardlevel: string
    Finyear: number
}

export interface Atkt_formfees {
    Formid: number
    Formamount: number
    Formcount: number
}


export interface Subjects {
    subjectcode: number
    subjectname: string
    subjectshort: string
    createddate: string
    createdby: string
    ipaddr: string
    editedby: string
    editdate: string
    hide: number
    linkcode: number
    language: string
}

export interface Sucess {
    sucess: boolean
}

export class CountryMaster {
    issuccess!: boolean;
    errorcode!: string;
    errordescription!: string;
    data!: Data;
}

export interface Nep_admission_thirdyear {
    finyear: number
    college_code: number
    aadhaar: number
    batch_code: number
    subject_group_id: number
    subject_group_code: string
    term_code: number
    applicationmode: string
    prefix_code: number
}

export interface Fin_year {
    finyear: number
    finyearname: string
    fromdate: string
    todate: string
    lockfinyear: number
}

export interface Fin_year_new {
    finyear: number
    finyear_name: string
    fromdate: string
    todate: string
    lockfinyear: number
}

export interface StudentRegistration {
    errormessage: string
    flag: number
    msg: string
    existingstudent: number
    existingsubjectgroupcode: string
    existingbatch: string
}

export interface BatchSubjects {
    batch_code: number
    subject_group_code: string
    subject_group_name: string
}

export interface RP_RollCalllist {
    fullname: string
    aadhaar: string
    rollno: number
    batch_division: string
    regmobile: string
    regemail: string
    subject_group_code: string
    subject_group_name: string
    dob: string
    gender: string
    grnno: number
    prnno: number
    emailid: string
    mobile: string
    whatsapp: string
    billdeskdate: string
    minor: string
    oe: string
    vsc: string
    sec: string
    aec: string
    vec: string
    iks: string
    cc: string
}

export interface Surveylist {
    batch_name: string
    fullname: string
    aadhaar: string
    rollno: string
    batch_division: string
    mobile: string
    emailid: string
    whatsapp: string
    dob: string
    gender: string
    grnno: string
    prnno: string
    billdeskdate: string
}

export interface RollCalllist {
    FullName: string
    Aadhaar: string
    Rollno: string
    Batch_division: string
    MobileNumber: number
    EmailID: string
    Subject_Group_Code: string
    Billdeskdate: string
    Prnno: string
    Emailid: string
}

export interface Webportal {
    batch_code: number
    batch_name: string
    startdatetime: string
    enddatetime: string
    createdby: number
    editedby: number
}

export interface IDCards {
    batch_name: string
    aadhaar: string
    mobilenumber: string
    emailid: string
    fullname: string
    rollno: string
    gender: string
    batch_division: string
    correpondence_flatno: string
    correpondence_colonyname: string
    correpondence_villagename: string
    correpondence_landmark: string
    correpondence_location_area: string
    correpondence_country: string
    correpondence_state: string
    correpondence_district: string
    correpondence_taluka: string
    correpondence_city: string
    correpondence_pincode: string
    dob: string
    subject_group_code: string
    subject_group_name: string
    specially_abled: string
    parallel_reservation: string
    category: string
    subcategory: string
    grnno: string
    prnno: string
}

export interface Employee {
    empid: number
    full_name: string
    department: string
    designation: string
    address: string
    dob: string
    doj: string
    blood_group: string
    email: string
    mobile: string
    alternate_mobile: string
    created_date: string
    modified_date: string
}

export interface Adm_graduation {
    graduation_id: number
    graduation_stream: string
}

export interface Queryapi {
    requesttype: string
    merchantid: string
    customerid: string
    txnreferenceno: string
    bankreferenceno: string
    txnamount: string
    bankid: string
    filler1: string
    txntype: string
    currencytype: string
    itemcode: string
    filler2: string
    filler3: string
    filler4: string
    txndate: string
    authstatus: string
    filler5: string
    additionalinfo1: string
    additionalinfo2: string
    additionalinfo3: string
    additionalinfo4: string
    additionalinfo5: string
    additionalinfo6: string
    additionalinfo7: string
    errorstatus: string
    errordescription: string
    filler6: string
    refundstatus: string
    totalrefundamount: string
    lastrefunddate: string
    lastrefundrefno: string
    querystatus: string
    checksum: string
}

export interface Queryapi_refund {
    college_code: number
    finyear: number
    receiptid: number
    requesttype: string
    merchantid: string
    customerid: string
    txnreferenceno: string
    bankreferenceno: string
    txnamount: string
    bankid: string
    filler1: string
    txntype: string
    currencytype: string
    itemcode: string
    filler2: string
    filler3: string
    filler4: string
    txndate: string
    authstatus: string
    filler5: string
    additionalinfo1: string
    additionalinfo2: string
    additionalinfo3: string
    additionalinfo4: string
    additionalinfo5: string
    additionalinfo6: string
    additionalinfo7: string
    errorstatus: string
    errordescription: string
    filler6: string
    refundstatus: string
    totalrefundamount: string
    lastrefunddate: string
    lastrefundrefno: string
    querystatus: string
    checksum: string
    transaction_status: string
}

export interface System_menu {
    arrayindex: number
    parent_order: number
    parent_name: string
    parent_icon: string
    parent_url: string
    parent_badge: string
    children: Child_menu[]
}

export interface Iicons {
    name: string
}

export interface Allmenus {
    menuid: number
    parent_order: number
    parent_name: string
    parent_icon: string
    parent_url: string
    parent_badge: string
    childlevel1_order: number
    childlevel1_name: string
    childlevel1_url: string
    childlevel1_icon: string
    childlevel1_badge: string
    childlevel2_order: number
    childlevel2_name: string
    childlevel2_url: string
    childlevel2_icon: string
    childlevel2_badge: string
}

export interface System_educationdetails {
    Education_details: string
}

export interface Dev_menus {
    Myid: number
    Parentid: number
    Menu_name: string
    Menu_icon: string
    Menu_url: string
    Menu_badge: string
    Menu_disabled: number
    Menu_order: number
    Myarrayindex: number
    Parentarrayindex: number
    Level: number
    Arrayindex: number
    Items: Dev_menus[]
}

///2
export interface Systemusers {
    Collegecode: number
    Aadhaar: number
    User_pwd: string
    Creationdate: string
    Createdby: string
    Ipaddr: string
    Editedby: string
    Userrole: string
    User_name: string
    Forgottoken: string
    Token: string
    Imei: string
    Approved: boolean
}

export interface ReceiptNumber {
    ReceiptNo: string
}

export interface FeesHead {
    ProjectId: number
    Name: string
    TableName: string
}

export interface Fees_terms {
    Term_Code: number
    Term_Name: string
}

export interface Fees_terms_new {
    Term_code: number
    Term_name: string
}

export interface Fees_head {
    Fees_Code: number
    Fees_Short: string
    Fees_Name: string
    Fees_uuid: string
}

export interface Fees_head_new {
    Fees_code: number
    Fees_short: string
    Fees_name: string
    Fees_uuid: string
}

export interface Fees_installment_d {
    Lineitem: number
    InstallmentID: number
    Finyear: number
    CollegeCode: number
    BatchCode: number
    TermCode: number
    FeesCode: number
    Installmentid: number
    Installment: string
    Amount: number
    Fees_Name: string
    Term_Name: string
}

export interface Fees_installment_h {
    Installment_ID: number
    Installment: string
    Installmentid: number
    College_code: number
    Finyear: number
    Batch_code: number
    Term_code: number
    Amount: number
    Activedeactive: number
}

export interface Fees_batchterms {
    Term_code: number
    Term_name: string
}

export interface Installmentsdetails {
    Batch_name: string
    Term_name: string
    Installmentid: number
    Installment: string
    Amount: string
    Activedeactive: string
}

export interface Billdesk {
    BillerId: string
    BankId: string
    BankRefNo: string
    PGIRefNo: string
    Ref1: string
    SiD: number
    Ref2: string
    Ref3: number
    Ref4: number
    Ref5: number
    Ref6: string
    Ref7: string
    Ref8: string
    Filler: string
    DateOfTxn: string
    SettlementDate: string
    GrossAmountRsPs: string
    ChargesRsPs: string
    GSTRsPs: string
    NetAmountRsPs: string
}

export interface DocumentApproval {
    Finyear: number
    College_Code: number
    BatchCode: number
    Aadhaar: number
    Fullname: string
    Gender: string
    Admission_Status: string
    Subject_group_code: string
    Subject_group_name: string
    Batch_name: string
    Batch_short: string
    MobileNumber: string
    EmailID: string
    Inhouse: string
    Hindilinguistic: string
    Studenttype: string
    Formfees: string
    Batchstream: string
    Percentage: number
}

export interface Marksheetapproval {
    Finyear: number
    College_Code: number
    BatchCode: number
    Aadhaar: number
    Fullname: string
    Gender: string
    Admission_Status: string
    Subject_group_code: string
    Subject_group_name: string
    Batch_name: string
    Batch_short: string
    MobileNumber: string
    EmailID: string
    Inhouse: string
    Hindilinguistic: string
    Studenttype: string
    Formfees: number
}

export interface StudentsFeeure {
    Finyear: number
    College_Code: number
    BatchCode: number
    Aadhaar: number
    Fullname: string
    Gender: string
}

export interface CastDocumentPDF {
    Aadhaar: number
    Cast: string
}

export interface StudentEducationDocumentsPDF {
    Aadhaar: number
    Document_Name: string
    Document_Code: number
    Document_Filename: string
}

export interface NewRegistrations {
    Aadhaar: number
    EmailID: string
    MobileNumber: number
}

export interface StudentSubjectGroup {
    CurrentSubjectGoroup: Subjects_group_h
    SubjectGrouplist: Subjects_group_h[]
}

export interface UpdateSubjectGroupCode {
    CollegeCode: number
    Finyear: number
    BatchCode: number
    Aadhaar: number
    SubjectGroupCode: number
}

export interface Fees_Receipt {
    ReceiptID: number
    ReceiptNo: string
    Msg: string
}

export interface Fees_Receipt_new {
    Receipt_id: number
    Receiptno: number
    Transactionguid: string
    Fullname: string
    Billdeskaccountid: string
}

export interface Cash_Receipt {
    Flag: number
    ReceiptID: number
    ReceiptNo: string
    Msg: string
}

export interface BilldeskStatus {
    ReceiptID: number
    MerchantID: string
    Accountid: string
    CustomerID: string
    TxnReferenceNo: string
    BankReferenceNo: string
    TxnAmount: string
    BankID: string
    Filler1: string
    TxnType: string
    CurrencyType: string
    ItemCode: string
    Filler2: string
    Filler3: string
    Filler4: string
    TxnDate: string
    AuthStatus: string
    Filler5: string
    AdditionalInfo1: string
    AdditionalInfo2: string
    AdditionalInfo3: string
    AdditionalInfo4: string
    AdditionalInfo5: string
    AdditionalInfo6: string
    AdditionalInfo7: string
    ErrorStatus: string
    ErrorDescription: string
    TransactionStatus: string
    Createddate: string
}

export interface DailyRecipts {
    Receipt_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Term_code: number
    Installment: number
    Receiptno: number
    Prefix_code: number
    BilldeskTranID: string
    Payment_Mode: string
    CreatedDate: string
    Receiptamount: number
    FullName: string
    Batch_name: string
    Subject_group_code: string
    Term_name: string
    Billdeskdate: string
}

export interface DailyRecipts_new {
    Receipt_id: number
    Finyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Term_code: number
    Installment: number
    Receiptno: number
    Prefix_code: number
    Receiptamount: number
    Billdesktranid: string
    Payment_mode: string
    Createddate: string
    Fullname: string
    Batch_name: string
    Subject_group_code: string
    Term_name: string
    Billdeskdate: string
}

export interface NewStudents {
    Aadhaar: number
    FirstName: string
    LastName: string
    FatherName: string
    MotherName: string
    Gender: string
    Mobilenumber: number
    Batch_name: string
}

export interface Student_Documents {
    Document_ID: number
    Aadhaar: number
    Finyear: number
    College_code: number
    Batch_code: number
    Document_code: number
    Document_Name: string
    Document_status: string
    Reason: string
    ApprovedBy: number
    Document_Filename: string
    Upload_Status: string
}

export interface Students_outstanding {
    Lastyear_id: number
    Batch_name: string
    Aadhaar: number
    MobileNo: number
    FullName: string
    Outstanding: number
    Subject_group_code: string
}

export interface System_Users {
    Aadhaar: number
    User_pwd: string
    User_Name: string
    Userrole: string
    Approved: string
}

export interface Applied_nepcourse {
    Batch_code: string
    Batch_name: string
    Subject_group_id: string
    Subject_group_code: string
    Subject_group_name: string
    Receiptamount: number
}

export interface AdmissionStatusreport {
    Batch_code: number
    Batch_short: string
    Batch_name: string
    TotalFormFeesPaid: number
    TotalProfileCompleted: number
    TotalDocumentApproved: number
    TotalFeesAttached: number
    TotalFeesPaid: number
    TotalCancelled: number
    TotalAdmission: number
    Subjects: SubjectwiseStatus[]
}

export interface Fees_Prefix {
    Prefix_code: number
    Prefix_name: string
    Prefix_desc: string
    AccountNo: string
}

export interface Banks {
    Bank: string
}

export interface Admissioncancellist {
    Finyear: number
    College_code: number
    Cancel_id: number
    Batch_code: number
    Batch_name: string
    Aadhaar: number
    Reason: string
    Bankname: string
    Accountholdername: string
    Bankbranch: string
    Accountno: string
    Ifsccode: string
    Createddate: string
    Approvedby: number
    Approveddate: string
}

export interface FeesPaid {
    Batch_code: string
    Batch_name: string
    Aadhaar: string
    MobileNumber: string
    EmailID: string
    FullName: string
    Batch_Division: string
    Rollno: string
    Admission_Status: string
    Term_Name: string
    Amount: number
    Billdesk: string
    CancelledBy: string
    CancelDate: string
    Subject_group_code: string
    Minor: string
    Prnno: string
}

export interface Feesure {
    Batch_name: string
    Fees_name: string
    Term_name: string
    Installment: string
    Fees_code: number
    Amount: number
    Adjustmentamount: number
}

export interface AccountCollection {
    Batch_name: string
    Aadhaar: string
    MobileNumber: string
    EmailID: string
    FullName: string
    Term_Name: string
    Prefix_name: string
    Installment: string
    Payment_mode: string
    Receiptno: string
    Billdesktranid: string
    Receiptamount: number
    BilldeskDate: string
    Subject_group_code: string
    Narration: string
}

export interface StudentProfileList {
    Aadhaar: number
    FirstName: string
    LastName: string
    FatherName: string
    MotherName: string
    Gender: string
    Dob: string
    CorrepondenceFlatNo: string
    CorrepondenceColonyName: string
    CorrepondenceVillageName: string
    CorrepondenceLandmark: string
    CorrepondenceLocationArea: string
    CorrepondenceCountry: string
    CorrepondenceState: string
    CorrepondenceDistrict: string
    CorrepondenceTaluka: string
    CorrepondenceCity: string
    CorrepondencePincode: number
    Finyear: number
    PhotoFileName: string
    AadhaarFilename: string
    SignatureFileName: string
}

export interface Tallyreceipt {
    Fees_name: string
    Amount: string
    BilldeskDate: string
    Transactionguid: string
    Vchkey: string
}

export interface Online_receipt {
    Finyear: number
    Fees_code: number
    Fees_name: string
    Fees_short: string
    BilldeskDate: string
    Transactionguid: string
    Vchkey: string
    Amount: number
    Narration: string
}

export interface Tally_Header {
    BilldeskDate: string
    Transactionguid: string
    Vchkey: string
    Narration: string
    Totalamount: number
    Fees: Tally_Feesdetails[]
    Year: Tally_yearwise[]
}

export interface Receipts_tally {
    Receipt_id: number
    Finyear: string
    Aadhaar: string
    Batch_code: number
    Batch_division: string
    Rollno: string
    Fullname: string
    Term_name: string
    Admission_status: string
    Installment: number
    Cancelledby: string
    Payment_mode: string
    Receiptno: string
    Fees_code: number
    Fees_name: string
    Receiptamount: number
    Feesamount: number
    Fees_short: string
    Billdeskdate: string
    Prefix_code: number
    Transcationmode: string
}

export interface Receipts {
    Receipt_id: number
    Batch_name: string
    Aadhaar: string
    Fullname: string
    Batch_Division: string
    Rollno: string
    Prefix_name: string
    Term_name: string
    Cancelledby: string
    Admission_status: string
    Receiptno: number
    Receiptdate: string
    Payment_mode: string
    Transcationmode: string
    Prefix_code: number
    Term_code: number
    College_code: number
    Finyear: number
    Batch_code: number
    Receiptamount: number
    Installment: number
    Billdesktranid: string
    Billdeskdate: string
    Billdeskid: string
    Transactionguid: string
    Createddate: string
    Bank: string
    Chequeno: string
    Chequedate: string
    Createdby: string
    Narration: string
    Feesure: Feesdetails[]
}

export interface Websitelist {
    Batch_code: number
    Batch_name: string
    Sitename: string
    Studenttype: string
    Startwebsite: number
    Remarks: string
}

export interface Admissionrelesedate {
    Batch_code: number
    Batch_name: string
    Admissionstarted: number
    Outside_admission: number
    Outside_message: string
    Atkt_admission: number
    Atkt_message: string
}

export interface Website {
    Remarks: string
    Startwebsite: number
    Status: string
}

export interface Rollcallconfig {
    Batch_code: number
    Batch_name: string
    Subject_group_code: string
    Subject_names: string
    Batch_division: string
    Rollno_from: string
    Rollno_to: string
}

export interface Admissioncanceldata {
    Cancel_id: number
    Finyear: number
    Tofinyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Reason: string
    Bankname: string
    Accountholdername: string
    Bankbranch: string
    Accountno: string
    Ifsccode: string
    Createddate: string
    Approvedby: number
    Approveddate: string
    Batch_name: string
    Fullname: string
    Signature_img: string
}

export interface FeesHeadNames {
    Fees_code: number
    Fees_name: string
    Amount: number
}

export interface Unpaidstudents {
    Aadhaar: number
    Fullname: string
    Mobilenumber: number
    Emailid: string
    Admission_status: string
}

export interface Feesterm {
    Student_Installment_ID: number
    CollegeCode: number
    FinYear: number
    Batch_code: number
    Term_code: number
    Aadhaar: number
}

export interface Paidfinyear {
    Finyear: number
}

export interface FeesReceipt {
    Receipt_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Term_code: number
    Installment: number
    Receiptno: number
    Prefix_code: number
    BilldeskTranID: string
    Payment_Mode: string
    CreatedDate: string
    Receiptamount: number
    FullName: string
    Batch_name: string
    Subject_group_code: string
    Term_name: string
}

export interface Cancelemail {
    Fullname: string
    Emailid: string
    Batchname: string
    Canceldate: string
}

export interface Meritlist {
    Batch_code: string
    Batch_name: string
    Subject_group_code: string
    Fullname: string
    Aadhaar: string
    Mobilenumber: string
    Emailid: string
    Gender: string
    Category: string
    Subcategory: string
    Specially_abled: string
    Document_type: string
    Inhouse: string
    Hindilinguistic: string
    Batchstream: string
    Marksobtained: string
    Outoff: string
    Percentage: string
    State: string
    Education_board: string
    College_name: string
    Datepass: string
    Billdate: string
    Paidamount: string
    Term_code: string
    Term_name: string
    Admission_status: string
    Minor: string
    Oe: string
    Vsc: string
    Sec: string
    Aec: string
    Vec: string
    Iks: string
    Cc: string
}

export interface Batch_educationdocuments {
    Batch_code: string
    Education_details: string
    Education_code: string
}

export interface Paidfees {
    Finyear: number
    College_code: number
    Batch_code: number
    Aadhaar: number
    Term_code: number
    Receiptamount: number
}

export interface Studentreceipts {
    Batch_name: string
    Aadhaar: string
    Fullname: string
    Batch_Division: string
    Rollno: string
    MobileNumber: string
    EmailID: string
    Freeship: string
    Billdesktranscation: string
    Billdeskdate: string
    Amount: string
}

export interface Downloadbilldesk {
    BillerId: string
    Bdrefno: string
    Ref1: string
    Ref2: string
    Ref3: string
    Ref4: string
    Ref5: string
    Ref6: string
    Ref7: string
    Ref8: string
    Settlementdate: string
    Gross: string
    Charges: string
    Servicetax: string
    Surcharge: string
    Tds: string
    Netamount: string
    Sheettype: string
    Settlementdate_d: string
}

export interface Donwloadbilldeskrefund {
    Billername: string
    Debittype: string
    Paymode: string
    Productcode: string
    Bdrefno: string
    Ourid: string
    Ref1: string
    Ref2: string
    Ref3: string
    Ref4: string
    Createdon: string
    Transactionamount: string
    Refundid: string
    Refunddate: string
    Refundamount: string
}

export interface Fees_installment_h_new {
    Installment_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Term_code: number
    Installmentid: number
    Installment: string
    Amount: number
    Activedeactive: number
}

export interface Fees_prefix {
    Finyear: number
    College_code: number
    Prefix_code: number
    Prefix_name: string
    Prefix_desc: string
    ReceiptNo: number
    AccountNo: string
    BilldeskAccountid: string
}

export interface Fees_prefix_batchs {
    Finyear: number
    College_code: number
    Batch_code: number
    Prefix_code: number
    Createddate: string
    Createdby: string
    Ipaddr: string
    Editedby: string
    Editdate: string
}

export interface Fees_istallment_d {
    Lineitem: number
    Installment_ID: number
    Finyear: number
    College_code: number
    Batch_code: number
    Term_code: number
    Fees_code: number
    Installmentid: number
    Installment: string
    Amount: number
}

export interface Fees_receiptscholarship {
    Receipt_id: number
    Fees_code: number
    Aadhaar: number
    Term_code: number
    Amount: number
    Finyear: number
    College_code: number
}

export interface BilldeskpaymentResponse {
    ReceiptNo: string
    Receiptdate: string
    Flag: number
}

export interface Course_print {
    Courseid: number
    College_code: number
    Finyear: number
    Aadhaar: number
    Firstname: string
    Lastname: string
    Father: string
    Mother: string
    College: string
    Class: string
    Division: string
    Rollno: number
    Mobileno: number
    Emailid: string
    Receiptamount: number
    Coursecode: number
    Transactionid: number
    Billdate: string
    Fullname: string
}

export interface Resp_document {
    Finyear: number
    Collegecode: number
    Documentid: number
    Moduletype: string
    Documenttype: string
    Orgid: number
    Orgname: string
    Empid: number
    Empname: string
    Documentsubject: string
    Documentno: string
    Documentdate: string
    Remarks: string
    Createddate: string
    Createdby: number
}

export interface Resp_pdf {
    Image: string
    Filename: string
}

export interface Resp_Orginization {
    Orgid: number
    Orgname: string
    Concatperson: string
    Contactmobile: string
    Contactemail: string
    Orgtype: string
    Createdby: number
    Createdon: string
    Modifiedby: number
    Modifiedon: string
}

export interface Junior_students {
    Aadhaar: number
    Fullname: string
    Batch_divison: string
    Rollno: string
    Gender: string
    Batch_name: string
    Prn: string
    Grnno: string
    Subjects: Student_subject[]
}

export interface Junior_exams {
    Examcode: number
}

export interface Student_subject_new {
    Studentsubject_id: number
    Batchexam_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_order: number
    Aadhaar: number
    Createddate: string
    Editeddate: string
    Passfail: string
}

export interface Marksheet_config_jr {
    Subject_order: string
    Subject_name: string
    Papercode: string
    Showgrade: string
    Showdash: string
}

export interface BatchSemester {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
}

export interface BatchSemesterExam {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Examcode: number
}

export interface BatchSubjectGroup {
    Batch_code: number
    Subject_group_code: string
    Subject_group_name: string
}

export interface BatchSemesterexamsubjects {
    Subject_name: string
    Subject_short: string
    Subject_order: number
}

export interface SemesterDescription {
    Batchexam_id: number
    Userexamid: number
    Examdescription: string
}

export interface BatchSemesterSubjectGroup {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_group_code: string
}

export interface BatchSemesterSubjects {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_name: string
    Subject_short: string
    Subject_order: number
}

export interface Batchtemplatesubjects {
    College_code: number
    Finyear: number
    Batch_code: number
    Subject_name: string
    Subject_short: string
    Subject_order: number
}

export interface BatchSemesterSubjectPaper {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_group_code: string
    PaperCode: string
}

export interface BatchSemesterSubjectPaperType {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_group_code: string
    PaperCode: string
    PaperType: string
    Aaadhaar: number
    BatchDivision: string
    Rollno: number
    Marks: number
    Present_Absent: string
}

export interface Exams {
    Examcode: number
    Examname: string
}

export interface BatchSemesterSubjectPaperExamStudent {
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_group_code: string
    PaperCode: string
    Examcode: number
    Aadhaar: number
    BatchDivision: string
    Rollno: number
    Marks: number
    Present_Absent: string
}

export interface Students {
    College_code: number
    Finyear: number
    Aadhaar: number
    Batch_code: number
    Rollno: number
    Admission_Status: string
    Subject_group_id: number
    Subject_group_code: string
    Billdesk: string
    Rejection_reason: string
    Term_Code: number
    Term_Name: string
    CreatedDate: string
    Batch_Division: string
    CancelledBy: number
    CancelDate: string
}

export interface Marksheet_Subjects {
    Subject_order: number
    Subject_short: string
    Subject_name: string
}

export interface Marksheet_subjectsmarks {
    Aadhaar: number
    Subject_group_code: string
    RollNo: number
    FullName: string
    Batch_Division: string
    Subject_order: number
    MarksId: number
    Marks: number
    Present_absent: string
    Manualgrace: number
    Exempted: string
}

export interface Marksheet_template {
    Config_id: number
    Batchexam_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Examcode: number
    Subject_order: number
    Papercode: string
    Examname: string
    Subject_name: string
    Subject_short: string
    Credit_points: number
    Min_marks: number
    Max_marks: number
    Convert_marks: number
    Sys_min: number
    Sys_max: number
    Slabid: number
    Showgrade: boolean
    Showdash: boolean
    Subject_finyear: string
    Useraadhaar: number
    Paperexamdate: string
    Paperexamtime: string
    Createddate: string
    Modifydate: string
}

export interface Marksheet_examlist {
    Batchexam_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Userexamid: number
    Examdate: string
    Semester: string
    Exam_date: string
    Userexamname: string
    Createddate: string
    Modifydate: string
    Createdby: string
    Modifyby: string
    Template: string
    Nss_grace: string
    Nss_symbol: string
    Condonation_grace: string
    Condonation_symbol: string
    Subject_Grace: string
    Subject_symbol: string
    Gradejump: number
    Gradejumpsymbol: string
    Slabid: number
    Slabname: string
    Releaseddate: string
    Certificatename: string
    Printdate: string
    Numberofsemester: number
    Overallcreditpoints: string
    Examtype: string
}

export interface Marksheet_slab {
    Slabid: number
    Slabname: string
}

export interface Marksheet_batchexams {
    Batchexam_id: number
    Userexamname: number
    Semester: string
    Userexamid: number
}

export interface Marksheet_subjects {
    Config_Id: number
    College_Code: number
    Finyear: number
    Batch_Code: number
    Semester: number
    Examcode: number
    Subject_group_code: string
    Subject_order: number
    Papercode: string
    Examname: string
    Subject_name: string
    Subject_short: string
}

export interface StudentSubjects {
    Studentsubject_id: number
    FullName: string
    Aadhaar: string
    Rollno: string
    Batch_division: string
    Subject_order: number
    Passfail: string
}

export interface Atktstduents {
    Student_id: number
    Aadhaar: number
    Firstname: string
    Lastname: string
    Fathername: string
    Mothername: string
    Gender: string
    Rollno: string
    Prnno: string
    Specialisation: string
    Markscale: string
}

export interface Marksheet_batchexam {
    Batchexam_id: number
    Userexam: number
    College_code: number
    Finyear: number
    Batch_code: number
    Examdate: string
    Template: string
    Nss_symbol: string
    Nss_grace: string
    Condonation_symbol: string
    Condonation_grace: string
    Subject_symbol: string
    Subject_grace: string
    Gradejump: string
    Gradejumpsymbol: string
    Createddate: string
    Modifydate: string
    Createdby: string
    Modifyby: string
    Printdate: string
    Slabid: string
    Blanklines: number
    Releaseddate: string
    Certificatename: string
    Numberofsemester: string
    Examtype: string
    Overallcreditpoints: number
    Exammonthyear: string
    Eventdate: string
    Onlyprintdate: string
    Rledate: string
}

export interface Marksheet_userexams {
    Userexamid: number
    Userexamname: string
    Semester: number
    Semestertype: string
    Marksheetdisplay: string
}

export interface Marksheet_internalexams {
    Userexamid: number
    Userexamname: string
}

export interface Othercourse {
    Other_id: number
    Aadhaar: string
    Semester: number
    Lineitem: number
    Coursename: string
    Creditearned: number
    Specialisation: string
}

export interface Eligiblity {
    Aadhaar: number
    Eligiblestatus: number
}

export interface LCstudents {
    College_code: number
    Finyear: number
    Batch_code: number
    Aadhaar: string
    Reg_no: string
    Udise_no: string
    Stream: string
    Gr_no: string
    Division: string
    Rollno: string
    Ay: string
    Lc_serial_no: string
    Student_id_no: string
    Uid: string
    Student_name: string
    Mother_name: string
    Religion_cast_subcast: string
    Nationality: string
    Mother_tongue: string
    Place_of_birth: string
    Dob: string
    Dob_words: string
    Last_school_attednded: string
    Elevth_date_of_admission: string
    Progress: string
    Conduct: string
    Date_of_leaving_college: string
    Twelth_when: string
    Reason: string
    Remarks: string
    Admission_status: string
    Twelth_when_word: string
    Twelth_adm_date: string
    Twelth_words1: string
    Twelth_words2: string
    Subject_group_id: string
    Subject_group_code: string
    Billdesk: string
    Rejection_reason: string
    Term_code: string
    Term_name: string
    Createddate: string
    Batch_division: string
    Cancelledby: string
    Canceldate: string
    Prnno: string
    Sportstaken: string
    Grnno: string
    Freeship: string
    Specialisation: string
}

export interface Certificate {
    Aadhaar: number
    Fullname: string
    Batch_divison: string
    Rollno: number
    Gender: string
    Batch_name: string
    Prnno: string
    Grnno: string
    Overall_cgps: number
    Overall_grade: string
    Certificatename: string
    Semester: number
    Printdate: string
    Exammonthyear: string
}

export interface Marksheet_convert_new {
    Marks_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Examcode: number
    Subject_order: number
    Aadhaar: number
    Marks: number
    Manual_grace: number
    Manual_symbol: string
    Subjectgrace: number
    Nss_grace: number
    Nss_symbol: string
    Subject_grace: number
    Subject_symbol: string
    Condonation_grace: number
    Condonation_symbol: string
    Totalmarks: number
    Pass_fail: number
    Present_absent: string
    Presentabsent: number
    Subject_group_code: string
    Useraadhaar: number
    Grade: string
    Gradepoint: number
    Credit_points: number
    Cg: number
    Sgpa: number
    Finalgrade: string
    Createdon: string
    Subject_short: string
    Subject_name: string
    Credit_Points: number
    Min_Marks: number
    Max_Marks: number
    Papercode: string
    Totalorders: number
    Batchexam_id: number
    Rowtotal: number
    Marks_required: number
    Marks_requredcount: number
    Data_id: number
    Gracerule: string
    Exempted: string
    Atktfailpass: string
    Creditearned: number
    Converted_marks: number
    PrintMax: string
    PrintMin: string
    APECM: string
    Totalgracemarks: number
    Showdash: boolean
    Showgrade: boolean
    Convocation: string
    Createddate: string
    Modifydate: string
    Percentage: number
}

export interface Marksheet_config {
    Config_id: number
    Batchexam_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Examcode: number
    Subject_order: number
    Papercode: string
    Examname: string
    Subject_name: string
    Subject_short: string
    Credit_points: number
    Min_marks: number
    Max_marks: number
    Convert_marks: number
    Sys_min: number
    Sys_max: number
    Slabid: number
    Showgrade: number
    Showdash: boolean
    Createddate: string
    Modifydate: string
    Subject_finyear: string
    Paperexamdate: string
    Paperexamtime: string
    Useraadhaar: number
}

export interface Marksshet_semester {
    Aadhaar: number
    Semester: number
    Semestername: string
    Sgpa: number
    Creditearned: number
}

export interface Marksheet_studentsubjects {
    Studentsubject_id: number
    Batchexam_id: number
    College_code: number
    Finyear: number
    Batch_code: number
    Semester: number
    Subject_order: number
    Aadhaar: number
    Createddate: string
    Editeddate: string
    Passfail: string
}

export interface Ires_refreshtoken{
    accesstoken: string
    refreshtoken: string
    securitykey: string
}

export interface AdmissionState {
    studentId?: number;
    admissionstarted?: number;
    isEligible?: string;
}

export interface Imyinstallment {
    batchname: string
    fullname: string
    emailid: string
    mobile: string
    installment_id: number
    finyear: number
    college_code: number
    batch_code: number
    term_code: number
    term_name: string
    installmentid: number
    installment: string
    amount: number
    installmentuuid: string
    batchuuid: string
}

export interface Ires_eligibility {
    eligible: boolean
    incremental_batch: number
}
