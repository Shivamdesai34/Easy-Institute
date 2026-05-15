import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./abcid-form.component').then(m => m.AbcidFormComponent),
    data: {
      title: `AbcdForm`
    }
  }
]
