import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertComponent } from './components';
import { DropdownDirective } from './directives';
import { MomentPipe } from './pipes';
import { AsyncValidatorDirective } from './directives/async-validator/async-validator.directive';

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    MomentPipe,
    AsyncValidatorDirective
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    AlertComponent,
    DropdownDirective,
    MomentPipe,
    AsyncValidatorDirective
  ],
})
export class SharedModule {}
