import { MainClub } from './../modals/news';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { FileUpload } from '../modals/upload-file';
import { Observable } from 'rxjs';
import { News } from '../modals/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: AngularFirestoreCollection<any>;
  private basePath = '/news/images';


  constructor(private db: AngularFirestore,
    // private clubDetailService: ClubDetailsService
    private firebaseStorage: AngularFireStorage
    ) {
    this.news = this.db.collection('news', ref => ref.where('is_active', '==', true)
                                                      .where('status', '==', 'published'));
   }


  // read news list. implement 10 pagination.
  getNews() {
    return this.news.snapshotChanges()
      .pipe(
         map(res => {
          return res.map(item => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;
            return { id, ...data };
          });
        })
        )
      }
  // read individual news.

  getDetailedNews(key: string): Observable<News> {
    // TODO - in the getNews() map function, save the news array as local vaiable,
    // then when going for detailed view check if the key is existing in this array. if not fires the query.
    return <Observable<News>>this.db.collection('news').doc(key).valueChanges();
  }

  // read news for club admin.
  // clubadmin has two users. editor and admin both will have query updated.
  getNewsForAdmin(user) {
    let allNews$: AngularFirestoreCollection<any> = null;
    switch (user.permission.role) {
      case 'admin':
        allNews$ = this.db.collection('news', ref=> ref.where('mainClub.id', '==', user.mainClub.id));
        break;
      case 'editor':
       allNews$ = this.db.collection('news', ref=> ref.where('mainClub.id', '==', user.mainClub.id)
                  .where('author.uid', '==', user.uid))
        break;
    }
    return allNews$.snapshotChanges()
              .pipe(
                map(res => {
                return res.map(item => {
                  const data = item.payload.doc.data();
                  const id = item.payload.doc.id;
                  return { id, ...data };
                });
              })
              )

  }
  // create a new news.
  createNews(news: any) {
    // update the news to include extra fields like author, is_active , created_on, status
    // news.author = 'Jafar';
    // news.isActive = true;
    // news.createdDate = new Date();
    // news.status = 'published';
    console.log(news);
    return this.news.add(news)
      .then( res =>  {
        console.log(res.id);
        return res;
      });
  }

  uploadNewsImage(upload: any) {
  const storageRef = this.firebaseStorage.ref(`${this.basePath}/${upload.name}`);
  // const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

  const task = storageRef.put(upload);

  return task;


    // return uploadTask.then(res => {
    //   console.log('upload completed');
    //   return res;
    //   })
    // .catch(err => console.log(err));

  }
  updateNews() {

  }

  deleteNews() {

  }

  updateNewsAfterImageLoad(key: string, downloadLink: string) {
    this.news.doc(key).update({image: downloadLink})
      .then(res => {
        console.log('image donwload link has been updated');
      });
  }

}
