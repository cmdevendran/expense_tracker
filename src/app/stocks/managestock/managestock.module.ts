import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagestockPageRoutingModule } from './managestock-routing.module';

import { ManagestockPage } from './managestock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagestockPageRoutingModule
  ],
  declarations: [ManagestockPage]
})
export class ManagestockPageModule {}
