import {Component, HostListener, OnInit} from '@angular/core';
import {IconComponent, IconDirective} from "@coreui/icons-angular";
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {LayoutService} from '../../layout-service/layout-service.component'
import {
    ButtonDirective,
    ContainerComponent,
    DropdownComponent,
    DropdownHeaderDirective,
    DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, HeaderNavComponent, HeaderTogglerDirective,
    ImgDirective, SidebarToggleDirective
} from "@coreui/angular-pro";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {encryptUsingAES256} from "../../globals/encryptdata";
import {Common_url, Students_url} from "../../globals/global-api";
import {Extractguid} from "../../globals/global_utility";
import {Sessiondata} from "../../models/Sessiondata";
import {SessionService} from "../../globals/sessionstorage";
import {CommonService} from "../../globals/common.service";
import {DomSanitizer} from "@angular/platform-browser";


// import { mobileMenus } from './mobile-menu';
import {mobileMenus, mobileMenus_junior, mobileMenus_nep, mobileMenus_thirdyear_nep} from './mobile-menu';
import {res_singlebatch} from "../../models/response";
import {Global_CurrentFinYear} from "../../globals/global-variable";
import {navItems_junior, navItems_nep, navItems_thirdyear_nep} from "../destkop-layout/_nav";
import * as myGlobals from "../../globals/global-variable";


@Component({
    selector: 'app-mobile-layout',
    imports: [
        IconComponent,
        RouterLinkActive,
        RouterOutlet,
        RouterLink,
        ButtonDirective,
        ContainerComponent,
        DropdownComponent,
        DropdownHeaderDirective,
        DropdownItemDirective,
        DropdownMenuDirective,
        DropdownToggleDirective,
        IconDirective,
        ImgDirective,
        NgIf,
        NgForOf,
    ],
    templateUrl: './mobile-layout.html',
    styleUrl: './mobile-layout.scss',
})
export class MobileLayout implements OnInit {
    showAddmissionSubMenu = false;
    showPaymentSubMenu = false;
    showMarksheetSubMenu = false;
    isAdmissionActive = false;
    isPaymentActive = false;
    isMarksheetActive = false;
    closeSubMenu = true;
    MyImage: any;
    oSession!: Sessiondata;



    public menus = mobileMenus;

    public menuName = "";



    resp_singlebatch = {} as res_singlebatch;


    openedMenu: string | null = null;


    constructor(
        private router: Router,
        public layout: LayoutService,
        private sessionservice: SessionService,
        private commonService: CommonService,
        private sanitizer: DomSanitizer,
    ) {
        console.log('Menu',this.menus)



        this.menus = mobileMenus

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.setActiveParentByUrl(event.urlAfterRedirects);
            }

        });
    }




    private setActiveParentByUrl(url: string) {
        // ===== Admission =====
        this.isAdmissionActive =
            url.startsWith('/formfees') ||
            url.startsWith('/studentprofilenew') ||
            url.startsWith('/formfeesA') ||
            url.startsWith('/formfeesPGD') ||
            url.startsWith('/formfeesCERT') ||
            url.startsWith('/canceladmission') ||
            url.startsWith('/approvedbatch');
        // ===== Payment =====
        this.isPaymentActive =
            url.startsWith('/Fees') ||
            url.startsWith('/Feereceipt');
        // ===== Marksheet =====
        this.isMarksheetActive =
            url.startsWith('/abc') ||
            url.startsWith('/atkt') ||
            url.startsWith('/marksheet-viewer') ||
            url.startsWith('/internal-exammarks');
    }

    ngOnInit() {
        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();
        this.getImage();
        this.setActiveParentByUrl(this.router.url);

        this.batch_configuration()
    }
    @HostListener('document:click')
    handlemenuClick() {
        if (this.showAddmissionSubMenu || this.showPaymentSubMenu || this.showMarksheetSubMenu) {
            this.closeAllMenu();
        }
    }

    closeAllMenu(){
        this.showAddmissionSubMenu = false
        this.showPaymentSubMenu = false
        this.showMarksheetSubMenu = false
    }

    navigateDashboard() {
        this.router.navigate(['/dashboard']);
    }

    toggleAdmissionSubMenu(event: Event) {
        event.stopPropagation();
        this.showAddmissionSubMenu = !this.showAddmissionSubMenu;
        this.showPaymentSubMenu = false
        this.showMarksheetSubMenu = false
        // Toggle the state on click
    }

    togglePaymentSubMenu(event: Event) {
        event.stopPropagation();
        this.showPaymentSubMenu = !this.showPaymentSubMenu;
        this.showAddmissionSubMenu = false
        this.showMarksheetSubMenu = false
        // Toggle the state on click
    }

    toggleMarksheetSubMenu(event: Event) {
        event.stopPropagation();
        this.showMarksheetSubMenu = !this.showMarksheetSubMenu;
        this.showAddmissionSubMenu = false
        this.showPaymentSubMenu = false
        // Toggle the state on click
    }

    toggleUpdateMenu() {
        this.showAddmissionSubMenu = false
        this.showPaymentSubMenu = false
        this.showMarksheetSubMenu = false
    }

    // closeMenu() {
    //     this.showAddmissionSubMenu = false
    //     this.showPaymentSubMenu = false
    //     this.showMarksheetSubMenu = false
    // }

    session_clear_logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    getImage() {
        let jsonin = {
            Aadhaar: this.oSession.aadhaar,
            Collegecode: this.oSession.collegecode,
            Finyear: this.oSession.finyear,
        };
        // let jsonin_input = {
        //     Input: encryptUsingAES256(jsonin)
        // };
        this.commonService.Post_json_normal<string>(Students_url.studentimage, jsonin).subscribe((response) => {
            if (response == null) {
                return;
            }
            if (response) {
                response = Extractguid(response)
                if (response != "") {
                    this.MyImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response}`);
                } else {
                    this.MyImage = 'Image'
                }
            }
        });
    }









    //gautam

    toggleMenu(menuName: string, event: Event) {

        event.stopPropagation();

        if (this.openedMenu === menuName) {
            this.openedMenu = null;
        } else {
            this.openedMenu = menuName;
        }
    }



    closeMenu() {
        this.openedMenu = null;
    }



    batch_configuration() {

        let nBatchcode = 0;
        let nBatchuuid = '';

        if (this.oSession.maxbatchcode! > 0) {
            nBatchcode = this.oSession.maxbatchcode!;
            nBatchuuid = this.oSession.maxbatchuuid!;
        } else {
            nBatchcode = this.oSession.register_batchcode!;
            nBatchuuid = this.oSession.registrationbatchuuid!;
        }

        let jsonin = {
            batchcode: nBatchcode,
            batchuuid: nBatchuuid,
        };



        let input_jsonin = {
            Input: encryptUsingAES256(jsonin)
        }



        this.commonService
            .Post_json_data<res_singlebatch>(Common_url.batch, jsonin)
            .subscribe((response) => {

                console.log('Batch Response', response);

                this.resp_singlebatch = response.data;

                // =========================
                // DEFAULT MENU
                // =========================

                this.menus = [...mobileMenus];

                this.menuName =
                    "Admission " +
                    Global_CurrentFinYear +
                    " - " +
                    (Global_CurrentFinYear + 1);



                if(this.resp_singlebatch.batch_level == 1 &&
                    this.resp_singlebatch.admissionboard == 'JR'){
                    if(this.oSession.finyear == myGlobals.Global_CurrentFinYear){

                        // this.menus = mobileMenus_junior

                        this.menus = [...mobileMenus_junior];


                        console.log('juniii')
                        this.menuName = "Junior Admission " + Global_CurrentFinYear.toString() + " - " +
                            (Global_CurrentFinYear + 1).toString()
                        return
                    }

                }



                // =========================
                // JR CONDITION
                // =========================

                if (
                    this.resp_singlebatch.batch_level == 2 &&
                    this.resp_singlebatch.admissionboard == 'JR'
                ) {

                    this.menus = [...mobileMenus_nep];

                    this.menuName =
                        "NEP Admission " +
                        Global_CurrentFinYear +
                        " - " +
                        (Global_CurrentFinYear + 1);
                }

                // =========================
                // NEP CONDITION
                // =========================

                if (this.resp_singlebatch.nep == 1) {

                    // =========================
                    // UG THIRD YEAR
                    // =========================

                    if (
                        this.resp_singlebatch.admissionboard == 'UG' &&
                        this.resp_singlebatch.batch_level == 2
                    ) {

                        this.menus = [...mobileMenus_thirdyear_nep];

                        this.menuName =
                            "NEP Admission " +
                            Global_CurrentFinYear +
                            " - " +
                            (Global_CurrentFinYear + 1);

                    }

                        // =========================
                        // CURRENT LEVEL 5
                    // =========================

                    else if (this.oSession.currentlevel == 5) {

                        this.menus = [...mobileMenus];

                    }

                        // =========================
                        // OTHER NEP
                    // =========================

                    else {

                        this.menus = [...mobileMenus_nep];

                        this.menuName =
                            "NEP Admission " +
                            Global_CurrentFinYear +
                            " - " +
                            (Global_CurrentFinYear + 1);
                    }
                }

                // =========================
                // THIRD YEAR EXTRA CONDITION
                // =========================

                if (
                    this.resp_singlebatch.nep == 1 &&
                    this.oSession.maxfinyear == Global_CurrentFinYear
                ) {

                    if (
                        this.resp_singlebatch.admissionboard == 'UG' &&
                        this.resp_singlebatch.batch_level > 2
                    ) {

                        this.menus = [...mobileMenus_thirdyear_nep];

                        this.menuName =
                            "NEP Admission " +
                            Global_CurrentFinYear +
                            " - " +
                            (Global_CurrentFinYear + 1);
                    }
                }

                // =========================
                // DYNAMIC MENU NAME
                // =========================

                const admissionMenu = this.menus.find(
                    x => x.name.includes('Admission')
                );

                if (admissionMenu) {
                    admissionMenu.name = this.menuName;
                }

                console.log('Final Mobile Menus', this.menus);

            });
    }


}
