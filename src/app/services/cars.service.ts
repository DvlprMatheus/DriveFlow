import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICar } from '../models/icar';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  apiUrl = `${environment.baseApiUrl}/cars`;

  constructor(private httpClient: HttpClient) {
  }

  // Listar todos os carros registrados.

  findAllCars(): Observable<ICar[]> {
    return this.httpClient.get<ICar[]>(`${this.apiUrl}/all`);
  }

  // Registrar um novo carro.

  createCars(car: ICar) {
    return this.httpClient.post<ICar>(`${this.apiUrl}/create`, car);
  }

  // Deletar um carro registrado.

  deleteCars(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/delete/${id}`);
  }

  // Filtrar os carros com os parâmetros informados pelo usuário.

  getCarFiltered(filterValues: any): Observable<ICar[]> {
    const params = this.buildQueryParams(filterValues);

    return this.httpClient.get<ICar[]>(`${this.apiUrl}${params}`);
  }

  // Tratamento de filtros vazios para evitar erro na requisição.

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
