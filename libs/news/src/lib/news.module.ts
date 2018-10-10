import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialLibraryModule } from '@football/shared';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ClubTagsComponent } from './club-tags/club-tags.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsService } from './services/news.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ClubDetailsService } from './services/club-details.service';
import { NewsViewComponent } from './news-view/news-view.component';
import { NewsActionsComponent } from './news-actions/news-actions.component';


export const newsRoutes: Route[] = [
  {
    path: '',
    component: NewsListComponent
  },
  {
    path: 'add',
    component: AddNewsComponent
  },
  {
    path: 'view',
    component:NewsViewComponent
  }
];
      @NgModule({
        imports: [
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          RouterModule.forChild(newsRoutes),
          MaterialLibraryModule,
          AngularFireStorageModule,
          FlexLayoutModule,
          AngularEditorModule,
        ],
        declarations: [NewsListComponent, NewsDetailComponent, ClubTagsComponent, AddNewsComponent, NewsViewComponent, NewsActionsComponent],
        exports: [NewsListComponent, NewsDetailComponent, ClubTagsComponent],
        providers: [NewsService, ClubDetailsService]
      })
      export class NewsModule { }
