import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TurfLandingComponent } from './turf-landing/turf-landing.component';
import { TurfDetailComponent } from './turf-detail/turf-detail.component';
import { SharedModule } from '@football/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookingComponent } from './turf-detail/booking/booking.component';
import { DayStatusComponent } from './turf-detail/day-status/day-status.component';
// material dialog only used in turf booking form
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TurfLandingComponent }
    ])
  ],
  declarations: [
    TurfLandingComponent,
    TurfDetailComponent,
    BookingComponent,
    DayStatusComponent
  ],
  entryComponents: [BookingComponent]
})
export class TurfTurfuserModule {}
