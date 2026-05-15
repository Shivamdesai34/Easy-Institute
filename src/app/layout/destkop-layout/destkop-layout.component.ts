import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgScrollbar} from 'ngx-scrollbar';
import {
    INavData,
    ShadowOnScrollDirective,
    SidebarBrandComponent,
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarNavComponent,
} from '@coreui/angular-pro';
import {DefaultAsideComponent, DefaultFooterComponent, DefaultHeaderComponent} from './';
import {navItems, navItems_junior, navItems_nep, navItems_thirdyear_nep} from './_nav';
import {Sessiondata} from "../../models/Sessiondata";
import {res_singlebatch} from "../../models/response";
import {CommonService} from "../../globals/common.service";
import {encryptUsingAES256} from "../../globals/encryptdata";
import {SessionService} from "../../globals/sessionstorage";
import {GlobalMessage} from "../../globals/global.message";
import {Common_url} from "../../globals/global-api";
import {Global_CurrentFinYear} from "../../globals/global-variable";
import {NgIdleKeepaliveModule} from "@ng-idle/keepalive";
import {DestkopLayoutComponentService} from "./destkop-layout.component.service";
import * as myGlobals from '../../globals/global-variable';


function isOverflown(element: HTMLElement) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './destkop-layout.component.html',
    styleUrls: ['./destkop-layout.component.scss'],
    imports: [
        SidebarComponent,
        SidebarHeaderComponent,
        SidebarBrandComponent,
        SidebarNavComponent,
        DefaultAsideComponent,
        DefaultFooterComponent,
        DefaultHeaderComponent,
        NgScrollbar,
        RouterOutlet,
        RouterLink,
        ShadowOnScrollDirective,

    ]
})
export class DestkopLayoutComponent implements OnInit {
    showFooterToggle = false;
    // vishnu
    @ViewChild('sidebar1') sidebar1!: SidebarComponent;

    onNavItemClick() {
        // Close the sidebar (toggle visibility)
        this.sidebar1.visible = false;
    }

    public navItems: INavData[];
    resp_singlebatch = {} as res_singlebatch;
    public menuName = "";
    oSession!: Sessiondata;

    constructor(
        private commonService: CommonService, private router: Router, private destkopLayoutService: DestkopLayoutComponentService,
        private sessionservice: SessionService, private globalmessage: GlobalMessage,
    ) {
        this.navItems = navItems
        // navItems_nep[1].name = this.menuName
    }

    ngOnInit() {
        this.oSession = new Sessiondata(this.sessionservice);
        // console.log('oSession', this.oSession);
        this.oSession.Getdatafromstroage();


        console.log('batchsess',this.oSession)
        this.batch_configuration()
    }

    batch_configuration() {
        let nBatchcode = 0;
        let nBatchuuid = '';

        if (this.oSession.maxbatchcode! > 0) {
            nBatchcode = this.oSession.maxbatchcode!;
            nBatchuuid = this.oSession.maxbatchuuid!;
        } else {
            nBatchcode = this.oSession.register_batchcode!
            nBatchuuid = this.oSession.registrationbatchuuid!
        }
        let jsonin = {
            batchcode: nBatchcode,
            batchuuid: nBatchuuid,
        };

        console.log('bvvv',jsonin)

        let input_jsonin = {
            Input: encryptUsingAES256(jsonin)
        }

        this.commonService.Post_json_data<res_singlebatch>(Common_url.batch, jsonin).subscribe((response) => {


         // this.destkopLayoutService.get_BatchConfiguration(input_jsonin).subscribe(
        //     this.commonService.Post_json_data<res_singlebatch>(Common_url.batch,input_jsonin).subscribe(
        //     (response) => {

                console.log('sss',response)

                this.resp_singlebatch = response.data;

                this.navItems = navItems
                this.menuName = "Admission " + Global_CurrentFinYear.toString() + " - " +
                    (Global_CurrentFinYear + 1).toString()

                console.log('1',this.resp_singlebatch.nep)
                console.log('2',this.resp_singlebatch.admissionboard)

                console.log('3',this.resp_singlebatch.batch_level)


                if(this.resp_singlebatch.batch_level == 1 &&
                    this.resp_singlebatch.admissionboard == 'JR'){
                    if(this.oSession.finyear == myGlobals.Global_CurrentFinYear){

                        this.navItems = navItems_junior


                        console.log('juniii')
                        this.menuName = "Junior Admission " + Global_CurrentFinYear.toString() + " - " +
                            (Global_CurrentFinYear + 1).toString()
                        return
                    }

                }


                if (this.resp_singlebatch.batch_level == 2 &&
                    // this.oSession.registerfinyear == myGlobals.Global_CurrentFinYear

                    //Shivam1105registered and old student
                    // this.oSession.registeradmissionboard == 'JR' &&
                    this.resp_singlebatch.admissionboard == 'JR') {
                    this.navItems = navItems_nep
                    this.menuName = "Nep Admission " + Global_CurrentFinYear.toString() + " - " +
                        (Global_CurrentFinYear + 1).toString()
                }

            if (this.resp_singlebatch.nep == 1) {

                if (
                    this.resp_singlebatch.admissionboard == 'UG' &&
                    this.resp_singlebatch.batch_level == 2
                ) {
                    this.navItems = navItems_thirdyear_nep;
                    this.menuName =
                        "Nep Admission " +
                        Global_CurrentFinYear.toString() +
                        " - " +
                        (Global_CurrentFinYear + 1).toString();

                } else if (this.oSession.currentlevel == 5) {
                    console.log('vvv');

                    this.navItems = navItems


                } else {
                    this.navItems = navItems_nep;
                    this.menuName =
                        "Nep Admission " +
                        Global_CurrentFinYear.toString() +
                        " - " +
                        (Global_CurrentFinYear + 1).toString();
                }

            }

                // if (this.resp_singlebatch.nep == 1) {
                //     if (this.resp_singlebatch.admissionboard == 'UG' && this.resp_singlebatch.batch_level == 2) {
                //         this.navItems = navItems_thirdyear_nep
                //         this.menuName = "Nep Admission 2 " + Global_CurrentFinYear.toString() + " - " +
                //             (Global_CurrentFinYear + 1).toString()
                //     } else if {
                //         if(this.oSession.currentlevel == 3){
                //             console.log('vvv')
                //         }
                //
                //     } else {
                //         this.navItems = navItems_nep
                //         this.menuName = "Nep Admission 3 " + Global_CurrentFinYear.toString() + " - " +
                //             (Global_CurrentFinYear + 1).toString()
                //     }
                // }

                if (this.resp_singlebatch.nep == 1 && this.oSession.maxfinyear == Global_CurrentFinYear) {
                    if (this.resp_singlebatch.admissionboard == 'UG' && this.resp_singlebatch.batch_level > 2) {
                        this.navItems = navItems_thirdyear_nep
                        this.menuName = "Nep Admission " + Global_CurrentFinYear.toString() + " - " +
                            (Global_CurrentFinYear + 1).toString()
                    }
                }
                this.navItems[1].name = this.menuName

            });
    }

// public navItems = [...navItems];
}
