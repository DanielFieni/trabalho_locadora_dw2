import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { FilterRoutingModule } from './filter-routing.module';
import { FilterComponent } from './filter/filter.component';



@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    FilterRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MatGridListModule
  ]
})
export class FilterModule { }
