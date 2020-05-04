import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-ingredients-modal',
  templateUrl: './ingredients-modal.page.html',
  styleUrls: ['./ingredients-modal.page.scss'],
})
export class IngredientsModalPage implements OnInit {

  ingredients:any[]
  filtered:any[]
  selected:Array<string>
  addedNow:Array<string>

  constructor(public modalCtrl: ModalController,public navParams: NavParams) {
    this.addedNow = []
    this.ingredients = this.navParams.get('ingredients')
    this.filtered = this.ingredients
    this.selected = this.navParams.get('selected')
  }

  ngOnInit() {
  }

  goBack(){
    this.selected=this.selected.filter((v)=>{return this.addedNow.indexOf(v)==-1})
    this.modalCtrl.dismiss({'data':this.selected})
  }

  confirm(){
    this.modalCtrl.dismiss({'data':this.selected})
  }

  filterList(e){
    this.filtered = this.ingredients
    const searchTerm = e.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.filtered = this.filtered.filter(currentGoal => {
      if (currentGoal.name && searchTerm) {
        if (currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  addIngredient(e,name){
    let checked = e.detail.checked
    if(checked && this.selected.indexOf(name)==-1){
      this.addedNow.push(name)
      this.selected.push(name)
    }else if(!checked && this.selected.indexOf(name)!=-1){
      this.selected=this.selected.filter((v)=>{return v!=name})
    }
  }

  elementInList(name){
    return this.selected.indexOf(name)!=-1
  }
}
