import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'football-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
  @Input() navConfig: Array<any> = [
    {name: 'Club', route: '/club', icon: 'menu'},
    {name: 'News', route: '/News', icon: 'hotel'},

  ];
  @Output() menuClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onToggleClose() {
    this.menuClicked.emit('selected');
  }

}
