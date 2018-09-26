import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'football-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() menuClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  openSideNav(){
    this.menuClicked.emit('opened');
  }

}
