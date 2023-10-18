import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtoresRoutingModule } from './atores-routing.module';
import { AtoresComponent } from './containers/atores/atores.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { AtoresFormComponent } from './components/atores-form/atores-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AtoresComponent,
    AtoresFormComponent,
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    AtoresRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class AtoresModule { }
