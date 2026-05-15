import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {GlobalMessage} from '../../../globals/global.message';
import {SessionService} from '../../../globals/sessionstorage';
import {Sessiondata} from "../../../models/Sessiondata";
import {Global_CurrentFinYear} from "../../../globals/global-variable";
import {CommonService} from "../../../globals/common.service";
import * as myGlobals from "../../../globals/global-variable";

interface outputtype {
    sucess: boolean,
    type: string,
}
export const marksheetviewGuard: CanActivateFn = (route, state) => {
    const sessionservice = inject(SessionService);
    const router = inject(Router);
    const globalmessage = inject(GlobalMessage);
    const oSession = new Sessiondata(sessionservice);
    oSession.Getdatafromstroage();

    if (!isEligibleForPage( oSession, globalmessage)) {
        router.navigate(['/dashboard']);
        return false;
    }
    return true;
};

// ------------------ Helper functions below ------------------ //
function isEligibleForPage(
    oSession: Sessiondata,
    globalmessage: GlobalMessage
): boolean {

    if (oSession.lastyearoutstanding == 'true') {
        globalmessage.Show_message('Please pay your last year pending fees.Select the Fees Payment option.!!!')

        //Shivam1504
        return false;
    }

    if(oSession.currentformfeesboardlevel == "JR"){
        if(oSession.currentformfeesbatchlevel == "1" || oSession.currentformfeesbatchlevel == "2"){
            globalmessage.Show_message('Not allowed')

            //Shivam1504
            // return false;
        }
    }

    //For PGD and CERT
    if (oSession.currentlevel! >= 1 && oSession.currentlevel! <= 12) {
        return true;
    } else {
        globalmessage.Show_message('Not allowed')
        return false;
    }

    return true
}



