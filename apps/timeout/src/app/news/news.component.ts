import { Component, OnInit } from '@angular/core';
import { sampleMockNews } from '@football/news';

@Component({
  selector: 'football-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news = sampleMockNews;
  constructor() { }

  ngOnInit() {

  }

}
