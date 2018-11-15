import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSummaryTeaserComponent } from './events-summary-teaser.component';

describe('EventsSummaryTeaserComponent', () => {
  let component: EventsSummaryTeaserComponent;
  let fixture: ComponentFixture<EventsSummaryTeaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsSummaryTeaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSummaryTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
