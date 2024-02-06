import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  manufacturers = [
    {name: "Audi"},
    {name: "BMW"},
    {name: "Bughatti"},
    {name: "CAOA Chery"},
    {name: "Chevrolet"},
    {name: "Citroen"},
    {name: "Ferrari"},
    {name: "Fiat"},
    {name: "Ford"},
    {name: "Honda"},
    {name: "Hyundai"},
    {name: "JAC"},
    {name: "Jaguar"},
    {name: "Jeep"},
    {name: "Kia"},
    {name: "Lamborghini"},
    {name: "Land Hover"},
    {name: "Mercedez-Benz"},
    {name: "Mitsubishi"},
    {name: "Nissan"},
    {name: "Peugeot"},
    {name: "Porshe"},
    {name: "Renault"},
    {name: "Subaru"},
    {name: "Toyota"},
    {name: "Volkswagen"},
    {name: "Volvo"}
  ];

  dialog: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carsService: CarsService,
    private dialogRef: MatDialogRef<DialogComponent>
    ) {
    this.dialog = this.formBuilder.group({
      model: [null],
      manufacturer: [null],
      year: [null],
      color: [null]
    });
  }

  async onSubmit(){
    await this.carsService.createCars(this.dialog.value).subscribe();
    this.dialogRef.close(true);
  }

}
