import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { News } from '@football/shared';

@Component({
  selector: 'football-news-detail-view',
  templateUrl: './news-detail-view.component.html',
  styleUrls: ['./news-detail-view.component.css']
})
export class NewsDetailViewComponent implements OnInit {
  @Input() news: News;
  @Input() route: any;
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

  constructor(private router: Router) {}

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
  // this should navigate to the given route. if not route is given as input,
  // it should default to 'clubinfo/id'.
  navigateToClubDetails(clubId) {
    let routerPath = `clubs/clubinfo/${clubId}`;
    if (this.route) {
      routerPath = `${this.route}/${clubId}`;
    }

    this.router.navigate([routerPath]);
  }
}
