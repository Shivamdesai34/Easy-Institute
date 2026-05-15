import * as myGlobals from "../../../globals/global-variable";


export interface IReq_batchs{
    Boardlevel: string
}

export interface Ireq_register{
    aadhaar?: number
    emailid?:string
    mobilenumber?: number
    inhouse?:string
    hindilinguistic?:string
    student_password?:string
    studenttype? :string
    finyear?: number
    college_code?: number
    coursetype?:string
    batch_code?:number
    aadhaarname?: string
    capcachid?: string
    captchainputvalue?: string
}

export interface Ireqget_otp{
    aadhaar: number
    emailid: string
    mobile: number
}

export interface Ipg_batchs{
    "Batch_code": number
    "Batch_name": string
    "Batch_short": string
    "Course_code": number
    "Course_name":string
    "Batch_level": number
    "Batch_level_group": string
    "Old_batch_code": number
    "Formamount": number
    "Merchant": string
    "Merchant_accountid": string
    "Next_batch":number
    "Active": number
    "Stream": string
    "Udise_no":string
    "Boardlevel": string
    "Webportal": string,
    "Admissionstarted": number
    "Outside_admission": number
    "Atkt_admission": number
    "Outside_message": string
    "Atkt_message": string
    "Previous_exambatchs": string
    "Semesters": string
    "Documents": string
    "Educationdetails":string
    "Meritlist": string
    "Admissionyear": number
}

export interface Ires_registrationbatchs {
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
    admissioncancellastdate: string
    batchuuid: string
}
