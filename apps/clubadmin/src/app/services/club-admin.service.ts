import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubAdminService {
  constructor(public db: AngularFirestore) {}

  getClubById(clubId) {
    return this.db
      .collection('clubs')
      .doc(clubId)
      .snapshotChanges()
      .pipe(
        map(res => {
          const data = res.payload.data();
          const id = res.payload.id;
          return { id, ...data };
        })
      );
  }

  updateClubInfo(clubId, data) {
    return this.db
      .collection('clubs')
      .doc(clubId)
      .update(data);
  }

  getClubItemInfo(itemType, clubId) {
    return this.db
      .collection('clubs')
      .doc(clubId)
      .collection(itemType)
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
  addClubItemInfo(itemType, clubId, data) {
    return this.db
      .collection('clubs')
      .doc(clubId)
      .collection(itemType)
      .add(data);
  }

  deleteItemInfo(itemType, clubId, management) {
    return this.db
      .collection('clubs')
      .doc(clubId)
      .collection(itemType)
      .doc(management.id)
      .delete();
  }
}
