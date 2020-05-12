import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NavController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-recipe-detail',
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
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})

export class RecipeDetailPage implements OnInit {
  
  recipe:any
  ingredients:any
  general:boolean
  ingr:boolean
  prep:boolean

  constructor(public navCtrl: NavController,private route: ActivatedRoute) {
    this.general=false
    this.ingr=false
    this.prep=false
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.recipe =  JSON.parse(params["recipe"]);
      this.ingredients = Object.entries(this.recipe.ingredienti) 
      console.log(this.recipe)
    });
  }

  goBack(){
    this.navCtrl.pop()
  }

  showGeneral(){
    this.general = !this.general
  }

  showIngredients(){
    this.ingr = !this.ingr
  }

  showPrep(){
    this.prep = !this.prep
  }
}
