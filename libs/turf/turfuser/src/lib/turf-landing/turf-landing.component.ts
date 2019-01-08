import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'football-turf-landing',
  templateUrl: './turf-landing.component.html',
  styleUrls: ['./turf-landing.component.css']
})
export class TurfLandingComponent implements OnInit {
  turfId = 'something';
  grounds = [
    {
      name: '5s football court',
      type: 'football',
      id: 'temp'
    },
    {
      name: '7s football court',
      type: 'football',
      id: 'temp2'
    },
    {
      name: '5s football court',
      type: 'football',
      id: 'temp3'
    }
  ];
  selectedGround = null;
  constructor() {}

  ngOnInit() {}

  selected(ground) {
    this.selectedGround = ground;
  }
}
