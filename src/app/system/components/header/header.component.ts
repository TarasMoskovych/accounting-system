import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core';
import { User } from 'src/app/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  date: Date = new Date();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.user = user || { name: '' };
  }

  onLogout() {
    this.authService.logout();
  }
}
