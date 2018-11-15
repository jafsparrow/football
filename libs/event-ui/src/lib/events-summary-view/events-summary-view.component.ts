import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'football-events-summary-view',
  templateUrl: './events-summary-view.component.html',
  styleUrls: ['./events-summary-view.component.css']
})
export class EventsSummaryViewComponent implements OnInit {
  @Input() event: any;
  constructor() {}

  ngOnInit() {}
}
