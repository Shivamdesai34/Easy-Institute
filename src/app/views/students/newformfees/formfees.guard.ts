import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {GlobalMessage} from '../../../globals/global.message';
import {SessionService} from '../../../globals/sessionstorage';
import {Sessiondata} from "../../../models/Sessiondata";
import {Global_CurrentFinYear} from "../../../globals/global-variable";

interface outputtype {
    sucess: boolean,
    type: string,
}

export const formfeesGuard: CanActivateFn = (route, state) => {
    const sessionservice = inject(SessionService);
    const router = inject(Router);
    const globalmessage = inject(GlobalMessage);
    const oSession = new Sessiondata(sessionservice);
    oSession.Getdatafromstroage();
    const pageType = route.queryParams['page'];
    if (!pageType) {
        router.navigate(['/dashboard']);
        return false;
    }
    if (!isEligibleForPage(pageType, oSession, globalmessage)) {
        router.navigate(['/dashboard']);
        return false;
    }
    return true;
};

// ------------------ Helper functions below ------------------ //
function isEligibleForPage(
    pageType: string,
    oSession: Sessiondata,
    globalmessage: GlobalMessage
): boolean {
    const ADMISSION: string = 'R';
    const ADDITIONAL_COURSE: string = 'A';
    const PGD_COURSE: string = 'PGD';
    const CERT_COURSE: string = 'CERT';
    switch (pageType) {
        case ADMISSION:
            return Admission_validation(oSession, globalmessage);
        case ADDITIONAL_COURSE:
            return Additional_course_validation(oSession, globalmessage);
        case PGD_COURSE:
            return PGD_courser_validation(oSession, globalmessage);
        case CERT_COURSE:
            return CERT_courser_validation(oSession, globalmessage);
        default:
            return false; // Unknown pageType, block navigation
    }
}

function Additional_course_validation(
    oSession: Sessiondata,
    globalmessage: GlobalMessage
): boolean {
    let _outputtype: outputtype;
    // if (oSession.maxadmissionboard == 'JR') {
    //     globalmessage.Show_message('Admission not allowed.Please check the junior portal.')
    //     return false;
    // }



    if (oSession.formfeesrecieved == 'NOTPAID') {
        globalmessage.Show_message('Please complete your profile.')
        return false
    }

    //Shivam0805
    if (oSession.isprofilesubmited == 'false' || oSession.isprofilesubmited == '') {
        globalmessage.Show_error('Please complete your profile.')
        return false
    }
    // if (oSession.maxadmissionboard === 'UG') {
    //     globalmessage.Show_error('UG Student not allowed!');
    //     return false;
    // }


    if (oSession.maxadmissionboard === 'PG' && oSession.maxbatchlevel! == 2) {
        globalmessage.Show_error('PG/MS Second year not allowed!');
        return false;
    }
    if (oSession.lastyearoutstanding == 'true') {
        globalmessage.Show_message('Please pay your last year pending fees.Select the Fees Payment option.!')
        return false;
    }


    //Shivam0905foradditionalformfees
    // if()
    if (oSession.iseligible === 'NOTELIGIBLE' || oSession.iseligible === 'FAIL') {
        globalmessage.Show_error('You are not eligible for this course!');
        return false;
    }


    if (oSession.formfeesrecieved == 'NOTPAID') {
        globalmessage.Show_error('Registration form fees not paid!');
        return false;
    }
    return true;
}

function PGD_courser_validation(
    oSession: Sessiondata,
    globalmessage: GlobalMessage
): boolean {
    // if (oSession.maxadmissionboard == 'JR') {
    //     globalmessage.Show_error('Admission not allowed.Please check the junior portal.!');
    //     return false;
    // }
    if (oSession.maxadmissionboard == 'UG' && oSession.maxbatchlevel! <= 2) {
        globalmessage.Show_error('UG student not allowed!');
        return false;
    }
    if (oSession.lastyearoutstanding == 'true') {
        globalmessage.Show_message('Please pay your last year pending fees.Select the Fees Payment option.!')
        return false;
    }

    return true;
}

function CERT_courser_validation(
    oSession: Sessiondata,
    globalmessage: GlobalMessage): boolean {
    // if (oSession.currentlevel! < 3 && oSession.currentlevel! !== 0) {
    //     globalmessage.Show_error('Admission not allowed!');
    //     return false;
    // }

    if (oSession.lastyearoutstanding == 'true') {
        globalmessage.Show_message('Please pay your last year pending fees.Select the Fees Payment option.!')
        return false;
    }

    if(oSession.formfeesrecieved == "NOTPAID" &&
        oSession.currentformfeesboardlevel == ""){
        if(oSession.currentlevel! >= 3 && oSession.currentlevel! <= 12){
            return true;
        }else{
            globalmessage.Show_message("Not allowed")
            return false;
        }
    }

    if(oSession.currentformfeesboardlevel == "JR"){
        if(oSession.currentformfeesbatchlevel == "1" || oSession.currentformfeesbatchlevel == "2"){
            globalmessage.Show_message('Not allowed')
            return false;
        }
    }


    return true;
}

function Admission_validation(
    oSession: Sessiondata,
    globalmessage: GlobalMessage
): (boolean) {
    if (oSession.registerfinyear == Global_CurrentFinYear) {
        // for new register student f this year
        return true
    }
    if (oSession.lastyearoutstanding == 'true') {
        globalmessage.Show_message('Please pay your last year pending fees.Select the Fees Payment option.!')
        return false;
    }
    if (oSession.iseligible === 'NOTELIGIBLE' || oSession.iseligible === 'FAIL') {
        globalmessage.Show_error('You are not eligible for this course!');
        return false;
    }
    if (oSession.formfeesrecieved == 'PAID') {
        globalmessage.Show_message('Formfees already paid.Please complete your profile.')
        return false;
    }
    // if (oSession.maxadmissionboard == 'JR') {
    //     globalmessage.Show_message('Admission not allowed.Please check the junior portal.')
    //     return false;
    // }
    return true;
}

