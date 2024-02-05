import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CarsService } from '../../services/cars.service';

import { Car } from '../../models/car';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements AfterViewInit {
    
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

    cars = new MatTableDataSource<Car>(this.carsService.findAllCars());
    displayedColumns = ['id', 'model', 'manufacturer', 'year', 'color'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
      this.cars.paginator = this.paginator;
    }

    constructor(private carsService: CarsService) {
    }
}