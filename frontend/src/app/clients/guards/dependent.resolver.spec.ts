import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { dependentResolver } from './dependent.resolver';

describe('dependentResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => dependentResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
