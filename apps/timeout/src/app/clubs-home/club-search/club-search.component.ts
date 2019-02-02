import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'football-club-search',
  templateUrl: './club-search.component.html',
  styleUrls: ['./club-search.component.css']
})
export class ClubSearchComponent implements OnInit {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ClubSearchComponent>
  ) {}

  ngOnInit() {}

  goToClubInfo(clubId) {
    this.dialogRef.close();
    this.router.navigate(['clubinfo', clubId]);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
