import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./educationdetail.component').then(m => m.EducationdetailComponent),
    data: {
      title: `Student Profile`
    }
  }
]
