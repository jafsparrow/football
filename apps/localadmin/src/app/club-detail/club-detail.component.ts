import { LocalAdminService } from './../services/local-admin.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'football-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {
  submitting = false;
  loaded = false;
  submitted = false;
  clubApprovalForm: FormGroup;
  club: any;
  constructor(
    private route: ActivatedRoute,
    private localAdminService: LocalAdminService,
    private _fb: FormBuilder
  ) {
    this.clubApprovalForm = this._fb.group({
      name: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
      contact: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
      ],
      tier: ['', [Validators.required]],
      address: this._fb.group({
        line1: [{ value: '', disabled: true }, [Validators.required]],
        line2: { value: '', disabled: true },
        pin: [{ value: '', disabled: true }, [Validators.required]],
        location: [''],
        district: [{ value: '', disabled: true }, [Validators.required]],
        localBodyType: [],
        localBody: [{ value: '', disabled: true }, [Validators.required]]
      })
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          const id = params['id'];
          return this.localAdminService.getReqestClubDetails(id);
        })
      )
      .subscribe(club => {
        console.log(club);
        this.loaded = true;
        this.club = club;
        this.clubApprovalForm.patchValue(club);
      });
  }

  approveRequest() {
    this.submitting = true;
    if (this.club.status !== 'approved' && this.club.status !== 'rejected') {
      this.localAdminService.approveClub(this.club).then(res => {
        console.log(res);
        this.submitted = true;

        if (res === 'success') {
          console.log('res return as success');
          // here is where I need to call delete the request from the request collection
          this.localAdminService.deleteRequests(this.club.id).then(() => {
            console.log('Processed request has been deleted from Database.');
          });
        }
      });
    } else {
      console.log('this club request has already been processed..');
    }
  }

  rejectRequest() {
    //delete the item from db.
    this.submitting = true;
    this.localAdminService.rejectClub(this.club.id).then(res => {
      console.log('request rejected.');
      this.submitted = true;
    });
  }

  showMe() {
    console.log(this.club);
  }
}
