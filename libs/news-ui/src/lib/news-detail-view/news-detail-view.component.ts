import { Component, OnInit, Input } from '@angular/core';
import { News } from '@football/shared';

@Component({
  selector: 'football-news-detail-view',
  templateUrl: './news-detail-view.component.html',
  styleUrls: ['./news-detail-view.component.css']
})
export class NewsDetailViewComponent implements OnInit {
  @Input() news: News;
  news1 = {
    author: 'Jafar Chembatty',
    title: 'hello title of the news',
    image: '',
    summary: 'summary of the nwes',
    publishedDate: new Date(),
    createdDate: new Date(),
    content: 'hello content teams',
    article: 'some valya sambhavam'
  };

  constructor() {}

  ngOnInit() {
    // console.log(this.news)
  }
  get relatedGames() {
    if (
      this.news.relatedSports &&
      Object.keys(this.news.relatedSports).length > 0
    ) {
      return Object.keys(this.news.relatedSports);
    }
    return [];
  }
  get publishedDate() {
    return this.news.publishedDate ? this.news.publishedDate.toDate() : '';
  }

  get taggedClubs() {
    return Object.keys(this.news.taggedClubs);
  }
}
