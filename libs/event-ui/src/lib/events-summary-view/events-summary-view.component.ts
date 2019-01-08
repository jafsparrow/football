import { Component, OnInit, Input } from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';

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
  relatedSports = null;
  relatedItemsArr = [];
  @Input() event: any;
  constructor() {}

  ngOnInit() {
    this.setTheDates();
    this.relatedItemsArr = this.setRelatedSports(this.event.relatedSports);
  }

  setTheDates() {
    if (this.event && this.event.date) {
      const eventDate = this.event.date.toDate();
      // console.log(eventDate);
      this.eventDate.available = true;
      this.eventDate.day = eventDate.getDate();

      this.eventDate.month = this.monthNames[eventDate.getMonth()];
      this.eventDate.year = eventDate.getFullYear(); // TODO- this can be a tutorial. eventDate.getYear() was giving me 119 like results.

      return this.eventDate;
    }
    return 'nothing';
  }
  setRelatedSports(relatedSports) {
    const relatedItemArr = [];
    if (relatedSports) {
      Object.keys(relatedSports).forEach(function(key) {
        if (relatedSports[key]) {
          relatedItemArr.push(key);
        }
      });
      return relatedItemArr;
    }
  }

  getBackColor(item) {
    return eventBackColour[item] ? eventBackColour[item] : '#90A4AE';
  }
}

const eventBackColour = {
  football: '#CE93D8',
  cricket: '#1DE9B6',
  volleyball: '#DCE775',
  hockey: '#F06292',
  basketball: '#4DB6AC',
  other: '#90A4AE'
};
