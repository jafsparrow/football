import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignClubadminComponent } from './assign-clubadmin.component';

describe('AssignClubadminComponent', () => {
  let component: AssignClubadminComponent;
  let fixture: ComponentFixture<AssignClubadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignClubadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignClubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
