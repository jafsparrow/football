import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  clubs$: Observable<any[]>;
  districtFilter$: BehaviorSubject<string | null>;
  bodyTypeFilter$: BehaviorSubject<string | null>;
  localBodyFilter$: BehaviorSubject<string | null>;

  constructor(public db: AngularFirestore) {
    this.districtFilter$ = new BehaviorSubject(null);
    this.bodyTypeFilter$ = new BehaviorSubject(null);
    this.localBodyFilter$ = new BehaviorSubject(null);
    this.clubs$ = combineLatest(
      this.districtFilter$,
      this.bodyTypeFilter$,
      this.localBodyFilter$
    ).pipe(
      switchMap(([district, bodyType, localBody]) => {
        return this.db
          .collection('clubs', ref => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;

            query = query.limit(10);
            if (district) {
              query = query.where('district', '==', district);
            }
            if (bodyType) {
              query = query.where('bodyType', '==', bodyType);
            }
            if (localBody) {
              query = query.where('localBody', '==', localBody);
            }
            return query;
          })
          .valueChanges();
      })
    );
  }

  findClubById(clubId) {
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
  searchClubsOnParams(name, district, localBody) {
    return this.db
      .collection('clubs', ref => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;

        query = query.limit(10);
        if (localBody) {
          query = query.where('address.localBody', '==', localBody);
        }

        if (district) {
          query = query.where('address.district', '==', district);
        }
        if (name) {
          query = query.where('name', '>=', name);
          // query = query
          //   .orderBy('name')
          //   .startAt(name)
          //   .endAt(name + '\uf8ff');
        }
        console.log(query);

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

  searchClubsByName(name, limit = 5) {
    console.log(name);
    return this.db
      .collection('clubs', ref => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;
        query = query
          .orderBy('name')
          .startAt(name)
          .endAt(name + '\uf8ff');

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
  findClubsByShortCode(clubCode) {
    return this.db
      .collection('clubs', ref => ref.where('clubShortCode', '==', clubCode))
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

  findClubsByLocBody(localBody) {
    return this.db
      .collection('clubs', ref => ref.where('localBody', '==', localBody))
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
}
