import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {res_singlebatch} from "../../../models/response";
import {tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable()

export class DefaultHeaderService {

    private http = inject(HttpClient);
    private router = inject(Router);

    get_Image(credentials: any): Observable<string> {
        let finyearUrl = environment.API_URL +  '/v1/Students/studentimage'
        return this.http.post<string>(finyearUrl, credentials, {
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