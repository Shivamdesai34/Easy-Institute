import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {ImgDirective} from "@coreui/angular-pro";

@Component({
    selector: 'app-failureresponse',
    templateUrl: './failureresponse.component.html',
    imports: [
        IconDirective,
        ImgDirective
    ],
    styleUrls: ['./failureresponse.component.scss']
})
export class FailureresponseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Redirecttodashboard(){
    this.router.navigate(['/dashboard'])
  }
}
