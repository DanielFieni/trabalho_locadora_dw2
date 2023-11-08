import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { titleResolver } from './title.resolver';

describe('tituloResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => tituloResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
