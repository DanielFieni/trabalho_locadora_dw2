import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsFormComponent } from './components/atores-form/actors-form.component';
import { ActorsComponent } from './containers/atores/actors.component';
import { AtorResolver } from './guards/actor.resolver';

const routes: Routes = [
  { path: '', component: ActorsComponent },
  { path: 'new', component: ActorsFormComponent, resolve: { ator: AtorResolver }},
  { path: 'edit/:id', component: ActorsFormComponent, resolve: { ator: AtorResolver }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule { }
