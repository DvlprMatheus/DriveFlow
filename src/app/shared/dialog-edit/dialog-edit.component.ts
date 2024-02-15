import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { manufacturers } from '../../data/manufacturers-data';

import { ICar } from '../../models/icar';
import { MessageComponent } from '../message/message.component';

import { CarsService } from '../../services/cars.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.css'
})
export class DialogEditComponent implements OnInit {

  manufacturers = manufacturers;

  dialog: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carsService: CarsService,
    private dialogRef: MatDialogRef<DialogEditComponent>,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public car: ICar
    ) {
      this.dialog = this.formBuilder.group({
        model: ['', Validators.required],
        year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        color: ['', Validators.required],
        manufacturer: ['', Validators.required],
      });
  }

  ngOnInit(): void {
    this.dialog.setValue({
      model: this.car.model,
      manufacturer: this.car.manufacturer,
      year: this.car.year,
      color: this.car.color
    })
  }

  onSubmit(){
    this.carsService.updateCars(this.car.id!, this.dialog.value).subscribe();
    this.openSnackBar();
    this.dialogRef.close(true);
  }

  openSnackBar() {
    const snackBarRef = this.matSnackBar.openFromComponent(MessageComponent, {
      duration: 5000
    });

    snackBarRef.instance.message = "Carro editado com sucesso!";
  }
}
