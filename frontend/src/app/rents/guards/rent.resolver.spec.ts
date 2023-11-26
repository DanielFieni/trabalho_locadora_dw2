import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { rentResolver } from './rent.resolver';

describe('rentResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => rentResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
