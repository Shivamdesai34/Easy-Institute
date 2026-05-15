import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./formfees.component').then(m => m.FormfeesComponent),
    data: {
      title: `Form Fees`
    }
  }
]
