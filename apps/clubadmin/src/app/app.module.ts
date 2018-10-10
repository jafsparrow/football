import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from './../environments/environment';
// import { newsRoutes } from './../../../../libs/news/src/lib/news.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';

// import { AngularFireAuthModule } from '@angular/fire/auth';

import { HomeComponent } from './home/home.component';
import { RoutingModule } from './routing.module';

import {testing } from '@football/events';

import { SharedModule, AuthenticationService, MaterialLibraryModule} from '@football/shared';
import { NewsModule } from '@football/news';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { ClubInfoComponent } from './club-info/club-info.component';
import { NewsAddComponent } from './news/news-add/news-add.component';
import { NewsListComponent } from './news/news-list/news-list.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
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
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    RoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    FlexLayoutModule,
    SharedModule,
    // NewsModule,
    MaterialLibraryModule,

    HttpClientModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
