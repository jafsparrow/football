import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'football-timeout-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavigationComponent implements OnInit {
  @Input() navConfig: Array<any>;
  @Output() linkItemClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onToggleClose() {
    this.linkItemClick.emit('selected');
  }
}
