import { NewsCommonService } from './../../../../../../libs/shared/src/lib/services/news-common.service';
import { switchMap, share } from 'rxjs/operators';
import { AuthenticationService, News } from '@football/shared';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { sampleMockNews, NewsService } from '@football/news';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'football-news-landing',
  templateUrl: './news-landing.component.html',
  styleUrls: ['./news-landing.component.css']
})
export class NewsLandingComponent implements OnInit, OnDestroy {
  news = sampleMockNews;
  userSubscription: Subscription;
  user: any;
  news$: Observable<News[]>;

  mainClubNews$: any;
  taggedClubNews$: any;
  recentNews$: any;

  constructor(
    private _auth: AuthenticationService,
    public newsService: NewsCommonService
  ) {
    this.user = null;
  }

  ngOnInit() {
    this.userSubscription = this._auth.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });

    const userObservalbe = this._auth.user$.pipe(share());

    this.mainClubNews$ = userObservalbe.pipe(
      switchMap(user => {
        if (user) {
          return this.newsService.getClubNews(user.mainClub.id, 6);
        } else {
          return user;
        }
      })
    );

    this.taggedClubNews$ = userObservalbe.pipe(
      switchMap(user => {
        if (user) {
          return this.newsService.getTaggedClubNews(user);
        } else {
          return user;
        }
      })
    );

    this.recentNews$ = this.newsService.getNews(10);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
