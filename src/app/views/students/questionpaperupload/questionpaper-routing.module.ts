import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {QuestionpaperuploadComponent} from "./questionpaperupload.component";

const routes: Routes = [
    {
        path: '',
        component: QuestionpaperuploadComponent,
        data: {
            title: 'Question Paper'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionpaperRoutingModule {}
