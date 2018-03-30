import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

import { EspaceVertProvider } from '../../providers/espace-vert/espace-vert';
import { EVItem } from '../../classes/evitem';
import { HelpersProvider } from '../../providers/helpers/helpers';

import { of } from "rxjs/observable/of";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private EVs: EVItem[];
  private evIds: number[];
  private countScroll: number;

  constructor(public navCtrl: NavController,
              private EVProvider: EspaceVertProvider,
              private helper: HelpersProvider) {
  }

  ngOnInit() {
    this.loadEVItems();
  }


  loadEVItems(): void {
    this.EVs = [];
    this.countScroll = 0;
    this.EVProvider.getAllEVIds()
      .subscribe(evIds => {
        this.evIds = this.helper.chunkArray(evIds, 15);
        this.EVProvider.getEVItems(of(this.evIds[0]))
          .subscribe(EVItems => {
            EVItems.forEach(ev => this.EVs.push(ev));
          });
      })
  }

  loadMore(infiniteScroll): void {
    this.countScroll = this.countScroll+1;
      if (this.countScroll < this.evIds.length) {
        this.EVProvider.getEVItems(of(this.evIds[this.countScroll]))
          .subscribe(EVItems => {
            EVItems.forEach(ev => this.EVs.push(ev));
            if (infiniteScroll) {
              infiniteScroll.complete();
            }
          });
      } else {
        infiniteScroll.enable(false);
      }
  }

  goToFilter(): void {
    if (this.evIds.length > 0) {
      this.navCtrl.push('RechercheAvanceePage', {evIds: this.helper.joinArray(this.evIds)});
    }
  }
}

