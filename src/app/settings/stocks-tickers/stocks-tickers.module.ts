import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StocksTickersPageRoutingModule } from './stocks-tickers-routing.module';

import { StocksTickersPage } from './stocks-tickers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StocksTickersPageRoutingModule
  ],
  declarations: [StocksTickersPage]
})
export class StocksTickersPageModule {}
