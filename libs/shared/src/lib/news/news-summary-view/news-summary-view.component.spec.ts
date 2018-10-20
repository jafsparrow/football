import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSummaryViewComponent } from './news-summary-view.component';

describe('NewsSummaryViewComponent', () => {
  let component: NewsSummaryViewComponent;
  let fixture: ComponentFixture<NewsSummaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSummaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
