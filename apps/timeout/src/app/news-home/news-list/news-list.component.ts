import { AuthenticationService, NewsCommonService } from '@football/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'football-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news: any[];
  newsTypes = [];
  filteringNews: any;
  _loading = false;
  selectedSport = '';

  constructor(private _newsService: NewsCommonService) {
    this.filteringNews = [];
  }

  ngOnInit() {
    this._loading = true;
    this._newsService.getNews().subscribe(news => {
      this.news = news;
      // console.log(news);
      this.filteringNews = news;
      this.news.forEach(item => {
        const relatedSports = item['relatedSports'];
        Object.keys(relatedSports).forEach(key => {
          if (relatedSports[key]) {
            if (this.newsTypes.indexOf(key) === -1) {
              this.newsTypes.push(key);
            }
          }
        });
        // console.log(this.newsTypes);
      });
      console.log(this.newsTypes);
      this._loading = false;
    });
  }

  filterNews(type) {
    if (type === 'clear') {
      this.selectedSport = '';
      this.filteringNews = this.news;
      return;
    }
    this.selectedSport = type;
    const filteredNews = this.news.filter(news => {
      if (news.relatedSports) {
        const relatedSports = news.relatedSports;
        if (Object.keys(relatedSports).indexOf(type) > -1) {
          return true;
        }
      }

      return false;
    });

    this.filteringNews = filteredNews;
    // this.filteringNews = Object.assign({}, filteredNews);
    // console.log(this.filteringNews);
  }

  getIcon(type) {
    const icon = 'assets/sportsTypes/';
    let rest = '';
    switch (type) {
      case 'cricket':
        rest = 'cricket.svg';
        break;
      case 'football':
        rest = 'football.svg';
        break;
      case 'badminton':
        rest = 'badminton.svg';
        break;
      case 'tug of war':
        rest = 'tugofwar.svg';
        break;

      case 'basketball':
        rest = 'basketball.svg';
        break;
      case 'volleyball':
        rest = 'volleyball.svg';
        break;
      default:
        rest = 'swim.svg';
        break;
    }
    return icon + rest;
  }
}
