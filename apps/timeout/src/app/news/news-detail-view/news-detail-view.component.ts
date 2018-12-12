import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsCommonService } from '@football/shared';
import { Component, OnInit } from '@angular/core';
import { News } from '@football/shared';
import { switchMap, tap } from 'rxjs/operators';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'football-news-full',
  templateUrl: './news-detail-view.component.html',
  styleUrls: ['./news-detail-view.component.css']
})
export class NewsFullViewComponent implements OnInit {
  news$: Observable<News>;
  constructor(
    private _newsService: NewsCommonService,
    public activatedRoute: ActivatedRoute,
    private seo: SeoService
  ) {}

  ngOnInit() {
    let id = '';
    this.news$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        id = params['id'];
        return this._newsService.getDetailedNews(id);
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
}
