import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Input, OnChanges, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'football-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  @Input() loginRole: String = 'admin';
  @Input() redirectURL;

  isLoading = false;
  isError = false;
  isLoginInProgress = false;
  user: any;

  constructor(
    db: AngularFirestore,
    private auth: AuthenticationService,
    private router: Router,
    private zone: NgZone // using this to route after the login promise to make angular known abou this
  ) {
    this.user = null;
  }

  ngOnChanges(changes) {
    // console.log(
    //   'Changed',
    //   changes.loginRole.currentValue,
    //   changes.loginRole.previousValue
    // );
  }

  ngOnInit() {
    // console.log('Init', this.loginRole);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.user = user;

        console.log(this.loginRole);
        // check if the login site is admin or timeout normal user
        if (this.loginRole.toLowerCase() === 'admin') {
          if (this.auth.canLogin(user, 'admin')) {
            this.router.navigate([this.redirectURL]);
          } else {
            this.auth.logout();
            console.log('you do not have permission to login to admin site');
          }
        }
      }
    });
  }

  login() {
    this.isLoginInProgress = true;
    this.auth.googleLogin().then(res => {
      this.auth.user$.pipe(take(1)).subscribe(user => {
        if (this.checkLoginEligibility(user, this.loginRole)) {
          // when triggerd navigation inside other api, ie; promise, angular wouln't know as its not in angular zon
          // so letting angular know the route below.
          this.zone.run(() => {
            this.router.navigate([this.redirectURL]);
          });
        } else {
          this.auth
            .logout()
            .then(() =>
              console.log('you do not have permission to login to admin site')
            );
        }
      });
    });
  }

  // checking if the login site is admin, if so only admin authenticated user should get in, to make the login component more generic.
  checkLoginEligibility(user, siteType) {
    if (this.loginRole.toLowerCase() === 'admin') {
      // problem is after using behavior subject for checking the auth state, the value is still emitted null after
      // login because it takes a short time to get the next value of user emited by the behavior subjet but the following
      // code is ran before ran with user as null; that is breaking the app. as it is only affecting the admin user only doing the delay
      // inside admin check
      setTimeout(() => {
        if (this.auth.canLogin(user, 'admin')) {
          return true;
        } else {
          return false;
        }
      }, 2000);
    }

    return true;
  }
  signUp() {
    // this.auth.
  }
}
//   login(loginForm: FormGroup) {
//     this.isLoading = true;
//     this.auth.login()
//       .then(res => {
//         // navigate to the URL if given as Input.

//         if(this.redirectURL) {
//           console.log('redirecting to location');
//           this.router.navigate([this.redirectURL]);
//         }
//         console.log(res);
//       })
//       .catch(error => {
//         this.isLoading = false;
//         this.isError = true;
//       });
//     console.log(loginForm);
//       console.log(typeof(loginForm));

//     //get the user name and password and send for login
//     // from fail part , fail the login.
//     // from success part, save the user info , check if role is not user then switchMap to user collectino for role data.
//     // if the user do not have the given role, logout the user and show error message.
//   }
// }

/**
 * Login component should do following.
 * 1. It should decide what role the user is trying to login. this will passed to the component as input
 * parameter. If nothing passed, it should assume it is for a normal user.
 * 2. Login validation is based on the role. If the role is admin or super admin or editor, there will be an extra step of
 * verifying the login. Proper error message should be displaying indicating who can login.
 */
