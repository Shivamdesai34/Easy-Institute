import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeesComponent } from './fees.component';

const routes: Routes = [
  {
    path: '',
    component: FeesComponent,
    data: {
      title: 'Fees'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeesRoutingModule {}
