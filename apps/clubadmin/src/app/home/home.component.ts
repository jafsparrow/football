import { AngularFirestore } from '@angular/fire/firestore';

import { AuthenticationService, NavRoute } from '@football/shared';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd
} from '@angular/router';

@Component({
  selector: 'football-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadingRouteConfig: boolean;
  sideNavOptions: NavRoute[] = [
    { name: 'My Club Info', route: '/club' },
    { name: 'News', route: '/news', icon: 'more' },
    { name: 'Events', route: '/events', icon: 'publish' }
  ];
  constructor(
    public auth: AuthenticationService,
    public afs: AngularFirestore,
    private router: Router
  ) {
    //  check if the user has completed the onBoarding. if not redirect after 2 min.
    // this.auth.user$.subscribe(res => {
    //   if (res && res.registrationStep !== 100) {
    //     // navigate to onBoarding page.
    //     setTimeout(() => {
    //       console.log('navigating to on borading page');
    //     }, 2000);
    //   }
    // });

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
  }

  ngOnInit() {}

  signOut() {
    this.auth.logout();
  }
}
