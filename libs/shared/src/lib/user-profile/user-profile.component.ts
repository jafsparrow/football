import { UserProfileService } from './../services/user-profile.service';
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
  bldGroups = bloodGroups;
  profileForm: FormGroup;

  user$: Observable<any>;
  uid = null;

  localBodyForClubSearch$: Observable<any>;
  localBodyForTaggingClubs$: Observable<any>;

  districtFilterForClubSearch$: BehaviorSubject<string | null>;
  bodyTypeFilterForClubSearch$: BehaviorSubject<string | null>;

  districtFilterForTaggingClubs$: BehaviorSubject<string | null>;
  bodyTypeFilterForTaggingClubs$: BehaviorSubject<string | null>;
  taggedClubs = [];
  mainClub = {};

  searchTerm: any;
  searchCriteria = {
    district: null,
    localBody: null,
    clubName: null
  };

  clubSearchResults$: Observable<any[]>;
  favClubSearchResults$: Observable<any[]>;
  isfavClubSearch = false;
  isTagClubSearch = false;
  constructor(
    public clubService: ClubService,
    public auth: AuthenticationService,
    public fb: FormBuilder,
    public locationService: LocationService,
    public profileService: UserProfileService
  ) {
    this.profileForm = this.fb.group({
      fullName: [''],
      phone: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
      ],
      bloodGroup: ['', [Validators.required]],
      address: this.fb.group({
        line1: ['', [Validators.required]],
        line2: [''],
        district: ['', [Validators.required]],
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
      tap(user => {
        this.profileForm.patchValue(user);
        this.uid = user.uid;
        const taggedClubsObject = user.taggedClubs;
        Object.keys(taggedClubsObject).forEach(key => {
          this.taggedClubs.push(taggedClubsObject[key]);
        });
      })
    );

    this.clubSearchResults$ = null;
    this.favClubSearchResults$ = null;

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
    this.searchCriteria['clubName'] = value;
  }

  updateUserProfile() {
    const updatedProfile = this.profileForm.value;
    updatedProfile['mainClub'] = this.mainClub;
    const taggedClubObject = {};

    this.taggedClubs.forEach(item => {
      taggedClubObject[item.id] = item;
    });
    updatedProfile['taggedClubs'] = taggedClubObject;
    // console.log(updatedProfile);
    this.taggedClubs = [];
    // to remove the fav club search and tag club search result from page, emit curresponding observalbes with null value
    this.clubSearchResults$ = of(null);
    this.favClubSearchResults$ = of(null);
    this.profileService
      .updatedUserProfile(updatedProfile, this.uid)
      .then(() => console.log('profile has been updated.'))
      .catch(err => console.log('something wrong while updating user profile'));
  }

  get phone() {
    return this.profileForm.get('phone');
  }
  searchClubs() {
    this.isTagClubSearch = true;
    if (
      this.searchCriteria.clubName == null &&
      this.searchCriteria.district == null &&
      this.searchCriteria.localBody == null
    )
      return of(null);
    this.clubSearchResults$ = this.clubService
      .searchClubsOnParams(
        this.searchCriteria.clubName,
        this.searchCriteria.district,
        this.searchCriteria.localBody
      )
      .pipe(tap(clubs => (this.isTagClubSearch = false)));
  }
  clubTagToggle($event, club) {
    // const taggingClub = { id: club.id, name: club.name };
    if ($event) {
      if (this.taggedClubs.length < 5) {
        this.taggedClubs.push(club);
      }
    } else {
      const index = this.taggedClubs.indexOf(club);
      if (index !== -1) {
        this.taggedClubs.splice(index, 1);
      }
    }
  }

  updateClubSearchTerm(term) {
    this.searchTerm = term;
  }

  searchClub(clubName) {
    this.isfavClubSearch = true;
    if (clubName !== '') {
      this.favClubSearchResults$ = this.clubService
        .searchClubsByName(name, 3)
        .pipe(tap(clubs => (this.isfavClubSearch = false)));
    }
  }

  updateFavClub(club) {
    this.mainClub = { id: club.id, name: club.name };
  }

  ngOnDestroy() {
    this.districtFilterForClubSearch$.unsubscribe();
    this.bodyTypeFilterForClubSearch$.unsubscribe();
    this.districtFilterForTaggingClubs$.unsubscribe();
    this.bodyTypeFilterForTaggingClubs$.unsubscribe();
  }
}

export const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
