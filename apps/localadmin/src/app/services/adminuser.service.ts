import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminuserService {
  constructor(private _db: AngularFirestore) {}

  searchUserByEmail(email: string) {
    return this._db
      .collection('users', ref => ref.where('email', '==', email))
      .valueChanges();
  }

  getClubAdmin(clubId) {
    return this._db
      .collection('users', ref =>
        ref
          .where('permission.clubId', '==', clubId)
          .where('permission.role', '==', 'admin')
      )
      .snapshotChanges()
      .pipe(
        map(items => {
          return items.map(item => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
}
