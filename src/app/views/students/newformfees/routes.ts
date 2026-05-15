import {Routes} from "@angular/router";
import {NewformfeesComponent} from "./newformfees.component";
import {formfeesGuard} from "./formfees.guard";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./newformfees.component').then(m => m.NewformfeesComponent),
    canActivate: [formfeesGuard],
    data: {
      title: `New Form fees`
    }
  }
]
