import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventAdminService {
  constructor(private db: AngularFirestore) {}

  getEvents() {}

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
  // clubadmin has two users. editor and admin both will have query updated.
  getEventsForAdmin(user) {
    let allEvents$: AngularFirestoreCollection<any> = null;
    switch (user.permission.role) {
      case 'admin':
        allEvents$ = this.db.collection('events', ref =>
          ref.where('mainClub.id', '==', user.mainClub.id)
        );
        break;
      case 'editor':
        allEvents$ = this.db.collection('news', ref =>
          ref
            .where('mainClub.id', '==', user.mainClub.id)
            .where('author.uid', '==', user.uid)
        );
        break;
    }
    return allEvents$.snapshotChanges().pipe(
      map(res => {
        return res.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getEvent(eventId) {
    return this.db
      .collection('events')
      .doc(eventId)
      .valueChanges();
  }

  createEvent(event) {
    return this.db.collection('events').add(event);
  }

  updateEvent(event, id = '') {
    return this.db
      .collection('events')
      .doc(id)
      .update(event);
  }

  updateEventStatus(event, status) {
    return this.db
      .collection('events')
      .doc(event.id)
      .update({ status: status });
  }

  mapToArray(items) {
    return items.map(item => {
      const data = item.payload.doc.data();
      const id = item.payload.doc.id;
      return { id, ...data };
    });
  }
}
