import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import {
  BillComponent,
  HistoryComponent,
  RecordsComponent,
  PlanningComponent
} from './components';

const routes: Routes = [
  {
    path: 'system',
    component: SystemComponent,
    children: [
      {
        path: 'bill',
        component: BillComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'planning',
        component: PlanningComponent
      },
      {
        path: 'records',
        component: RecordsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
