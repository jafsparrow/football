import { EventsCommonService } from '@football/shared';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'football-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css']
})
export class EventsDetailComponent implements OnInit {
  event$: Observable<any>;
  constructor(
    public route: ActivatedRoute,
    public eventService: EventsCommonService
  ) {}

  ngOnInit() {
    this.event$ = this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        console.log(id);
        return this.eventService.getDetailedEvent(id);
      })
    );
  }
}
