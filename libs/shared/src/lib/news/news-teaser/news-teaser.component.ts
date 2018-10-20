import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'football-news-teaser',
  templateUrl: './news-teaser.component.html',
  styleUrls: ['./news-teaser.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('*=> *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('0.5s ease-in', keyframes([
            // style({opacity: 0, transform: 'translateY(-35px)', offset: 0}),
            // style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            // style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
            style({opacity: 0, transform: 'scale(0)', offset: 0}),
            style({opacity: .5, transform: 'scale(0.5)',  offset: 0.3}),
            style({opacity: 1, transform: 'scale(1)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])]
  })

export class NewsTeaserComponent implements OnInit, AfterViewInit {

  @Input('news') news;
  @Input() teaserTitle;
  @Input() isLoading;
  constructor() { }

  ngOnInit() {
    console.log('from the news teaser component');
    console.log(this.news);
  }

  ngAfterViewInit(): void {
    console.log('after view init')
    console.log(this.news);
  }




}
