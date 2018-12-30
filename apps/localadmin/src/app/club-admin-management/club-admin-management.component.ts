import { Component, OnInit } from '@angular/core';
import { LocalAdminService } from '../services/local-admin.service';
import { MatTableDataSource } from '@angular/material';
import { AuthenticationService } from '@football/shared';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
export interface ClubDisplay {
  name: string;
}
export interface UserDispaly {
  name: string;
}

@Component({
  selector: 'football-club-admin-management',
  templateUrl: './club-admin-management.component.html',
  styleUrls: ['./club-admin-management.component.css']
})
export class ClubAdminManagementComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<ClubDisplay>;
  UserdisplayedColumns: string[] = ['username', 'actions'];
  clubUsersDataSource: MatTableDataSource<UserDispaly>;
  clubAdminDataSource: MatTableDataSource<UserDispaly>;

  selectedClub$: BehaviorSubject<null | string>;
  user: any;
  clubs: any[];
  isAdminFull = false;
  constructor(
    public localAdminService: LocalAdminService,
    public auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.auth.user$
      .pipe(
        switchMap(user => {
          this.user = user;
          console.log('users localbody' + user.address.localBody);
          return this.localAdminService.getLocalClubs(user.address.localBody);
        })
      )
      .subscribe(clubs => {
        console.log(clubs);
        this.clubs = clubs;
        this.dataSource = new MatTableDataSource(<any>clubs);
      });

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
        console.log(users);
        if (users) {
          console.log('subscribed for user');

          const admins = users.filter(user => {
            if (user.permission && user.permission.role) {
              return user.permission.role === 'admin';
            }
            return user; // if the user is new nad have nor permission updated at all.
          });

          if (admins.length > 2) {
            this.isAdminFull = true;
          }
          this.clubUsersDataSource = new MatTableDataSource(users);
          this.clubAdminDataSource = new MatTableDataSource(admins);
        }
      });
  }

  revokeAccess(user) {
    // if (
    //   confirm(
    //     `You are about to revoke the editor access of ${
    //       user.displayName
    //     } , Would you like to proceed?`
    //   )
    // ) {
    //   this.submitting = true;
    //   this.userService.removedUserAccess(user).then(() => {
    //     this.submitting = false;
    //     console.log('user access is removed');
    //   });
    // }
  }
  grantAccess(user, role) {
    // if (
    //   confirm(
    //     `You are about to give editor access to ${
    //       user.displayName
    //     } , Would you like to proceed?`
    //   )
    // ) {
    //   this.submitting = true;
    //   this.userService
    //     .updateUserAccess(user, 'editor', this.user.mainClub.id)
    //     .then(() => {
    //       this.submitting = false;
    //       console.log('editor access updated');
    //     });
    // }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadClubUsers(club) {
    this.selectedClub$.next(club.id);
  }
}
