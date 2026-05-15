import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {
  ButtonCloseDirective,
  SidebarComponent,
  SidebarHeaderComponent,
  SidebarToggleDirective
} from '@coreui/angular-pro';

@Component({
  selector: 'app-default-aside',
  templateUrl: './default-aside.component.html',
  styleUrls: ['./default-aside.component.scss'],
  imports: [SidebarComponent, SidebarHeaderComponent]
})
export class DefaultAsideComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
  }

  public messages = Array.from({length: 5}, (v, i) => i);

  ngAfterViewInit(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
  }
}
