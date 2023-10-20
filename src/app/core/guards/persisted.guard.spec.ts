import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { persistedGuard } from './persisted.guard';

describe('persistedGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => persistedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
