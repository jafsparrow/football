import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NewsCommonService } from '@football/shared';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  OnDestroy
} from '@angular/core';
import { News } from '@football/shared';
import { switchMap, tap } from 'rxjs/operators';
import { SeoService } from '../../services/seo.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'football-news-full',
  templateUrl: './news-detail-view.component.html',
  styleUrls: ['./news-detail-view.component.css']
})
export class NewsFullViewComponent implements OnInit, OnDestroy {
  news$: Observable<News>;
  constructor(
    private _newsService: NewsCommonService,
    public activatedRoute: ActivatedRoute,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId,
    private transferState: TransferState
  ) {}

  ngOnInit() {
    let id = '';
    this.news$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        id = params['id'];

        const NEWS_KEY = makeStateKey<any>('news-' + id);
        if (this.transferState.hasKey(NEWS_KEY)) {
          const news = this.transferState.get<any>(NEWS_KEY, null);
          this.transferState.remove(NEWS_KEY);
          return of(news);
        } else {
          return this._newsService.getDetailedNews(id).pipe(
            tap(course => {
              if (isPlatformServer(this.platformId)) {
                this.transferState.set(NEWS_KEY, course);
              }
            })
          );
        }
      }),
      tap(news => {
        this.seo.generateTags({
          id: id,
          title: news.title,
          description: news.summary,
          image: news.image ? news.image : ''
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.seo.generateTags({
      title: 'timeout sports'
    });

    console.log('hello ');
  }
}
