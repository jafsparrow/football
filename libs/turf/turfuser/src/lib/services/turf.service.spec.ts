import { TestBed } from '@angular/core/testing';

import { TurfService } from './turf.service';

describe('TurfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TurfService = TestBed.get(TurfService);
    expect(service).toBeTruthy();
  });
});
