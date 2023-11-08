import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { directorResolver } from './director.resolver';

describe('diretorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => directorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
