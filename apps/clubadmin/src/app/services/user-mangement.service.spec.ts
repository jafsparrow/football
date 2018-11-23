import { TestBed } from '@angular/core/testing';

import { UserMangementService } from './user-mangement.service';

describe('UserMangementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserMangementService = TestBed.get(UserMangementService);
    expect(service).toBeTruthy();
  });
});
