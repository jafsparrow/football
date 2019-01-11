import { LocalAdminService } from './../services/local-admin.service';
import { AdminuserService } from './../services/adminuser.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LocaladminClubSearchModalComponent } from '../localadmin-club-search-modal/localadmin-club-search-modal.component';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'football-assign-clubadmin',
  templateUrl: './assign-clubadmin.component.html',
  styleUrls: ['./assign-clubadmin.component.css']
})
export class AssignClubadminComponent implements OnInit {
  selectedClub = null;
  _searchingForUser = false;
  submitting = false;
  searchedUser = null;

  adminUsers$: BehaviorSubject<any | null>;

  // {
  //   name: 'jafar',
  //   phone: '9394934',
  //   taggedClubs: {}
  // };

  adminUserArr = [];
  clubId = 'yqmwGrHswQGA3JXwUFdX';
  constructor(
    public adminService: AdminuserService,
    public localAdminService: LocalAdminService,
    public dialog: MatDialog
  ) {
    this.adminUsers$ = new BehaviorSubject(null);
  }

  ngOnInit() {
    this.adminUsers$
      .pipe(
        tap(dod => console.log('behaviro is called now')),
        switchMap(value => {
          console.log('yest', value);
          if (value) {
            console.log('there is a value', value.id);
            return this.adminService.getClubAdmin(value.id);
          }
          return of(null);
        })
      )
      .subscribe(users => {
        console.log('sub', users);
        this.adminUserArr = users ? users : [];
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LocaladminClubSearchModalComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedClub = result;
        this.adminUsers$.next(result);
      }
    });
  }

  searchUserByEmail(email) {
    const searchEmail = /@{1}/g.test(email) ? email : email + '@gmail.com';
    // console.log(searchEmail);
    this._searchingForUser = true;
    this.adminService.searchUserByEmail(searchEmail).subscribe(users => {
      // console.log(users);
      if (users.length > 0) {
        const userDetails = users[0];
        this.searchedUser = userDetails;
        this.searchedUser['taggedClubArray'] = [];

        Object.keys(userDetails['taggedClubs']).forEach(element => {
          this.searchedUser['taggedClubArray'].push(
            userDetails['taggedClubs'][element]
          );
        });
      } else {
        this.searchedUser = users;
      }
      this._searchingForUser = false;
    });
  }

  searchClubAdmins() {
    return this.adminService
      .getClubAdmin(this.clubId)
      .subscribe(users => (this.adminUserArr = users));
  }

  selectClub(club) {
    console.log(club);
    this.selectedClub = club;
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
  grantAccess() {
    const user = this.searchedUser;
    if (
      confirm(
        `You are about to give admin access to ${
          user.displayName
        } , Would you like to proceed?`
      )
    ) {
      this.submitting = true;
      // console.log(this.selectedClub);
      // console.log(user);
      this.localAdminService
        .updateUserAccess(
          user,
          'admin',
          this.selectedClub.id,
          this.selectedClub.name
        )
        .then(() => {
          this.submitting = false;
          console.log('editor access updated');
        });
    }
  }
}
