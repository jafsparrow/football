import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'football-localadmin-club-search-modal',
  templateUrl: './localadmin-club-search-modal.component.html',
  styleUrls: ['./localadmin-club-search-modal.component.css']
})
export class LocaladminClubSearchModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LocaladminClubSearchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}
  onClubSelection(club): void {
    this.dialogRef.close(club);
  }
}
