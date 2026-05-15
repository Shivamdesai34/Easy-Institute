import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentsRoutingModule} from './students-routing.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AtktformComponent} from './atktform/atktform.component';
import {
  ButtonDirective,
  CardModule,
  FormModule,
  GridModule, LoadingButtonComponent,
  NavComponent,
  NavLinkDirective, SpinnerComponent, TabContentComponent,
  TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';
import {ReactiveFormsModule} from '@angular/forms';
import {AgGridModule} from "ag-grid-angular";
import {AutocompleteLibModule} from "angular-ng-autocomplete";


@NgModule({
  imports: [CommonModule, StudentsRoutingModule, PdfViewerModule, CardModule,
    GridModule, ReactiveFormsModule, FormModule, AgGridModule,
    NavComponent, TabContentRefDirective, NavLinkDirective, TabContentComponent,
    TabPaneComponent, AutocompleteLibModule, ButtonDirective, LoadingButtonComponent,
    SpinnerComponent,],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentsModule {
}
