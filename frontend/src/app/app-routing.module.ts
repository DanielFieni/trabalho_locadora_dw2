import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./accordation/accordation.module').then(m => m.AccordationModule)
  },
  {
    path: 'actors',
    loadChildren: () => import('./actors/actors.module').then(m => m.ActorsModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('./classes/classes.module').then(m => m.ClassesModule)
  },
  {
    path: 'directors',
    loadChildren: () => import('./directors/directors.module').then(m => m.DirectorsModule)
  },
  {
    path: 'titles',
    loadChildren: () => import('./titles/titles.module').then(m => m.TitlesModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'rents',
    loadChildren: () => import('./rents/rents.module').then(m => m.RentsModule)
  },
  {
    path: 'filters',
    loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
