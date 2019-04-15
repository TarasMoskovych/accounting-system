import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertComponent } from './components';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    AlertComponent
  ],
})
export class SharedModule {}
