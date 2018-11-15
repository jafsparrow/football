import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsCommonService {
  constructor(private db: AngularFirestore) {}

  getEvents(user = null, limit = 10) {
    if (user && user.mainClub) {
      // return user's preferred club events. which are recent.
      return this.db
        .collection('events', ref => {
          let query:
            | firebase.firestore.CollectionReference
            | firebase.firestore.Query = ref;
          query = query.limit(limit);
          return query;
        })
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

    // get top tear clubs events and display.
    return this.db
      .collection('events', ref => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;
        query = query.limit(limit);
        query = query.where('mainClub.tier', '==', 1);
        return query;
      })
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

  getDetailedEvent(key) {
    return <Observable<any>>this.db
      .collection('events')
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
}
