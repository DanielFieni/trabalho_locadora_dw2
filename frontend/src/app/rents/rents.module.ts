import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { RentComponent } from './containers/rent/rent.component';
import { RentsRoutingModule } from './rents-routing.module';
import { RentFormComponent } from './components/rent-form/rent-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    RentComponent,
    RentFormComponent
  ],
  imports: [
    CommonModule,
    RentsRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class RentsModule { }
