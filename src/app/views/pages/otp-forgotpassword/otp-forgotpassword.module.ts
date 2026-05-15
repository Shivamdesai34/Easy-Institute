import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OtpPasswordComponent } from './otp-forgotpassword.component';
import { OtpPasswordRoutingModule } from './otp-forgotpassword-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    // BrowserModule,
    // FormsModule,
    // CommonModule,
    ReactiveFormsModule,
    OtpPasswordRoutingModule,
  ],
  declarations: []
})
export class OtpModule { }
