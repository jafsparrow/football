import { Component } from '@angular/core';
import { NavRoute } from '@football/shared';

@Component({
  selector: 'football-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'localadmin';
  sideNavOptions: NavRoute[] = [
    { name: 'Dashboard', route: '/home' },
    { name: 'Club Admin Users', route: '/superadmin', icon: 'more' },
    { name: 'Club Requests', route: '/club', icon: 'publish' }
  ];
}
