import { SharedModule } from '@football/shared';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment, evnType } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ClubRequestsComponent } from './club-requests/club-requests.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClubAdminManagementComponent } from './club-admin-management/club-admin-management.component';
import { SuperAdminManagementComponent } from './super-admin-management/super-admin-management.component';
import { AssignClubadminComponent } from './assign-clubadmin/assign-clubadmin.component';
import { NgAisModule } from 'angular-instantsearch';
import { LocaladminClubSearchModalComponent } from './localadmin-club-search-modal/localadmin-club-search-modal.component';

import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'club', component: ClubRequestsComponent },
  { path: 'detail/:id', component: ClubDetailComponent },
  { path: 'adminuser', component: ClubAdminManagementComponent },
  { path: 'superadmin', component: SuperAdminManagementComponent },
  { path: 'assignadmin', component: AssignClubadminComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ClubRequestsComponent,
    ClubDetailComponent,
    ClubAdminManagementComponent,
    SuperAdminManagementComponent,
    AssignClubadminComponent,
    LocaladminClubSearchModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    NgAisModule.forRoot(),
    MatDialogModule
  ],
  providers: [{ provide: 'siteType', useValue: evnType }],
  bootstrap: [AppComponent],
  entryComponents: [LocaladminClubSearchModalComponent]
})
export class AppModule {}
