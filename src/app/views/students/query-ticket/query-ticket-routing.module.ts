import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueryTicketComponent } from './query-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: QueryTicketComponent,
    data: {
      title: 'Query Ticket'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryTicketRoutingModule {}
