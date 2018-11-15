
import { async, TestBed } from '@angular/core/testing';
import { NewsUiModule } from './news-ui.module';

describe('NewsUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NewsUiModule ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(NewsUiModule).toBeDefined();
  });
});
      