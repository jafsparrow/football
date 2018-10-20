import { MaterialLibraryModule } from '@football/shared';
import { FlexLayoutModule } from '@angular/flex-layout';

      import { NgModule } from '@angular/core';
      import { CommonModule } from '@angular/common';
import { EventsSummaryComponent } from './events-summary/events-summary.component';
import { EventsTeaserComponent } from './events-teaser/events-teaser.component';
      @NgModule({
        imports: [
          CommonModule,
          FlexLayoutModule,
          MaterialLibraryModule
        ],
        declarations: [EventsSummaryComponent, EventsTeaserComponent],
        exports: [EventsSummaryComponent, EventsTeaserComponent]
      })
      export class EventsModule { }


      export const testing = [1,2];
