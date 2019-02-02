import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventsLandingComponent } from './events-landing/events-landing.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsDetailComponent } from './events-detail/events-detail.component';
import { SharedModule } from '@football/shared';
import { EventUiModule } from '@football/event-ui';

const routes: Routes = [
  // { path: '', component: HomeNewsComponent },
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: '', component: EventsLandingComponent },
      { path: 'list', component: EventsListComponent },
      { path: 'detail/:id', component: EventsDetailComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    EventUiModule
  ],
  declarations: [
    EventsComponent,
    EventsLandingComponent,
    EventsDetailComponent,
    EventsListComponent
  ]
})
export class EventsHomeModule {}
