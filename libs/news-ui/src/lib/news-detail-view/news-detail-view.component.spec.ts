import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailViewComponent } from './news-detail-view.component';

describe('NewsDetailViewComponent', () => {
  let component: NewsDetailViewComponent;
  let fixture: ComponentFixture<NewsDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
