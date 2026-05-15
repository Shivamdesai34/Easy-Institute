import {Global_LastFinYear, Golbal_CollegeCode} from "../../../globals/global-variable";



export interface Ireq_exam{
  Collegecode: number
  Finyear: number
  Batchcode: number
  Aadhaar: number
}

export interface Ireq_Show{
  Collegecode: number
  Finyear: number
  Batchcode: number
  Aadhaar: number
  examcode: number
}

export interface Ireq_batch{
  Collegecode: number
  Finyear: number
  Aadhaar: number
}
