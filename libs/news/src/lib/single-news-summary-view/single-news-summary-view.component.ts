import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'news-single-summary-view',
  templateUrl: './single-news-summary-view.component.html',
  styleUrls: ['./single-news-summary-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleNewsSummaryViewComponent implements OnInit {

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
