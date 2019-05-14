import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CoreModule } from '../core.module';
import { User } from 'src/app/shared';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  private isAuthenticated = false;
  private user: User;

  constructor(private router: Router) { }

  login(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    document.cookie = `userId=${user.id};`;
    this.isAuthenticated = true;
  }

  logout() {
    sessionStorage.removeItem('user');
    document.cookie = 'userId=; Max-Age=0';
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  setUser(user: User) {
    this.user = new User(user.email, user.password, user.name);
  }

  getUser() {
    return this.user;
  }

  getUserFromSession() {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}
