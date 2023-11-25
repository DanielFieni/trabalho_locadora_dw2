import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentsRoutingModule } from './rents-routing.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RentComponent } from './rent/rent.component';


@NgModule({
  declarations: [
    RentComponent
  ],
  imports: [
    CommonModule,
    RentsRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class RentsModule { }
