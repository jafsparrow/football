import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'football-turf-detail',
  templateUrl: './turf-detail.component.html',
  styleUrls: ['./turf-detail.component.css']
})
export class TurfDetailComponent implements OnInit, OnChanges {
  @Input() ground: any;
  bookGroundFrom: FormGroup;
  _isLoading;
  _docId = 'EsSCU8sqajSND80W1x6u';
  _groundId = '6AOTEwrKh3zMtm9LRFd3';

  $groundBooking: any;
  constructor(private _fb: FormBuilder, private _db: AngularFirestore) {}

  ngOnInit() {
    this.bookGroundFrom = this._fb.group({
      name: ['', Validators.required],
      phone: [
        '',
        [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.required]
      ],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.getBookingForGround().subscribe(value => console.log(value));
  }

  ngOnChanges() {
    this._isLoading = true;
    setTimeout(() => {
      this._isLoading = false;
    }, 2000);
  }

  changeInput($event) {
    console.log($event);
  }

  btnClck() {
    console.log(this.bookGroundFrom.value);
    this.bookGround();
  }

  bookGround() {
    const _value = this.bookGroundFrom.value;
    const dateValue = _value.date.getDate().toString();
    const monthValue = _value.date.getMonth().toString();
    const yearVale = _value.date.getFullYear();
    const _id = dateValue + monthValue + yearVale;

    console.log(_id);
    this._db
      .collection('playgrounds')
      .doc(this._docId)
      .collection('grounds')
      .doc(this._groundId)
      .collection('booking')
      .add(_value)
      .then(() => console.log('booking has been added.'));
  }

  getBookingForGround() {
    // const date = new Date();
    const d = new Date();
    d.setHours(0, 0, 0, 0);

    // const timestamp = date.getMilliseconds();
    return this._db
      .collection('playgrounds')
      .doc(this._docId)
      .collection('grounds')
      .doc(this._groundId)
      .collection('booking', ref => ref.where('date', '==', d))
      .valueChanges();
  }
}
