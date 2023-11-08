import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorFormComponent } from './components/diretor-form/diretor-form.component';
import { DirectorsComponent } from './containers/diretores/diretores.component';
import { DirectorResolver } from './guards/director.resolver';

const routes: Routes = [
  { path: '', component: DirectorsComponent },
  { path: 'new', component: DirectorFormComponent, resolve: {director: DirectorResolver} },
  { path: 'edit/:id', component: DirectorFormComponent, resolve: {director: DirectorResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorsRoutingModule { }
