import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  news = {
    author: 'Jafar Chembatty',
    title: 'hello title of the news',
    image: '',
    summary: 'summary of the nwes',
    publishedDate: new Date(),
    createdDate: new Date(),
    content: 'hello content teams',
    article: 'some valya sambhavam'
  }
  constructor() { }

  ngOnInit() {
  }

}
