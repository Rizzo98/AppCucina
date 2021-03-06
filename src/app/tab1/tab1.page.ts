import { Component } from '@angular/core';
import {DatabaseService} from '../database.service'
import { NavController,ModalController } from '@ionic/angular';
import { IngredientsModalPage } from '../ingredients-modal/ingredients-modal.page';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-tab1',
  animations:[
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-70%)', opacity: 0}),
          animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0%)', opacity: 1}),
          animate('250ms', style({transform: 'translateX(-70%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  difficulty:boolean
  maxCalories:boolean
  cost:boolean
  maxTime:boolean
  ingredients:boolean
  noResearch:boolean
  
  difficultyCheck:Array<boolean>
  costCheck:Array<boolean>
  maxCaloriesCheck:number
  maxTimeCheck:number

  ingredientList : any
  selectedIngredients : any
  loadingIngredient:boolean

  modal:any

  constructor(public navCtrl: NavController,private db : DatabaseService, public modalCtrl: ModalController) {  
    this.difficulty=false  
    this.maxCalories=false
    this.cost=false
    this.maxTime=false
    this.ingredients=false

    this.difficultyCheck = [false,false,false,false]
    this.costCheck = [false,false,false,false]
    this.maxCaloriesCheck=100
    this.maxTimeCheck=10

    this.ingredientList = []
    this.selectedIngredients = []
    this.loadingIngredient=false
    this.noResearch=false
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
      this.loadingIngredient=false
      this.db.getIngredients((i)=>{
        this.loadingIngredient=true
        this.ingredientList=i
        this.presentModal()
      })
    }else
      this.presentModal()
  }

  async presentModal() {
    this.modal = await this.modalCtrl.create({component:IngredientsModalPage,componentProps:{'ingredients':this.ingredientList,'selected':this.selectedIngredients}});
    this.modal.onDidDismiss().then((d)=>{
      this.presentModal()
      this.selectedIngredients=d.data.data      
    });
  }

  async present(){
    return await this.modal.present()
  }

  removeIngredient(i){
    this.selectedIngredients = this.selectedIngredients.filter((v)=>{return v!=i})
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
      ing=this.selectedIngredients
      if(ing.length==0)
        ing=undefined
    }else{
      ing=undefined
    }

    if(diff==undefined && cal==undefined && costo==undefined && time ==undefined && ing==undefined){
      this.noResearch = !this.noResearch  
      setTimeout(()=>{
        this.noResearch = !this.noResearch
      },1000)
    }else{
      this.db.getRecipes((c)=>{
        this.navCtrl.navigateForward('/recipes-list',{ queryParams: { recipes :  JSON.stringify(c) } })
      },diff,cal,costo,time,ing)
    }

  }

}
