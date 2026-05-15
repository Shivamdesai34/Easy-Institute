import { RegisterComponent } from './register.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    CommonModule,


  ],
  declarations: [],
  // bootstrap: [RegisterComponent]
})
export class RegisterModule { }
