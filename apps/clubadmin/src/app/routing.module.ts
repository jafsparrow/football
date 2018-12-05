import { ClubAdminOnlyGuard } from './../../../../libs/shared/src/lib/guards/club-admin-only.guard';
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
        canActivate: [ClubManagementGuard],
        loadChildren: '@football/news#NewsModule'
      },
      {
        path: 'events',
        canActivate: [ClubManagementGuard],
        loadChildren: '@football/events#EventsModule'
      },
      {
        path: 'club',
        canActivate: [ClubManagementGuard, ClubAdminOnlyGuard],
        component: ClubInfoComponent
      },
      {
        path: 'dashboard',
        canActivate: [ClubManagementGuard],
        component: DashboardComponent
      },
      {
        path: 'user',
        canActivate: [ClubAdminOnlyGuard],
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
