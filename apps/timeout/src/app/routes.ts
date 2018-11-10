import { AuthGuard } from '@football/shared';
import { ClubRequestComponent } from './club-request/club-request.component';
import { NewsLandingComponent } from './news/news-landing/news-landing.component';
import { NewsComponent } from './news/news.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EventsComponent } from './events/events.component';
import { NewsViewComponent, NewsDetailComponent } from '@football/news';
import { HomeComponent } from './home/home.component';
import { Route } from '@angular/router';
import { NewsListComponent } from './news/news-list/news-list.component';
import { TimeoutLoginComponent } from './timeout-login/timeout-login.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'announcements', component: AnnouncementComponent },
  {
    path: 'news',
    component: NewsComponent,
    children: [
      { path: '', component: NewsLandingComponent },
      { path: 'view/:id', component: NewsViewComponent },
      { path: 'list/:type', component: NewsListComponent }
    ]
  },
  { path: 'club', component: ClubRequestComponent, canActivate: [AuthGuard] },
  { path: 'login', component: TimeoutLoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];
