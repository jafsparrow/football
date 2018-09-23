import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
 imports: [
   MatButtonModule,
   MatCheckboxModule,
   MatCardModule,
   MatInputModule,
   MatTabsModule,
   MatToolbarModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatTableModule,
   MatSidenavModule,
   MatListModule,
   MatMenuModule,
   MatChipsModule,
   MatProgressSpinnerModule,
   MatFormFieldModule,
   MatAutocompleteModule,
   MatIconModule,
   MatSelectModule,
   MatPaginatorModule,
   MatSortModule,
   MatSnackBarModule,
   MatStepperModule,
   MatSlideToggleModule
 ],
 exports: [
   MatButtonModule,
   MatCheckboxModule,
   MatCardModule,
   MatInputModule,
   MatTabsModule,
   MatToolbarModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatTableModule,
   MatSidenavModule,
   MatListModule,
   MatMenuModule,
   MatChipsModule,
   MatProgressSpinnerModule,
   MatFormFieldModule,
   MatAutocompleteModule,
   MatIconModule,
   MatSelectModule,
   MatPaginatorModule,
   MatSortModule,
   MatSnackBarModule,
   MatStepperModule,
   MatSlideToggleModule
 ],
})
export class MaterialLibraryModule { }
