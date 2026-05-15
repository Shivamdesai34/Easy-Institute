export interface Ireq_Show {
    'Finyear': number
    'Collegecode': number
    'Aadhaar': number
}

export interface Ireq_closeticket{
    Ticketid: number
    'Aadhaar': number
    'Ticketaction': string
}

export interface Ireq_replyquery{
    Ticketid: number
    Aadhaar: number
    Ticketdescription: string
    Useraadhaar: number
    Adminname: number
}
