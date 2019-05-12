import { Action, Category } from 'src/app/shared';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActionsService, RecordsService } from 'src/app/core/services';
import { takeUntil, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  action: Action;
  category: Category;
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private actionsService: ActionsService,
    private recordsService: RecordsService
  ) { }

  ngOnInit() {
    this.getAction();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private getAction(): void {
    const id = this.route.snapshot.params.id;

    if (id) {
      this.actionsService.getActionById(id)
        .pipe(
          takeUntil(this.destroy$),
          mergeMap((action: Action) => {
            this.action = action;
            return this.recordsService.getCategoryById(action.category);
          })
        )
        .subscribe((category: Category) => {
          this.category = category;
          this.isLoaded = true;
        });
    }
  }
}
