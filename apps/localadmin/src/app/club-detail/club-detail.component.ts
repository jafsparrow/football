import { LocalAdminService } from './../services/local-admin.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'football-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private localAdminService: LocalAdminService
  ) {}
  clubApprovalForm: FormControl;
  club: any;

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          const id = params['id'];
          return this.localAdminService.getReqestClubDetails(id);
        })
      )
      .subscribe(club => (this.club = club));
  }

  onApproval() {}

  onRejection() {}

  showMe() {
    console.log(this.club);
  }
}
