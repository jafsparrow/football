import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsCommonService } from './../../../../../../libs/shared/src/lib/services/news-common.service';
import { Component, OnInit } from '@angular/core';
import { News } from '@football/shared';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'football-news-full',
  templateUrl: './news-detail-view.component.html',
  styleUrls: ['./news-detail-view.component.css']
})
export class NewsFullViewComponent implements OnInit {
  news$: Observable<News>;
  constructor(
    private _newsService: NewsCommonService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.news$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        console.log(params);
        const id = params['id'];
        return this._newsService.getDetailedNews(id);
      })
    );
  }
}
