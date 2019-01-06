import { Router } from '@angular/router';
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
  districts = Keraladistricts.sort();

  selectedDistrict = '';
  selectedBodyType = '';
  localBodies = [];
  _localBodiesLoading = false;

  selectedDistrictForAddress = '';
  selectedBodyTypeForAddress = '';
  _localBodiesForAddressLoading = false;

  _userProfileUpdating = false;

  bldGroups = bloodGroups;
  profileForm: FormGroup;

  user$: Observable<any>;
  uid = null;

  localBodyForClubSearch$: Observable<any>;
  localBodyForAddress$: Observable<any>;
  localBodyForTaggingClubs$: Observable<any>;

  districtFilterForAddress$: BehaviorSubject<string | null>;
  bodyTypeFilterForAddress$: BehaviorSubject<string | null>;

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
    public profileService: UserProfileService,
    private _router: Router
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
    this.districtFilterForAddress$ = new BehaviorSubject(null);
    this.bodyTypeFilterForAddress$ = new BehaviorSubject(null);
  }
  ngOnInit() {
    this.user$ = this.auth.user$.pipe(
      tap(user => {
        this.profileForm.patchValue(user);
        this.uid = user.uid;
        const taggedClubsObject = user.taggedClubs;
        if (taggedClubsObject) {
          Object.keys(taggedClubsObject).forEach(key => {
            this.taggedClubs.push(taggedClubsObject[key]);
          });
        }
      })
    );

    this.clubSearchResults$ = null;
    this.favClubSearchResults$ = null;

    this.localBodyForAddress$ = combineLatest(
      this.districtFilterForAddress$,
      this.bodyTypeFilterForAddress$
    ).pipe(
      switchMap(([district, bodyType]) => {
        this._localBodiesForAddressLoading = true;
        // console.log(district, bodyType);
        return this.locationService.searchLocalBodies(district, bodyType);
      }),
      tap(res => (this._localBodiesForAddressLoading = false))
    );

    this.localBodyForClubSearch$ = combineLatest(
      this.districtFilterForClubSearch$,
      this.bodyTypeFilterForClubSearch$
    ).pipe(
      switchMap(([district, bodyType]) => {
        this._localBodiesForAddressLoading = true;
        return this.locationService.searchLocalBodies(district, bodyType);
      }),
      tap(local => (this._localBodiesForAddressLoading = false))
    );

    this.localBodyForTaggingClubs$ = combineLatest(
      this.districtFilterForTaggingClubs$,
      this.bodyTypeFilterForTaggingClubs$
    ).pipe(
      switchMap(([district, localBody]) => {
        this._localBodiesLoading = true;
        return this.locationService.searchLocalBodies(district, localBody);
      }),
      tap(local => (this._localBodiesLoading = false))
    );
  }

  addressDistrictChange(district) {
    this.selectedBodyTypeForAddress = '';
    this.bodyTypeFilterForAddress$.next(null);
    this.districtFilterForAddress$.next(district);
  }
  addressBodyTypeChange(localBodyType) {
    this.bodyTypeFilterForAddress$.next(localBodyType);
  }

  tagClubdistrictChange(value, dropdown) {
    this.selectedBodyType = '';
    this.selectedBodyTypeForAddress = '';
    this.bodyTypeFilterForTaggingClubs$.next(null);
    this.districtFilterForTaggingClubs$.next(value);
    this.searchCriteria['district'] = value;
    this.searchCriteria['localBody'] = null;
    this.searchCriteria['clubName'] = null;
  }

  tagClublocalBodyTypeChange(value) {
    this.bodyTypeFilterForTaggingClubs$.next(value);
    this.searchCriteria['clubName'] = null;
  }

  clubNameSearchForTag(value) {
    this.searchCriteria['clubName'] = value;
  }

  updateUserProfile() {
    this._userProfileUpdating = true;
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
      .then(() => {
        console.log('profile has been updated.');
        this._userProfileUpdating = false;
        // navigate to home page.
        this._router.navigate(['/']);
      })
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
    // console.log(this.searchCriteria);
    function toPascalCase(word) {
      return word
        ? word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        : null;
    }
    this.clubSearchResults$ = this.clubService
      .searchClubsOnParams(
        toPascalCase(this.searchCriteria.clubName),
        this.searchCriteria.district,
        this.searchCriteria.localBody
      )
      .pipe(
        tap(clubs => {
          this.isTagClubSearch = false;
          // console.log('jafar - inside the search part');
          // console.log(clubs);
        })
      );
  }
  clubTagToggle($event, tagClub) {
    // const taggingClub = { id: club.id, name: club.name };
    console.log(this.taggedClubs);
    const club = {
      name: tagClub.name,
      id: tagClub.id,
      tier: tagClub.tier ? tagClub.tier : 'none'
    };
    if ($event) {
      if (this.taggedClubs.length < 5) {
        this.taggedClubs.push(club);
      }
    } else {
      // const index = this.taggedClubs.indexOf(club);
      const matChedClubs = this.taggedClubs.filter(item => {
        return item.id !== club.id;
      });
      this.taggedClubs = matChedClubs;
      // if (index !== -1) {
      //   this.taggedClubs.splice(index, 1);
      // }

      //TODO = tutorial on finding index from array object and filtering on array object.
    }
  }

  updateClubSearchTerm(term) {
    this.searchTerm = term;
    if (term) {
      this.searchCriteria.localBody = term;
    }
  }

  searchClub(clubName) {
    this.isfavClubSearch = true;

    function toPascalCase(word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }
    clubName = toPascalCase(clubName);
    // console.log('j1', clubName);
    if (clubName !== '') {
      this.favClubSearchResults$ = this.clubService
        .searchClubsByName(clubName, 3)
        .pipe(
          tap(clubs => {
            this.isfavClubSearch = false;
            // console.log(clubs);
          })
        );
    }
  }

  updateFavClub(club) {
    this.mainClub = {
      id: club.id,
      name: club.name,
      tier: club.tier ? club.tier : 'none'
    };
  }

  ngOnDestroy() {
    this.districtFilterForClubSearch$.unsubscribe();
    this.bodyTypeFilterForClubSearch$.unsubscribe();
    this.districtFilterForTaggingClubs$.unsubscribe();
    this.bodyTypeFilterForTaggingClubs$.unsubscribe();
  }
}

export const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

export const Keraladistricts = [
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikkode',
  'Wayanad',
  'Kannur',
  'Kasaragod'
];
