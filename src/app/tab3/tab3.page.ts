import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from "@angular/router";
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  favourites:any[]
  loading:boolean

  constructor(public navCtrl: NavController,private route: ActivatedRoute, private storage: Storage, public alertController: AlertController) {
    this.loading=true
    this.favourites=[]
    
  }

  ionViewDidEnter(){
    this.favourites=[]
    let len = 0
    let p=new Promise((resolve,reject)=>{
      this.storage.length().then((l)=>{
        len = l
        if(len>0)
          resolve()
        else
          this.loading=false
      })
    })
    .then(()=>{
      this.getRecipes((r,i)=>{
        this.favourites.push(r)
        if (i==len)
          this.loading=false
      })  
    })
  }
  
  getRecipes(callback){
    this.storage.forEach((v,k,i)=>{
      callback(v,i)
    })
  }

  addFavourite(e){
    console.log('added ' + e.titolo)
    this.storage.set(e.titolo,e)
    this.favourites.push(e)
  }

  removeFavourite(e){
    console.log('removed ' + e.titolo)
    this.storage.remove(e.titolo)
    this.favourites.splice(this.favourites.indexOf(e),1)
  }

  isInFavourite(e){
    if(this.favourites.indexOf(e)!=-1)
      return true
    else
      return false
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

  clearAll(){
    this.storage.clear()
    this.favourites = []
  }



  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Confermi di eliminare tutti i preferiti?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          cssClass: 'alertButton',
          handler: () => {
            this.clearAll()
          }
        }
      ]
    });

    await alert.present();
  }

}
