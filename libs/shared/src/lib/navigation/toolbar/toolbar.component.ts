import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'football-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() menuClicked = new EventEmitter();
  constructor(private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  openSideNav(){
    this.menuClicked.emit('opened');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
