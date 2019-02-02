import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  constructor(private _db: AngularFirestore) {}

  addClubRequest(club, user) {
    club['requestType'] = 'club';
    club['status'] = 'initiated';
    club['requestedUser'] = user;
    club['shortName'] = club['shortName'].toUpperCase();
    console.log(club);
    return this._db.collection('requests').add(club);
  }
}
