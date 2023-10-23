import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitulosRoutingModule } from './titulos-routing.module';
import { TituloComponent } from './containers/titulo/titulo.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TitulosFormComponent } from './components/titulos-form/titulos-form.component';


@NgModule({
  declarations: [
    TituloComponent,
    TitulosFormComponent
  ],
  imports: [
    CommonModule,
    TitulosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class TitulosModule { }
