import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'football-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() appTitle = 'Welcome';
  @Output() menuClicked = new EventEmitter();
  user: any;
  constructor(private _auth: AuthenticationService, private _router: Router) {
    this.user = null;
  }

  ngOnInit() {
    this._auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  openSideNav() {
    this.menuClicked.emit('opened');
  }
  login() {
    this._router.navigate(['login']);
  }
  logout() {
    this._auth.logout().then(res => this._router.navigate(['/login']));
  }
}
