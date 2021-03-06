import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMangementService {
  constructor(public db: AngularFirestore) {}

  getClubFollowers(clubId): Observable<any[]> {
    // console.log(username, clubId);
    return this.db
      .collection('users', ref => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;

        query = query.where('mainClub.id', '==', clubId);
        return query;
      })
      .valueChanges();
  }

  updateUserAccess(user, role, clubId, clubTier = 'none') {
    return this.db
      .collection('users')
      .doc(user.uid)
      .update({ permission: { role: role, clubId: clubId, tier: clubTier } });
  }

  removedUserAccess(user) {
    return this.db
      .collection('users')
      .doc(user.uid)
      .update({ permission: { role: 'none' } });
  }
}
