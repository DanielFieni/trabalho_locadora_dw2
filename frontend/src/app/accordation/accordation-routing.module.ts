import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordationComponent } from './accordation/accordation.component';

const routes: Routes = [
  {path: '', component: AccordationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccordationRoutingModule { }
