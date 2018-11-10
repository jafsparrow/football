import { ClubsService } from './../services/clubs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, LocationService } from '@football/shared';
import { take, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'football-club-request',
  templateUrl: './club-request.component.html',
  styleUrls: ['./club-request.component.css']
})
export class ClubRequestComponent implements OnInit {
  clubRequestForm: FormGroup;
  loggedInUser;
  submitting = false;
  submitted = false;

  districtFilter$: BehaviorSubject<string | null>;
  bodyTypeFilter$: BehaviorSubject<string | null>;
  localBodys$: Observable<any[]>;

  constructor(
    private _fb: FormBuilder,
    public clubService: ClubsService,
    private _auth: AuthenticationService,
    public locationService: LocationService
  ) {}

  ngOnInit() {
    this.clubRequestForm = this._fb.group({
      name: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.minLength(8)]],
      address: this._fb.group({
        line1: ['', [Validators.required]],
        line2: '',
        pin: ['', [Validators.required]],
        district: ['', [Validators.required]],
        localBodyType: [],
        localBody: ['', [Validators.required]]
      })
    });

    this._auth.user$
      .pipe(take(1))
      .subscribe(user => (this.loggedInUser = user));

    this.districtFilter$ = new BehaviorSubject(null);
    this.bodyTypeFilter$ = new BehaviorSubject(null);
    this.localBodys$ = combineLatest(
      this.districtFilter$,
      this.bodyTypeFilter$
    ).pipe(
      switchMap(([district, bodyType]) => {
        return this.locationService.searchLocalBodies(district, bodyType);
      })
    );
  }

  onSubmit() {
    const newClubDetails = this.clubRequestForm.value;
    console.log(this.clubRequestForm.value);
    this.submitting = true;
    this.clubService
      .addClubRequest(this.clubRequestForm.value, {
        uid: this.loggedInUser.uid,
        displayName: this.loggedInUser.displayName,
        photoUrl: this.loggedInUser.photoUrl
      })
      .then(res => {
        this.submitting = false;
        this.submitted = true;
      });
  }

  distChange(value) {
    this.bodyTypeFilter$.next(null);
    this.districtFilter$.next(value);
  }

  bodyTypeChange(value) {
    this.bodyTypeFilter$.next(value);
  }
}
