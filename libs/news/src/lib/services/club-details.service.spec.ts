import { TestBed } from '@angular/core/testing';

import { ClubDetailsService } from './club-details.service';

describe('ClubDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClubDetailsService = TestBed.get(ClubDetailsService);
    expect(service).toBeTruthy();
  });
});
