import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() type = 'danger';
  @Output() close = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.close.emit('close');
  }
}
