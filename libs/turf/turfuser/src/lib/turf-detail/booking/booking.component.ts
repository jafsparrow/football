import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

export interface DialogData {
  groundName: string;
  date: Date;
}

@Component({
  selector: 'football-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookGroundFrom: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    console.log(this.data);
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
  }
}
