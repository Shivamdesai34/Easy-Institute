import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JrformfeesComponent } from './jrformfees.component';

const routes: Routes = [
  {
    path: '',
    component: JrformfeesComponent,
    data: {
      title: 'Fill Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JrformfeesRoutingModule {}
