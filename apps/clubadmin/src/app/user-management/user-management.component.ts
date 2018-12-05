import { AuthenticationService } from '@football/shared';
import { Component, OnInit } from '@angular/core';
import { UserMangementService } from '../services/user-mangement.service';
import { switchMap, filter, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

export interface UserDisplay {
  name: string;
}

@Component({
  selector: 'football-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['username', 'actions'];
  dataSource: MatTableDataSource<UserDisplay>;
  editorDataSource: MatTableDataSource<UserDisplay>;
  user: any;
  clubUsers: any[];
  selectedUser: any;
  isEditorFull = false;
  submitting = false;
  constructor(
    public userService: UserMangementService,
    public auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.auth.user$
      .pipe(
        switchMap(user => {
          this.user = user;
          return this.userService.getClubFollowers(user.mainClub.id);
        }),
        map(users => {
          return users.filter(user => {
            if (user.permission && user.permission.role) {
              return user.permission.role !== 'admin';
            }
          });
        })
      )
      .subscribe(users => {
        this.clubUsers = users;
        // filter already admins.
        // separate out alreday editors.
        const editors = users.filter(user => {
          if (user.permission && user.permission.role) {
            return user.permission.role === 'editor';
          }
        });
        console.log(editors);
        if (editors.length > 4) {
          this.isEditorFull = true;
        }
        this.dataSource = new MatTableDataSource(<any>users);
        this.editorDataSource = new MatTableDataSource(<any>editors);
      });
  }

  revokeAccess(user) {
    if (
      confirm(
        `You are about to revoke the editor access of ${
          user.displayName
        } , Would you like to proceed?`
      )
    ) {
      this.submitting = true;
      this.userService.removedUserAccess(user).then(() => {
        this.submitting = false;
        console.log('user access is removed');
      });
    }
  }
  grantAccess(user, role) {
    if (
      confirm(
        `You are about to give editor access to ${
          user.displayName
        } , Would you like to proceed?`
      )
    ) {
      const clubTier = this.user.mainClub.tier
        ? this.user.mainClub.tier
        : 'none';
      this.submitting = true;
      this.userService
        .updateUserAccess(user, 'editor', this.user.mainClub.id, clubTier)
        .then(() => {
          this.submitting = false;
          console.log('editor access updated');
        });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
