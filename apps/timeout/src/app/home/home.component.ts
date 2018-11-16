import {
  AuthenticationService,
  NewsTeaserService,
  EventsCommonService
} from '@football/shared';
import { Component, OnInit } from '@angular/core';
import { EventItem } from '@football/events';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'football-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news: Array<any>;
  events$: Observable<any[]>;
  news$: Observable<any[]>;
  isNewsLoading: boolean;
  favNews: Array<any>;

  isFavNewsLoading = true;
  isUserLoggedIn = true;

  events: EventItem[];

  constructor(
    private authSerivice: AuthenticationService,
    private newsTeaser: NewsTeaserService,
    private eventService: EventsCommonService
  ) {
    this.isNewsLoading = true;

    this.events = [
      { title: 'hello world', summary: 'duper super duper hello world' },
      {
        title: 'Test event should see if it goes before one liner world',
        summary: 'duper super duper hello world'
      },
      { title: 'hello world', summary: 'duper super duper hello world' },
      { title: 'hello world', summary: 'duper super duper hello world' }
    ];
  }

  ngOnInit() {
    this.events$ = this.authSerivice.user$.pipe(
      switchMap(user => {
        return this.eventService.getEvents(user, 10);
      })
    );

    this.news$ = this.newsTeaser.getRecentTenNews();
  }
}
