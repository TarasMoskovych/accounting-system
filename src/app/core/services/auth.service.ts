import { Injectable } from '@angular/core';

import { CoreModule } from '../core.module';
import { User } from 'src/app/shared';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  private isAuthenticated = false;

  login(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem('user');
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }
}
