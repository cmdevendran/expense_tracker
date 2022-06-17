import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagestockPage } from './managestock.page';

const routes: Routes = [
  {
    path: '',
    component: ManagestockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagestockPageRoutingModule {}
