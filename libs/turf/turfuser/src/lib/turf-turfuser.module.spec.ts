import { async, TestBed } from '@angular/core/testing';
import { TurfTurfuserModule } from './turf-turfuser.module';

describe('TurfTurfuserModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TurfTurfuserModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TurfTurfuserModule).toBeDefined();
  });
});
