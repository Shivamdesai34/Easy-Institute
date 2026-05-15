import {SessionService} from "../globals/sessionstorage";
import {Decryptdata} from "../globals/encryptdata";
import * as myGlobals from "../globals/global-variable";

export interface Singlebatch {
  batch_code: number;
}


export interface Validatelogin {
  aadhaar: number
  user_pwd: string
}


export interface IBatchs {
  Batch_Code: number
  Batch_Name: string
  Batch_Short: string
  Course_Code: number
  Course_Name: string
  BatchLevel: number
  BatchLevelGroup: string
  FormAmount: number
  Merchant: string
  Merchant_AccountID: string
  Next_Batch: number
  Active: boolean
}

export interface iBatchemail {
  Batch_code: number
  Cc_email: string
  Bcc_email: string
  Replay_email: string
  Email_body: string
  Email_subjects: string
}

export interface IYear {
  "Finyear": number,
  "FinyearName": string,
  "Fromdate": string,
  "Todate": string,
  "Lockfinyear": null
}

export interface ICode {
  CollegeCode: number,
  Name: string,
  Add1: string,
  Add2: string,
  Add3: string,
  Website: string,
  Logopath: null
}

export type aReq_IAtktsubects = Req_IAtktsubects[]


export type Req_IAtktsubects = {
  Receipt_id: number,
  Batchexam_id: number,
  Batch_code: number,
  Semester: number,
  Subject_order: number,
  Subject_name: string,
  Pappercode: string,
  Finyear: number,
  Subject_finyear: string,
  College_code: number,
  Aadhaar: number,
}

//Admission request model
export interface Ireq_checksubjectgroupquota {
  collegecode?: number
  finyear?: number
  batchcode?: number
  subjectgroupid?: number
  subject_group_code?: string
  quota_status?: string
}

export interface Ireq_nextsubjects {
  Finyear?: number
  Collegecode?: number
  BatchCode?: number
  Aadhaar?: number
}

export interface Ireq_eligibilitydata {
  Finyear?: number
  Collegecode?: number
  Aadhaar?: number
}

export interface Ireq_admissionstarted {
  Batch_Code?: number
  Finyear?: number
  College_code?: number
}

export interface Ireq_savepersonaldetail {
  aadhaar?: number
  firstname?: string
  lastname?: string
  fathername?: string
  mothername?: string
  relationtype?: string
  applicantnameonmarksheet?: string
  namechangeafterpassing?: string
  gender?: string
  dob?: string
  mothertongue?: string
  maritalstatus?: string
}

export interface Ireq_addressdetails {

  Correpondence_flatno: string
  Correpondence_colonyname: string
  Correpondence_villagename: string
  Correpondence_landmark: string
  Correpondence_locationarea: string
  Correpondence_country: string
  Correpondence_state: string
  Correpondence_district: string
  Correpondence_taluka: string
  Correpondence_city: string
  Correpondence_pincode: number
  Permanent_flatno: string
  Permanent_colonyname: string
  Permanent_villagename: string
  Permanent_landmark: string
  Permanent_locationarea: string
  Permanent_country: string
  Permanent_state: string
  Permanent_district: string
  Permanent_taluka: string
  Permanent_city: string
  Permanent_pincode: number
  Same_as_permenant: string

}

export interface Ireq_parentdetails {

  parentsemailid: string
  parentsmobile: number
  occupation_guardian: string
  annual_income: string
  relationtype: string
  ebc: string
}

export interface Ireq_subjectlist {
  finyear: number
  college_code:number
  aadhaar: number
  batch_code: number
  subject_group_code: string
}



