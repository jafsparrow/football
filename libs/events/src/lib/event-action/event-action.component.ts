import { EventAdminService } from './../services/event-admin.service';
import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService, AuthorizationService } from '@football/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'football-event-action',
  templateUrl: './event-action.component.html',
  styleUrls: ['./event-action.component.css']
})
export class EventActionComponent implements OnInit, OnChanges, OnDestroy {
  @Input() event: any;
  user: any;

  canAccessAdmin = false;
  userSubscription: Subscription;

  canSubmit: boolean;
  canEdit: boolean;
  canPublish: boolean;
  canDelete: boolean;
  constructor(
    private _auth: AuthenticationService,
    public eventService: EventAdminService,
    public authorizeService: AuthorizationService,
    private _router: Router
  ) {
    this.canEdit = false;
    this.canPublish = false;
    this.canDelete = false;
  }

  ngOnInit() {
    this.userSubscription = this._auth.user$.subscribe(user => {
      this.user = user;
      if (this._auth.canLogin(user, 'admin')) this.canAccessAdmin = true;

      this.canEdit = this.authorizeService.canEditContent(this.event, user);
      this.canSubmit = this.authorizeService.canSubmitContent(this.event, user);
      this.canPublish = this.authorizeService.canPublishContent(
        this.event,
        user
      );
      this.canDelete = this.authorizeService.canDeleteContent(this.event, user);

      console.log({
        edit: this.canEdit,
        submit: this.canSubmit,
        publish: this.canPublish,
        delete: this.canDelete
      });

      console.log(this.event);
    });
  }

  ngOnChanges() {
    if (this.user) {
      this.canEdit = this.authorizeService.canEditContent(
        this.event,
        this.user
      );
      this.canSubmit = this.authorizeService.canSubmitContent(
        this.event,
        this.user
      );
      this.canPublish = this.authorizeService.canPublishContent(
        this.event,
        this.user
      );
      this.canDelete = this.authorizeService.canDeleteContent(
        this.event,
        this.user
      );
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  editEvent() {
    if (this.authorizeService.canEditContent(this.event, this.user)) {
      // navigate to edit page.
      this._router.navigate(['/home/events/edit', { id: this.event.id }]);
    }
  }
  submitEvent() {
    console.log('submitting event');

    if (this.canSubmit) {
      this.eventService
        .updateEventStatus(this.event, 'submitted')
        .then(res => console.log(res))
        .catch(error => console.log(error));
    } else {
      console.log('user is not allowed to submit the news');
    }
  }

  publishEvent() {
    if (
      confirm('You are about publish this event. Would you like to continue..?')
    ) {
      if (this.canPublish) {
        this.eventService
          .updateEventStatus(this.event, 'published')
          .then(res => console.log(res))
          .catch(error => console.log(error));
      } else {
        console.log('something wrong happened while publishing item');
      }
    }
  }
  deleteEvent() {
    if (confirm('Do you want to delete this event..? ')) {
      this.eventService
        .deleteEvent(this.event)
        .then(() => {
          console.log('event got deleted');
          this._router.navigate(['/events']);
        })
        .catch(err => console.log(err));
    }
  }

  // isUserAuthorizedForNewsAction() {
  //   const status = this.news.status;
  //   const permissionRole = this.user.permission.role;
  //   const permissittedClub = this.user.permission.clubId;
  //   const newsMainClubId = this.news.mainClub.id;
  //   const newsAuthorId = this.news.author.uid;
  //   const loggedInUserId = this.user.uid;

  //   if (permissittedClub !== newsMainClubId) {
  //     return false;
  //   }

  //   if (permissionRole === 'admin') {
  //     return true;
  //   }

  //   if (permissionRole === 'editor' && newsAuthorId === loggedInUserId) {
  //     return true;
  //   }

  //   return false;
  // }
}
