import { NewsCommonService } from '@football/shared';
import { switchMap, share, tap } from 'rxjs/operators';
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
  clubsArray = [];
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
        if (user.mainClub && user.mainClub.id) {
          this.mainClubNews$ = this.newsService
            .getClubNews(user.mainClub.id, 6)
            .pipe(
              tap(news => {
                return this.updateClubsArrayFromEvents(news);
              })
            );
        }

        if (user.taggedClubs) {
          this.taggedClubNews$ = this.newsService.getTaggedClubNews(user).pipe(
            tap(news => {
              return this.updateClubsArrayFromEvents(news);
            })
          );
        }
      }
    });

    this.recentNews$ = this.newsService.getNews(10).pipe(
      tap(news => {
        return this.updateClubsArrayFromEvents(news);
      })
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private updateClubsArrayFromEvents(news) {
    this.clubsArray = this.clubsArray
      .concat(news.map(event => event.mainClub))
      .filter(
        (club, index, arr) =>
          arr.map(item => item['id']).indexOf(club['id']) === index
      );

    return news;
  }
}
