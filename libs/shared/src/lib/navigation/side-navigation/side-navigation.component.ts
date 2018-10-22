import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SideNavOption } from '../../modal/side-nav. modal';

@Component({
  selector: 'football-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
  @Input() navConfig: Array<SideNavOption> = [
    {name: 'Club', route: '/club', icon: 'menu'},
    {name: 'News', route: '/News', icon: 'hotel'},

  ];
  @Output() linkItemClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onToggleClose() {
    this.linkItemClick.emit('selected');
  }

}
