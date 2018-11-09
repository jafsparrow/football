
import { async, TestBed } from '@angular/core/testing';
import { ClubsModule } from './clubs.module';

describe('ClubsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ClubsModule ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(ClubsModule).toBeDefined();
  });
});
      