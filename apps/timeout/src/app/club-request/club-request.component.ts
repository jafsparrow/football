import { ClubsService } from './../services/clubs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@football/shared';
import { take } from 'rxjs/operators';

@Component({
  selector: 'football-club-request',
  templateUrl: './club-request.component.html',
  styleUrls: ['./club-request.component.css']
})
export class ClubRequestComponent implements OnInit {
  clubRequestForm: FormGroup;
  loggedInUser;
  submitting = false;
  constructor(
    private _fb: FormBuilder,
    public clubService: ClubsService,
    private _auth: AuthenticationService
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
      .then(res => (this.submitting = false));
  }
}
