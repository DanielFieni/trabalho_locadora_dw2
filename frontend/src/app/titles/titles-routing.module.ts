import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleFormComponent } from './components/titulos-form/title-form.component';
import { TitleComponent } from './containers/titulo/title.component';
import { titleResolver } from './guards/title.resolver';

const routes: Routes = [
  {path: '', component: TitleComponent},
  {path: 'new', component: TitleFormComponent, resolve: { title: titleResolver }},
  {path: 'edit/:id', component: TitleFormComponent, resolve: { title: titleResolver }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TitlesRoutingModule { }
