import { ReactiveFormsModule } from '@angular/forms';
import { MaterialLibraryModule } from '@football/shared';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsSummaryComponent } from './events-summary/events-summary.component';
import { EventsTeaserComponent } from './events-teaser/events-teaser.component';
import { EventsAddComponent } from './events-add/events-add.component';
import { RouterModule, Route } from '@angular/router';

export const eventsRoutes: Route[] = [
  { path: '', component: EventsAddComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialLibraryModule,
    RouterModule.forChild(eventsRoutes),
    ReactiveFormsModule
  ],
  declarations: [
    EventsSummaryComponent,
    EventsTeaserComponent,
    EventsAddComponent
  ],
  exports: [EventsSummaryComponent, EventsTeaserComponent, EventsAddComponent]
})
export class EventsModule {}

export const testing = [1, 2];
