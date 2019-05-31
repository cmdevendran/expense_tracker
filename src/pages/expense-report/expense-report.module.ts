import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseReportPage } from './expense-report';

@NgModule({
  declarations: [
    ExpenseReportPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseReportPage),
  ],
})
export class ExpenseReportPageModule {}
