
import { AuthenticationService, NavRoute } from '@football/shared';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'football-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sideNavOptions: NavRoute[] = [
    { name: 'Dashboard', route: 'dashboard'},
    { name: 'News', route: 'news', icon: 'more'}
  ]
  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

  signOut() {
    this.auth.logout();
   }
}
