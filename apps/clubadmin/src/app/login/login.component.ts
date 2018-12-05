import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'football-login-page',
  template: `
    <football-login loginRole="admin" redirectURL="/"></football-login>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  user$ = new BehaviorSubject(null);
  constructor() {
    this.user$.pipe(switchMap(res => new BehaviorSubject(null)));
  }

  ngOnInit() {}
}
