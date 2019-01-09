import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';

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
      .collection('events', ref => ref.where('mainClub.tier', '==', 'first'))
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

  public getRecentClubEvents(club_ID: string, limit = 5) {
    // console.log(club_ID);
    return this.db
      .collection('events', ref => ref.where('mainClub.id', '==', club_ID))
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(item => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;
            return { id, ...data };
          });
        }),
        take(1)
      );
  }

  // this should return events from first tier and users fav and tagged club then filter out same items.
  getEventsForLoggedInUser(user, limit = 10) {
    // check if the user exits.
    if (user && user.mainClub) {
      let taggedClubs = [];
      if (user.taggedClubs) {
        taggedClubs = Object.keys(user.taggedClubs);
      }
      const calls = [];
      for (const fav of taggedClubs) {
        calls.push(this.getRecentClubEvents(fav));
      }
      // add the first tier clubs 10 events which are created latest. and push it to the calls array.
      calls.push(this.getTopeTierClubEvents());
      // add users fav clubs events as well.
      // console.log(user);
      if (user.mainClub.id) {
        calls.push(this.getRecentClubEvents(user.mainClub.id));
      }
      return forkJoin(calls).pipe(
        map(arrays => [].concat.apply([], arrays)),
        map(news => {
          return news.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
          });
        })
      );
    }
  }

  getTaggedClubsEvents(user) {
    // check if the user exits.
    if (user && user.mainClub) {
      let taggedClubs = [];
      if (user.taggedClubs) {
        taggedClubs = Object.keys(user.taggedClubs);
      }
      const calls = [];
      for (const fav of taggedClubs) {
        calls.push(this.getRecentClubEvents(fav));
      }
      return forkJoin(calls).pipe(
        map(arrays => [].concat.apply([], arrays)),
        map(news => {
          return news.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
          });
        })
      );
    }

    return of(null);
  }

  getTopeTierClubEvents(limit = 10) {
    return this.db
      .collection('events', ref =>
        ref
          .orderBy('createdDate', 'desc')
          .where('mainClub.tier', '==', 'first')
          .limit(limit)
      )
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(item => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;
            return { id, ...data };
          });
        }),
        take(1)
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
