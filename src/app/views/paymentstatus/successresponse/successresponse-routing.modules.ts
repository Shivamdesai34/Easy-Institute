

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessresponseComponent } from './successresponse.component';



const routes: Routes = [
  {
    path: '',
    component: SuccessresponseComponent,
    data: {
      title: 'Success Response'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccessresponseRoutingModule {}
