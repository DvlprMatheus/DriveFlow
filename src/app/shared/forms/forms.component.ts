import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { manufacturers } from '../../data/manufacturers-data';
import { ICar } from '../../models/icar';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {
  @Input() btnTxt!: string;
  @Output() onSubmit = new EventEmitter<ICar>();

  manufacturers = manufacturers;

  form: FormGroup;

  currentYear = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute
    ) {
      this.form = this.formBuilder.group({
        id: [''],
        model: ['', Validators.required],
        year: ['', [Validators.required, Validators.max(this.currentYear), Validators.pattern(/^\d{4}$/)]],
        color: ['', Validators.required],
        manufacturer: ['', Validators.required],
      });
    }

  ngOnInit(): void {
      const cars: ICar = this.route.snapshot.data['cars'];
      this.form.setValue({
        id: cars.id,
        model: cars.model,
        manufacturer: cars.manufacturer,
        year: cars.year,
        color: cars.color
      })
  }

  submit(){
    this.onSubmit.emit(this.form.value);
  }

  onCancel(){
      this.location.back();
  }
}