import { AuthenticationService } from '@football/shared';
import { NewsService } from './../services/news.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { News } from '../modals/news';
import { Subscription } from 'rxjs';

@Component({
  selector: 'news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.css']
})
export class NewsViewComponent implements OnInit {
  isLoading;
  tagged_clubs = [];
  activeRoute: any;
  newsId: any;
  news$: any;

  @Input() siteType = 'admin';

  constructor(
    public newsService: NewsService,
    public activatedRoute: ActivatedRoute,
    private _auth: AuthenticationService
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.news$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        const id = params['id'];
        return this.newsService.getDetailedNews(id);
      })
    );
  }

  ngOnDetroy() {}
}
