import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// This brings me meta data about clubs which is used for news read and create.
@Injectable()
export class ClubDetailsService {

  clubs: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore) {
    this.clubs = this.db.collection('clubs');
    console.log('club details dservice.');
   }

   // this shoudl return observable of filtered clubs based on the key.
  getTaggedClubs(clubs) {
    // this.getAllclubs()
    //   .filter(res => res[0].id === 'HYU2JPaH9ys1nKQOHKKE')
    //   .subscribe(res => console.log(res));
    // hack - to get around the problem of having the tagged clubs as arrays earlier. check if its array
    let clubKeys = null;
    if ( clubs.constructor !== Array) {
        clubKeys = Object.keys(clubs);
        console.log('club keys extracted to array');
        console.log(clubKeys);
    }
    // if it is an array assign it direcly.
    clubKeys = clubs;
  return this.clubs.snapshotChanges()
    .pipe(
        map(res => {
        return res.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, ...data};
        });
      }),
      map(res => {
        return res.filter(item => {
          return clubKeys.indexOf(item.id) > -1;
        });
      })
    )
  }

  searchClubs(term$: Observable<string>) {
    return term$.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((term)=> {
        return this.findClubs(term)
      })
    )
   }

   private findClubs(term) {
    return this.db.collection('clubs', ref=> ref.where('name', '>=',term))
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

  getAllclubs() {
    return this.clubs.snapshotChanges()
    .pipe (
      map(res => {
      return res.map(item => {
        const data = item.payload.doc.data();
        const id = item.payload.doc.id;
        return { id, ...data};
      });
    })
    );
  }
}



// return this.news.snapshotChanges()
// .map(res => {
//   return res.map(item => {
//     const data = item.payload.doc.data();
//     const id = item.payload.doc.id;
//     return { id, ...data };
//   });
// });
