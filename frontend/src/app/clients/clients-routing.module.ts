import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { AssociateFormComponent } from './components/associate-form/associate-form.component';
import { AssociateResolver } from './guards/associate.resolver';

const routes: Routes = [
  {path: "", component: ClientComponent},
  {path: "associates/new", component: AssociateFormComponent, resolve: {associate: AssociateResolver}},
  {path: "associates/edit/:numInscription", component: AssociateFormComponent, resolve: {associate: AssociateResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
