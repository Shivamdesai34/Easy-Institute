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

export const profileGuard: CanActivateFn = (route, state) => {
    const sessionservice = inject(SessionService);
    const router = inject(Router);
    const globalmessage = inject(GlobalMessage);
    const commonservice = inject(CommonService);
    const oSession = new Sessiondata(sessionservice);
    oSession.Getdatafromstroage();
    if (!isEligibleForProfilePage(oSession, globalmessage, commonservice)) {
        router.navigate(['/dashboard']);
        return false;
    }
    return true;
};

// ------------------ Helper functions below ------------------ //

function isEligibleForProfilePage(
    oSession: Sessiondata,
    globalmessage: GlobalMessage, commonService: CommonService
): boolean {

    if (oSession.submittedyear == myGlobals.Global_CurrentFinYear &&
        oSession.isprofilesubmited == 'true') {
        globalmessage.Show_error('Profile already submitted.')
        return true;
    }
    if (oSession.formfeesrecieved == 'PAID') {
        return single_batch(oSession, globalmessage, commonService)
    }
    if (oSession.formfeesrecieved == 'NOTPAID') {
        globalmessage.Show_error("Formfees not paid.Please pay your form fees.")
        return false
    }
    if (oSession.maxadmissionboard === 'JR' && oSession.maxbatchlevel! == 2) {
        globalmessage.Show_error('Profile change not allowed!');
        return false;
    }
    if (oSession.maxadmissionboard === 'UG' && oSession.maxbatchlevel! >= 2) {
        globalmessage.Show_error('Profile change not allowed!');
        return false;
    }
    if (oSession.maxadmissionboard === 'PG' && oSession.maxbatchlevel! == 2) {
        globalmessage.Show_error('Profile change not allowed!');
        return false;
    }
    return true
}

function single_batch(oSession: Sessiondata,
                      globalmessage: GlobalMessage,
                      commonservice: CommonService): boolean {
    let nBatchcode: number | undefined = 0;
    let nBatchuuid : string | undefined = '';
    if (myGlobals.Global_CurrentFinYear == oSession.registerfinyear) {
        nBatchcode = oSession.register_batchcode
        nBatchuuid = oSession.registrationbatchuuid
    } else {
        nBatchcode = oSession.currentformfeesbatchcode
        nBatchuuid = oSession.currentbatchuuid
    }
    if (nBatchcode! <= 0 || nBatchcode == undefined) {
        globalmessage.Show_message('Single Batch not found')
        return false
    }
    let jsonin = {
        batchcode: nBatchcode,
        batchuuid: nBatchuuid
    };
    // let input_json = {
    //     Input: encryptUsingAES256(jsonin),
    // };
    commonservice
        .Post_json_data<res_singlebatch>(Common_url.batch, jsonin)
        .subscribe((response) => {
            let res_singlebatch = response.data;
            if (res_singlebatch.admissionboard == 'UG') {
                if (res_singlebatch.batch_level > 1) {
                    globalmessage.Show_error('Profile change not allowed.')
                    // this.router.navigate(['/dashboard'])
                    return false
                }
            }
            if (res_singlebatch.admissionboard == 'JR') {
                if (res_singlebatch.batch_level == 2) {
                    globalmessage.Show_error('Profile change not allowed.')
                    // this.router.navigate(['/dashboard'])
                    return false
                }
            }
            if (res_singlebatch.admissionboard == 'PG') {
                if (res_singlebatch.batch_level == 2) {
                    globalmessage.Show_error('Profile change not allowed.')
                    // this.router.navigate(['/dashboard'])
                    return false
                }
            }
            return true
        });
    return true
}
