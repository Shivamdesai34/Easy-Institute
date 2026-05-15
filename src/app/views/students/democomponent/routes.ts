import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./demo.component').then(m => m.DemoComponent),
    data: {
      title: `Demo`
    }
  }
]
