import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSummaryViewComponent } from './events-summary-view.component';

describe('EventsSummaryViewComponent', () => {
  let component: EventsSummaryViewComponent;
  let fixture: ComponentFixture<EventsSummaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsSummaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
