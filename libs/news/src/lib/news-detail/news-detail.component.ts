import { Component, OnInit, Input } from '@angular/core';
import { News } from '../modals/news';

@Component({
  selector: 'news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  @Input() news: News
  news1 = {
    author: 'Jafar Chembatty',
    title: 'hello title of the news',
    image: '',
    summary: 'summary of the nwes',
    publishedDate: new Date(),
    createdDate: new Date(),
    content: 'hello content teams',
    article: 'some valya sambhavam'
  }

  get relatedGames() {
    if(this.news.relatedSports && (Object.keys(this.news.relatedSports)).length > 0) {
      return Object.keys(this.news.relatedSports);
    }
    return [];
  }

  constructor() { }

  ngOnInit() {
    console.log(this.news)
  }

}
