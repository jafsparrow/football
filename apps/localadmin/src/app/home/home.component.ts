import { LocalAdminService } from './../services/local-admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'football-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private localAdminService: LocalAdminService) {}

  ngOnInit() {
    this.localAdminService.approveClub(1);
  }
}
