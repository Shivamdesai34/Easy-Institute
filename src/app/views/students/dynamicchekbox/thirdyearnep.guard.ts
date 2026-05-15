import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {GlobalMessage} from '../../../globals/global.message';
import {SessionService} from '../../../globals/sessionstorage';
import {Sessiondata} from "../../../models/Sessiondata";

interface outputtype {
    sucess: boolean,
    type: string,
}
export const thirdyearnepformfeesGuard: CanActivateFn = (route, state) => {
    const sessionservice = inject(SessionService);
    const router = inject(Router);
    const globalmessage = inject(GlobalMessage);
    const oSession = new Sessiondata(sessionservice);
    oSession.Getdatafromstroage();

    if (!isEligibleForPage(oSession,globalmessage)) {
        // globalmessage.Show_error('Not allowed')
        router.navigate(['/dashboard']);
        return false;
    }
    return true;
};

// ------------------ Helper functions below ------------------ //
function isEligibleForPage(
    oSession: Sessiondata,
    globalmessage: GlobalMessage,
): boolean {


    if (oSession.lastyearoutstanding == 'true') {
        globalmessage.Show_message('Please pay your last year pending fees.Select the Fees Payment option.!')
        return false;
    }

    if (oSession.maxbatchlevel == 2 && oSession.maxadmissionboard == 'UG') {
        if (oSession.iseligible == 'NOTELIGIBLE' || oSession.iseligible == 'FAIL') {
            globalmessage.Show_error('You are not eligible for this course!')
            return false;
        }
    }

    if (oSession.formfeesrecieved == 'PAID') {
        globalmessage.Show_message('Formfees already paid.')
        return true;
    }

    if (oSession.maxadmissionboard == 'UG' && oSession.maxbatchlevel == 2){
        return true
    }
    return true
}


