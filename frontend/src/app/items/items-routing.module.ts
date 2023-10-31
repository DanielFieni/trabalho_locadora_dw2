import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './containers/items/item.component';
import { ItemsFormComponent } from './componenets/items-form/items-form.component';
import { ItemResolver } from './guards/item.resolver';

const routes: Routes = [
  {path: '', component: ItemComponent},
  {path: 'new', component: ItemsFormComponent, resolve: {item: ItemResolver}},
  { path: 'edit/:id', component: ItemsFormComponent, resolve: {item: ItemResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
