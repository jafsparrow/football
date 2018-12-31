import {
  AuthenticationService,
  NewsTeaserService,
  EventsCommonService
} from '@football/shared';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { EventItem } from '@football/events';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

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
  user: any;
  isFavNewsLoading = true;
  isUserLoggedIn = true;

  events: EventItem[];
  homeMessage = { isLoggedIn: false, hasFavClub: false, hasTaggedClubs: false };
  constructor(
    private authSerivice: AuthenticationService,
    private newsTeaser: NewsTeaserService,
    private eventService: EventsCommonService // @Inject(PLATFORM_ID) private platformId, // private transferState: TransferState
  ) {
    this.isNewsLoading = true;
  }

  ngOnInit() {
    // const EVENT_KEY = makeStateKey<any>('events-' + 3);
    this.events$ = this.authSerivice.user$.pipe(
      switchMap(user => {
        //TODO - tried to do server side data transfer for home page. It broke while the transition.
        // UI is getting broken. fix it later.
        // if (this.transferState.hasKey(EVENT_KEY)) {
        //   const events = this.transferState.get<any>(EVENT_KEY, null);
        //   this.transferState.remove(EVENT_KEY);
        //   return of(events);
        // } else {
        if (user) {
          // to display a info message for the user that user,
          // does not have fav or tagged_clubs. it will display on the page

          this.user = user;
          this.homeMessage.isLoggedIn = true;
          if (user.mainClub.id) {
            this.homeMessage.hasFavClub = true;
          }
          if (user.taggedClubs) {
            if (Object.keys(user.taggedClubs).length > 0) {
              this.homeMessage.hasTaggedClubs = true;
            }
          }

          return this.eventService.getEventsForLoggedInUser(user);
        }
        // if the user is not logged in, the message should say the following.
        return this.eventService.getTopeTierClubEvents(10);
      })
      // )
      // .pipe(
      //   tap(events => {
      //     if (isPlatformServer(this.platformId)) {
      //       this.transferState.set(EVENT_KEY, events);
      //     }
      //   })
    );

    this.news$ = this.newsTeaser.getRecentTenNews();
  }
}
