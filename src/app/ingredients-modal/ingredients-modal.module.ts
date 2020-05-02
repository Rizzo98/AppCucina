import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientsModalPageRoutingModule } from './ingredients-modal-routing.module';

import { IngredientsModalPage } from './ingredients-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientsModalPageRoutingModule
  ],
  declarations: [IngredientsModalPage],
  entryComponents: [IngredientsModalPage],
  exports: [IngredientsModalPage]
})
export class IngredientsModalPageModule {}
