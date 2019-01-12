import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  localBodys$: Observable<any[]>;
  districtFilter$: BehaviorSubject<string | null>;
  bodyTypeFilter$: BehaviorSubject<string | null>;

  constructor(public db: AngularFirestore) {
    this.districtFilter$ = new BehaviorSubject(null);
    this.bodyTypeFilter$ = new BehaviorSubject(null);
    this.localBodys$ = combineLatest(
      this.districtFilter$,
      this.bodyTypeFilter$
    ).pipe(
      switchMap(([district, bodyType]) => {
        if (!district) {
          return of(null);
        }

        return this.db
          .collection('localbodies', ref => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;
            if (bodyType) {
              query = query.where('bodyType', '==', bodyType);
            }
            return query;
          })
          .valueChanges();
      })
    );
  }

  searchLocalBodies(district, bodyType) {
    if (!district) {
      return of(null);
    }

    return this.db
      .collection('localbodies', ref => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;

        query = query.where('district', '==', district);

        if (bodyType) {
          query = query.where('bodyType', '==', bodyType);
        }

        return query.orderBy('name');
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
}
