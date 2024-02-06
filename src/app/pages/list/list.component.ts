import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DialogComponent } from '../../shared/dialog/dialog.component';

import { CarsService } from '../../services/cars.service';

import { Car } from '../../models/car';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
    
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

    filter: FormGroup;

    listCars: Car[] = [];

    cars!: MatTableDataSource<Car>;
    displayedColumns = ['id', 'model', 'manufacturer', 'year', 'color', 'actions'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      private carsService: CarsService,
      private matDialog: MatDialog,
      private formBuilder: FormBuilder
      ) { 
        this.filter = this.formBuilder.group({
          model: [''],
          year: [''],
          color: [''],
          manufacturer: ['']
        });
      }

    ngOnInit(): void {
      this.loadCars()
    }

    loadCars() {
      this.carsService.findAllCars().subscribe((items) => {
      this.listCars = items;
      this.cars = new MatTableDataSource<Car>(this.listCars);
      this.cars.paginator = this.paginator;
      });
    }

    onSubmit() {
      const filterValues = this.filter.value;
      this.carsService.getCarFiltered(filterValues).subscribe(result => {
        this.listCars = result;
        this.cars = new MatTableDataSource<Car>(this.listCars);
        this.cars.paginator = this.paginator;
      });
    }

    onClear() {
      this.filter.reset();
      this.onSubmit();
    }

    openDialog() {
      const dialogRef: MatDialogRef<DialogComponent> = this.matDialog.open(DialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadCars();
        }
      });
  }
}