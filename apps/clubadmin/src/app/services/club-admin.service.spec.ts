import { TestBed } from '@angular/core/testing';

import { ClubAdminService } from './club-admin.service';

describe('ClubAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClubAdminService = TestBed.get(ClubAdminService);
    expect(service).toBeTruthy();
  });
});
