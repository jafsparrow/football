import { Component, OnInit, Input } from '@angular/core';
import { News } from '@football/shared';

@Component({
  selector: 'football-news-summary-view-teaser',
  templateUrl: './news-summary-view-teaser.component.html',
  styleUrls: ['./news-summary-view-teaser.component.css']
})
export class NewsSummaryViewTeaserComponent implements OnInit {
  @Input() news: News[];
  constructor() {}

  ngOnInit() {}
}
