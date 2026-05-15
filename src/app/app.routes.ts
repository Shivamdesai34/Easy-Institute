import {Routes} from '@angular/router';
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {LoginComponent} from "./views/pages/login/login.component";
// import {StudentsapprovalComponent} from "./views/students/studentsapproval/studentsapproval.component";
import {RegisterComponent} from "./views/pages/register/register.component";
import {OtpComponent} from "./views/pages/otp/otp.component";
import {OtpPasswordComponent} from "./views/pages/otp-forgotpassword/otp-forgotpassword.component";
import {ForgotpasswordComponent} from "./views/pages/forgotpassword/forgotpassword.component";
import {SuccessresponseComponent} from "./views/paymentstatus/successresponse/successresponse.component";
import {formfeesGuard} from "./views/students/newformfees/formfees.guard";
import {ResetpasswordComponent} from "./views/pages/resetpassword/resetpassword.component";
import {LayoutWrapperComponent} from "./layout-warpper/layout-warpper.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: 'otp',
    component: OtpComponent,
    data: {
      title: 'OTP',
    },
  },
  {
    path: 'validateotp',
    component: OtpPasswordComponent,
    data: {
      title: 'Validate OTP',
    },
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    data: {
      title: 'Forgot Password',
    },
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    data: {
      title: 'Forgot Password',
    },
  },
  {
    path: 'successresponse',
    component: SuccessresponseComponent,
    data: {
      title: 'Success',
    },
  },

  // {
  //   path: 'dashboard',
  //   redirectTo: '/dashboard',
  // },
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: LayoutWrapperComponent,
    data: {
      title: ``
    },
    children: [

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/routes').then((m) => m.routes)
      },

      {
        path: 'page',
        loadChildren: () =>
          import('./views/pages/routes').then((m) => m.routes)
      },

      {
        path: 'atkt',
        loadChildren: () =>
          import('./views/students/atktform/routes').then((m) => m.routes)
      },

      {
        path: 'abc',
        loadChildren: () =>
            import('./views/students/abcd/routes').then((m) => m.routes)
      },

      {
        path: 'abcid',
        loadChildren: () =>
          import('./views/students/abcid-form/routes').then((m) => m.routes)
      },

      {
        path: 'formfees',
        loadChildren: () =>
            import('./views/students/newformfees/routes').then((m) => m.routes)
        // component: FormfeesComponent,
      },

      // {
      //   path: 'studentprofile',
      //   loadChildren: () =>
      //       import('./views/students/studentprofile/routes').then((m) => m.routes)
      // },

      {
        path: 'marksheet-viewer',
        loadChildren: () =>
          import('./views/students/marksheet-viewer/routes').then((m) => m.routes)
      },

      {
        path: 'formfeesA',
        loadChildren: () =>
            import('./views/students/newformfees/routes').then((m) => m.routes)
      },

      {
        path: 'formfeesPGD',
        loadChildren: () =>
          import('./views/students/newformfees/routes').then((m) => m.routes)
      },

      {
        path: 'approvedbatch',
        loadChildren: () =>
            import('./views/students/approvedbatchs/routes').then((m) => m.routes)
      },

      // {
      //   path: 'studentapproval',
      //   component: StudentsapprovalComponent,
      // },

      {
        path: 'Fees',
        loadChildren: () =>
          import('./views/students/fees/routes').then((m) => m.routes)
      },

      {
        path: 'Feereceipt',
        loadChildren: () =>
          import('./views/students/feereceipt/routes').then((m) => m.routes)
      },

      {
        path: 'canceladmission',
        loadChildren: () =>
          import('./views/students/canceladmission/routes').then((m) => m.routes)
      },

      {
        path: 'internal-exammarks',
        loadChildren: () =>
          import('./views/students/internal-exammarks/routes').then((m) => m.routes)
      },

      {
        path: 'updateprofile',
        loadChildren: () =>
          import('./views/students/updateprofile/routes').then((m) => m.routes)
      },

      {
        path: 'nepsubjects',
        loadChildren: () =>
          import('./views/students/dynamicchekbox/routes').then((m) => m.routes)
      },

      {
        path: 'newsubject',
        loadChildren: () =>
          import('./views/students/newprofile/routes').then((m) => m.routes)
      },

      {
        path: 'newformfees',
        loadChildren: () =>
          import('./views/students/newformfees/routes').then((m) => m.routes),
        canActivate:[formfeesGuard]
      },

      {
        path: 'nepadditionalcourse',
        loadChildren: () =>
            import('./views/students/nepadditionalsubjects/routes').then((m) => m.routes),
      },

      {
        path: 'nepadditionalcourseA',
        loadChildren: () =>
            import('./views/students/nepadditionalsubjects/routes').then((m) => m.routes),
      },

      // {
      //   path: 'facedetect',
      //   loadChildren: () =>
      //       import('./views/students/face-detect/routes').then((m) => m.routes)
      // },

      {
        path: 'democomponent',
        loadChildren: () =>
            import('./views/students/democomponent/routes').then((m) => m.routes)
      },

      // {
      //   path: 'studentprofilenew',
      //   loadChildren: () =>
      //       import('./views/students/studentprofilenew/routes').then((m) => m.routes)
      // },

      {
        path: 'studentprofilenew',
        loadComponent: () =>
            import('./views/students/studentprofilenew/studentprofilenew.component').then((m) => m.StudentProfileNewComponent)
      },


      // {
      //   path: 'stepperform',
      //   loadComponent: () =>
      //       import('./views/students/vishaldemocode/stepperDemo/stepperdemo.component').then((m) => m.Stepper07Component)
      // },
      {
        path: 'formfeesCERT',
        loadChildren: () =>
            import('./views/students/newformfees/routes').then((m) => m.routes)
      },



      {
        path: 'gapregistration',
        loadComponent: () =>
            import('./views/students/gapstudentregistrationbatchchange/gapstudentregistrationbatchchange.component').then((m) => m.GapstudentregistrationbatchchangeComponent)
      },

      {
        path: 'studentprofilejunior',
        loadComponent: () =>
            import('./views/students/studentprofile_junior/studentprofilenew.component').then((m) => m.StudentProfileNewComponent)
      },

    ]
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },

  {
    path: 'Dashboard',
    component: DashboardComponent,
    data: {
      title: 'dashboard Page'
    },
  },

  {path: '**', redirectTo: 'dashboard'}
];

