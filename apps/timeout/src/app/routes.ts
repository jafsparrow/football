import { NewsComponent } from './news/news.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EventsComponent } from './events/events.component';
import { NewsViewComponent } from "@football/news";
import { HomeComponent } from "./home/home.component";
import { Route } from "@angular/router";

export const routes: Route[] = [
  {path: 'detail:/id', component: NewsViewComponent },
  {path: 'home', component: HomeComponent},
  {path: 'events', component: EventsComponent},
  {path: 'announcements', component: AnnouncementComponent},
  {path: 'news', component: NewsComponent}
]
