import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ActorsRoutingModule } from './actors-routing.module';
import { ActorsFormComponent } from './components/atores-form/actors-form.component';
import { ActorsComponent } from './containers/atores/actors.component';


@NgModule({
  declarations: [
    ActorsComponent,
    ActorsFormComponent,
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ActorsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ActorsModule { }
