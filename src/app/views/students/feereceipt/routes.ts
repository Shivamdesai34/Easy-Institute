import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feereceipt.component').then(m => m.FeereceiptComponent),
    data: {
      title: `Print Fee Reciept`
    }
  }
]
