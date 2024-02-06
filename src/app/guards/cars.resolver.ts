import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ICar } from '../models/icar';
import { CarsService } from '../services/cars.service';

export const carsResolver: ResolveFn<Observable<ICar>> = (route, state, 
  service: CarsService = inject(CarsService)) => {
  
    if (route.params?.['id']){
      return service.findByIdCars(route.params['id']);
    }

    return of({
      id: 0,
      model: '',
      manufacturer: '',
      year: 0,
      color: ''
    })
};
