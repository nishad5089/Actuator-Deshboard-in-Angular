import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeshboardComponent } from './components/deshboard/deshboard.component';

const routes: Routes = [
  {
    path: '',
    component: DeshboardComponent,
    data: {
      title: 'Deshboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartJSRoutingModule {}
