import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeoutLoginComponent } from './timeout-login/timeout-login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '@football/shared';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'login', component: TimeoutLoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule {}
