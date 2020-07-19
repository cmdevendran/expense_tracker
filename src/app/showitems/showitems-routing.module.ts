import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowitemsPage } from './showitems.page';

const routes: Routes = [
  {
    path: '',
    component: ShowitemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowitemsPageRoutingModule {}
