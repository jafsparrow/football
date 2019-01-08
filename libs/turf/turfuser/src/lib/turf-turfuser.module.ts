import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TurfLandingComponent } from './turf-landing/turf-landing.component';
import { TurfDetailComponent } from './turf-detail/turf-detail.component';
import { SharedModule } from '@football/shared';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TurfLandingComponent }
    ])
  ],
  declarations: [TurfLandingComponent, TurfDetailComponent]
})
export class TurfTurfuserModule {}
