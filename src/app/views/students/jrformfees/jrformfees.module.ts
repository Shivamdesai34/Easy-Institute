import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {JrformfeesRoutingModule} from './jrformfees-routing.module';
import {AccordionModule} from "@coreui/angular-pro";

// import { SelectModule } from 'ng-select';


@NgModule({
  imports: [
    JrformfeesRoutingModule,
    HttpClientModule,
    FormsModule,
    AccordionModule,
  ],
  // exports: [FillprofileComponent],
  declarations: []
})
export class JrformfeesModule { }
