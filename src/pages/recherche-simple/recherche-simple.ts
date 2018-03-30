import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SearchParams } from '../../classes/searchParams';
import { SearchProvider } from '../../providers/search/search';

@IonicPage()
@Component({
  selector: 'page-recherche-simple',
  templateUrl: 'recherche-simple.html',
})
export class RechercheSimplePage implements OnInit {

  private searchParams: SearchParams;
  private locationOpts: any[] = [
    {name: 'Autour de moi', value: 1, disabled: 'true'},
    {name: 'Paris', value: 2, disabled: 'false'},
    {name: 'Ile-de-France', value: 3, disabled: 'true'},
    {name: 'Autres', value: 4, disabled: 'false'}
  ];
  private isFormValid: boolean;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private search: SearchProvider) {
  }

  ngOnInit() {
    //Init searchParams, by default no keyword, no userInputLocation, location is set to Paris/2
    this.searchParams = new SearchParams('','2',''); 
    this.isFormValid = true;
  }

  validator() {
    if (this.searchParams.location === '4' && this.searchParams.userInputLocation === '') {
      this.isFormValid = false;
    } else {
      this.getSearchResults();
    }
  }

  getSearchResults() {
    this.navCtrl.push('ListPage', {evIds: this.search.simpleSearch(this.searchParams)});
  }

  toSimpleSearch() {
    this.navCtrl.push('RechercheSimplePage');
  }

  toAdvancedSearch() {
    this.navCtrl.push('RechercheAvanceePage');
  }


}
