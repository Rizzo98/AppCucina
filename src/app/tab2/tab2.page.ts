import { Component } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import {DatabaseService} from '../database.service'
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  recipes:any[]
  loading:boolean
  filtered:any[]
  favourites:any[]

  constructor(public navCtrl: NavController, private route: ActivatedRoute, private db : DatabaseService, private storage: Storage) {
    this.recipes=[]
    this.loading=false
    this.favourites=[]
    this.storage.keys().then((k)=>this.favourites=k)
  }

  ngOnInit() {
    console.log(this.favourites)
    if(this.recipes.length==0){
      this.loading=true
      this.db.getRecipes((c)=>{
        this.recipes=c
        this.filtered=c
        this.loading=false
        console.log(this.recipes)
      },undefined,10000,undefined,undefined,undefined)
    }
  }

  recipeClick(r){
    let p = new Promise((resolve,reject)=>{
        let file = new Array(r.files.length).fill(0)
        r.files.forEach(f => {
          let index = parseInt(f.split('%2F')[1].split('.')[0])-1
          file[index]=f
        });
        resolve(file)  
    })
    .then(file=>{
      r.files=file
      this.navCtrl.navigateForward('/recipe-detail',{ queryParams: { recipe :  JSON.stringify(r) } })
    })
  }

  filterList(e){
    this.filtered = this.recipes
    const searchTerm = e.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.filtered = this.filtered.filter(currentGoal => {
      if (currentGoal.titolo && searchTerm) {
        if (currentGoal.titolo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  addFavourite(e){
    console.log('added ' + e.titolo)
    this.storage.set(e.titolo,e)
    this.favourites.push(e.titolo)
  }

  removeFavourite(e){
    this.storage.remove(e.titolo)
    //this.favourites = this.favourites.filter((v)=>{return v!=e})
    this.favourites.splice(this.favourites.indexOf(e.titolo),1)
    console.log(this.favourites)
  }

  isInFavourite(title){
    if(this.favourites.indexOf(title)!=-1)
      return true
    else
      return false
  }

}
