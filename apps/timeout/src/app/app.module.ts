import { routes } from './routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewsViewComponent } from './../../../../libs/news/src/lib/news-view/news-view.component';

import { SharedModule, MaterialLibraryModule } from '@football/shared';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { NewsModule, NewsDetailComponent } from '@football/news';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EventsModule } from '@football/events';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    EventsComponent,
    AnnouncementComponent,
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, {initialNavigation: 'enabled'}),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NewsModule,
    SharedModule,
    MaterialLibraryModule,
    FlexLayoutModule,
    EventsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }