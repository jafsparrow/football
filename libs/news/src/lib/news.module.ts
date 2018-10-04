import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialLibraryModule } from '@football/shared';

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


export const newsRoutes: Route[] = [
  {
    path: '',
    component: NewsListComponent
  },
  {
    path: 'add',
    component: AddNewsComponent
  }
];
      @NgModule({
        imports: [
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          RouterModule.forChild(newsRoutes),
          MaterialLibraryModule,
          AngularFireStorageModule
        ],
        declarations: [NewsListComponent, NewsDetailComponent, ClubTagsComponent, AddNewsComponent],
        exports: [NewsListComponent, NewsDetailComponent, ClubTagsComponent],
        providers: [NewsService, ClubDetailsService]
      })
      export class NewsModule { }
