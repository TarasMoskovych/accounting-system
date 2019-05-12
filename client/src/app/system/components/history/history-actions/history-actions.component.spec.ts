import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryActionsComponent } from './history-actions.component';

describe('HistoryActionsComponent', () => {
  let component: HistoryActionsComponent;
  let fixture: ComponentFixture<HistoryActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
