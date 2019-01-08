import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfDetailComponent } from './turf-detail.component';

describe('TurfDetailComponent', () => {
  let component: TurfDetailComponent;
  let fixture: ComponentFixture<TurfDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurfDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurfDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
