import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./newprofile.component').then(m => m.NewprofileComponent),
    data: {
      title: `New Profile`
    }
  }
]
