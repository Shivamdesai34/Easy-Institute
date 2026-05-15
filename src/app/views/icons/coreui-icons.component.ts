import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

import {IconComponent, IconDirective, IconSetService} from '@coreui/icons-angular';
import {brandSet, cilLockLocked, flagSet, freeSet} from '@coreui/icons';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckComponent, FormCheckInputDirective,
  RowComponent, SpinnerComponent
} from '@coreui/angular-pro';
import { DocsLinkComponent } from '../../../components/components';
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  templateUrl: './coreui-icons.component.html',
  encapsulation: ViewEncapsulation.None,
    imports: [
        ReactiveFormsModule,
        ColComponent,
        RowComponent,
        FormCheckComponent,
        SpinnerComponent,
        CardComponent,
        RouterLink,
        IconComponent,
        CardHeaderComponent,
        CardBodyComponent,
        NgIf,
        ButtonDirective,
        FormCheckInputDirective,
        NgForOf,
        DocsLinkComponent,
        IconDirective
    ],
  standalone: true
})
export class CoreUIIconsComponent implements OnInit {
  public title = 'CoreUI Icons';
  public icons!: [string, string[]][];

  constructor(
    private route: ActivatedRoute, public iconSet: IconSetService
  ) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet ,cilLockLocked};
  }

  ngOnInit() {
    const path = this.route?.routeConfig?.path;
    let prefix = 'cil';
    if (path === 'coreui-icons') {
      this.title = `${this.title} - Free`;
      prefix = 'cil';
    } else if (path === 'brands') {
      this.title = `${this.title} - Brands`;
      prefix = 'cib';
    } else if (path === 'flags') {
      this.title = `${this.title} - Flags`;
      prefix = 'cif';
    }
    this.icons = this.getIconsView(prefix);
  }

  toKebabCase(str: string) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  getIconsView(prefix: string) {
    return Object.entries(this.iconSet.icons).filter((icon) => {
      return icon[0].startsWith(prefix);
    });
  }
}
