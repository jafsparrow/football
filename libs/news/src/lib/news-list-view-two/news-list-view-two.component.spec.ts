import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListViewTwoComponent } from './news-list-view-two.component';

describe('NewsListViewTwoComponent', () => {
  let component: NewsListViewTwoComponent;
  let fixture: ComponentFixture<NewsListViewTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListViewTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListViewTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
