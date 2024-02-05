import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Car } from '../models/car';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  apiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {
  }

  findAllCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.apiUrl}/all`);
  }
}
