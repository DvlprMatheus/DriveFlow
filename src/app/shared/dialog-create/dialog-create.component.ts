import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { manufacturers } from '../../data/manufacturers-data';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageCreateComponent } from '../message-create/message-create.component';

import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrl: './dialog-create.component.css'
})
export class DialogCreateComponent {

  manufacturers = manufacturers
  dialog: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carsService: CarsService,
    private dialogRef: MatDialogRef<DialogCreateComponent>,
    private matSnackBar: MatSnackBar
    ) {
      this.dialog = this.formBuilder.group({
        model: ['', Validators.required],
        year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        color: ['', Validators.required],
        manufacturer: ['', Validators.required],
      });
  }

  async onSubmit(){
    await this.carsService.createCars(this.dialog.value).subscribe();
    this.openSnackBar("Carro registrado com sucesso!");
    this.dialogRef.close(true);
  }

  openSnackBar(message: string) {
    this.matSnackBar.openFromComponent(MessageCreateComponent, {
      duration: 5000,
      data: { messageText: message }
    });
  }
}