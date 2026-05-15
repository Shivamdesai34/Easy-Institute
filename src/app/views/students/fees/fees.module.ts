import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Timepicker

// Datepicker

// Ng2-select

// CoreUI
import { AlertModule, ButtonModule, CardModule,
  FormModule, GridModule, } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';

// Routing
import { FeesRoutingModule } from './fees-routing.module';

import { FeesComponent } from './fees.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FeesRoutingModule,
    // SelectModule,
    CardModule,
    GridModule,
    ButtonModule,
    FormModule,
    IconModule,
    AlertModule,
    ReactiveFormsModule,
  ],
  declarations: [
  ]
})
export class FeesModule { }
