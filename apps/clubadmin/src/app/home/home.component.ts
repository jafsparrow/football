import { AngularFirestore } from '@angular/fire/firestore';

import { AuthenticationService, NavRoute } from '@football/shared';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { useAnimation } from '@angular/animations';

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
  constructor(public auth: AuthenticationService, public afs: AngularFirestore) {
    //  check if the user has completed the onBoarding. if not redirect after 2 min.
    this.auth.user$.subscribe(
      res => {
        if (res && res.registrationStep !== 100) {
          // navigate to onBoarding page.
          setTimeout(()=>{
            console.log('navigating to on borading page');

          }, 2000)

        }
      }
    )
  }

  ngOnInit() {
  }

  signOut() {
    this.auth.logout();
   }
}