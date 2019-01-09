import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayStatusComponent } from './day-status.component';

describe('DayStatusComponent', () => {
  let component: DayStatusComponent;
  let fixture: ComponentFixture<DayStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
