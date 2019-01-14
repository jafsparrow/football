import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TurfService {
  playGourndRef: AngularFirestoreCollection;
  pitchRef: AngularFirestoreCollection;

  constructor(private _db: AngularFirestore) {
    this.playGourndRef = _db.collection('playgrounds');
    this.pitchRef = _db.collection('pitches');
  }

  getPlayGrounds() {}
  getPlayGround(id = null) {
    if (id) {
      return this.playGourndRef.doc(id).valueChanges();
    }

    return of(null);
  }

  getPitches(groundId) {
    return this.pitchRef.snapshotChanges().pipe(
      map(pitches => {
        return pitches.map(pitch => {
          const data = pitch.payload.doc.data();
          const id = pitch.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
