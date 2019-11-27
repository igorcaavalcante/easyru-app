import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Homepage2PageRoutingModule } from './homepage2-routing.module';

import { Homepage2Page } from './homepage2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Homepage2PageRoutingModule
  ],
  declarations: [Homepage2Page]
})
export class Homepage2PageModule {}
