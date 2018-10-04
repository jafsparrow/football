import { NewsListComponent } from './news/news-list/news-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClubInfoComponent } from './club-info/club-info.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
// import { newsRoutes } from '@football/news'
import { EventsComponent } from './events/events.component';

const routes: Routes= [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [ {
      path: 'news',
      // component: NewsComponent,
      loadChildren: '@football/news#NewsModule',
      // children: [
      //   {
      //     path: 'list',
      //     component: NewsListComponent
      //   }
      // ]
    },
    {
      path: 'events',
      component: EventsComponent
    },
    {
      path: 'club',
      component: ClubInfoComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    }]
  }



]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {initialNavigation: 'enabled'})
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
