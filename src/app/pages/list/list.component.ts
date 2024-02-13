import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { manufacturers } from '../../data/manufacturers-data';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogCreateComponent } from '../../shared/dialog-create/dialog-create.component';
import { DialogEditComponent } from '../../shared/dialog-edit/dialog-edit.component';
import { MessageCreateComponent } from '../../shared/message-create/message-create.component';
import { MessageEditComponent } from '../../shared/message-edit/message-edit.component';
import { MessageDeleteComponent } from '../../shared/message-delete/message-delete.component';

import { CarsService } from '../../services/cars.service';

import { ICar } from '../../models/icar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
    
    manufacturers = manufacturers;

    filter: FormGroup;
    createCarsTable: FormGroup;
    updateCarsTable: FormGroup;

    isNewCarAdding: boolean = false;
    isEditing: boolean = false;
    editingCarId: number | null = null;

    cars!: MatTableDataSource<ICar>;
    displayedColumns = ['id', 'model', 'manufacturer', 'year', 'color', 'actions'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    
    listCars: ICar[] = [];
    totalElements!: number;
    pageIndex!: number;
    pageSize!: number;

    constructor(
      private carsService: CarsService,
      private matDialog: MatDialog,
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private matSnackBar: MatSnackBar,
      ) { 
        this.filter = this.formBuilder.group({
          model: [''],
          year: [''],
          color: [''],
          manufacturer: ['']
        });

        this.createCarsTable = this.formBuilder.group({
          model: ['', Validators.required],
          manufacturer: ['', Validators.required],
          year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
          color: ['', Validators.required]
        });

        this.updateCarsTable = this.formBuilder.group({
          model: ['', Validators.required],
          manufacturer: ['', Validators.required],
          year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
          color: ['', Validators.required]
        });
      }

    ngOnInit(): void {
      this.loadCars()
    }

    // Table Load

    loadCars(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10}) {
      this.carsService.findAllCars(pageEvent.pageIndex, pageEvent.pageSize).subscribe((carPage) => {
      this.listCars = carPage.content;
      this.totalElements = carPage.totalElements;
      this.cars = new MatTableDataSource<ICar>(this.listCars);

      this.paginator.length = this.totalElements;
      this.paginator.pageIndex = pageEvent.pageIndex;
      this.paginator.pageSize = pageEvent.pageSize;
      });
    }

    // Filters Buttons

    onSubmit() {
      const filterValues = this.filter.value;
      this.carsService.getCarFiltered(filterValues).subscribe(result => {
        this.listCars = result;
        this.cars = new MatTableDataSource<ICar>(this.listCars);
      });
    }

    onClear() {
      this.filter.reset();
      this.onSubmit();
    }

    // Dialogs Create and Edit

    openCreateDialog() {
      const dialogCreateRef: MatDialogRef<DialogCreateComponent> = this.matDialog.open(DialogCreateComponent);

      dialogCreateRef.afterClosed().subscribe(result => {
        if (result) {
          setTimeout(() => {this.loadCars()}, 200)
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

    // Edit Forms

    onEdit(car : ICar) {
      this.router.navigate(['edit', car.id], { relativeTo: this.route})
    }

    // Delete Directly From the Table

    onDelete(car: ICar) {
      this.carsService.deleteCars(car.id!).subscribe();
      setTimeout(() => {this.loadCars(), this.deleteSnackBar()}, 200)
    }

    // Table Create

    addNewCar() {
      this.isNewCarAdding = true;
    }

    saveNewCar(car: ICar) {
      this.carsService.createCars(car).subscribe();
      setTimeout(() => {this.resetNewCar(), this.loadCars(), this.createSnackBar()}, 200)
    }

    cancelNewCar() {
      this.resetNewCar();
    }

    resetNewCar() {
      this.isNewCarAdding = false;
      this.createCarsTable.reset();
    }

    // Table Edit

    cancelEdit() {
      this.isEditing = false;
      this.editingCarId = null;
      setTimeout(() => {this.loadCars()}, 100)
    }

    enableEditingMode(id: number) {
      this.isEditing = true;
      this.editingCarId = id;

      const editedCar = this.listCars.find(car => car.id === id);

      this.updateCarsTable.setValue({
        model: editedCar!.model,
        manufacturer: editedCar!.manufacturer,
        year: editedCar!.year,
        color: editedCar!.color
      })
    }

    saveEditedCar(id: number, car: ICar) {
      this.carsService.updateCars(id, car).subscribe();
      setTimeout(() => {this.isEditing = false, this.editingCarId = null, this.loadCars(), this.editSnackBar()}, 200)
    }

    // Snackbars

    createSnackBar() {
      this.matSnackBar.openFromComponent(MessageCreateComponent, {
        duration: 5000,
      });
    }

    editSnackBar() {
      this.matSnackBar.openFromComponent(MessageEditComponent, {
        duration: 5000,
      });
    }

    deleteSnackBar() {
      this.matSnackBar.openFromComponent(MessageDeleteComponent, {
        duration: 5000,
      });
    }
  }