import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoutLoginComponent } from './timeout-login.component';

describe('TimeoutLoginComponent', () => {
  let component: TimeoutLoginComponent;
  let fixture: ComponentFixture<TimeoutLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeoutLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeoutLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
