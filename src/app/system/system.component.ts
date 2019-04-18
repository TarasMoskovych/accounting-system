import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const url = this.router.url.split('/');

    if (url.length <= 2) {
      this.router.navigate(['/system', 'bill']);
    }
  }
}
