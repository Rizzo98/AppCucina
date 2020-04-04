import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, VirtualTimeScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  recipes : Observable<any[]>;

  constructor(private db: AngularFirestore) {}
  
  list = {'A':null,'B':null,'C':null,'D':null,'E':null}
  

  getRecipes(callback,difficulty?:Array<string>, maxCalories?:number, cost?:Array<string>, maxTime?:number, ingredients?:Array<string>){ //TODO
    Promise.all([this.a(difficulty),this.b(maxCalories),this.c(cost),this.d(maxTime),this.e(ingredients)]).then(()=>{
      let allLists = Object.values(this.list).filter(x=>x!=null)
      let recipesNames = allLists.map(x=>x.map(n=>n=n.titolo)).reduce((a, b) => a.filter(c => b.includes(c)))
      console.log(recipesNames)
      let recipes = allLists.map(x=>x.filter(y=>recipesNames.includes(y.titolo)))[0]
      callback(recipes)
    })
  } 

  a = (difficulty)=>{
    return new Promise((resolve,reject)=>{
      this.getRecipesByDifficulty(difficulty,(r)=>{
        this.list['A'] = r
        resolve()
      })
    })
  }

  b = (maxCalories)=>{
    return new Promise((resolve,reject)=>{
      this.getRecipesByCalories(maxCalories,(r)=>{
        this.list['B'] = r
        resolve()
      })
    })
  }

  c = (cost)=>{
    return new Promise((resolve,reject)=>{
      this.getRecipesByCost(cost,(r)=>{
        this.list['C'] = r
        resolve()
      })
    })
  }

  d = (maxTime)=>{
    return new Promise((resolve,reject)=>{
      this.getRecipesByTime(maxTime,(r)=>{
        this.list['D'] = r
        resolve()
      })
    })
  }

  e = (ingredients)=>{
    return new Promise((resolve,reject)=>{
      this.getRecipesByIngredients(ingredients,(r)=>{
        this.list['E'] = r
        resolve()
      })
    })
  }



  getRecipesByDifficulty(difficulty,callback){
    if(difficulty!=undefined){
      this.recipes = this.db.collection<any>('Ricette',ref=> ref.where('difficoltà','in',difficulty)).valueChanges()
      this.recipes.subscribe(res=>callback(res),err =>console.log(err))
    }else{
      callback(null)
    }

  }

  getRecipesByCalories(maxCalories,callback){
    if(maxCalories!=undefined){
      this.recipes = this.db.collection<any>('Ricette',ref=> ref.where('calorie','<=',maxCalories)).valueChanges()
      this.recipes.subscribe(res=>callback(res),err =>console.log(err))
    }else{
      callback(null)
    }
    
  }

  getRecipesByCost(cost,callback){
    if(cost!=undefined){
      this.recipes = this.db.collection<any>('Ricette',ref=> ref.where('costo','in',cost)).valueChanges()
      this.recipes.subscribe(res=>callback(res),err =>console.log(err))
    }else{
      callback(null)
    }
    
  }

  getRecipesByTime(maxTime,callback){
    if(maxTime!=undefined){
      this.recipes = this.db.collection<any>('Ricette',ref=> ref.where('totalTime','<=',maxTime)).valueChanges()
      this.recipes.subscribe(res=>callback(res),err =>console.log(err))
    }else{
      callback(null)
    }

  }

  getRecipesByIngredients(ingredients,callback){
    if(ingredients!=undefined){
      this.recipes = this.db.collection<any>('Ricette',ref=> ref.where('listaIngredienti','array-contains-any',ingredients)).valueChanges()  //todo
      this.recipes.subscribe(res=>callback(res),err =>console.log(err))
    }else{
      callback(null)
    }

  }

  // provaUpdate(){
  //   this.db.collection<any>('Ricette').get().forEach((i)=>{
  //     return i.docs.map(m => {
  //       let diff = m.data()['difficoltà']
  //       let right = Object.keys(diff).filter((k)=>{return diff[k]==true})[0]
  //       console.log(right)
  //       //let costoarray = {'Molto basso':false,'Basso':false,'Medio':false,'Difficile':false,'Elevato':false}
  //       //costoarray[m.data()['costo']]=true
        
  //       return this.db.doc(`Ricette/${m.id}`).update({'difficoltà':right});
  //   });
  //   })
  // }
 
}