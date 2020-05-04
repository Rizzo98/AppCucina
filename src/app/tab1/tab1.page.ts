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

  search(){
    let diff = []
    if(this.difficulty==true){
      if(this.difficultyCheck[0]==true)
        diff.push('Molto facile')
      if(this.difficultyCheck[1]==true)
        diff.push('Facile')
      if(this.difficultyCheck[2]==true)
        diff.push('Media')
      if(this.difficultyCheck[3]==true)
        diff.push('Difficile')
      if(diff.length==0)
        diff=undefined  
    }else{
      diff=undefined
    }
    
    let costo = []
    if(this.cost==true){
      if(this.costCheck[0]==true)
        costo.push('Molto basso')
      if(this.costCheck[1]==true)
        costo.push('Basso')
      if(this.costCheck[2]==true)
        costo.push('Medio')
      if(this.costCheck[3]==true)
        costo.push('Elevato')
      if(costo.length==0)
        costo=undefined
    }else{
      costo=undefined
    }

    let cal = 0
    if(this.maxCalories==true)
      cal=this.maxCaloriesCheck
    else
      cal=undefined

    let time = 0
    if(this.maxTime==true)
      time=this.maxTimeCheck
    else
      time=undefined

    let ing = []
    if(this.ingredients==true){
      ing=this.ingredientList
      if(ing.length==0)
        ing=undefined
    }else{
      ing=undefined
    }
    
    if(diff==undefined && cal==undefined && costo==undefined && time ==undefined && ing==undefined){
      console.log("too much zio")
    }else{
      this.db.getRecipes((c)=>{
        console.log(c)
      },diff,cal,costo,time,ing)
    }

  }

}
