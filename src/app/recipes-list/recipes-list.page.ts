import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit {
  recipes:any

  constructor(public navCtrl: NavController,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.recipes =  JSON.parse(params["recipes"]);
    });
    console.log(this.recipes)
  }

  goBack(){
    this.navCtrl.pop()
  }

  recipeClick(r){
    let p = new Promise((resolve,reject)=>{
    let files = new Array(Math.floor(r.files.length/3)).fill({'img':[0,0,0],'des':undefined});
    resolve(files)
    })
    .then((files)=>{
      r.files.forEach(f => {
        let index = parseInt(f.split('%2F')[1].split('.')[0])-1
        let index1 = Math.floor(index/3)
        let index2 = index-index1*3
        console.log(index,index1,index2)
        files[index1]['img'][index2]=f
        files[index1]['des']=r.passaggi[index1]
      });
      return files
    })
    .then((files)=>{ 
      console.log(files)
      r.presentazione=files
      //this.navCtrl.navigateForward('/recipe-detail',{ queryParams: { recipe :  JSON.stringify(r) } })
    })
    
  }

}
