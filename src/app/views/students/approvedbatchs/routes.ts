import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./approved-batchs.component').then(m => m.ApprovedBatchsComponent),
    data: {
      title: `Approved Batchs`
    }
  }
]
