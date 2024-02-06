import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ICar } from '../../models/icar';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  @Input() btnTxt!: string;
  @Output() onSubmit = new EventEmitter<ICar>();

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

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location
    ) {
      this.form = this.formBuilder.group({
        model: ['', Validators.required],
        year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        color: ['', Validators.required],
        manufacturer: ['', Validators.required],
      });
    }

  submit(){
    this.onSubmit.emit(this.form.value);
  }

  onCancel(){
      this.location.back();
  }
}