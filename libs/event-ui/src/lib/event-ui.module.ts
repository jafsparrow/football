import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { SharedModule } from '@football/shared';
@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [EventDetailComponent],
  exports: [EventDetailComponent]
})
export class EventUiModule {}
