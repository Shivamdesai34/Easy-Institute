import * as myGlobals from "../../../globals/global-variable";

export interface Ireq_outstanding {
    finyear?: number
    college_code?: number
    aadhaar?: number
    batch_code: number
}

export interface Ireq_Pdf_marksheet{
    finyear: number,
    college_code: number
    aadhaar: number
    useraadhaar: number
    template: string
    batch_code: number
    semester: number
    batchexam_id: number
    Singlepdf: boolean
}

export interface Ireq_validity_eligibility{
    Finyear?: number
    Collegecode?: number
    Aadhaar?: number
}

export interface Ireq_show_marksheet{
    finyear?: number
    collegecode?: number
    aadhaar?: number
    Webportal?: string
}
