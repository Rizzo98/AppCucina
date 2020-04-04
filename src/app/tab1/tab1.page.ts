import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public navCtrl: NavController,private db : DatabaseService) {    
  }

  goToNewCharacter(){
    this.navCtrl.navigateForward('/new-character');
  }

}
