import { MainClub } from './../../../../../../libs/news/src/lib/modals/news';
import { AuthenticationService } from '@football/shared';
import { Component, OnInit } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { NewsService } from '@football/news';
import { Subscription, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'football-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news$;
  user: any;
  userSubscription: Subscription;
  newsSubscription: Subscription;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public newsService: NewsService,
    private _auth: AuthenticationService
  ) {
    this.user = null;

    this.userSubscription = this._auth.user$.subscribe(
      user => (this.user = user)
    );
  }

  ngOnInit() {
    this.news$ = forkJoin([
      this._activatedRoute.params.pipe(take(1)),
      this._auth.user$.pipe(take(1))
    ]).pipe(
      switchMap(([params, user]) => {
        const id = params['type'];
        if (id) {
          switch (id) {
            case 'all':
              // return news item for all the news
              return this.newsService.getNews();
              break;
            case 'tagged':
              return this.newsService.getTaggedClubNews(user);
              break;
            default:
              return this.newsService.getClubNews(user.mainClub.id);
              break;
          }
        }
      })
    );

    // });
    // this.news$ = this._activatedRoute.params.pipe(
    //   switchMap(params => {
    //     const id = params['type'];
    //     console.log('inside the param areas7' + id);

    //     if (id) {
    //       console.log('the ide ' + id);

    //       switch (id) {
    //         case 'all':
    //           // return news item for all the news
    //           return this.newsService.getNews();
    //           break;
    //         case 'tagged':
    //           console.log('I am in tagged section');

    //           return this.newsService.getTaggedClubNews({
    //             taggedClubs: {
    //               VtT99aikQMEv3vh1VkGq: { id: 'VtT99aikQMEv3vh1VkGq' },
    //               YYlnUyMiUstoMwXLWVlh: { id: 'YYlnUyMiUstoMwXLWVlh' }
    //             }
    //           });
    //           break;
    //         default:
    //           return this.newsService.getClubNews('VtT99aikQMEv3vh1VkGq');
    //           break;
    //       }
    //     }

    //     return this.newsService.getDetailedNews(id);
    //   })
    // );
  }
}
