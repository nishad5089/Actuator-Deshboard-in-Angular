import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApiStatusComponent} from './components/api-status/api-status.component';

const routes: Routes = [
  {
    path: '',
    component: ApiStatusComponent,
    data: {
      title: 'Status'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiStatusRoutingModule {}
