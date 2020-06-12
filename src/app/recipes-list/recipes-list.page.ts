import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit {
  recipes:any
  favourites:any[]
  noFound : boolean

  constructor(public navCtrl: NavController,private route: ActivatedRoute, private storage: Storage) {
    this.favourites=[]
    this.storage.keys().then((k)=>this.favourites=k)
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.recipes =  JSON.parse(params["recipes"]);
    });
    console.log(this.recipes)
    if(this.recipes.length==0){
      this.noFound=true
    }
  }

  goBack(){
    this.navCtrl.pop()
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

  addFavourite(e){
    console.log('added ' + e.titolo)
    this.storage.set(e.titolo,e)
    this.favourites.push(e.titolo)
  }

  removeFavourite(e){
    this.storage.remove(e.titolo)
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
