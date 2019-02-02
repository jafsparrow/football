import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeoutLoginComponent } from './timeout-login/timeout-login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '@football/shared';
import { AccountComponent } from './account.component';

const routes: Routes = [
  { path: '', component: AccountComponent },
  { path: 'login', component: TimeoutLoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule {}
