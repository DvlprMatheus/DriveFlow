import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { carsResolver } from './cars.resolver';
import { ICar } from '../models/icar';
import { Observable } from 'rxjs';

describe('carsResolver', () => {
  const executeResolver: ResolveFn<Observable<ICar>> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => carsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
