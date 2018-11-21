import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '@football/shared';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalAdminService {
  user$: Observable<any>;

  constructor(
    private auth: AuthenticationService,
    private db: AngularFirestore
  ) {
    this.user$ = this.auth.user$;
  }

  isLocalAdmin(user) {
    if (!user) return false;
    if (user.localAdmin && user.localAdmin.isLocalAdmin) {
      return true;
    }
    return false;
  }

  getNewClubRequests(): any {
    return this.db
      .collection('requests', ref => ref.where('requestType', '==', 'club'))
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(item => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;

            return { id, ...data };
          });
        })
      );
  }

  getReqestClubDetails(key) {
    return this.db
      .collection('requests')
      .doc(key)
      .snapshotChanges()
      .pipe(
        map(res => {
          const data = res.payload.data();
          const id = res.payload.id;

          return { id, ...data };
        })
      );
  }

  acceptClub(id) {}

  approveClub(newClub) {
    // use generate club for ID.
    // update the club collection.
    // delete the current request from clubRequest collectino

    this.generateClubCode(1);
  }

  rejectClub(id) {}

  private generateClubCode(newClub) {
    // get the localBody short code.
    // sample: KL14VG3533
    // state and District then local body shor tthen 4 digit random number.
    // check if the code is already taken. if not update the clubs collection with the new club.
    const rand = this.randomIntFromInterval(1000, 9999);
    const newClubId = 'KL14CS' + rand.toString();
    console.log(newClubId);
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private checkIfClubCodeExits(code) {
    //  if the code exists, if it returns true.
  }
}
