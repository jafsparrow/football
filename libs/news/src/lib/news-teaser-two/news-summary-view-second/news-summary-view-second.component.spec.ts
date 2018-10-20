import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSummaryViewSecondComponent } from './news-summary-view-second.component';

describe('NewsSummaryViewSecondComponent', () => {
  let component: NewsSummaryViewSecondComponent;
  let fixture: ComponentFixture<NewsSummaryViewSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSummaryViewSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSummaryViewSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
