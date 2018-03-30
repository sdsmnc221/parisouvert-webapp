import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EspaceVertProvider } from '../../providers/espace-vert/espace-vert';


@IonicPage()
@Component({
  selector: 'page-acces-rapide',
  templateUrl: 'acces-rapide.html',
})
export class AccesRapidePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private EVProvider: EspaceVertProvider) {
  }

  ionViewDidLoad() {
  }

  toPage(page: string): void {
    switch (page) {
      case 'Aires':
        this.navCtrl.setRoot('ListPage', {evIds : this.EVProvider.getPredefinedEVsList(page), title: 'Les aires de jeux'});
        break;
      case 'AZ':
        this.navCtrl.setRoot('HomePage');
        break;
      case 'Popular':
        this.navCtrl.setRoot('ListPage', {evIds : this.EVProvider.getPredefinedEVsList(page), title: 'Les plus populaires'});
        break;
      default:
        break;
    }
    

  }
  

}
