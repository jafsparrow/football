import { LocationService } from './../services/location.service';
import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ClubService } from '@football/clubs';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'football-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;

  user$: Observable<any>;

  localBodyForClubSearch$: Observable<any>;
  localBodyForTaggingClubs$: Observable<any>;

  districtFilterForClubSearch$: BehaviorSubject<string | null>;
  bodyTypeFilterForClubSearch$: BehaviorSubject<string | null>;

  districtFilterForTaggingClubs$: BehaviorSubject<string | null>;
  bodyTypeFilterForTaggingClubs$: BehaviorSubject<string | null>;
  taggedClubs = [];

  searchTerm: any;
  searchCriteria = {
    district: null,
    localBody: null,
    cubName: null
  };

  clubSearchResults$: Observable<any[]>;
  constructor(
    public clubService: ClubService,
    public auth: AuthenticationService,
    public fb: FormBuilder,
    public locationService: LocationService
  ) {
    this.profileForm = this.fb.group({
      fullName: [''],
      phone: ['', [Validators.required]],
      bloodGroup: ['', [Validators.required]],
      address: this.fb.group({
        line1: ['', [Validators.required]],
        line2: [''],
        district: ['', [Validators.required]],
        localBodyType: ['', [Validators.required]],
        localBody: ['', [Validators.required]]
      })
    });

    this.searchTerm = null;
    // initialize the subjects.
    this.districtFilterForClubSearch$ = new BehaviorSubject(null);
    this.bodyTypeFilterForClubSearch$ = new BehaviorSubject(null);
    this.districtFilterForTaggingClubs$ = new BehaviorSubject(null);
    this.bodyTypeFilterForTaggingClubs$ = new BehaviorSubject(null);
  }

  ngOnInit() {
    this.user$ = this.auth.user$.pipe(
      tap(user => this.profileForm.patchValue(user))
    );

    this.clubSearchResults$ = null;

    this.localBodyForClubSearch$ = combineLatest(
      this.districtFilterForClubSearch$,
      this.bodyTypeFilterForClubSearch$
    ).pipe(
      switchMap(([district, localBody]) => {
        return this.locationService.searchLocalBodies(district, localBody);
      })
    );

    this.localBodyForTaggingClubs$ = combineLatest(
      this.districtFilterForTaggingClubs$,
      this.bodyTypeFilterForTaggingClubs$
    ).pipe(
      switchMap(([district, localBody]) => {
        return this.locationService.searchLocalBodies(district, localBody);
      })
    );
  }

  addressDistrictChange(district) {
    this.bodyTypeFilterForClubSearch$.next(null);
    this.districtFilterForClubSearch$.next(district);
  }
  addressBodyTypeChange(localBodyType) {
    this.bodyTypeFilterForClubSearch$.next(localBodyType);
  }

  tagClubdistrictChange(value) {
    this.bodyTypeFilterForTaggingClubs$.next(null);
    this.districtFilterForTaggingClubs$.next(value);
    this.searchCriteria['district'] = value;
    this.searchCriteria['localBody'] = null;
    this.searchCriteria['name'] = null;
  }

  tagClublocalBodyTypeChange(value) {
    this.bodyTypeFilterForTaggingClubs$.next(value);
    this.searchCriteria['name'] = null;
  }

  clubNameSearchForTag(value) {
    setTimeout(() => {
      console.log(value);
      if (value === '') {
        this.searchCriteria['name'] = value;
      }
    }, 1000);
  }

  updateUserProfile() {
    console.log(this.profileForm.value);
  }

  ngOnDestroy() {
    // this.districtFilterForClubSearch$.unsubscribe();
    // this.bodyTypeFilterForClubSearch$.unsubscribe();
    // this.districtFilterForTaggingClubs$.unsubscribe();
    // this.bodyTypeFilterForTaggingClubs$.unsubscribe();
  }

  searchClubs() {
    console.log(this.searchCriteria);
    if (
      this.searchCriteria.cubName == null &&
      this.searchCriteria.district == null &&
      this.searchCriteria.localBody == null
    )
      return of(null);
    this.clubSearchResults$ = this.clubService.searchClubsOnParams(
      this.searchCriteria.cubName,
      this.searchCriteria.district,
      this.searchCriteria.localBody
    );
  }
  clubTagToggle($event, club) {
    console.log($event, club);
    if ($event) {
      this.taggedClubs.push(club);
    } else {
      const index = this.taggedClubs.indexOf(club);

      if (index !== -1) {
        this.taggedClubs.splice(index, 1);
      }
    }
  }

  updateClubSearchTerm(term) {
    console.log('dropdown change' + term);
    this.searchTerm = term;
  }
}
