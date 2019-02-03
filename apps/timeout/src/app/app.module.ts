import { SideNavigationComponent } from './navigation/side-navigation/side-navigation.component';
// import { ClubSearchComponent } from './club-search/club-search.component';
import { SeoService } from './services/seo.service';
// import { ClubsModule } from '@football/clubs';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './routes';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  SharedModule,
  MaterialLibraryModule
  // AuthenticationService
} from '@football/shared';
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MatSidenavModule } from '@angular/material/sidenav';
import { environment, evnType } from '../environments/environment';
// import { EventsComponent } from './events/events.component';
// import { AnnouncementComponent } from './announcement/announcement.component';
// import { TimeoutLoginComponent } from './timeout-login/timeout-login.component';
// import { ClubRequestComponent } from './club-request/club-request.component';
// import { ProfileComponent } from './profile/profile.component';
// import { ClubInfoComponent } from './club-info/club-info.component';
import { NewsUiModule } from '@football/news-ui';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { EventUiModule } from '@football/event-ui';
// import { EventsLandingComponent } from './events/events-landing/events-landing.component';
// import { EventsListComponent } from './events/events-list/events-list.component';
// import { EventsDetailComponent } from './events/events-detail/events-detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { SideNavHeaderComponent } from './navigation/side-nav-header/side-nav-header.component';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    SideNavHeaderComponent,
    SideNavigationComponent
    // NewsComponent,
    // EventsComponent,
    // AnnouncementComponent
    // NewsLandingComponent,
    // TimeoutLoginComponent,
    // NewsFullViewComponent,
    // ClubRequestComponent,
    // ProfileComponent
    // ClubInfoComponent,
    // NewsListComponent,
    // EventsLandingComponent,
    // EventsListComponent,
    // EventsDetailComponent,
    // ClubSearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    // SharedModule,
    // ClubsModule,
    // MaterialLibraryModule,
    // FlexLayoutModule,
    // ReactiveFormsModule,
    // NewsUiModule,
    // EventUiModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  providers: [{ provide: 'siteType', useValue: evnType }, SeoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
