import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./educationdetailform.component').then(m => m.EducationdetailformComponent),
    data: {
      title: `List Component`,
    }
  }
]
