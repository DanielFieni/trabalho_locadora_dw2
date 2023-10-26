import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TituloComponent } from './containers/titulo/titulo.component';
import { TitulosFormComponent } from './components/titulos-form/titulos-form.component';
import { tituloResolver } from './guards/titulo.resolver';

const routes: Routes = [
  {path: '', component: TituloComponent},
  {path: 'new', component: TitulosFormComponent, resolve: { titulo: tituloResolver }},
  {path: 'edit/:id', component: TitulosFormComponent, resolve: { titulo: tituloResolver }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TitulosRoutingModule { }
