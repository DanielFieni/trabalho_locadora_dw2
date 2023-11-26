import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentComponent } from './containers/rent/rent.component';
import { RentFormComponent } from './components/rent-form/rent-form.component';
import { RentResolver } from './guards/rent.resolver';

const routes: Routes = [
  { path: '', component: RentComponent },
  { path: 'new', component: RentFormComponent, resolve: { rent: RentResolver } },
  { path: 'edit/:id', component: RentFormComponent, resolve: { rent: RentResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentsRoutingModule { }
