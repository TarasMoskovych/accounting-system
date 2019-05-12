import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryChartComponent {
  @Input() data = {};
}
