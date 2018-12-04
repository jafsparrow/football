import { NewsListComponent } from './news/news-list/news-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClubInfoComponent } from './club-info/club-info.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ClubManagementGuard, AuthGuard } from '@football/shared';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,

    children: [
      {
        path: '',
        redirectTo: '/club',
        pathMatch: 'full'
      },
      {
        path: 'news',
        loadChildren: '@football/news#NewsModule'
      },
      {
        path: 'events',
        // canActivate: [ClubManagementGuard],
        loadChildren: '@football/events#EventsModule'
      },
      {
        path: 'club',
        component: ClubInfoComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user',
        component: UserManagementComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class RoutingModule {}
