import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtpPasswordComponent } from './otp-forgotpassword.component';



const routes: Routes = [
  {
    path: '',
    component: OtpPasswordComponent,
    data: {
      title: 'OTP'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtpPasswordRoutingModule {}
