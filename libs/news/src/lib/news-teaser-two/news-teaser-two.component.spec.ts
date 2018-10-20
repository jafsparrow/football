import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTeaserTwoComponent } from './news-teaser-two.component';

describe('NewsTeaserTwoComponent', () => {
  let component: NewsTeaserTwoComponent;
  let fixture: ComponentFixture<NewsTeaserTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsTeaserTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTeaserTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
