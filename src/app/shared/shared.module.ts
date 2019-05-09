import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AlertComponent } from './components';
import { DropdownDirective } from './directives';
import { AsyncValidatorDirective } from './directives/async-validator/async-validator.directive';
import { MomentPipe, FilterPipe } from './pipes';

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    MomentPipe,
    AsyncValidatorDirective,
    FilterPipe
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    AlertComponent,
    DropdownDirective,
    MomentPipe,
    AsyncValidatorDirective,
    FilterPipe
  ],
})
export class SharedModule {}
