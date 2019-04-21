import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';

import { SystemComponent } from './system.component';
import {
  BillComponent,
  CurrencyComponent,
  CardComponent,
  HeaderComponent,
  HistoryComponent,
  PlanningComponent,
  RecordsComponent,
  SidebarComponent
} from './components';

@NgModule({
  declarations: [
    SystemComponent,
    BillComponent,
    HistoryComponent,
    PlanningComponent,
    RecordsComponent,
    SidebarComponent,
    HeaderComponent,
    CurrencyComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
