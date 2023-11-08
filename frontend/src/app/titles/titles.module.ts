import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { TitleFormComponent } from './components/titulos-form/title-form.component';
import { TitleComponent } from './containers/titulo/title.component';
import { TitlesRoutingModule } from './titles-routing.module';


@NgModule({
  declarations: [
    TitleComponent,
    TitleFormComponent
  ],
  imports: [
    CommonModule,
    TitlesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class TitlesModule { }
