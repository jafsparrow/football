import { MainClub } from './../modals/news';
import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, take, tap, finalize, switchMap } from 'rxjs/operators';
import { FileUpload } from '../modals/upload-file';
import { Observable, forkJoin } from 'rxjs';
import { News } from '../modals/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news: AngularFirestoreCollection<any>;
  private basePath = '/news/images';

  constructor(
    private db: AngularFirestore,
    // private clubDetailService: ClubDetailsService
    private firebaseStorage: AngularFireStorage
  ) {
    this.news = this.db.collection('news', ref =>
      ref.where('is_active', '==', true).where('status', '==', 'published')
    );
  }

  // read news list. implement 10 pagination.
  getNews(limitNumber = 100) {
    // return this.news.snapshotChanges().pipe(
    //   map(res => {
    //     return res.map(item => {
    //       const data = item.payload.doc.data();
    //       const id = item.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   })
    // );

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

  // read news for club admin.
  // clubadmin has two users. editor and admin both will have query updated.
  getNewsForAdmin(user) {
    let allNews$: AngularFirestoreCollection<any> = null;
    // precaution to check user has permissions.
    if (!user.permission) {
      user.permission = {};
    }
    switch (user.permission.role) {
      case 'admin':
        allNews$ = this.db.collection('news', ref =>
          ref.where('mainClub.id', '==', user.permission.clubId)
        );
        break;
      case 'editor':
        allNews$ = this.db.collection('news', ref =>
          ref
            .where('mainClub.id', '==', user.permissions.clubId)
            .where('author.uid', '==', user.uid)
        );
        break;
    }
    return allNews$.snapshotChanges().pipe(
      map(res => {
        return res.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  // create a new news.
  // update the news to include extra fields like author, is_active , created_on, status
  createNews(news: any) {
    console.log(news);
    return this.news.add(news).then(res => {
      console.log(res.id);
      return res;
    });
  }

  uploadNewsImage(upload: any) {
    const fileName = Math.ceil(Math.random() * 10000).toString() + upload.name;
    const storageRef = this.firebaseStorage.ref(`${this.basePath}/${fileName}`);
    console.log('jafar4 befoe downloadurl ref call');
    console.log(storageRef.getDownloadURL());
    // const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    // console.log('upload image service function and the file is');
    // console.log(upload);
    const task = storageRef.put(upload);

    return task.snapshotChanges().pipe(
      finalize(() => {
        console.log(
          'jafar3 observalabe finishes waiting fiznalia',
          storageRef.getDownloadURL()
        );
        return storageRef.getDownloadURL();
      })
      // switchMap(uploadTask => {
      //   // console.log(uploadTask);
      //   return storageRef.getDownloadURL();
      // }

      // )
    );
  }
  updateNews(news, id = '') {
    return this.db
      .collection('news')
      .doc(id)
      .update(news);
  }

  // This will delete the given news and related image from the cloud storage. alternate implemnetation of
  // making the news active: false, can be considered later.
  deleteNews(news) {
    let newsImageUrl = null;
    if (news.image) {
      console.log('news has an image to delete');
      newsImageUrl = news.image;
    }

    return this.db
      .collection('news')
      .doc(news.id)
      .delete()
      .then(() => {
        if (newsImageUrl) {
          console.log('news has deleted now checking the image to delte.e');
          return this.deleteFromStorage(newsImageUrl);
        }
        console.log('this does not have an image');
        return Promise.resolve('no image to delete');
      });
  }

  deleteFromStorage(url) {
    return this.firebaseStorage.storage
      .refFromURL(url)
      .delete()
      .catch(err => console.log(err));
  }

  updateNewsAfterImageLoad(key: string, downloadLink: string) {
    return this.news.doc(key).update({ image: downloadLink });
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

  updateNewsStatus(news, status) {
    // if news is getting published. publish date has to be added along.
    const publishedDate = new Date();
    const data =
      status === 'published'
        ? { status: status, publishedDate }
        : { status: status };
    return this.db
      .collection('news')
      .doc(news.id)
      .update(data);
  }
}
