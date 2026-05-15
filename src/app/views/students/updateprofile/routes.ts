import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./updateprofile.component').then(m => m.UpdateprofileComponent),
    data: {
      title: `Update Image `
    }
  }
]
