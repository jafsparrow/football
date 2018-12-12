import { AuthenticationService } from '@football/shared';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsCommonService } from '@football/shared';
import { switchMap, tap, filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'football-events-landing',
  templateUrl: './events-landing.component.html',
  styleUrls: ['./events-landing.component.css']
})
export class EventsLandingComponent implements OnInit, OnDestroy {
  favClubsEvents$: Observable<any[]>;
  taggedClubsEvents$: Observable<any[]>;
  topClubsEvents$: Observable<any[]>;

  user: any = null;
  userSubscription: Subscription;
  clubsArray = [];
  constructor(
    private eventService: EventsCommonService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe(user => {
      this.user = user;
      if (this.user && this.user.mainClub) {
        this.favClubsEvents$ = this.eventService
          .getRecentClubEvents(this.user.mainClub.id)
          .pipe(
            tap(events => {
              return this.updateClubsArrayFromEvents(events);
            })
          );
      }
      if (this.user && this.user.taggedClubs) {
        this.taggedClubsEvents$ = this.eventService
          .getTaggedClubsEvents(this.user)
          .pipe(
            tap(events => {
              return this.updateClubsArrayFromEvents(events);
            })
          );
      }

      this.topClubsEvents$ = this.eventService.getTopeTierClubEvents().pipe(
        tap(events => {
          return this.updateClubsArrayFromEvents(events);
        })
      );
    });
  }

  private updateClubsArrayFromEvents(events) {
    this.clubsArray = this.clubsArray
      .concat(events.map(event => event.mainClub))
      .filter(
        (club, index, arr) =>
          arr.map(item => item['id']).indexOf(club['id']) === index
      );

    return events;
  }
  ngOnDestroy() {}

  test() {
    console.log(this.clubsArray);
  }
}
