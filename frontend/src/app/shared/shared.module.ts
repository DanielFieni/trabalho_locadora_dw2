import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from './components/information-dialog/information-dialog.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    InformationDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    InformationDialogComponent,
  ]
})
export class SharedModule { }
