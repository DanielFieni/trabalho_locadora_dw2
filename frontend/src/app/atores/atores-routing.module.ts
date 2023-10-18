import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtoresComponent } from './containers/atores/atores.component';
import { AtoresFormComponent } from './components/atores-form/atores-form.component';
import { AtorResolver } from './guards/ator.resolver';

const routes: Routes = [
  { path: '', component: AtoresComponent },
  { path: 'new', component: AtoresFormComponent, resolve: { ator: AtorResolver }},
  { path: 'edit/:id', component: AtoresFormComponent, resolve: { ator: AtorResolver }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtoresRoutingModule { }
