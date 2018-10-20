import { Component, OnInit, Input } from '@angular/core';
import { News } from '../../news-list/news-list.component';

@Component({
  selector: 'news-summary-view-second',
  templateUrl: './news-summary-view-second.component.html',
  styleUrls: ['./news-summary-view-second.component.css']
})
export class NewsSummaryViewSecondComponent implements OnInit {
  @Input() news: News;
  constructor() { }

  ngOnInit() {
  }

}
