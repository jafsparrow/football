import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubTagsComponent } from './club-tags.component';

describe('ClubTagsComponent', () => {
  let component: ClubTagsComponent;
  let fixture: ComponentFixture<ClubTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
