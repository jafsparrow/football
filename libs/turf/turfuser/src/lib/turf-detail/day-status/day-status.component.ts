import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'football-day-status',
  templateUrl: './day-status.component.html',
  styleUrls: ['./day-status.component.css']
})
export class DayStatusComponent implements OnInit {
  sample = 'sjsdflkjsdf';
  @Output() bookForThisDate: EventEmitter<any>;
  constructor() {
    this.bookForThisDate = new EventEmitter();
  }

  ngOnInit() {}

  openBookingForm() {
    console.log('event is triggered');
    this.bookForThisDate.emit(null);
  }
}
