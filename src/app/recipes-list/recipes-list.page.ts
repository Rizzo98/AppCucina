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

}
