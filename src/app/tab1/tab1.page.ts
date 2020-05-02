import { Component } from '@angular/core';
import {DatabaseService} from '../database.service'
import { NavController,ModalController } from '@ionic/angular';
import { IngredientsModalPage } from '../ingredients-modal/ingredients-modal.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  difficulty:boolean
  maxCalories:boolean
  cost:boolean
  maxTime:boolean
  ingredients:boolean
  
  difficultyCheck:Array<boolean>
  costCheck:Array<boolean>
  maxCaloriesCheck:number
  maxTimeCheck:number

  ingredientList : any
  selectedIngredients : any

  constructor(public navCtrl: NavController,private db : DatabaseService, public modalCtrl: ModalController) {  
    this.difficulty=false  
    this.maxCalories=false
    this.cost=false
    this.maxTime=false
    this.ingredients=false

    this.difficultyCheck = [false,false,false,false]
    this.costCheck = [false,false,false,false]
    this.maxCaloriesCheck=0
    this.maxTimeCheck=0

    this.ingredientList = []
    this.selectedIngredients = []

    // db.getRecipes((c)=>{
    //   console.log(c)
    // },['Facile'],600,['Basso','Molto basso'],60,undefined)
  }

  checkDifficulty(e){
    this.difficulty = e.detail.checked
  }

  checkMaxCalories(e){
    this.maxCalories = e.detail.checked
  }

  checkCost(e){
    this.cost = e.detail.checked
  }

  checkMaxTime(e){
    this.maxTime = e.detail.checked
  }

  checkIngredients(e){
    this.ingredients = e.detail.checked
    if(this.ingredients==true && this.ingredientList.length==0){
      this.db.getIngredients((i)=>{
        this.ingredientList=i
      })
    }else{

    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({component:IngredientsModalPage,componentProps:{'ingredients':this.ingredientList,'selected':this.selectedIngredients}});
    modal.onDidDismiss().then((d)=>{
      this.selectedIngredients=d.data.data
    });
    return await modal.present();
  }

  setDifficulty(e,d){
    this.difficultyCheck[d] = e.detail.checked
  }

  setCost(e,d){
    this.costCheck[d] = e.detail.checked
  }

  setMaxCalories(e){
    this.maxCaloriesCheck = e.detail.value
  }

  setMaxTime(e){
    this.maxTimeCheck = e.detail.value
  }

}
