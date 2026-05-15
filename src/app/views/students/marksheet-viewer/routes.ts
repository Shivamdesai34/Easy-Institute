import {Routes} from "@angular/router";
import {marksheetviewGuard} from "./marksheetview.guard";


export const routes: Routes = [
  {
    path: '',
    canActivate:[marksheetviewGuard],
    loadComponent : () => import('./marksheet-viewer.component').then(m => m.MarksheetViewerComponent),
    data: {
      title: `View Marksheet`
    }
  }
]
