import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNewsComponent } from './home-news/home-news.component';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsLandingComponent } from './news-landing/news-landing.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsFullViewComponent } from './news-detail-view/news-detail-view.component';
import { NewsUiModule } from '@football/news-ui';
import { SharedModule } from '@football/shared';

const routes: Routes = [
  // { path: '', component: HomeNewsComponent },

  {
    path: '',
    component: NewsComponent,
    children: [
      { path: '', component: NewsLandingComponent },
      // { path: 'view/:id', component: NewsViewComponent },
      { path: 'list', component: NewsListComponent },
      { path: 'detail/:id', component: NewsFullViewComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NewsUiModule,
    SharedModule
  ],
  declarations: [
    HomeNewsComponent,
    NewsComponent,
    NewsLandingComponent,
    NewsFullViewComponent,
    NewsListComponent
  ]
})
export class NewsHomeModule {}
