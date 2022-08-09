import { TestBed } from '@angular/core/testing';

import { UnderwriterGuard } from './underwriter.guard';

describe('UnderwriterGuard', () => {
  let guard: UnderwriterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnderwriterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
