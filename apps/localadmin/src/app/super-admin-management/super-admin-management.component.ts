import { AuthenticationService } from '@football/shared';
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
  UserdisplayedColumns: string[] = ['username', 'actions'];
  dataSource: MatTableDataSource<ClubDisplay>;
  clubUsersDataSource: MatTableDataSource<UserDispaly>;
  clubAdminDataSource: MatTableDataSource<UserDispaly>;

  user: any;
  clubs: any[];
  isAdminFull = false;

  selectedClub$: BehaviorSubject<null | string>;
  localBodys$: Observable<any[]>;
  searchCriteria = {
    district: null,
    localBody: null,
    clubName: null
  };
  submitting = false;
  selectedClub = null;
  districts = Keraladistricts;
  constructor(
    public locationService: LocationService,
    public localAdminService: LocalAdminService,
    public auth: AuthenticationService
  ) {}

  ngOnInit() {
    // The below combineLatest is to filter localbodies based on selection.
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
    // a behavious subject to keep track of selected club so that users for the club can be fitlerd
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
        console.log('user returned for club followers');
        console.log(users);
        if (users) {
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

    // this.dataSource = new MatTableDataSource([
    //   { name: 'umbrealla', id: '5ZRSBNKpB1u2OJ0urK0w' }
    // ]);
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
        .subscribe(res => {
          this.dataSource = new MatTableDataSource(<any>res);
          console.log(res);
        });
    }
  }

  loadClubUsers(club) {
    console.log(club);
    this.selectedClub = club;
    this.selectedClub$.next(club.id);
  }

  revokeAccess(user) {
    if (
      confirm(
        `You are about to revoke the admin access of ${
          user.displayName
        } , Would you like to proceed?`
      )
    ) {
      this.submitting = true;
      this.localAdminService.removedUserAccess(user).then(() => {
        this.submitting = false;
        console.log('user access is removed');
      });
    }
  }
  grantAccess(user, role) {
    if (
      confirm(
        `You are about to give admin access to ${
          user.displayName
        } , Would you like to proceed?`
      )
    ) {
      this.submitting = true;
      console.log(this.selectedClub);
      console.log(user);
      this.localAdminService
        .updateUserAccess(user, 'admin', this.selectedClub.id)
        .then(() => {
          this.submitting = false;
          console.log('editor access updated');
        });
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
