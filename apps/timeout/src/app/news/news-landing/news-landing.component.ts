import { Component, OnInit } from '@angular/core';
import { sampleMockNews } from '@football/news';

@Component({
  selector: 'football-news-landing',
  templateUrl: './news-landing.component.html',
  styleUrls: ['./news-landing.component.css']
})
export class NewsLandingComponent implements OnInit {
  news = sampleMockNews;
  constructor() { }

  ngOnInit() {
  }

}
