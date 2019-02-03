// import { ClubInfoComponent } from './club-info/club-info.component';
import { AuthGuard } from '@football/shared';
// import { ClubRequestComponent } from './club-request/club-request.component';
// import { AnnouncementComponent } from './announcement/announcement.component';
// import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { Route } from '@angular/router';
// import { TimeoutLoginComponent } from './timeout-login/timeout-login.component';
// import { ProfileComponent } from './profile/profile.component';
// import { EventsListComponent } from './events/events-list/events-list.component';
// import { EventsDetailComponent } from './events/events-detail/events-detail.component';
// import { EventsLandingComponent } from './events/events-landing/events-landing.component';

export const routes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'account',
    loadChildren: './user-account/user-account.module#UserAccountModule'
  },
  {
    path: 'news',
    loadChildren: './news-home/news-home.module#NewsHomeModule'
  },
  {
    path: 'events',
    loadChildren: './events-home/events-home.module#EventsHomeModule'
  },
  {
    path: 'clubs',
    loadChildren: './clubs-home/clubs-home.module#ClubsHomeModule'
  }
  // {
  //   path: 'turf',
  //   loadChildren: './news-home/events-home.module#EventsHomeModule'
  // },

  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  // {
  //   path: 'events',
  //   component: EventsComponent,
  //   children: [
  //     { path: '', component: EventsLandingComponent },
  //     { path: 'list', component: EventsListComponent },
  //     { path: 'detail/:id', component: EventsDetailComponent }
  //   ]
  // },
  // { path: 'announcements', component: AnnouncementComponent }
  // {
  //   path: 'news',
  //   component: NewsComponent,
  //   children: [
  //     { path: '', component: NewsLandingComponent },
  //     // { path: 'view/:id', component: NewsViewComponent },
  //     { path: 'list', component: NewsListComponent },
  //     { path: 'detail/:id', component: NewsFullViewComponent }
  //   ]
  // },
  // {
  //   path: 'registerclub',
  //   component: ClubRequestComponent,
  //   canActivate: [AuthGuard]
  // },
  // { path: 'clubinfo/:id', component: ClubInfoComponent },
  // { path: 'login', component: TimeoutLoginComponent },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
  // { path: 'turf', loadChildren: '@football/turf/turfuser#TurfTurfuserModule' }
];
