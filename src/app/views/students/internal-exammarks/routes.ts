import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./internal-exammarks.component').then(m => m.InternalExamMarksComponent),
    data: {
      title: `Internal Exam marks`
    }
  }
]
