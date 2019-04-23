import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/shared/models';
import { RecordsService } from 'src/app/core/services';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  categories: Array<Category>;
  isLoaded = false;

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.recordsService.getCategories().subscribe((categories: Array<Category>) => {
      this.categories = categories;
      this.isLoaded = true;
    });
  }

  onAddCategory(category: Category) {
    this.categories.push(category);
  }

  onEditCategory(category: Category) {
    const idx = this.categories.findIndex((item: Category) => item.id === category.id);

    if (idx > -1) {
      this.categories.splice(idx, 1, category);
    }
  }

  onRemoveCategory(category: Category) {
    this.recordsService.removeCategory(category.id).subscribe(() => {
      const idx = this.categories.findIndex((item: Category) => item.id === category.id);

      if (idx > -1) {
        this.categories.splice(idx, 1);
      }
    });
  }
}
