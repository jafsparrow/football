import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookingRef: AngularFirestoreCollection;
  constructor(private _db: AngularFirestore) {
    this.bookingRef = _db.collection('groundbookings');
  }

  getBookings(pitchId, date) {
    this.bookingRef.ref.where('id', '==', '333');
  }

  getBookingForPitch(pitchId, date) {
    // const timestamp = date.getMilliseconds();
    // const tomorrow = new Date();
    // tomorrow.setDate(date.getDate() + 1);
    return this._db
      .collection('groundbookings', ref =>
        ref.where('pitchId', '==', pitchId).where('date', '==', date)
      )
      .valueChanges();
  }

  addBooking(loggedUser, pitchId, groundId, bookingDetails) {
    const data = {
      author: {
        name:
          loggedUser.fullName !== ''
            ? loggedUser.fullName
            : loggedUser.displayName,
        uid: loggedUser.uid,
        phone: loggedUser.phone
      },
      pitchId,
      groundId,
      ...bookingDetails,
      status: 'initial',
      createdDate: new Date()
    };
    console.log(data);
    return this.bookingRef.add(data);
  }
}
