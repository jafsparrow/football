import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';


import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'football-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  @Input() loginRole: String = 'user';

  items: Observable<any[]>;
  constructor(db: AngularFirestore, private auth: AuthenticationService) {
    this.items = db.collection('news').valueChanges();
  }

  ngOnChanges(changes) {
    console.log('Changed', changes.loginRole.currentValue, changes.loginRole.previousValue);
  }

  ngOnInit() {
    console.log('Init', this.loginRole);
  }

  login(loginForm: FormGroup) {
    this.auth.login();
    console.log(loginForm);
      console.log(typeof(loginForm));

    //get the user name and password and send for login
    // from fail part , fail the login.
    // from success part, save the user info , check if role is not user then switchMap to user collectino for role data.
    // if the user do not have the given role, logout the user and show error message.
  }
}


/**
 * Login component should do following.
 * 1. It should decide what role the user is trying to login. this will passed to the component as input
 * parameter. If nothing passed, it should assume it is for a normal user.
 * 2. Login validation is based on the role. If the role is admin or super admin or editor, there will be an extra step of
 * verifying the login. Proper error message should be displaying indicating who can login.
 */
