import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./atktform.component').then(m => m.AtktformComponent),
    data: {
      title: `AtktForm`
    }
  }
]
