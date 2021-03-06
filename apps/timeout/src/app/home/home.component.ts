import {
  AuthenticationService,
  NewsTeaserService,
  EventsCommonService,
  NewsCommonService
} from '@football/shared';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  OnDestroy
} from '@angular/core';
import { EventItem } from '@football/events';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import {
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  Router
} from '@angular/router';

@Component({
  selector: 'football-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  loadingRouteConfig: boolean;
  // userSubscription: Subscription;
  // taggedClubNews$: Observable<any[]>;
  // taggedClubsEvents$: Observable<any[]>;
  // clubsArray = [];
  // news: Array<any>;
  // events$: Observable<any[]>;
  // news$: Observable<any[]>;
  // taggedNews$: Observable<any[]>;
  // isNewsLoading: boolean;
  // favNews: Array<any>;
  // user: any;
  // isFavNewsLoading = true;
  // isUserLoggedIn = true;
  // taggedClubsArray = [];

  // events: EventItem[];
  // homeMessage = { isLoggedIn: false, hasFavClub: true, hasTaggedClubs: false };

  constructor(private router: Router) {}
  // constructor(
  //   private authSerivice: AuthenticationService,
  //   private newsTeaser: NewsTeaserService,
  //   public newsService: NewsCommonService,
  //   private eventService: EventsCommonService // @Inject(PLATFORM_ID) private platformId, // private transferState: TransferState
  // ) {
  //   // this.isNewsLoading = true;
  // }

  ngOnInit() {
    // this.router.events.subscribe(event => {
    //   if (event instanceof RouteConfigLoadStart) {
    //     this.loadingRouteConfig = true;
    //   } else if (event instanceof RouteConfigLoadEnd) {
    //     this.loadingRouteConfig = false;
    //   }
    // });
    // // const EVENT_KEY = makeStateKey<any>('events-' + 3);
    // this.events$ = this.eventService
    //   .getTopeTierClubEvents(10)
    //   .pipe(tap(items => this.updateClubsArray(items)));
    // this.news$ = this.newsTeaser
    //   .getRecentTenNews()
    //   .pipe(tap(items => this.updateClubsArray(items)));
    // this.userSubscription = this.authSerivice.user$.subscribe(user => {
    //   if (user) {
    //     this.user = user;
    //     this.homeMessage.isLoggedIn = true;
    //     if (user.taggedClubs) {
    //       const userTaggedClubs = user.taggedClubs;
    //       if (Object.keys(user.taggedClubs).length > 0) {
    //         // if there are tagged clubs, get the news.
    //         this.taggedClubNews$ = this.newsService.getTaggedClubNews(user);
    //         this.taggedClubsEvents$ = this.eventService.getTaggedClubsEvents(
    //           user
    //         );
    //         Object.keys(userTaggedClubs).forEach(key => {
    //           this.taggedClubsArray.push(userTaggedClubs[key]);
    //         });
    //         this.homeMessage.hasTaggedClubs = true;
    //       }
    //     }
    //   }
    // });
    // this.events$ = this.authSerivice.user$.pipe(
    //   switchMap(user => {
    //     //TODO - tried to do server side data transfer for home page. It broke while the transition.
    //     // UI is getting broken. fix it later.
    //     // if (this.transferState.hasKey(EVENT_KEY)) {
    //     //   const events = this.transferState.get<any>(EVENT_KEY, null);
    //     //   this.transferState.remove(EVENT_KEY);
    //     //   return of(events);
    //     // } else {
    //     if (user) {
    //       // to display a info message for the user that user,
    //       // does not have fav or tagged_clubs. it will display on the page
    //       this.user = user;
    //       this.homeMessage.isLoggedIn = true;
    //       if (user.mainClub.id) {
    //         this.homeMessage.hasFavClub = true;
    //       }
    //       if (user.taggedClubs) {
    //         if (Object.keys(user.taggedClubs).length > 0) {
    //           this.homeMessage.hasTaggedClubs = true;
    //         }
    //       }
    //       return this.eventService.getEventsForLoggedInUser(user);
    //     }
    //     // if the user is not logged in, the message should say the following.
    //     return this.eventService.getTopeTierClubEvents(10);
    //   })
    // )
    // .pipe(
    //   tap(events => {
    //     if (isPlatformServer(this.platformId)) {
    //       this.transferState.set(EVENT_KEY, events);
    //     }
    //   })
    // );
  }

  // private updateClubsArray(items) {
  //   this.clubsArray = this.clubsArray
  //     .concat(items.map(event => event.mainClub))
  //     .filter(
  //       (club, index, arr) =>
  //         arr.map(item => item['id']).indexOf(club['id']) === index
  //     );

  //   return items;
  // }
  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
  }
}
