import { EventAdminService } from './../services/event-admin.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from '@football/shared';

@Component({
  selector: 'football-event-detail-view',
  templateUrl: './event-detail-view.component.html',
  styleUrls: ['./event-detail-view.component.css']
})
export class EventDetailViewComponent implements OnInit {
  // event = {
  //   id: '1',
  //   title: 'title of event',
  //   status: 'draft',
  //   mainClub: {
  //     id: '1',
  //     name: 'liverpool'
  //   },
  //   author: {
  //     name: 'jafar',
  //     uid: 'xDOPgribklNFMggif6cbEoQLv6m1'
  //   }
  // };
  id = null;
  isLoading;
  tagged_clubs = [];
  activeRoute: any;
  newsId: any;
  event$: any;

  constructor(
    public eventService: EventAdminService,
    public activatedRoute: ActivatedRoute,
    private _auth: AuthenticationService
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.event$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        console.log(params);
        const id = params['id'];
        return this.eventService.getDetailedEvent(id);
      })
    );
  }
}
