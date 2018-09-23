import { AuthenticationService } from '@football/shared';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'football-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

  signOut() {
    this.auth.logout();
   }
}
