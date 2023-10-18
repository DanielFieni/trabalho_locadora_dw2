import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './containers/classes/classes.component';
import { ClassesFormComponent } from './components/classes-form/classes-form.component';
import { ClasseResolver } from './guards/classe.resolver';

const routes: Routes = [
  { path: '', component: ClassesComponent },
  { path: 'new', component: ClassesFormComponent, resolve: {classe: ClasseResolver} },
  { path: 'edit/:id', component: ClassesFormComponent, resolve: {classe: ClasseResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
