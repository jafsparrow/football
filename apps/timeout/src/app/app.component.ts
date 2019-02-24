import { SideNavOption } from '@football/shared';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

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
      route: ''
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
  loadingRouteConfig: boolean;

  constructor(private swUpdate: SwUpdate,private router: Router) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(res => {
        if (confirm('new version is available, Load new version?')) {
          window.location.reload();
        }
      });
    }

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
  }
}
