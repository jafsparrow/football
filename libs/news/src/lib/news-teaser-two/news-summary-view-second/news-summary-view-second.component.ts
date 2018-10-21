import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { News } from '../../news-list/news-list.component';

@Component({
  selector: 'news-summary-view-second',
  templateUrl: './news-summary-view-second.component.html',
  styleUrls: ['./news-summary-view-second.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsSummaryViewSecondComponent implements OnInit {
  @Input() news: News;
  constructor() { }

  ngOnInit() {

  }


   randomTagColor() {
    const color = ['#607D8B', '#FF3D00', '#E65100', '#43A047', '#0288D1' ,'#DD2C00', '#5D4037'];
    const index = Math.floor(Math.random() * 5) + 1 ;
    // console.log(index)
    return color[index];
  }
}
