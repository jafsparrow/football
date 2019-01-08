import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewsUiModule } from '@football/news-ui';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';

import { RoutingModule } from './routing.module';
import {
  SharedModule,
  AuthenticationService,
  MaterialLibraryModule
} from '@football/shared';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { ClubInfoComponent } from './club-info/club-info.component';
import { NewsAddComponent } from './news/news-add/news-add.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { evnType } from '../environments/environment';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserManagementActionsComponent } from './user-management/user-management-actions/user-management-actions.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    RoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FlexLayoutModule,
    SharedModule,
    NewsUiModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgAisModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    NewsComponent,
    EventsComponent,
    ClubInfoComponent,
    NewsAddComponent,
    NewsListComponent,
    UserManagementComponent,
    UserManagementActionsComponent
  ],

  providers: [
    AuthenticationService,
    { provide: 'siteType', useValue: evnType }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
