import { Component, OnInit, Input } from '@angular/core';
import { EventItem } from '../modals/event.modal';

@Component({
  selector: 'football-events-teaser',
  templateUrl: './events-teaser.component.html',
  styleUrls: ['./events-teaser.component.css']
})
export class EventsTeaserComponent implements OnInit {
  @Input() events: EventItem[];
  constructor() { }

  ngOnInit() {
  }

}
