import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { carsResolver } from './guards/cars.resolver';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'list', component: ListComponent},
  {path:'list/create', component: CreateComponent},
  {path:'list/edit/:id', component: EditComponent, resolve: { cars: carsResolver }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
