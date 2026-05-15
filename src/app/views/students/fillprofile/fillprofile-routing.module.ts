import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FillprofileComponent } from './fillprofile.component';

const routes: Routes = [
  {
    path: '',
    component: FillprofileComponent,
    data: {
      title: 'Fill Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FillprofileRoutingModule {}
