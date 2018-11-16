import { EventUiModule } from '@football/event-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialLibraryModule } from '@football/shared';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsSummaryComponent } from './events-summary/events-summary.component';
import { EventsTeaserComponent } from './events-teaser/events-teaser.component';
import { EventsAddComponent } from './events-add/events-add.component';
import { RouterModule, Route } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EventDetailViewComponent } from './event-detail-view/event-detail-view.component';
import { EventActionComponent } from './event-action/event-action.component';

export const eventsRoutes: Route[] = [
  { path: '', component: EventsListComponent },
  { path: 'edit', component: EventsAddComponent },
  { path: 'detail/:id', component: EventDetailViewComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialLibraryModule,
    RouterModule.forChild(eventsRoutes),
    ReactiveFormsModule,
    AngularEditorModule,
    EventUiModule,
    FlexLayoutModule
  ],
  declarations: [
    EventsSummaryComponent,
    EventsTeaserComponent,
    EventsAddComponent,
    EventsListComponent,
    EventDetailViewComponent,
    EventActionComponent
  ],
  exports: [EventsSummaryComponent, EventsTeaserComponent, EventsAddComponent]
})
export class EventsModule {}
