import {Routes} from "@angular/router";
import {profileGuard} from "./profile.guard";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./studentprofile.component').then(m => m.StudentprofileComponent),
    canActivate: [profileGuard],
    data: {
      title: `Student Profile`
    }
  }
]
