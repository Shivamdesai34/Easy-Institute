import { CanceladmissionComponent } from './canceladmission.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: CanceladmissionComponent,
    data: {
      title: 'Cancel Admission'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanceladmissionRoutingModule {}
