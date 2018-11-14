import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NewsService } from '@football/news';

@Component({
  selector: 'football-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css']
})
export class ClubInfoComponent implements OnInit {
  news = {
    banner:
      'http://www.clubcontrol.co.uk/wp-content/uploads/2016/01/Club-Control-Main-Banner-BG.jpg',
    logo:
      'http://diylogodesigns.com/blog/wp-content/uploads/2015/12/creative-football-club-logo-design-uk-14.png'
  };

  id = '';
  clubNews$: Observable<any[]>;
  constructor(public _newsService: NewsService) {}

  ngOnInit() {
    this._newsService.getNews().subscribe(res => console.log(res));
  }
}
