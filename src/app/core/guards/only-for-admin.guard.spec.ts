import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onlyForLoggedIdGuard } from './only-for-logged-in.guard';

describe('onlyForAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => onlyForLoggedIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
