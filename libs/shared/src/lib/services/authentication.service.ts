import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, take, share } from 'rxjs/operators';
import { User } from '../modal/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user1$: BehaviorSubject<any> = new BehaviorSubject(null);
  user$: Observable<any>;
  email = 'jafar@test.com';
  password = 'jafrose';
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
    console.log('constructing auth service');
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        console.log('auth state changed');
        // console.log(user);
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    // .subscribe(userinfo => {
    //   if (userinfo) {
    //     this.user$.next(userinfo);
    //   } else {
    //     this.user$.next(null);
    //   }
    // });
  }

  login(): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(
      this.email,
      this.password
    );
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    // console.log('google response', user);

    userRef
      .valueChanges()
      .pipe(take(1))
      .subscribe(res => {
        const data = {
          displayName: user.displayName,
          photoUrl: user.photoURL
        };

        if (!res) {
          console.log('User registering for first time');
          data['uid'] = user.uid;
          data['email'] = user.email;
          data['registrationStep'] = 1;
        }
        // console.log(user);
        // console.log(data);
        return userRef.set(data, { merge: true });
      });
  }

  // This will look into the permission document of the user and returns the role assigned and club
  canLogin(user, siteType: string) {
    if (siteType.toLowerCase() === 'admin') {
      console.log(user);
      if (user && user.permission) {
        // console.log(user.permission)
        if (
          user.permission.role === 'admin' ||
          user.permission.role === 'editor'
        )
          return true;
        return false;
      } else {
        return false;
      }
    }

    return true;
  }

  isClubManagementUser(user) {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }
  ///// Role-based Authorization //////
  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }
  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }
  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }
  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    // for (const role of allowedRoles) {
    //   if ( user.roles[role] ) {
    //     return true;
    //   }
    // }

    for (const role of allowedRoles) {
      if (user.permission && user.permission.role === role) {
        return true;
      }
    }
    return false;
  }
}
