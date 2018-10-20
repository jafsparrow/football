
import { AuthenticationService, NewsTeaserService } from '@football/shared';
import { Component, OnInit } from '@angular/core';
import { EventItem } from '@football/events';

@Component({
  selector: 'football-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  news: Array<any>;
  isNewsLoading: boolean;
  favNews: Array<any>;


  isFavNewsLoading = true;
  isUserLoggedIn = true;

  events: EventItem[];

  constructor(private authSerivice: AuthenticationService,
    private newsTeaser: NewsTeaserService) {
    this.isNewsLoading = true;

    this.events = [
      {title: 'hello world', summary: 'duper super duper hello world'},
      {title: 'Test event should see if it goes before one liner world', summary: 'duper super duper hello world'},
      {title: 'hello world', summary: 'duper super duper hello world'},
      {title: 'hello world', summary: 'duper super duper hello world'}
    ]
     }

  ngOnInit() {
    this.newsTeaser.getRecentTenNews()
    .subscribe(res => {
      console.log('homecomponent res of news');
      console.log(res.length)
      this.news = res;
      if (res.length !== 0) {
        this.isNewsLoading = false;
      }
    });
  }

}
