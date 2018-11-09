import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubRequestComponent } from './club-request.component';

describe('ClubRequestComponent', () => {
  let component: ClubRequestComponent;
  let fixture: ComponentFixture<ClubRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
