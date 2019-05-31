import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeTripsPage } from './office-trips';

@NgModule({
  declarations: [
    OfficeTripsPage,
  ],
  imports: [
    IonicPageModule.forChild(OfficeTripsPage),
  ],
})
export class OfficeTripsPageModule {}
