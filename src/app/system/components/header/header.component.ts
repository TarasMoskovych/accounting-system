import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService, DateService } from 'src/app/core';
import { User } from 'src/app/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date$: Observable<number>;
  user: User;

  constructor(
    private authService: AuthService,
    private dateServie: DateService
  ) { }

  ngOnInit() {
    this.date$ = this.dateServie.getDate$(2500);
    const user = this.authService.getUserFromSession();
    this.user = user || { name: '' };
  }

  onLogout(): void {
    this.authService.logout();
  }
}
