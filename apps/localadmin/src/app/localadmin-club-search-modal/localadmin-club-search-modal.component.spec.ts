import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaladminClubSearchModalComponent } from './localadmin-club-search-modal.component';

describe('LocaladminClubSearchModalComponent', () => {
  let component: LocaladminClubSearchModalComponent;
  let fixture: ComponentFixture<LocaladminClubSearchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaladminClubSearchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaladminClubSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
