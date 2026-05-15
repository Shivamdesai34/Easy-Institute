import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ApiResponse, ApiResponse_data, res_singlebatch} from "../../models/response";

@Injectable({
    providedIn: 'root'
})
export class DestkopLayoutComponentService {

    private http = inject(HttpClient);
    private router = inject(Router);

    get_BatchConfiguration(credentials: any): Observable<ApiResponse_data<res_singlebatch>> {
        let finyearUrl = '/v1/Common/batch'
        return this.http.post<ApiResponse_data<res_singlebatch>>(finyearUrl, credentials, {
            withCredentials: true
        }).pipe(
            tap(response => {
                if (response) {
                    // console.log('resloign2', response);
                }
            })
        );
    }

}
