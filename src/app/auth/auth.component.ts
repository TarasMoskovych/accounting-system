import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { fadeTrigger } from 'src/app/shared/animations';

@Component({
  animations: [fadeTrigger],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @HostBinding('@fade') animation = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/login']);
  }

}
