import { TestBed } from '@angular/core/testing';

import { LocalAdminService } from './local-admin.service';

describe('LocalAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalAdminService = TestBed.get(LocalAdminService);
    expect(service).toBeTruthy();
  });
});
