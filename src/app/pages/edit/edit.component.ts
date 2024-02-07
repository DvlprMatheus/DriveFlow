import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ICar } from '../../models/icar';

import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  btnTxt: string = 'Editar';

  constructor(
    private carsService: CarsService,
    private router: Router
    ) {}

  editHandler(car : ICar) {
    this.carsService.updateCars(car.id!, car).subscribe();
    setTimeout(() => {
      this.router.navigate(['/list']);
    }, 100);
  }
}