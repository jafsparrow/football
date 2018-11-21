import { LocalAdminService } from './../services/local-admin.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
export interface ClubData {
  name: string;
  status: string;
}
@Component({
  selector: 'football-club-requests',
  templateUrl: './club-requests.component.html',
  styleUrls: ['./club-requests.component.css']
})
export class ClubRequestsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'actions'];
  dataSource: MatTableDataSource<ClubData>;

  constructor(private localAdminService: LocalAdminService) {
    this.localAdminService.getNewClubRequests().subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    });
  }

  ngOnInit() {}
}
