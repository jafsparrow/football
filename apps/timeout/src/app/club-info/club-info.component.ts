import { ClubService } from '@football/clubs';
import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NewsService } from '@football/news';
import { Observable } from 'rxjs';

@Component({
  selector: 'football-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css']
})
export class ClubInfoComponent implements OnInit {
  clubId = '1';
  clubNews$: Observable<any[]>;
  events: any;
  isNewsLoading = false;
  club = null;
  constructor(
    private _newsService: NewsService,
    private _activatedrouter: ActivatedRoute,
    private _clubService: ClubService
  ) {
    // subscribe(params => {
    //   this.clubId = params['id'];
    // });
  }

  ngOnInit() {
    this.isNewsLoading = true;
    this.clubNews$ = this._activatedrouter.params.pipe(
      switchMap(params => {
        const clubId = params['id'];
        return this._clubService.findClubById(clubId);
      }),
      switchMap(club => {
        this.club = club;
        console.log(club);
        return this._newsService.getClubNews(club.id, 10);
      }),
      tap(news => (this.isNewsLoading = false))
    );

    this.events = [
      { title: 'hello world', summary: 'duper super duper hello world' },
      {
        title: 'Test event should see if it goes before one liner world',
        summary: 'duper super duper hello world'
      },
      { title: 'hello world', summary: 'duper super duper hello world' },
      { title: 'hello world', summary: 'duper super duper hello world' }
    ];
  }
}
