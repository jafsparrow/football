import { AuthenticationService, AuthorizationService } from '@football/shared';
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from '../modals/news';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'news-actions',
  templateUrl: './news-actions.component.html',
  styleUrls: ['./news-actions.component.css']
})
export class NewsActionsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() news: News;
  user: any;

  canAccessAdmin = false;
  userSubscription: Subscription;

  canSubmit: boolean;
  canEdit: boolean;
  canPublish: boolean;
  canDelete: boolean;

  constructor(
    private _auth: AuthenticationService,
    public newsService: NewsService,
    public authorizeService: AuthorizationService
  ) {
    this.canSubmit = false;
    this.canEdit = false;
    this.canPublish = false;
    this.canDelete = false;
  }

  ngOnInit() {
    this.userSubscription = this._auth.user$.subscribe(user => {
      this.user = user;
      if (this._auth.canLogin(user, 'admin')) this.canAccessAdmin = true;

      this.canEdit = this.authorizeService.canEditContent(this.news, user);
      this.canSubmit = this.authorizeService.canSubmitContent(this.news, user);
      this.canPublish = this.authorizeService.canPublishContent(
        this.news,
        user
      );
      this.canDelete = this.authorizeService.canDeleteContent(this.news, user);

      console.log({
        edit: this.canEdit,
        submit: this.canSubmit,
        publish: this.canPublish,
        delete: this.canDelete
      });

      console.log(this.news);
    });
  }
  ngOnChanges() {
    if (this.user) {
      this.canEdit = this.authorizeService.canEditContent(this.news, this.user);
      this.canSubmit = this.authorizeService.canSubmitContent(
        this.news,
        this.user
      );
      this.canPublish = this.authorizeService.canPublishContent(
        this.news,
        this.user
      );
      this.canDelete = this.authorizeService.canDeleteContent(
        this.news,
        this.user
      );
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  editNews() {
    if (this.authorizeService.canEditContent(this.news, this.user)) {
      // navigate to edit page.
    }
  }
  submitNews() {
    if (this.canSubmit) {
      this.newsService
        .updateNewsStatus(this.news, 'submitted')
        .then(res => console.log(res))
        .catch(error => console.log(error));
    } else {
      console.log('user is not allowed to submit the news');
    }
  }

  publishNews() {
    if (this.canPublish) {
      this.newsService
        .updateNewsStatus(this.news, 'published')
        .then(res => console.log(res))
        .catch(error => console.log(error));
    } else {
      console.log('something wrong happened while publishing item');
    }
  }
  deleteNews() {}

  isUserAuthorizedForNewsAction() {
    const status = this.news.status;
    const permissionRole = this.user.permission.role;
    const permissittedClub = this.user.permission.clubId;
    const newsMainClubId = this.news.mainClub.id;
    const newsAuthorId = this.news.author.uid;
    const loggedInUserId = this.user.uid;

    if (permissittedClub !== newsMainClubId) {
      return false;
    }

    if (permissionRole === 'admin') {
      return true;
    }

    if (permissionRole === 'editor' && newsAuthorId === loggedInUserId) {
      return true;
    }

    return false;
  }

  // canPublish(): boolean {
  //   const status = this.news.status;
  //   const permissionRole = this.user.permission.role;

  //   if (permissionRole === 'admin' && status === 'submitted') return true;
  //   return false;
  // }

  // canDelete(): boolean {
  //   const status = this.news.status;
  //   const permissionRole = this.user.permission.role;

  //   if (permissionRole === 'admin') {
  //     return true;
  //   }

  //   if (
  //     permissionRole === 'editor' &&
  //     (status === 'submitted' || status === 'draft')
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  // canEdit() {
  //   if (this.news.status === 'draft') return true;
  //   return false;
  // }

  // canSubmit() {
  //   if (this.news.status === 'draft') return true;
  //   return false;
  // }
}
