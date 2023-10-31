import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemComponent } from './containers/items/item.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemsFormComponent } from './componenets/items-form/items-form.component';


@NgModule({
  declarations: [
    ItemComponent,
    ItemsFormComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ItemsModule { }
