import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { DialogConfirmComponent } from '../../shared/dialog-confirm/dialog-confirm.component';

import { ICar } from '../../models/icar';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  btnTxt: string = 'Salvar';

  constructor(
    private carsService: CarsService,
    private matDialog: MatDialog
    ) {}

  async createHandler(car : ICar) {
    await this.carsService.createCars(car).subscribe();
    this.openConfirmDialog();
  }

  openConfirmDialog() {
    this.matDialog.open(DialogConfirmComponent);
  }
}