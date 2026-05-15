import {NgModule} from '@angular/core';
// CoreUI
import {UpdateprofileRoutingModules} from './updateprofile-routing.modules';
import {CommonModule} from '@angular/common';

import {
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  NavComponent,
  NavItemComponent,
  NavLinkDirective, SpinnerComponent,
  TabContentComponent, TabContentRefDirective, TabPaneComponent, TableActiveDirective
} from "@coreui/angular-pro";
// Routing

@NgModule({
  imports: [
    CardModule,
    FormModule,
    GridModule,
    ModalModule,
    NavModule,
    UpdateprofileRoutingModules,
    CommonModule,NavComponent,
    NavItemComponent,
    NavLinkDirective,
    TabContentComponent, TabContentRefDirective, TabPaneComponent,TableActiveDirective
  ],
  declarations: [],
})
export class UpdateprofileModule {

}
