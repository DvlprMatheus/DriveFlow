import { Component } from '@angular/core';

import { ICar } from '../../models/icar';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  btnTxt: string = 'Salvar';

  constructor(private carsService: CarsService) {}

  async createHandler(car : ICar) {
    
  await this.carsService.createCars(car).subscribe();
  }
}