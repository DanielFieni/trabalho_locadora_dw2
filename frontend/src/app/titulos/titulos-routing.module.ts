import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TituloComponent } from './containers/titulo/titulo.component';

const routes: Routes = [
  {path: '', component: TituloComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TitulosRoutingModule { }
