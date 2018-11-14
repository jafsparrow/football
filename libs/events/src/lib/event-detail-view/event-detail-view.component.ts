import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'football-event-detail-view',
  templateUrl: './event-detail-view.component.html',
  styleUrls: ['./event-detail-view.component.css']
})
export class EventDetailViewComponent implements OnInit {
  id = null;
  constructor(public activatedRoute: ActivatedRoute) {
    this.activatedRoute.params
      .pipe(
        switchMap(params => {
          this.id = params['id'];
          console.log(this.id);
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnInit() {}
}
