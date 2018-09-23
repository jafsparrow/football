
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-login',
  template: `
    <football-login loginRole="admin"></football-login>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  user$ = new BehaviorSubject(null);
  constructor() {

    this.user$.switchMap(res => console.log(res))
  }

  ngOnInit() {
  }

}
