import { NewsService } from './../services/news.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { News } from '../modals/news';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@football/shared';

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
  isAdminSite = false;
  constructor(
    public newsService: NewsService,
    public activatedRoute: ActivatedRoute,
    private _auth: AuthenticationService,
    @Inject('siteType') siteType
  ) {
    this.isLoading = true;
    if (siteType === 'admin') {
      this.isAdminSite = true;
    }
  }

  ngOnInit() {
    this.news$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        console.log(params);
        const id = params['id'];
        return this.newsService.getDetailedNews(id);
      })
    );
  }

  ngOnDetroy() {}
}
