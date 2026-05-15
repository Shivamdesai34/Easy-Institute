import { ResetpasswordComponent } from './resetpassword.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    component: ResetpasswordComponent,
    data: {
      title: 'Reset Password'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetpasswordRoutingModule {}
