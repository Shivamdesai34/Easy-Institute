import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-successresponse',
  templateUrl: './successresponse.component.html',
  styleUrls: ['./successresponse.component.scss'],
  standalone: true
})
export class SuccessresponseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  Redirecttodashboard(){
    this.router.navigate(['/dashboard'])
    // this.router.navigateByUrl('/dashboard', { replaceUrl: true });

    /*this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    });*/
  }

}
