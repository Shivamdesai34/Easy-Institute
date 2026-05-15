import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import {
    CalloutModule,
    CardModule,
    GridModule,
    ProgressModule,
    ButtonModule,
    DropdownModule,
    SharedModule,
    WidgetModule, AvatarComponent, ImgDirective
} from '@coreui/angular-pro';

import { IconModule } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    CalloutModule,
    CardModule,
    CommonModule,
    GridModule,
    IconModule,
    ProgressModule,
    ButtonModule,
    DropdownModule,
    SharedModule,
    WidgetModule,
    AvatarComponent,
    ImgDirective,
    DashboardComponent,

  ],
  declarations: [

  ]
})
export class DashboardModule { }
