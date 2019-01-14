import { BookingComponent } from './booking/booking.component';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'football-turf-detail',
  templateUrl: './turf-detail.component.html',
  styleUrls: ['./turf-detail.component.css']
})
export class TurfDetailComponent implements OnInit, OnChanges {
  @Input() pitch: any;
  bookings = [];
  _isLoading;
  value: Date;
  _docId = 'EsSCU8sqajSND80W1x6u';
  _groundId = '6AOTEwrKh3zMtm9LRFd3';

  $groundBooking: any;
  constructor(
    private _fb: FormBuilder,
    private _db: AngularFirestore,
    public dialog: MatDialog,
    private bookingService: BookingService
  ) {
    this.value = new Date();
  }

  ngOnInit() {
    // console.log(this.pitch);
    // this._isLoading = true;
    // this.getTodaysBooking().subscribe(bookings => {
    //   console.log(bookings);
    //   this.bookings = bookings;
    //   this._isLoading = false;
    // });
  }
  //  ng changes is need as the bookings stays the same if the @Input pitch chagnes. that has to change accordingly hence ngOnchagnes
  ngOnChanges() {
    this._isLoading = true;
    console.log('on change fired');
    this.getTodaysBooking().subscribe(bookings => {
      console.log(bookings);
      this.bookings = bookings;
      this._isLoading = false;
    });
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(BookingComponent, {
      width: '600px',
      data
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openBookForm() {
    const data = {
      pitch: this.pitch,
      date: this.value
    };

    this.openDialog(data);
  }
  openBookingForTheDate($event) {
    console.log($event);
    const value = $event;
    const dateFromTimeStamp = new Date(value.date.seconds * 1000);
    console.log(new Date(value.date.seconds * 1000).toLocaleDateString());
    const pitch = { id: this.pitch.id, name: this.pitch.name };
    const data = {
      pitch,
      date: dateFromTimeStamp,
      startTime: value.startTime,
      endTime: value.endTime
    };

    this.openDialog(data);
  }
  bookGround() {
    // const _value = this.bookGroundFrom.value;
    // const dateValue = _value.date.getDate().toString();
    // const monthValue = _value.date.getMonth().toString();
    // const yearVale = _value.date.getFullYear();
    // const _id = dateValue + monthValue + yearVale;
    // console.log(_id);
    // this._db
    //   .collection('playgrounds')
    //   .doc(this._docId)
    //   .collection('grounds')
    //   .doc(this._groundId)
    //   .collection('booking')
    //   .add(_value)
    //   .then(() => console.log('booking has been added.'));
  }
  getTodaysBooking() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return this.bookingService.getBookingForPitch(this.pitch.id, date);
  }

  loadingBookingFor(date) {
    this._isLoading = true;
    const dateValue = new Date(date);
    this.bookingService
      .getBookingForPitch(this.pitch.id, dateValue)
      .subscribe(bookings => {
        this.bookings = bookings;
        this._isLoading = false;
      });
  }
}
