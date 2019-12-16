import { async, TestBed } from '@angular/core/testing';
import { BootcampUiModule } from './bootcamp-ui.module';

describe('BootcampUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BootcampUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BootcampUiModule).toBeDefined();
  });
});
