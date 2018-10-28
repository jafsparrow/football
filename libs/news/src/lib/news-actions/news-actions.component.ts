import { AuthenticationService } from '@football/shared';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from '../modals/news';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'news-actions',
  templateUrl: './news-actions.component.html',
  styleUrls: ['./news-actions.component.css']
})
export class NewsActionsComponent implements OnInit, OnDestroy {
  @Input() news: News;
  user: any;

  canAccessAdmin = false;
  userSubscription: Subscription;
  constructor(
    private _auth: AuthenticationService,
    public newsService: NewsService
  ) {}

  ngOnInit() {
    this.userSubscription = this._auth.user$.subscribe(user => {
      this.user = user;
      if (this._auth.canLogin(user, 'admin')) this.canAccessAdmin = true;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  editNews() {}
  submitNews() {
    if (!this.isUserAuthorizedForNewsAction) {
      console.log('not authorized to do this.');
      return;
    }
    if (this.news.status !== 'draft') return;

    this.newsService
      .updateNewsStatus(this.news, 'submitted')
      .then(res => console.log(res));
  }
  publishNews() {
    if (!this.isUserAuthorizedForNewsAction) return;
    if (!this.canPublish) return;

    this.newsService
      .updateNewsStatus(this.news, 'published')
      .then(res => console.log(res));
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
  canPublish(): boolean {
    const status = this.news.status;
    const permissionRole = this.user.permission.role;

    if (permissionRole === 'admin' && status === 'submitted') return true;
    return false;
  }

  canDelete(): boolean {
    const status = this.news.status;
    const permissionRole = this.user.permission.role;

    if (permissionRole === 'admin') {
      return true;
    }

    if (
      permissionRole === 'editor' &&
      (status === 'submitted' || status === 'draft')
    ) {
      return true;
    }
    return false;
  }

  canEdit() {
    if (this.news.status === 'draft') return true;
    return false;
  }

  canSubmit() {
    if (this.news.status === 'draft') return true;
    return false;
  }
}
