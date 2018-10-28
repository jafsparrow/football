import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'football-events-add',
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.css']
})
export class EventsAddComponent implements OnInit {
  eventsForm: FormGroup;
  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    console.log('events add component initabled');

    this.eventsForm = this.fb.group({
      title: ['', [Validators.required]]
    });
  }
}
