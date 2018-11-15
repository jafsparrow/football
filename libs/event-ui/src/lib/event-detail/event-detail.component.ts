import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'football-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event;
  constructor() {}

  ngOnInit() {}
}
