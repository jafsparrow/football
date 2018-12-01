import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { SharedModule } from '@football/shared';
import { EventsSummaryTeaserComponent } from './events-summary-teaser/events-summary-teaser.component';
import { EventsSummaryViewComponent } from './events-summary-view/events-summary-view.component';
@NgModule({
  imports: [CommonModule, SharedModule, FlexLayoutModule, RouterModule],
  declarations: [
    EventDetailComponent,
    EventsSummaryTeaserComponent,
    EventsSummaryViewComponent
  ],
  exports: [
    EventDetailComponent,
    EventsSummaryTeaserComponent,
    EventsSummaryViewComponent
  ]
})
export class EventUiModule {}
