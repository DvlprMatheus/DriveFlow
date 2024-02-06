import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Car } from '../models/car';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  apiUrl = `${environment.baseApiUrl}/cars`;

  constructor(private httpClient: HttpClient) {
  }

  findAllCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.apiUrl}/all`);
  }

  createCars(car: Car) {
    return this.httpClient.post<Car>(`${this.apiUrl}/create`, car);
  }

  getCarFiltered(filterValues: any): Observable<Car[]> {
    const params = this.buildQueryParams(filterValues);

    return this.httpClient.get<Car[]>(`${this.apiUrl}${params}`);
  }

  // Tratamento de filtros vazios.

  private buildQueryParams(filterValues: any): string {
    let queryParams = new HttpParams();

    for (const key in filterValues) {
      if (filterValues.hasOwnProperty(key) && filterValues[key]) {
        queryParams = queryParams.set(key, filterValues[key]);
      }
    }

    return queryParams.toString() ? `?${queryParams.toString()}` : '';
  }

}
