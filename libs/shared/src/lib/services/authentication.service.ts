import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: BehaviorSubject<any> = new BehaviorSubject(null)
  user$: Observable<any>;


  email = "jafar@test.com";
  password = "jafrose";
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
    console.log('auth service is constructed');
    this.user$ = this.afAuth.authState.pipe
      (switchMap(user => {
        if(user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null);
        }

      }))
  }

  login(): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
