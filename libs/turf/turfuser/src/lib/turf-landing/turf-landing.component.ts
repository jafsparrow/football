import { Component, OnInit } from '@angular/core';
import { TurfService } from '../services/turf.service';
import { switchMap } from 'rxjs/operators';

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
  id = 'EsSCU8sqajSND80W1x6u';
  selectedGround = null;
  pitches = [];
  selectedPitch = null;
  _isLoading = false;
  constructor(private turfService: TurfService) {}

  ngOnInit() {
    this._isLoading = true;
    this.turfService
      .getPlayGround(this.id)
      .pipe(
        switchMap(ground => {
          this.selectedGround = ground;
          console.log(ground);
          return this.turfService.getPitches(this.id);
        })
      )
      .subscribe(pitches => {
        this.pitches = pitches;
        console.log(pitches);
        this._isLoading = false;
      });
  }

  selectPitch(pitch) {
    this.selectedPitch = pitch;
  }
}
