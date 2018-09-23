
import { async, TestBed } from '@angular/core/testing';
import { NewsModule } from './news.module';

describe('NewsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NewsModule ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(NewsModule).toBeDefined();
  });
});
      