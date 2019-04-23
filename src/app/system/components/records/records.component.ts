import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Category } from 'src/app/shared/models';
import { RecordsService } from 'src/app/core/services';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy {
  private channel = new Subject();
  private destroy$ = new Subject<boolean>();

  categories: Array<Category>;
  channel$ = this.channel.asObservable();
  isLoaded = false;

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.recordsService.getCategories()
    .pipe(takeUntil(this.destroy$))
    .subscribe((categories: Array<Category>) => {
      this.categories = categories;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.channel.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onAddCategory(category: Category) {
    this.recordsService.createCategory(category)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Category) => {
        this.categories = [...this.categories, data];
        this.channel.next('created');
      });
  }

  onEditCategory(category: Category) {
    this.recordsService.updateCategory(category)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Category) => {
        const tmp = this.categories.filter((item: Category) => item.id !== data.id);
        this.categories = [...tmp, category];
        this.channel.next('edited');
      });
  }

  onRemoveCategory(category: Category) {
    this.recordsService.removeCategory(category.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const tmp = this.categories.filter((item: Category) => item.id !== category.id);
        this.categories = [...tmp];
      });
  }
}
