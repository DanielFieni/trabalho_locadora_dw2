import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordationRoutingModule } from './accordation-routing.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccordationComponent } from './accordation/accordation.component';


@NgModule({
  declarations: [
    AccordationComponent
  ],
  imports: [
    CommonModule,
    AccordationRoutingModule,
    AppMaterialModule,
    SharedModule,
    MatExpansionModule,
  ]
})
export class AccordationModule { }
