import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./fees.component').then(m => m.FeesComponent),
    data: {
      title: `Fees payment`
    }
  }
]
