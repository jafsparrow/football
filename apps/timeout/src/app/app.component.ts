import { SideNavOption } from '@football/shared';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'football-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Timeout Sports';
  sideNavOptions: SideNavOption[] = [
    {
      name: 'Home',
      route: '/'
    },
    {
      name: 'News',
      route: '/news/list'
    },
    {
      name: 'Events',
      route: '/events/list'
    }
  ];

  constructor(private swUpdate: SwUpdate) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(res => {
        if (confirm('new version is available, Load new version?')) {
          window.location.reload();
        }
      });
    }
  }
}
