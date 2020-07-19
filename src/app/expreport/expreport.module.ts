import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpreportPageRoutingModule } from './expreport-routing.module';

import { ExpreportPage } from './expreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExpreportPageRoutingModule
  ],
  declarations: [ExpreportPage]
})
export class ExpreportPageModule {}
