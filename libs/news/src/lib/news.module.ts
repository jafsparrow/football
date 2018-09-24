import { MaterialLibraryModule } from '@football/shared';

      import { NgModule } from '@angular/core';
      import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ClubTagsComponent } from './club-tags/club-tags.component';

export const newsRoutes: Route[] = [];
      @NgModule({
        imports: [
          CommonModule,
          RouterModule,
          MaterialLibraryModule
        ],
        declarations: [NewsListComponent, NewsDetailComponent, ClubTagsComponent],
        exports: [NewsListComponent, NewsDetailComponent, ClubTagsComponent]
      })
      export class NewsModule { }
