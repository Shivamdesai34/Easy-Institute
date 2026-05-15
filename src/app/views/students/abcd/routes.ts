import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./abcid.component').then(m => m.AbcidComponent),
    data: {
      title: `AbcdForm`
    }
  }
]
