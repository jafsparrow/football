import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfLandingComponent } from './turf-landing.component';

describe('TurfLandingComponent', () => {
  let component: TurfLandingComponent;
  let fixture: ComponentFixture<TurfLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurfLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurfLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
