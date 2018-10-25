import { Component, OnInit, Input } from '@angular/core';
import { News } from '../modals/news';

@Component({
  selector: 'news-teaser-two',
  templateUrl: './news-teaser-two.component.html',
  styleUrls: ['./news-teaser-two.component.css']
})
export class NewsTeaserTwoComponent implements OnInit {
  @Input() news: News[];
  constructor() {}

  ngOnInit() {
    console.log(this.news);
  }
}
