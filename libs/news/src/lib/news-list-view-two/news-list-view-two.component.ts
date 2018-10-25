import { Component, OnInit, Input } from '@angular/core';
import { News } from '../modals/news';

@Component({
  selector: 'news-list-view-two',
  templateUrl: './news-list-view-two.component.html',
  styleUrls: ['./news-list-view-two.component.css']
})
export class NewsListViewTwoComponent implements OnInit {
  testItem = [];
  @Input() newsToDisplay: News[];
  constructor() {
    for (let i = 0; i < 100; i++) {
      this.testItem.push(i);
    }
  }

  ngOnInit() {}
}
