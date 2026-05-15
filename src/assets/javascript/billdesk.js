import {ServerURL,  Billdesk_url,Students_url} from '../../app/globals/global-api'

export function BilldeskPay(reqmsg, myurl, modulename) {


    //RJCOLGASC|5E7B2226D41D11EC86D02CEA7FABC08D|NA|1|NA|NA|NA|INR|NA|R|rjcolgasc|NA|NA|F|2022|HNDVDYPRCHRSMT|103|918566627982|9999|1|42178|NA|B103277447AFEE4266878F9F4502AD4147EE74E508A99211DB8BB811E16C2966"
    //BDSKUATY|RJCLGTEST112201|NA|300|NA|NA|NA|INR|NA|R|bdskuaty|NA|NA|F|Malad|Mumbai|8097517488|NA|NA|NA|NA|NA|7944313BE3321AD23352FCD61EC0C0972B8EF4D574C374C1D8DE04081A737ADC',
    //http://www.eazyinstitute.com:8034/students

  //24-05

  //RJCOLGASC|ABE8064019D511EFA0C02CEA7FABC08D|NA|1|NA|NA|NA|INR|NA|R|rjcolgasc|NA|NA|F|2024|HNDVDYPRCHRSMT|1701|286485077969|9999|1-|149964|NA|A997A73EF952D5CCCAF490ED170DABDB6ADE7332EC044E4C21976FF21BB2D03B

    // var callbackquery = atkt_formcallback + "?servername=" + ServerURL

    let x = window.location.host + myurl;

    let callbackquery = ""
    if (modulename == "ATKT" ) {
        callbackquery = Billdesk_url.atkt_formcallback + "?servername=" + ServerURL
    }   else{
        //callbackquery = Billdesk_url.atkt_formcallback + "?servername=" + ServerURL
         callbackquery = Students_url.BilldeskFormPaymentCallback + "?servername=" + ServerURL
    }

    bdPayment.initialize({
        msg: reqmsg,
        callbackUrl: callbackquery,
        options: {
            enableChildWindowPosting: false,
            enablePaymentRetry: true,
            retry_attempt_count: 2
            //txtPayCategory: "CREDIT"
        }
    });
}

//     bdPayment.initialize ({
//         msg :'BDSKUATY|RJCLGTEST112201|NA|300|NA|NA|NA|INR|NA|R|bdskuaty|NA|NA|F|Malad|Mumbai|8097517488|NA|NA|NA|NA|NA|7944313BE3321AD23352FCD61EC0C0972B8EF4D574C374C1D8DE04081A737ADC',
//         // "msg":"BDSKUATY|123456|NA|100.00|XYZ|NA|NA|INR|DIRECT|R|abcd|NA|NA|F|rohan.behera@vaarisolutions.com|9820198201|NA|NA|NA|NA|NA|NA|AB6VN3245B66FE9511DB2A854AAA32ADC563E789CF213CA19E274F18F330G547",
//         "options": {
//          "enableChildWindowPosting": true,
//          "enablePaymentRetry": true,
//          "retry_attempt_count": 2,
//          "txtPayCategory": "NETBANKING"
//          },
//          "callbackUrl": "http://localhost:4201/#/students/fillprofile"
//         });
//         alert("hitting js file")
// }

// "callbackUrl": "https://www.merchant-domain.com/payment_response.jsp"
