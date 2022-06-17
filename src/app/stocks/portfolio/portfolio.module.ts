import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioPageRoutingModule } from './portfolio-routing.module';

import { PortfolioPage } from './portfolio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PortfolioPageRoutingModule
  ],
  declarations: [PortfolioPage]
})
export class PortfolioPageModule {}
