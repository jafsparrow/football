import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLandingComponent } from './news-landing.component';

describe('NewsLandingComponent', () => {
  let component: NewsLandingComponent;
  let fixture: ComponentFixture<NewsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
