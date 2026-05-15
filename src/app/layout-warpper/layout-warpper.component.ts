import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../layout-service/layout-service.component';
import { DestkopLayoutComponent } from '../layout/destkop-layout/destkop-layout.component';
import { MobileLayout } from '../layout/mobile-layout/mobile-layout';

@Component({
    selector: 'app-layout-wrapper',
    standalone: true,
    imports: [
        CommonModule,
        DestkopLayoutComponent,
        MobileLayout
    ],
    template: `
    <ng-container *ngIf="layout.isMobile$ | async; else desktop">
      <app-mobile-layout></app-mobile-layout>
    </ng-container>

    <ng-template #desktop>
      <app-dashboard></app-dashboard>
    </ng-template>
  `
})
export class LayoutWrapperComponent {
    constructor(public layout: LayoutService) {}
}
