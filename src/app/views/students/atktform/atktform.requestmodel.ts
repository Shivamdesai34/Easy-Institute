export interface Ireq_batchsemester{
    College_code: number
    Finyear: number
    Batch_code: number
    // useraadhaar: number
}

export interface Ireq_showatkt{
    'College_code': number
    'Finyear': number
    'Boardlevel': string
    // 'Aadhaar': number
    'Batch_code': number
    'Semester': number
    'Examtype': string
}

export interface Ireq_reciept{
    College_code: number
    Finyear: number
    Aadhaar: number
}
