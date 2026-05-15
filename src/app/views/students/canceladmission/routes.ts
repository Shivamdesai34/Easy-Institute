import {Routes} from "@angular/router";
import {canceladmissionGuard} from "./canceladmission.guard";


export const routes: Routes = [
  {
    path: '',
    canActivate:[canceladmissionGuard],
    loadComponent : () => import('./canceladmission.component').then(m => m.CanceladmissionComponent),
    data: {
      title: `Cancel Admission`
    }
  }
]
