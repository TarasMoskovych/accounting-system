import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertComponent } from './components';
import { DropdownDirective } from './directives';
import { MomentPipe } from './pipes';

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    MomentPipe
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
    MomentPipe
  ],
})
export class SharedModule {}
