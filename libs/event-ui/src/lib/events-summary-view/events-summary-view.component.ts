import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'football-events-summary-view',
  templateUrl: './events-summary-view.component.html',
  styleUrls: ['./events-summary-view.component.css']
})
export class EventsSummaryViewComponent implements OnInit {
  monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  eventDate = {
    available: false,
    day: '',
    month: '',
    year: ''
  };
  @Input() event: any;
  constructor() {
    console.log(this.event);
  }

  ngOnInit() {
    this.setTheDates();
  }

  setTheDates() {
    if (this.event && this.event.date) {
      const eventDate = this.event.date.toDate();
      this.eventDate.available = true;
      this.eventDate.day = eventDate.getDate();
      this.eventDate.month = this.monthNames[eventDate.getMonth()];
      this.eventDate.year = eventDate.getYear();
      return this.eventDate;
    }
    return 'nothing';
  }
}
