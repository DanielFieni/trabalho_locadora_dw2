import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./accordation/accordation.module').then(m => m.AccordationModule)
  },
  {
    path: 'atores',
    loadChildren: () => import('./atores/atores.module').then(m => m.AtoresModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('./classes/classes.module').then(m => m.ClassesModule)
  },
  {
    path: 'diretores',
    loadChildren: () => import('./diretores/diretores.module').then(m => m.DiretoresModule)
  },
  {
    path: 'titulos',
    loadChildren: () => import('./titulos/titulos.module').then(m => m.TitulosModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
