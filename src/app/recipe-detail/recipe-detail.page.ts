import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  
  recipe:any
  ingredients:any

  constructor(public navCtrl: NavController,private route: ActivatedRoute) { }

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

}
