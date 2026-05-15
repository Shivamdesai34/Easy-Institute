import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'students',
    },
    children: [
      {
        path: '',
        redirectTo: 'students',
      },

      {
        path: 'fillprofile',
        loadChildren: () =>
          import('./fillprofile/fillprofile.module').then((m) => m.FillprofileModule),
      },

      // {
      //     path: 'fees',
      //     loadChildren: () =>
      //         import('./fees/fees.module').then((m) => m.FeesModule),
      // },
      // {
      //     path: 'canceladmission',
      //     loadChildren: () =>
      //         import('./canceladmission/canceladmission.module').then((m) => m.CanceladmissionModule),
      // },
      // {
      //     path: 'feereceipt',
      //     loadChildren: () =>
      //         import('./feereceipt/feereceipt.module').then((m) => m.FeereceiptModule),
      // },
      // {
      //     path: 'additionalsubjects',
      //     loadChildren: () =>
      //         import('./additionalsubjects/additionalsubjects.module').then((m) => m.AdditionalsubjectsModule),
      // },
      // {
      //     path: 'updatedse',
      //     loadChildren: () =>
      //         import('./updatedse/updatedse.module').then((m) => m.UpdatedseModule),
      // },
      // {
      //     path: 'updateprofile',
      //     loadChildren: () =>
      //         import('./updateprofile/updateprofile.module').then((m) => m.UpdateprofileModule),
      // },
      // {
      //     path: 'internal-marks',
      //     loadChildren: () =>
      //         import('./internal-exammarks/internal-exammarks.module').then((m) => m.InternalExamMarksModule),
      // },
      // {
      //   path: 'atktform',
      //   loadChildren: () =>
      //     import('./atktform/updateprofile.module').then((module) => module.AtktformModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {
}
