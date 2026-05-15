import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {GlobalMessage} from '../../globals/global.message';
import {SessionService} from '../../globals/sessionstorage';
import {Sessiondata} from "../../models/Sessiondata";
import {Global_CurrentFinYear} from "../../globals/global-variable";

export const dashboardGuard: CanActivateFn = (route, state) => {
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
    switch (pageType) {
        case ADMISSION:
            return Admission_validation(oSession, globalmessage);
        case ADDITIONAL_COURSE:
            return Additional_course_validation(oSession, globalmessage);
        default:
            return false; // Unknown pageType, block navigation
    }
}

function Additional_course_validation(
    oSession: Sessiondata,
    globalmessage: GlobalMessage
): boolean {
    if (oSession.maxadmissionboard === 'JR' && oSession.maxbatchlevel! == 2) {
        globalmessage.Show_error('JR Second year student not allowed!');
        return false;
    }
    if (oSession.maxadmissionboard === 'UG') {
        globalmessage.Show_error('UG Student not allowed!');
        return false;
    }
    if (oSession.maxadmissionboard === 'PG' && oSession.maxbatchlevel! == 2) {
        globalmessage.Show_error('PG/MS Second year not allowed!');
        return false;
    }
    if (oSession.lastyearoutstanding == 'true') {
        globalmessage.Show_message('Please pay your last year pending fees.Select the Fees Payment option.!')
        return false;
    }
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

function Admission_validation(
    oSession: Sessiondata,
    globalmessage: GlobalMessage
): boolean {
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
    return true;
}

