import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpreportPage } from './expreport.page';

const routes: Routes = [
  {
    path: '',
    component: ExpreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpreportPageRoutingModule {}
