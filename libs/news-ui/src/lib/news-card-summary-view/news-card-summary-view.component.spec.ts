import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardSummaryViewComponent } from './news-card-summary-view.component';

describe('NewsCardSummaryViewComponent', () => {
  let component: NewsCardSummaryViewComponent;
  let fixture: ComponentFixture<NewsCardSummaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCardSummaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardSummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
