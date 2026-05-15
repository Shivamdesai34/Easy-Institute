import {Routes} from '@angular/router';
import {thirdyearnepformfeesGuard} from "./thirdyearnep.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dynamicchekbox.component').then(m => m.DynamicchekboxComponent
    ),
    canActivate:[thirdyearnepformfeesGuard],
    data: {
      title: `Dynamic`
    }
  }
]
