import { EventsCommonService } from '@football/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'football-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events: any[];
  eventTypes = [];
  filteringEvents: any;
  _loading = false;
  selectedSport = '';

  constructor(private _eventservice: EventsCommonService) {
    this.filteringEvents = [];
  }

  ngOnInit() {
    this._loading = true;
    this._eventservice.getRecentEvents().subscribe(events => {
      this.events = events;
      // console.log(events);
      this.filteringEvents = events;
      this.events.forEach(item => {
        const relatedSports = item['relatedSports'];

        Object.keys(relatedSports).forEach(key => {
          if (relatedSports[key]) {
            if (this.eventTypes.indexOf(key) === -1) {
              this.eventTypes.push(key);
            }
          }
        });
      });
      this._loading = false;
    });
  }

  filterEvents(type) {
    if (type === 'clear') {
      this.selectedSport = '';
      this.filteringEvents = this.events;
      return;
    }
    this.selectedSport = type;
    const filteredEvents = this.events.filter(news => {
      if (news.relatedSports) {
        const relatedSports = news.relatedSports;
        if (Object.keys(relatedSports).indexOf(type) > -1) {
          return true;
        }
      }

      return false;
    });

    this.filteringEvents = filteredEvents;
  }

  getIcon(type) {
    const icon = 'assets/sportsTypes/';
    let rest = '';
    switch (type) {
      case 'cricket':
        rest = 'cricket.svg';
        break;
      case 'football':
        rest = 'football.svg';
        break;
      case 'badminton':
        rest = 'badminton.svg';
        break;
      case 'tug of war':
        rest = 'tugofwar.svg';
        break;

      case 'basketball':
        rest = 'basketball.svg';
        break;
      case 'volleyball':
        rest = 'volleyball.svg';
        break;

      case 'boxing':
        rest = 'boxing.svg';
        break;

      case 'tennis':
        rest = 'tennis.svg';
        break;
      case 'hockey':
        rest = 'hockey.svg';
        break;
      default:
        rest = 'swim.svg';
        break;
    }
    return icon + rest;
  }
}
