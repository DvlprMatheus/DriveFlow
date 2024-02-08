import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ICar } from '../../models/icar';
import { MessageEditComponent } from '../../shared/message-edit/message-edit.component';

import { CarsService } from '../../services/cars.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  btnTxt: string = 'Editar';

  constructor(
    private carsService: CarsService,
    private router: Router,
    private matSnackBar: MatSnackBar
    ) {}

  editHandler(car : ICar) {
    this.carsService.updateCars(car.id!, car).subscribe();
    setTimeout(() => {
      this.openSnackBar();
      this.router.navigate(['/list']);
    }, 100);
  }

  openSnackBar() {
    this.matSnackBar.openFromComponent(MessageEditComponent, {
      duration: 5000,
    });
  }
}