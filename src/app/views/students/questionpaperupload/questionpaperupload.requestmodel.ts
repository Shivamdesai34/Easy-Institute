export interface IReq_download{
    Collegecode: number
    Finyear: number
    "batch_code": number
    "Useraadhaar": number
    "Semester": number
}

export interface Ireq_getsem{
    college_code: number
    finyear: number
    batch_code: number
    useraadhaar: number
}

export interface Ireq_finyear{
    finyear: number
    useraadhaar: number
    currentfinyear: number
}
