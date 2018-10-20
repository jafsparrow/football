import { NewsService } from './../services/news.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { News } from '../modals/news';

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
  news: News;

  constructor(public newsService: NewsService,
              public activatedRoute: ActivatedRoute) {
                this.isLoading = true;
              }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      switchMap(params => {
        const id = params['id'];
        return this.newsService.getDetailedNews(id);
        // console.log(news$);
        // return Observable.of(1);
      })
    )
    .subscribe(res => {
      console.log(res);
      this.news = res;
      console.log('this is after subscribing inside details');
      // if (this.news.tagged_clubs) {
      //   this.getClubDetails(this.news.tagged_clubs);
      // }
      this.isLoading = false;


    });

  }

}
