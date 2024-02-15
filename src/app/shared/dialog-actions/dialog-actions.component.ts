import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { manufacturers } from '../../data/manufacturers-data';
import { ICar } from '../../models/icar';
import { MessageComponent } from '../message/message.component';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-dialog-actions',
  templateUrl: './dialog-actions.component.html',
  styleUrl: './dialog-actions.component.css'
})
export class DialogActionsComponent implements OnInit {
  manufacturers = manufacturers;
  
  dialog: FormGroup;

  currentYear = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private carsService: CarsService,
    private dialogRef: MatDialogRef<DialogActionsComponent>,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public car: ICar | null
  ) {
    this.dialog = this.formBuilder.group({
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.max(this.currentYear), Validators.pattern(/^\d{4}$/)]],
      color: ['', Validators.required],
      manufacturer: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.car) {
      this.dialog.patchValue({
        model: this.car.model,
        manufacturer: this.car.manufacturer,
        year: this.car.year,
        color: this.car.color
      });
    }
  }

  onSubmit() {
    if (this.car) {
      this.carsService.updateCars(this.car.id!, this.dialog.value).subscribe(() => {
        this.openSnackBar("Carro editado com sucesso!");
        this.dialogRef.close(true);
      });
    } else {
      this.carsService.createCars(this.dialog.value).subscribe(() => {
        this.openSnackBar("Carro registrado com sucesso!");
        this.dialogRef.close(true);
      });
    }
  }

  openSnackBar(message: string) {
    const snackBarRef = this.matSnackBar.openFromComponent(MessageComponent, {
      duration: 5000
    });

    snackBarRef.instance.message = message;
  }
}
