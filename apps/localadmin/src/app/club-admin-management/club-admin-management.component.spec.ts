import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubAdminManagementComponent } from './club-admin-management.component';

describe('ClubAdminManagementComponent', () => {
  let component: ClubAdminManagementComponent;
  let fixture: ComponentFixture<ClubAdminManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubAdminManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubAdminManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
