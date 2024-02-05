import { Injectable } from '@angular/core'
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor() {
  }

  findAllCars(): Car[] {
    return [
      {id: 1, model: 'Kar', manufacturer: 'Ford', year: 2015, color: 'Prata'},
      {id: 2, model: 'Camry', manufacturer: 'Toyota', year: 2022, color: 'Azul'},
      {id: 3, model: 'Mustang', manufacturer: 'Ford', year: 2021, color: 'Vermelho'},
      {id: 4, model: 'Golf', manufacturer: 'Volkswagen', year: 2020, color: 'Preto'},
      {id: 5, model: 'Civic', manufacturer: 'Honda', year: 2015, color: 'Branco'},
      {id: 5, model: 'Corvette', manufacturer: 'Chevrolet', year: 2021, color: 'Verde'},
      {id: 5, model: 'A3', manufacturer: 'Audi', year: 2021, color: 'Azul'},
      {id: 5, model: 'Kona', manufacturer: 'Hyundai', year: 2022, color: 'Prata'},
      {id: 5, model: 'C-Class', manufacturer: 'Mercedes-Benz', year: 2020, color: 'Prata'},
      {id: 5, model: 'Telluride', manufacturer: 'Kia', year: 2015, color: 'Marrom'},
      {id: 5, model: '911 Carrera', manufacturer: 'Porsche', year: 2015, color: 'Laranja'},
      {id: 5, model: 'F-Pace', manufacturer: 'Jaguar', year: 2020, color: 'Cinza'},
    ];
  }
}
