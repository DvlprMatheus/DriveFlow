import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DialogCreateComponent } from '../../shared/dialog-create/dialog-create.component';
import { DialogEditComponent } from '../../shared/dialog-edit/dialog-edit.component';

import { CarsService } from '../../services/cars.service';

import { ICar } from '../../models/icar';

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

    listCars: ICar[] = [];

    cars!: MatTableDataSource<ICar>;
    displayedColumns = ['id', 'model', 'manufacturer', 'year', 'color', 'actions'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      private carsService: CarsService,
      private matDialog: MatDialog,
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute
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
      this.cars = new MatTableDataSource<ICar>(this.listCars);
      setTimeout(() => {this.cars.paginator = this.paginator}, 100)
      });
    }

    onSubmit() {
      const filterValues = this.filter.value;
      this.carsService.getCarFiltered(filterValues).subscribe(result => {
        this.listCars = result;
        this.cars = new MatTableDataSource<ICar>(this.listCars);
        this.cars.paginator = this.paginator;
      });
    }

    onClear() {
      this.filter.reset();
      this.onSubmit();
    }

    openCreateDialog() {
      const dialogCreateRef: MatDialogRef<DialogCreateComponent> = this.matDialog.open(DialogCreateComponent);

      dialogCreateRef.afterClosed().subscribe(result => {
        if (result) {
          setTimeout(() => {this.loadCars()}, 100)
        }
      });
    }

    openEditDialog(car: ICar) {
      const dialogEditRef: MatDialogRef<DialogEditComponent> = this.matDialog.open(DialogEditComponent, {
        data: car
      });

      dialogEditRef.afterClosed().subscribe(result => {
        if (result) {
          setTimeout(() => {this.loadCars()}, 100)
        }
      });
    }

    onEdit(car : ICar) {
      this.router.navigate(['edit', car.id], { relativeTo: this.route})
    }

    onDelete(car: ICar) {
      this.carsService.deleteCars(car.id!).subscribe();
      setTimeout(() => {this.loadCars()}, 100)
    }
}