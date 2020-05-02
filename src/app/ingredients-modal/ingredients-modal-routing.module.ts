import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientsModalPage } from './ingredients-modal.page';

const routes: Routes = [
  {
    path: '',
    component: IngredientsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientsModalPageRoutingModule {}
