import { ClubSearchComponent } from './club-search/club-search.component';
import { EventUiModule } from '@football/event-ui';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClubRequestComponent } from './club-request/club-request.component';
import { AuthGuard, SharedModule } from '@football/shared';
import { ClubInfoComponent } from './club-info/club-info.component';
import { ClubsComponent } from './clubs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsUiModule } from '@football/news-ui';

const routes: Routes = [
  {
    path: 'registerclub',
    component: ClubRequestComponent,
    canActivate: [AuthGuard]
  },
  { path: 'clubinfo/:id', component: ClubInfoComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NewsUiModule,
    EventUiModule
  ],
  declarations: [
    ClubsComponent,
    ClubRequestComponent,
    ClubInfoComponent,
    ClubSearchComponent
  ]
})
export class ClubsHomeModule {}
