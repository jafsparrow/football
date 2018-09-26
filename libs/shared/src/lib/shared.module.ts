import { AuthenticationService } from './services/authentication.service';

      import { NgModule } from '@angular/core';
      import { CommonModule } from '@angular/common';
      import { FormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component';
import { MaterialLibraryModule } from './material-library.module';

import {FlexLayoutModule} from '@angular/flex-layout';


import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { SideNavigationComponent } from './navigation/side-navigation/side-navigation.component';
import { SideNavHeaderComponent } from './navigation/side-nav-header/side-nav-header.component';
import { RouterModule } from '@angular/router';


      @NgModule({
        imports: [
          CommonModule,
          RouterModule,
          FormsModule,
          MaterialLibraryModule,
          FlexLayoutModule,
          AngularFirestoreModule,
          AngularFireAuthModule,

        ],
        declarations: [LoginComponent, ToolbarComponent, SideNavigationComponent, SideNavHeaderComponent],
        providers: [],
        exports: [LoginComponent, ToolbarComponent, SideNavigationComponent, SideNavHeaderComponent],
      })
      export class SharedModule { }
