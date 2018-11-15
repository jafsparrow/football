import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'football-events-summary-teaser',
  templateUrl: './events-summary-teaser.component.html',
  styleUrls: ['./events-summary-teaser.component.css']
})
export class EventsSummaryTeaserComponent implements OnInit {
  @Input() events: any[];
  constructor() {}

  ngOnInit() {}
}
