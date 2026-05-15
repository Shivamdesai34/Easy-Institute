export interface Ireq_installmentvalidation{
    collegecode: number
    finyear: number
    batchcode: number
    aadhaar: number
    termcode: number
    installment: number
}

export interface Ireq_checkoutstanding{
    finyear: number
    college_code?: number
    aadhaar?: number
    batch_code: number
}

export interface Ireq_approvedcourse{
    Finyear?: number
    Collegecode?: number
    Aadhaar?: number
}

export interface Ireq_formfees{
    Finyear?: number
    Collegecode?: number
    BatchCode?: number
    Aadhaar?: number
}

export interface Ireq_checkadmission{
    Collegecode?: number
    Finyear?: number
    Aadhaar?: number
}

export interface Ireq_StudentProfileStatus_url{
    Finyear?: number
    Collegecode?: number
    Aadhaar?: number
    studenttype?: string | null
    webportname?: string
}

export interface Ireq_studentfeesinstallment{
    CollegeCode: number
    Finyear: number
    BatchCode: number
    Aadhaar: number
}

export interface Ireq_checksubjectgroupquota{
    collegecode: number
    finyear: number
    batchcode: number
    subjectgroupid: number
    subject_group_code: number
    quota_status: string
}

export interface Ireq_iureciept{
    finyear: number
    college_code: number
    aadhaar: number
    batch_code: number
    term_code: number
    installment: number
    existing_subject_group_id: number
    paid_subject_group_id: number
    existing_subject_group_code: number
    paid_subject_group_code: number
}
