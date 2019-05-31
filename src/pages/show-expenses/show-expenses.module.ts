import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowExpensesPage } from './show-expenses';

@NgModule({
  declarations: [
    ShowExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowExpensesPage),
  ],
})
export class ShowExpensesPageModule {}
