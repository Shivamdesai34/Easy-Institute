import { ResetpasswordComponent } from './resetpassword.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetpasswordRoutingModule } from './resetpassword-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ResetpasswordRoutingModule,
    CommonModule,
  ],
  declarations: [],
  // bootstrap: [RegisterComponent]
})
export class ResetpasswordModule { }
