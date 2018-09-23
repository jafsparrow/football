import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

import { map, filter, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: BehaviorSubject<any> = new BehaviorSubject(null)
  user$: Observable<any>;

  email = "jafar@test.com";
  password = "jafroddse";
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
    this.user$ = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<any>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(user => console.log(user)).catch(err => console.log(err));
  }
}
