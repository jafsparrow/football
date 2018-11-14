import { ClubService } from './services/club.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubHomeComponent } from './components/club-home/club-home.component';
@NgModule({
  imports: [CommonModule],
  providers: [ClubService],
  declarations: [ClubHomeComponent]
})
export class ClubsModule {}
