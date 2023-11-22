import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { associateResolver } from './associate.resolver';

describe('associateResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => associateResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
