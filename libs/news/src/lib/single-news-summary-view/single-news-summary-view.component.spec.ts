import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNewsSummaryViewComponent } from './single-news-summary-view.component';

describe('SingleNewsSummaryViewComponent', () => {
  let component: SingleNewsSummaryViewComponent;
  let fixture: ComponentFixture<SingleNewsSummaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleNewsSummaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleNewsSummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
