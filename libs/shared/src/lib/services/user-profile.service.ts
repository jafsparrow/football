import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(public db: AngularFirestore) {}

  updatedUserProfile(profile, uid = null) {
    if (uid) {
      return this.db
        .collection('users')
        .doc(uid)
        .update(profile);
    }
  }
}
