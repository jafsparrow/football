
import { async, TestBed } from '@angular/core/testing';
import { EventUiModule } from './event-ui.module';

describe('EventUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EventUiModule ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(EventUiModule).toBeDefined();
  });
});
      