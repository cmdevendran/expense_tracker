import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripReportPage } from './trip-report';

@NgModule({
  declarations: [
    TripReportPage,
  ],
  imports: [
    IonicPageModule.forChild(TripReportPage),
  ],
})
export class TripReportPageModule {}
