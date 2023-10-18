import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './containers/classes/classes.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ClassesFormComponent } from './components/classes-form/classes-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassesFormComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ClassesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ClassesModule { }
