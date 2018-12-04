import { EventAdminService } from './../services/event-admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthenticationService } from '@football/shared';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventItem } from '../modals/event.modal';

@Component({
  selector: 'football-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'status'];
  dataSource: MatTableDataSource<EventItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private _eventsService: EventAdminService,
    private _auth: AuthenticationService
  ) {
    this._auth.user$
      .pipe(
        switchMap(user => {
          if (user) {
            return this._eventsService.getEventsForAdmin(user);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(res => (this.dataSource = new MatTableDataSource(res)));

    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
