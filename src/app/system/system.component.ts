import { Component, OnInit, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { fadeTrigger } from 'src/app/shared/animations';

@Component({
  animations: [fadeTrigger],
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  @HostBinding('@fade') animation = true;

  constructor(
    private router: Router,
    private title: Title
  ) {
    title.setTitle('Accounting System');
  }

  ngOnInit() {
    const url = this.router.url.split('/');

    if (url.length <= 2) {
      this.router.navigate(['/system', 'bill']);
    }
  }
}
