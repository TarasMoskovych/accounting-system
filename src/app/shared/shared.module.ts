import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertComponent } from './components';
import { DropdownDirective } from './directives';

@NgModule({
  declarations: [AlertComponent, DropdownDirective],
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    AlertComponent,
    DropdownDirective
  ],
})
export class SharedModule {}
