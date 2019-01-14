import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'football-day-status',
  templateUrl: './day-status.component.html',
  styleUrls: ['./day-status.component.css']
})
export class DayStatusComponent implements OnInit {
  sample = 'sjsdflkjsdf';
  @Input() bookings: any[];
  @Output() bookForThisDate: EventEmitter<any>;
  constructor() {
    this.bookForThisDate = new EventEmitter();
  }

  ngOnInit() {}

  openBookingForm(booking) {
    console.log('event is triggered');
    this.bookForThisDate.emit(booking);
  }

  getAmPmTime(time) {
    const timeValue = parseInt(time, 10);
    const amOrPm = timeValue < 12 ? 'AM' : 'PM';
    const hour = timeValue < 12 ? timeValue : timeValue - 12;
    return `${hour.toString()} ${amOrPm}`;
  }
}
