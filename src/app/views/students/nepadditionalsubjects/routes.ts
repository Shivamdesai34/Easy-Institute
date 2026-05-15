import {Routes} from "@angular/router";
import {nepformfeesGuard} from "./nepsubject.guard";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./nepadditionalsubjects.component').then(m => m.NepadditionalsubjectsComponent),
    canActivate:[nepformfeesGuard],
    data: {
      title: `NEP Additional Subjects`,
    }
  }
]
