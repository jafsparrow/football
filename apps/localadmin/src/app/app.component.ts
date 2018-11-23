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
    { name: 'Dashboard', route: 'dashboard' },
    { name: 'News', route: 'news', icon: 'more' },
    { name: 'Events', route: 'events', icon: 'publish' }
  ];
}