import { SideNavOption } from '@football/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'football-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Timeout Sports';
  sideNavOptions: SideNavOption[] = [
    {
      name: 'Home',
      route: 'home'
    },
    {
      name: 'News',
      route: 'news'
    },
    {
      name: 'Events',
      route: 'events'
    }
  ];
}
