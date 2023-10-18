import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiretoresRoutingModule } from './diretores-routing.module';
import { DiretoresComponent } from './containers/diretores/diretores.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { DiretorFormComponent } from './components/diretor-form/diretor-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DiretoresComponent,
    DiretorFormComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    DiretoresRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class DiretoresModule { }
