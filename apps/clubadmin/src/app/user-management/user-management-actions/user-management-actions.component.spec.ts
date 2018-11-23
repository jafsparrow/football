import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementActionsComponent } from './user-management-actions.component';

describe('UserManagementActionsComponent', () => {
  let component: UserManagementActionsComponent;
  let fixture: ComponentFixture<UserManagementActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
