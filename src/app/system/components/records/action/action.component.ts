import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category, Action } from 'src/app/shared';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionComponent {
  @Input() categories: Category[] = [];
  @Output() addAction = new EventEmitter<Action | NgForm>();
  @ViewChild('form') form: NgForm;

  types = [
    {
      type: 'income',
      label: 'Income'
    },
    {
      type: 'outcome',
      label: 'Outcome'
    }
  ];

  onSubmit(form: NgForm): void {
    let { amount, description, category, type } = form.value;

    if (amount < 0) { amount = Math.abs(amount); }

    this.addAction.emit(
      new Action(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description.trim())
    );

    this.form.reset();
    this.form.form.patchValue({
      amount: 1,
      category: this.categories.length > 0 && this.categories[0].name,
      type: 'outcome'
    });
  }
}
