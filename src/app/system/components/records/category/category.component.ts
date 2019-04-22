import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RecordsService } from 'src/app/core/services';
import { Category, Message } from 'src/app/shared/models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() categories: Array<Category>;
  @Output() addCategory = new EventEmitter<Category>();
  @Output() editCategory = new EventEmitter<Category>();

  message: Message;
  selected: {
    id: number,
    category: null | Category
  };

  constructor(private recordsService: RecordsService) { }

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
  }

  onSubmit(form: NgForm) {
    let { name, limit } = form.value;
    const category = new Category(name, limit > 0 ? limit : limit * -1);

    if (+this.selected.id === 0) {
      this.createCategory(category, form);
    } else {
      category.id = +this.selected.id;
      this.updateCategory(category, form);
    }
  }

  onHideAlert() {
    this.message.text = '';
  }

  private createCategory(category: Category, form: NgForm) {
    this.recordsService.createCategory(category)
      .subscribe((data: Category) => {
        this.message = new Message('success', `Category ${category.name} was added!`);
        this.resetForm(form);
        this.addCategory.emit(data);
      });
  }

  private updateCategory(category: Category, form: NgForm) {
    this.recordsService.updateCategory(category)
      .subscribe((data: Category) => {
        this.message = new Message('success', `Category ${category.name} was edited!`);
        this.editCategory.emit(data);
      });
  }

  private resetForm(form: NgForm) {
    form.reset();
    form.form.patchValue({ limit: 1 });
  }
}
