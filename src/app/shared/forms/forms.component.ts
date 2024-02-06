import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { Car } from '../../models/car';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  @Input() btnTxt!: string;
  @Output() onSubmit = new EventEmitter<Car>();

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
      model: [null],
      manufacturer: [null],
      year: [null],
      color: [null]
    });
  }

  submit(){
    this.onSubmit.emit(this.form.value);
  }

  onCancel(){
      this.location.back();
  }
}
