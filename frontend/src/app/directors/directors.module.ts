import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorsRoutingModule } from './directors-routing.module';
import { DirectorsComponent } from './containers/diretores/diretores.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { DirectorFormComponent } from './components/diretor-form/diretor-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DirectorsComponent,
    DirectorFormComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    DirectorsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class DirectorsModule { }
