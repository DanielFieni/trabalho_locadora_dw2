import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientComponent } from './client/client.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { AssociateFormComponent } from './components/associate-form/associate-form.component';
import { AssociateComponent } from './containers/associate/associate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientComponent,
    AssociateComponent,
    AssociateFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ClientsModule { }
