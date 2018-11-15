import { AuthenticationService } from './services/authentication.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MaterialLibraryModule } from './material-library.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { SideNavigationComponent } from './navigation/side-navigation/side-navigation.component';
import { SideNavHeaderComponent } from './navigation/side-nav-header/side-nav-header.component';
import { RouterModule } from '@angular/router';
import { NewsTeaserComponent } from './news/news-teaser/news-teaser.component';
import { NewsSummaryViewComponent } from './news/news-summary-view/news-summary-view.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewsCommonService } from './services/news-common.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialLibraryModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  declarations: [
    LoginComponent,
    ToolbarComponent,
    SideNavigationComponent,
    SideNavHeaderComponent,
    NewsTeaserComponent,
    NewsSummaryViewComponent,
    TruncatePipe,
    UserProfileComponent
  ],
  providers: [NewsCommonService],
  exports: [
    LoginComponent,
    ToolbarComponent,
    SideNavigationComponent,
    SideNavHeaderComponent,
    NewsTeaserComponent,
    NewsSummaryViewComponent,
    TruncatePipe,
    UserProfileComponent,
    FlexLayoutModule,
    MaterialLibraryModule
  ]
})
export class SharedModule {}
