import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { Category, Message } from 'src/app/shared/models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  @Input() categories: Array<Category>;
  @Input() channel$: Observable<any>;
  @Output() addCategory = new EventEmitter<Category>();
  @Output() editCategory = new EventEmitter<Category>();
  @Output() removeCategory = new EventEmitter<Category>();
  @ViewChild('form') form: NgForm;

  message: Message;
  selected: {
    id: number,
    category: null | Category
  };

  constructor() { }

  ngOnInit() {
    this.message = new Message('', '');
    this.selected = { id: 0, category: null };
    this.onCategoryChange();
  }

  onCategoryChange() {
    const id = +this.selected.id;

    if (id !== 0) {
      this.selected.category = this.categories.find((category: Category) => category.id === id);
    } else {
      this.selected.category = new Category(null, '1');
    }
    this.message.text = '';
  }

  onRemove() {
    if (+this.selected.id !== 0) {
      this.removeCategory.emit(this.selected.category);
      this.selected.id = 0;
      this.resetForm(this.form);
    }
  }

  onSubmit(form: NgForm) {
    let { categoryName, limit } = form.value;
    const category = new Category(categoryName, limit > 0 ? limit : limit * -1);

    if (+this.selected.id === 0) {
      this.addCategory.emit(category);
    } else {
      category.id = +this.selected.id;
      this.editCategory.emit(category);
    }

    this.channel$.subscribe(data => {
      if (data === 'created') {
        this.message = new Message('success', `Category ${category.name} was added!`);
        this.resetForm(form);
      }

      if (data === 'edited') {
        this.message = new Message('success', `Category ${category.name} was edited!`);
      }
    });
  }

  onHideAlert() {
    this.message.text = '';
  }

  private resetForm(form: NgForm) {
    form.reset();
    form.form.patchValue({ limit: 1 });
  }
}
