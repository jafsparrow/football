import { NewsLandingComponent } from './news/news-landing/news-landing.component';
import { NewsComponent } from './news/news.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EventsComponent } from './events/events.component';
import { NewsViewComponent, NewsDetailComponent } from "@football/news";
import { HomeComponent } from "./home/home.component";
import { Route } from "@angular/router";
import { NewsListComponent } from './news/news-list/news-list.component';
import { TimeoutLoginComponent } from './timeout-login/timeout-login.component';

export const routes: Route[] = [
  {path: 'home', component: HomeComponent},
  {path: 'events', component: EventsComponent},
  {path: 'announcements', component: AnnouncementComponent},
  {
    path: 'news',
    component: NewsComponent,
    children: [
      { path: '', component: NewsLandingComponent},
      { path: 'view/:id' , component: NewsViewComponent},
      { path: 'list/:type', component: NewsListComponent},

    ]

  },
  {path: 'login', component: TimeoutLoginComponent}
]
