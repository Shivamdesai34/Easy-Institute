import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditionalsubjectsComponent } from './additionalsubjects.component';

const routes: Routes = [
  {
    path: '',
    component: AdditionalsubjectsComponent,
    data: {
      title: 'Additional Subjects'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalsubjectsRoutingModule {}
