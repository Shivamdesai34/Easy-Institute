import {Component, computed, inject, input, OnInit} from '@angular/core';

import {
  ButtonDirective,
  ColorModeService,
  ContainerComponent,
  DropdownComponent, DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent, HeaderNavComponent,
  HeaderTogglerDirective, ImgDirective, NavItemComponent, NavLinkDirective,
  SidebarToggleDirective
} from '@coreui/angular-pro';

import {IconDirective} from '@coreui/icons-angular';
import {Sessiondata} from "../../../models/Sessiondata";
import {SessionService} from "../../../globals/sessionstorage";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CommonService} from "../../../globals/common.service";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {Students_url} from "../../../globals/global-api";
import {DomSanitizer} from "@angular/platform-browser";
import {Extractguid} from "../../../globals/global_utility";
import {NgTemplateOutlet} from "@angular/common";
import {DefaultHeaderService} from "./default-header.component.service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  providers: [DefaultHeaderService],
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective,

    DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, HeaderNavComponent,
      DropdownHeaderDirective, ImgDirective, NgTemplateOutlet, ButtonDirective]
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly colorModes = [
    {name: 'light', text: 'Light', icon: 'cilSun'},
    {name: 'dark', text: 'Dark', icon: 'cilMoon'},
    {name: 'auto', text: 'Auto', icon: 'cilContrast'}
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  MyImage: any;

  oSession!: Sessiondata;

  constructor(private sessionservice: SessionService,
              private commonService: CommonService,private sanitizer: DomSanitizer,
              private router: Router,private defaultHeaderService: DefaultHeaderService,) {
    super();
  }

  ngOnInit() {

    this.oSession = new Sessiondata(this.sessionservice)
    this.oSession.Getdatafromstroage();
    // if (!this.TokenSession) {
    //   this.router.navigate(['/login']);
    // }
    this.getImage();

  }

  sidebarId = input('sidebar1');

  getImage() {
    let jsonin = {
      // Aadhaar: this.oSession.aadhaar,
      Collegecode: this.oSession.collegecode,
      Finyear: this.oSession.finyear,
    };
     let input_jsonin = jsonin

    this.commonService.Post_json_normal(Students_url.studentimage, jsonin).subscribe((response: any) => {
        if (response == null) {
          return;
        }

        if (response) {
            response = Extractguid(response)
          if(response != ""){

              this.MyImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response}`);
          } else {
            this.MyImage = 'Image'
          }
        }
    })

    // this.defaultHeaderService.get_Image(input_jsonin).subscribe((response) => {
    //   if (response == null) {
    //     return;
    //   }
    //
    //   if (response) {
    //       response = Extractguid(response)
    //     if(response != ""){
    //
    //         this.MyImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response}`);
    //     } else {
    //       this.MyImage = 'Image'
    //     }
    //   }
    // });
    // this.defaultHeaderService.get_Image(jsonin_input).subscribe((response) => {
    //     if (response == null) {
    //       return;
    //     }
    //
    //     if (response) {
    //       response = Extractguid(response)
    //       if(response != ""){
    //
    //         this.MyImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response}`);
    //       }else {
    //         this.MyImage = 'Image'
    //       }
    //     }
    //
    // });
  }

  session_clear_logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
