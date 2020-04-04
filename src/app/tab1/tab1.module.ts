import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import {DatabaseService} from '../database.service'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {
  constructor(private db:DatabaseService){
    db.getRecipes((c)=>{
      console.log(c)
    },['Facile','Media','Difficile'],700,['Basso','Elevato'],300,['Farina 00'])
  }
}
