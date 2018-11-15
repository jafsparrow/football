import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSummaryViewTeaserComponent } from './news-summary-view-teaser.component';

describe('NewsSummaryViewTeaserComponent', () => {
  let component: NewsSummaryViewTeaserComponent;
  let fixture: ComponentFixture<NewsSummaryViewTeaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSummaryViewTeaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSummaryViewTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
