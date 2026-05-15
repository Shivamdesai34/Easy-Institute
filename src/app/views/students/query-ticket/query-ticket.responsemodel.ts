export interface ITicketmaster {
    "Ticketid": number,
    "Detailid": number,
    "Aadhaar": number,
    "Ticketdate": string,
    "Ticketdescription": string,
    "Replayuser": string,
}

export interface ITicketdetails {
    "Ticketid": number,
    "Detailid": number,
    "Aadhaar": number,
    "Ticketdescription": string,
    "Replayuser": string,
    "Ticketdate": string,
    "Ticketaction": string,
    "Studentname": string,
    "Adminname": string,
}
