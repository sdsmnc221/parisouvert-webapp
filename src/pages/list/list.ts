import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EspaceVertProvider } from '../../providers/espace-vert/espace-vert';
import { EVItem } from '../../classes/evitem';
import { HelpersProvider } from '../../providers/helpers/helpers';

import { of } from "rxjs/observable/of";



@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {

  private title: string;
  private EVs: EVItem[];
  private evIds: number[] = [1];
  private countScroll: number;
  private hasResult: boolean;
  

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private EVProvider: EspaceVertProvider,
              private helper: HelpersProvider) {
  }

  ngOnInit() {
    this.title = (this.navParams.get('title')) ? this.navParams.get('title') : 'Résultats de recherche';
    this.loadEVItems();
  }

  loadEVItems(): void {
    this.hasResult = false;
    this.EVs = [];
    this.countScroll = 0;
    this.navParams.get('evIds')
      .subscribe(evIds => {
        this.evIds = (evIds.length > 0) ? this.helper.chunkArray(evIds, 15) : [];
        if (this.evIds.length > 0) {
          this.EVProvider.getEVItems(of(this.evIds[0]))
          .subscribe(EVItems => {
            this.hasResult = true;
            EVItems.forEach(ev => {this.EVs.push(ev);});
            });
        }
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

  goBack(): void {
    this.navCtrl.pop();
  }

  goToFilter(): void {
    if (this.evIds.length > 0) {
      this.navCtrl.push('RechercheAvanceePage', {evIds: this.helper.joinArray(this.evIds)});
    }
  }
}

