import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent, RegistrationComponent } from './components';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
