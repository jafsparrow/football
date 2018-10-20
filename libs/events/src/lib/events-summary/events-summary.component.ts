import { EventItem } from './../modals/event.modal';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'football-events-summary',
  templateUrl: './events-summary.component.html',
  styleUrls: ['./events-summary.component.css']
})
export class EventsSummaryComponent implements OnInit {
  @Input() eventItem: EventItem
  constructor() { }

  ngOnInit() {
  }

}
