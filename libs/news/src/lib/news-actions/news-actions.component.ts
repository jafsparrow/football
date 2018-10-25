import { AuthenticationService } from '@football/shared';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'news-actions',
  templateUrl: './news-actions.component.html',
  styleUrls: ['./news-actions.component.css']
})
export class NewsActionsComponent implements OnInit, OnDestroy {
  user: any;
  canAccessAdmin = false;
  userSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.userSubscription = this._auth.user$.subscribe(user => {
    //   this.user = user;
    //   if (this._auth.canLogin(user, 'admin')) this.canAccessAdmin = true;
    // });
  }

  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
  }
}
