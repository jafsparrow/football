import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, take, tap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { News } from '../modal/news';

@Injectable({
  providedIn: 'root'
})
export class NewsCommonService {
  news: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore
  ) // private clubDetailService: ClubDetailsService
  {}

  // read news list. implement 10 pagination.
  getNews(limitNumber = 100) {
    return this.db
      .collection('news', ref => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;
        query = query.where('status', '==', 'published');
        query = query.limit(limitNumber);
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
  // read individual news.

  getDetailedNews(key: string): Observable<News> {
    // TODO - in the getNews() map function, save the news array as local vaiable,
    // then when going for detailed view check if the key is existing in this array. if not fires the query.
    return <Observable<News>>this.db
      .collection('news')
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

  getTaggedClubNews(user) {
    // const taggedClubs = ['HYU2JPaH9ys1nKQOHKKE', 'VtT99aikQMEv3vh1VkGq'];
    let taggedClubs = [];
    if (user.taggedClubs) {
      taggedClubs = Object.keys(user.taggedClubs);
    }

    console.log(taggedClubs);
    const calls = [];
    for (const fav of taggedClubs) {
      calls.push(this.getNewForClub(fav));
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

  private getNewForClub(club_ID: string) {
    const club_search = `taggedClubs.${club_ID}.id`;
    console.log(club_search);
    return this.db
      .collection('news', ref => ref.where(club_search, '==', club_ID))
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

  getClubNews(clubId: string, limitNumber = 100) {
    return this.db
      .collection('news', ref => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;
        query = query.where('mainClub.id', '==', clubId);
        if (limitNumber) {
          query = query.limit(limitNumber);
        }
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
}
