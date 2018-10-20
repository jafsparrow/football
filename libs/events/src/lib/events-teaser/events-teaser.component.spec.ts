import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTeaserComponent } from './events-teaser.component';

describe('EventsTeaserComponent', () => {
  let component: EventsTeaserComponent;
  let fixture: ComponentFixture<EventsTeaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsTeaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
