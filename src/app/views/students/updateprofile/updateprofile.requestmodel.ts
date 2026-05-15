export interface Ireq_verifyotp{
    aadhaar: number
    email: string
    otp: number
}

export interface Ireq_verifymobileotp{
    aadhaar: number
    mobile: number
    whatsapp: number
    otp: number
}

export interface Ireq_sendotp{
    aadhaar: number
    mobile: number
}

export interface Ireq_sendmobileotp{
    aadhaar: number
    Email: string
}
