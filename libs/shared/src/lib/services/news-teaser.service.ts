import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsTeaserService {
  $newRef: AngularFirestoreCollection<any>;
  $generalNewsTen: AngularFirestoreCollection<any>;
  $favClubNewsFive: AngularFirestoreCollection<any>;

  favClubs = ['5ZRSBNKpB1u2OJ0urK0w', 'U9HsplCcUBvfcV95DOoP'];
  constructor(private db: AngularFirestore) {

    // this.$newRef = this.db.collection('news');
    this.$generalNewsTen = this.db.collection('news', ref => ref.where('is_active', '==', true).limit(6));
    // .where('status', '==', 'published').orderBy('created_on').limit(10));

    // this.$favClubNewsFive = this.db.collection('news', ref =>
    //   ref.where('is_active', '==', true)
    //     .where ('status', '==', 'published')
    //     // .where ('tagged_clubs.kWAwj3z38KJCDBhT2GNU', '==', true)
    //     .where('tagged_clubs.YYlnUyMiUstoMwXLWVlh', '==', true)
    //     .limit(5));
  }


  getTaggedClubNews() {
    const calls = [];
    for (const fav of this.favClubs) {
      calls.push(this.getNewForClub(fav));
    }
    return forkJoin(calls).pipe(map(arrays => [].concat.apply([], arrays)));
  }

  getNewForClub(club_ID: string) {
    const club_search = 'tagged_clubs.'+club_ID;
    console.log(club_search);
    return this.db.collection('news', ref => ref.where(club_search, '==',true)).valueChanges().pipe(take(1));
  }

  getRecentTenNews() {

    return this.$generalNewsTen.snapshotChanges()
      .pipe(
        map(res => {
        return res.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, ...data };
        });
      }));

  }

  getFavClubNewsFive() {
    return this.$favClubNewsFive.snapshotChanges()
      .pipe(
        map(res => {
        return res.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, ...data};
        });
      }),
      map(res => {
        console.log(res);
        return res;
      }));
  }

}
