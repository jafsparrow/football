import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'football-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  numberNeeded= [1,2,6]
  constructor() { }

  ngOnInit() {
  }

}
