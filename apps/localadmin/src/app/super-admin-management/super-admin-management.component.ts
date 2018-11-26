import { AuthenticationService } from './../../../../../libs/shared/src/lib/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { LocationService } from '@football/shared';
import { switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { LocalAdminService } from '../services/local-admin.service';

export interface ClubDisplay {
  name: string;
}
export interface UserDispaly {
  name: string;
}
@Component({
  selector: 'football-super-admin-management',
  templateUrl: './super-admin-management.component.html',
  styleUrls: ['./super-admin-management.component.css']
})
export class SuperAdminManagementComponent implements OnInit {
  districtFilter$: BehaviorSubject<string | null>;
  bodyTypeFilter$: BehaviorSubject<string | null>;

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<ClubDisplay>;
  UserdisplayedColumns: string[] = ['username', 'actions'];
  clubUsersDataSource: MatTableDataSource<UserDispaly>;
  clubAdminDataSource: MatTableDataSource<UserDispaly>;

  selectedClub$: BehaviorSubject<null | string>;
  user: any;
  clubs: any[];
  isAdminFull = false;

  localBodys$: Observable<any[]>;
  searchCriteria = {
    district: null,
    localBody: null,
    clubName: null
  };
  districts = Keraladistricts;
  constructor(
    public locationService: LocationService,
    public localAdminService: LocalAdminService,
    public auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.districtFilter$ = new BehaviorSubject(null);
    this.bodyTypeFilter$ = new BehaviorSubject(null);

    this.localBodys$ = combineLatest(
      this.districtFilter$,
      this.bodyTypeFilter$
    ).pipe(
      switchMap(([district, bodyType]) => {
        return this.locationService.searchLocalBodies(district, bodyType);
      })
    );

    this.selectedClub$ = new BehaviorSubject(null);

    this.selectedClub$
      .pipe(
        switchMap(clubId => {
          if (clubId) {
            return this.localAdminService.getClubFollowers(clubId);
          }
          return of(null);
        })
      )
      .subscribe(users => {
        if (users) {
          console.log('subscribed for user');
          console.log(users);
          const admins = users.filter(user => {
            if (user.permission && user.permission.role) {
              return user.permission.role === 'admin';
            }
          });

          if (admins.length > 2) {
            this.isAdminFull = true;
          }
          this.clubUsersDataSource = new MatTableDataSource(users);
          this.clubAdminDataSource = new MatTableDataSource(admins);
        }
      });
  }

  distChange(value) {
    this.bodyTypeFilter$.next('Municipality');
    this.districtFilter$.next(value);

    this.searchCriteria.district = value;
  }

  bodyTypeChange(value) {
    this.bodyTypeFilter$.next(value);
  }
  localBodyChange(value) {
    this.searchCriteria.localBody = value;
  }
  searchClubs() {
    console.log(this.searchCriteria);
    const localBodyCode = this.searchCriteria.localBody;
    if (localBodyCode) {
      this.localAdminService
        .getClubsOnLocalBodyCode(localBodyCode)
        .subscribe(res => (this.dataSource = new MatTableDataSource(<any>res)));
    }
  }
}
export const Keraladistricts = [
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikkode',
  'Wayanad',
  'Kannur',
  'Kasaragod'
];
