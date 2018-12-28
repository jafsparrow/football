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

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'club', component: ClubRequestsComponent },
  { path: 'detail/:id', component: ClubDetailComponent },
  { path: 'adminuser', component: ClubAdminManagementComponent },
  { path: 'superadmin', component: SuperAdminManagementComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ClubRequestsComponent,
    ClubDetailComponent,
    ClubAdminManagementComponent,
    SuperAdminManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule
  ],
  providers: [{ provide: 'siteType', useValue: evnType }],
  bootstrap: [AppComponent]
})
export class AppModule {}
