import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowitemsPageRoutingModule } from './showitems-routing.module';

import { ShowitemsPage } from './showitems.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowitemsPageRoutingModule
  ],
  declarations: [ShowitemsPage]
})
export class ShowitemsPageModule {}
