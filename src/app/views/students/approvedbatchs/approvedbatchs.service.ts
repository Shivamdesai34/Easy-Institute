import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IRes_profileprint} from "../../../models/response";
import {tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApprovedbatchService {

    constructor(
        private http: HttpClient
    ) {
    }

    PrintProfile(credentials: any): Observable<IRes_profileprint> {
        let printProfile = environment.API_URL_RECIEPT + '/print_profile'
        return this.http.post<IRes_profileprint>(printProfile, credentials, {
            withCredentials: true
        }).pipe(
            tap(response => {
                if (response) {
                    // console.log('res',response.data)
                }
            })
        );
    }

}