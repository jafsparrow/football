import { AuthenticationService } from '@football/shared';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { BookingService } from '../../services/booking.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface DialogData {
  pitch: any;
  date: Date;
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'football-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  dialogInputData = null;
  bookGroundFrom: FormGroup;
  _isSubmitting = false;
  pitch = null;
  loggedInUser: any;
  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private bookingService: BookingService,
    private _auth: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._auth.user$.pipe(take(1)).subscribe(user => {
      this.loggedInUser = user;
      console.log(user);
    });
    this.pitch = this.data.pitch;
    console.log(this.data);
    this.dialogInputData = {
      date: this.data.date,
      startTime: this.data.startTime,
      endTime: this.data.endTime
    };
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
    this.bookGroundFrom.patchValue(this.dialogInputData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
  submit() {
    this._isSubmitting = true;
    console.log(this.bookGroundFrom.value);
    const data = this.bookGroundFrom.value;
    const bookingDate = data.date;
    bookingDate.setHours(0, 0, 0, 0);
    data['date'] = bookingDate;
    this.bookingService
      .addBooking(
        this.loggedInUser,
        this.pitch.id,
        this.data.pitch.ground.id,
        data
      )
      .then(res => {
        console.log(res);
        this._isSubmitting = false;
        this.closeDialog();
      })
      .catch(e => {
        console.log(e);
        this._isSubmitting = false;
      });
  }

  navigateToLogin() {
    this.closeDialog();
    this._router.navigate(['/login']);
  }
}
