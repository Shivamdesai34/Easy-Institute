import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {GlobalMessage} from '../../../globals/global.message';
import {SessionService} from '../../../globals/sessionstorage';
import {Sessiondata} from "../../../models/Sessiondata";
import * as myGlobals from "../../../globals/global-variable";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {Common_url} from "../../../globals/global-api";
import {CommonService} from "../../../globals/common.service";
import {res_singlebatch} from "../../../models/response";

export const canceladmissionGuard: CanActivateFn = (route, state) => {
    const sessionservice = inject(SessionService);
    const router = inject(Router);
    const globalmessage = inject(GlobalMessage);
    // const commonservice = inject(CommonService);
    const oSession = new Sessiondata(sessionservice);
    oSession.Getdatafromstroage();
    if (!isEligibleForProfilePage(oSession, globalmessage)) {
        router.navigate(['/dashboard']);
        return false;
    }
    return true;
};

// ------------------ Helper functions below ------------------ //
function isEligibleForProfilePage(
    oSession: Sessiondata,
    globalmessage: GlobalMessage,
): boolean {

    // if (oSession.maxfinyear != myGlobals.Global_CurrentFinYear) {
    //     globalmessage.Show_error('Admission cancellation is allowed only for current financial students.')
    //     return false;
    // }
    return true
}
