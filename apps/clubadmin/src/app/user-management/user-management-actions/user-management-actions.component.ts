import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'football-user-management-actions',
  templateUrl: './user-management-actions.component.html',
  styleUrls: ['./user-management-actions.component.css']
})
export class UserManagementActionsComponent implements OnInit {
  @Input() selectedUser;
  constructor() {}

  ngOnInit() {
    console.log(this.selectedUser);
  }
}
