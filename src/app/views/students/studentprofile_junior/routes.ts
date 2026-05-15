import {Routes} from "@angular/router";
import {profileGuard} from "../studentprofilenew/profilenew.guard";

export const routes: Routes = [
    {
        path: '',
        loadComponent : () => import('./studentprofilenew.component').then(m => m.StudentProfileNewComponent),
        canActivate: [profileGuard],
        data: {
            title: `Student Profile`
        }
    }
]
