
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { QueryTicketComponent } from './query-ticket.component';
import { QueryTicketRoutingModule } from './query-ticket-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
// import { SelectModule } from 'ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {
    ButtonDirective, CardBodyComponent, CardComponent, ColComponent,
    CollapseDirective, ContainerComponent,
    FormControlDirective,
    FormFeedbackComponent, ModalBodyComponent, ModalComponent,
    ModalFooterComponent, ModalHeaderComponent,
    NavComponent,
    NavLinkDirective, RowComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent
} from "@coreui/angular-pro";
import {NgxEditorModule} from "ngx-editor";

@NgModule({
  imports: [
    QueryTicketRoutingModule,
    CommonModule,
    AgGridModule,
    AngularEditorModule,
    HttpClientModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    FormFeedbackComponent,
    FormControlDirective,
    NavComponent,
    NavLinkDirective,
    CollapseDirective,
    ContainerComponent,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    TabContentComponent,
    TabPaneComponent,
    TabContentRefDirective,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    NgxEditorModule,
    RowComponent,
    ColComponent,
    QueryTicketComponent
  ],
  // exports: [QueryTicketComponent],
  declarations: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class QueryTicketModule { }
