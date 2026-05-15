import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UpdateprofileComponent} from './updateprofile.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateprofileComponent,
    data: {
      title: 'Update Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateprofileRoutingModules {

}
