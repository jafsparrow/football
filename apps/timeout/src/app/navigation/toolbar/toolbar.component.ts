import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '@football/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'football-timeout-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() appTitle = 'Welcome';
  @Output() menuClicked = new EventEmitter();
  user;
  constructor(private _auth: AuthenticationService, private _router: Router) {}

  ngOnInit() {
    this._auth.user$.subscribe(user => {
      this.user = user;
    });
  }
  openSideNav() {
    this.menuClicked.emit('opened');
  }
  login() {
    this._router.navigate(['account/login']);
  }
  logout() {
    this._auth.logout().then(res => this._router.navigate(['/account/login']));
  }
}
