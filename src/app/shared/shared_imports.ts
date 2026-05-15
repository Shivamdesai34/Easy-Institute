import { CommonModule } from "@angular/common";
import {Keepalive} from "@ng-idle/keepalive";
import {CardBodyComponent, CardComponent, ColComponent, RowComponent} from "@coreui/angular-pro";
import {ReactiveFormsModule} from "@angular/forms";

export const SHARED_IMPORTS = [
    CommonModule,
    //FormsModule,
   // ReactiveFormsModule,
    Keepalive,
    CardComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
];
