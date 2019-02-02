import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { TimeoutLoginComponent } from './timeout-login/timeout-login.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '@football/shared';
import { AccountComponent } from './account.component';

@NgModule({
  imports: [CommonModule, UserAccountRoutingModule, SharedModule],
  declarations: [AccountComponent, TimeoutLoginComponent, ProfileComponent]
})
export class UserAccountModule {}
