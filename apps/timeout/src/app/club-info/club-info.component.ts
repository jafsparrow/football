import { ClubService } from '@football/clubs';
import { switchMap, tap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NewsService } from '@football/news';
import { Observable } from 'rxjs';
import { NewsCommonService, EventsCommonService } from '@football/shared';

@Component({
  selector: 'football-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css']
})
export class ClubInfoComponent implements OnInit {
  clubId = '1';
  // clubNews$: Observable<any[]>;
  // isNewsLoading = false;
  isLoading;
  club = null;
  achievements = [];
  news = [];
  events = [];
  management = [];

  constructor(
    private _newsService: NewsCommonService,
    private _eventService: EventsCommonService,
    private _activatedrouter: ActivatedRoute,
    private _clubService: ClubService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this._activatedrouter.params
      .pipe(
        switchMap(params => {
          const clubId = params['id'];
          this.clubId = clubId;
          return this._clubService.findClubById(clubId).pipe(take(1));
        }),
        switchMap(club => {
          this.club = club;
          return this._clubService.getClubItemInfo('achievements', this.clubId);
        })
      )
      .subscribe(achievements => {
        this.isLoading = false;
        console.log(achievements);
        this.achievements = achievements;
      });
  }

  loadClubNews() {
    if (this.news.length === 0) {
      this._newsService
        .getClubNews(this.clubId, 10)
        .pipe(take(1))
        .subscribe(news => {
          this.news = news;
        });
    }
  }

  loadClubEvents() {
    if (this.events.length === 0) {
      this._eventService
        .getRecentClubEvents(this.clubId, 10)
        .pipe(take(1))
        .subscribe(events => (this.events = events));
    }
  }

  loadClubManagement() {
    if (this.management.length === 0) {
      this._clubService
        .getClubItemInfo('management', this.clubId)
        .subscribe(mgmnt => (this.management = mgmnt));
    }
  }

  loadClubAchivement() {
    if (this.achievements.length === 0) {
      this._clubService
        .getClubItemInfo('achievements', this.clubId)
        .subscribe(ach => (this.achievements = ach));
    }
  }
  selectedTab(tabName) {
    switch (tabName) {
      case 'News':
        this.loadClubNews();
        break;
      case 'Events':
        this.loadClubEvents();
        break;
      case 'Achievements':
        this.loadClubAchivement();
        break;
      case 'Management':
        this.loadClubManagement();
        break;
    }
  }
}
