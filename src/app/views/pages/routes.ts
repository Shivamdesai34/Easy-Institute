import {PageComponent} from "./page.component";
import {Routes} from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    data: {
      title: `Page`
    }

  }
]
