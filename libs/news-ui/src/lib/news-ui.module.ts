import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@football/shared';
import { NewsDetailViewComponent } from './news-detail-view/news-detail-view.component';
import { NewsSummaryViewTeaserComponent } from './news-summary-view-teaser/news-summary-view-teaser.component';
import { NewsCardSummaryViewComponent } from './news-card-summary-view/news-card-summary-view.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [CommonModule, AngularFirestoreModule, RouterModule, SharedModule],
  declarations: [
    NewsDetailViewComponent,
    NewsSummaryViewTeaserComponent,
    NewsCardSummaryViewComponent
  ],
  exports: [
    NewsDetailViewComponent,
    NewsSummaryViewTeaserComponent,
    NewsCardSummaryViewComponent
  ]
})
export class NewsUiModule {}
