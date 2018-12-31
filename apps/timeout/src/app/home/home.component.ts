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
  user: any;
  isFavNewsLoading = true;
  isUserLoggedIn = true;

  events: EventItem[];
  homeMessage = { isLoggedIn: false, hasFavClub: false, hasTaggedClubs: false };
  constructor(
    private authSerivice: AuthenticationService,
    private newsTeaser: NewsTeaserService,
    private eventService: EventsCommonService
  ) {
    this.isNewsLoading = true;
  }

  ngOnInit() {
    this.events$ = this.authSerivice.user$.pipe(
      switchMap(user => {
        if (user) {
          // to display a info message for the user that user,
          // does not have fav or tagged_clubs. it will display on the page
          this.user = user;
          this.homeMessage.isLoggedIn = true;
          if (user.mainClub.id) {
            this.homeMessage.hasFavClub = true;
          }
          if (!user.taggedClubs) {
            if (Object.keys(user.taggedClubs).length < 1) {
              this.homeMessage.hasTaggedClubs = false;
            }
          }
          return this.eventService.getEventsForLoggedInUser(user);
        }
        // if the user is not logged in, the message should say the following.
        return this.eventService.getTopeTierClubEvents(10);
      })
    );

    this.news$ = this.newsTeaser.getRecentTenNews();
  }
}
