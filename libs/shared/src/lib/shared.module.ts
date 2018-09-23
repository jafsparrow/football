import { AuthenticationService } from './services/authentication.service';

      import { NgModule } from '@angular/core';
      import { CommonModule } from '@angular/common';
      import { FormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component';
import { MaterialLibraryModule } from './material-library.module';

import {FlexLayoutModule} from '@angular/flex-layout';


import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


      @NgModule({
        imports: [
          CommonModule,
          FormsModule,
          MaterialLibraryModule,
          FlexLayoutModule,
          AngularFirestoreModule,
          AngularFireAuthModule,

        ],
        declarations: [LoginComponent],
        providers: [],
        exports: [LoginComponent],
      })
      export class SharedModule { }
