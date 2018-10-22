
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'football-side-nav-header',
  templateUrl: './side-nav-header.component.html',
  styleUrls: ['./side-nav-header.component.css']
})
export class SideNavHeaderComponent implements OnInit {
  user: any;
  constructor(private _auth: AuthenticationService) {
    this.user = null;
  }

  ngOnInit() {
    this._auth.user$
        .subscribe(user => this.user = user)

  }

}
