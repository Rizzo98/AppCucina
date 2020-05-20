import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  recipes : Observable<any[]>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {}
  
  list = {'A':null,'B':null,'C':null,'D':null,'E':null}

  getRecipes(callback,difficulty?:Array<string>, maxCalories?:number, cost?:Array<string>, maxTime?:number, ingredients?:Array<string>){
    Promise.all([this.a(difficulty),this.b(maxCalories),this.c(cost),this.d(maxTime),this.e(ingredients)]).then(()=>{
      let allLists = Object.values(this.list).filter(x=>x!=null)
      let recipesNames = allLists.map(x=>x.map(n=>n=n.titolo)).reduce((a, b) => a.filter(c => b.includes(c)))
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
      this.recipes = this.db.collection<any>('Ricette2',ref=> ref.where('difficoltà','in',difficulty)).valueChanges()
      this.recipes.subscribe(res=>callback(res),err =>console.log(err))
    }else{
      callback(null)
    }

  }

  getRecipesByCalories(maxCalories,callback){
    if(maxCalories!=undefined){
      this.recipes = this.db.collection<any>('Ricette2',ref=> ref.where('calorie','<=',maxCalories)).valueChanges()
      this.recipes.subscribe(res=>callback(res),err =>console.log(err))
    }else{
      callback(null)
    }
    
  }

  getRecipesByCost(cost,callback){
    if(cost!=undefined){
      this.recipes = this.db.collection<any>('Ricette2',ref=> ref.where('costo','in',cost)).valueChanges()
      this.recipes.subscribe(res=>callback(res),err =>console.log(err))
    }else{
      callback(null)
    }
    
  }

  getRecipesByTime(maxTime,callback){
    if(maxTime!=undefined){
      this.recipes = this.db.collection<any>('Ricette2',ref=> ref.where('totalTime','<=',maxTime)).valueChanges()
      this.recipes.subscribe(res=>callback(res),err =>console.log(err))
    }else{
      callback(null)
    }

  }

  getRecipesByIngredients(ingredients,callback){
    if(ingredients!=undefined){
      this.recipes = this.db.collection<any>('Ricette2',ref=> ref.where('listaIngredienti','array-contains-any',ingredients)).valueChanges()
      
      this.recipes.subscribe(res=>{
        callback(res.filter(r=> ingredients.every(i=>r.listaIngredienti.includes(i))))
      })
    }else{
      callback(null)
    }

  }

  getImageFromURL(url){
    return new Promise((resolve,reject)=>{
      this.storage.storage.refFromURL(url).getDownloadURL().then((url)=>resolve(url))
    })
  }

  getIngredients(callback){
    this.db.collection<any>('Ingredienti').valueChanges().subscribe(res=>callback(res),err =>console.log(err))
  }

}