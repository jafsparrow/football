import { ClubsModule } from '@football/clubs';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './routes';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule, MaterialLibraryModule } from '@football/shared';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment, evnType } from '../environments/environment';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EventsModule } from '@football/events';
import { NewsLandingComponent } from './news/news-landing/news-landing.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { TimeoutLoginComponent } from './timeout-login/timeout-login.component';
import { NewsDetailViewComponent } from './news/news-detail-view/news-detail-view.component';
import { ClubRequestComponent } from './club-request/club-request.component';
import { ProfileComponent } from './profile/profile.component';
import { ClubInfoComponent } from './club-info/club-info.component';
import { NewsUiModule } from '@football/news-ui';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    EventsComponent,
    AnnouncementComponent,
    NewsLandingComponent,
    TimeoutLoginComponent,
    NewsDetailViewComponent,
    ClubRequestComponent,
    ProfileComponent,
    ClubInfoComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    SharedModule,
    ClubsModule,
    MaterialLibraryModule,
    FlexLayoutModule,
    EventsModule,
    ReactiveFormsModule,
    NewsUiModule
  ],
  providers: [{ provide: 'siteType', useValue: evnType }],
  bootstrap: [AppComponent]
})
export class AppModule {}
