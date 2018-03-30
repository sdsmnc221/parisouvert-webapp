import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { EspaceVertProvider } from '../../providers/espace-vert/espace-vert';
import { AdvancedSearchParams } from '../../classes/advancedSearchParams';
import { HelpersProvider } from '../../providers/helpers/helpers';


@IonicPage()
@Component({
  selector: 'page-recherche-avancee',
  templateUrl: 'recherche-avancee.html',
})
export class RechercheAvanceePage implements OnInit {

  private evIds: number[];
  private isFormValid = {
    userInputLocation: true,
    typesChoices: true,
    servicesChoices: true
  };
  private searchParams: AdvancedSearchParams;
  private opts = {
    superficie: [
      {name: 'Désactivé', value: 0, disabled: 'false'},
      {name: 'Ordre croissant', value: 1, disabled: 'false'},
      {name: 'Ordre décroissant', value: 2, disabled: 'false'},
    ],
    distance: [
      {name: 'Désactivé', value: 0, disabled: 'false'},
      {name: 'Autour de moi', value: 1, disabled: 'true'},
      {name: 'Paris', value: 2, disabled: 'false'},
      {name: 'Ile-de-France', value: 3, disabled: 'true'},
      {name: 'Autres', value: 4, disabled: 'false'}
    ],
    disponibility: [
      {name: 'Désactivé', value: 0, disabled: 'false'},
      {name: 'Ouvert(s) maintenant', value: 1, disabled: 'true'},
      {name: 'Autres', value: 2, disabled: 'true'},
    ],
    types: [
      {name: 'Tous', value: 0, disabled: 'false'}
    ],
    services: [
      {name: 'Tous', value: 0, disabled: 'false'}
    ]
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private helpers: HelpersProvider,
              private EVProvider: EspaceVertProvider,
              private search: SearchProvider) {
  }

  ngOnInit() {
    this.evIds = (this.navParams.get('evIds')) ? this.navParams.get('evIds') : [];
    this.searchParams = new AdvancedSearchParams();
    this.initOpts();
  }

  initOpts(): void {
    this.EVProvider.getAllEVTypes()
      .subscribe(types => {
        let opts = types.map(type => {return {name: type.name, value: type.id, disabled: 'false'};})
        this.opts.types = [...this.opts.types, ...opts];
      });

    this.EVProvider.getAllServices()
    .subscribe(services => {
      let opts = services.map(service => {return {name: service.name, value: service.id, disabled: 'false'};})
      this.opts.services = [...this.opts.services, ...opts];
    });
  }

  validator(): void {
    // if (this.searchParams.filterBy.distance === '4' && this.searchParams.userInputLocation === '') {
    //   this.isFormValid.userInputLocation = false;
    // } else {
    //   this.isFormValid.userInputLocation = true;
    // }

    if (this.searchParams.filterBy.types.length > 1 && this.helpers.arrayContains(this.searchParams.filterBy.types, 0)) {
      this.isFormValid.typesChoices = false;
    } else {
      this.isFormValid.typesChoices = true;
    }

    if (this.searchParams.filterBy.services.length > 1 && this.helpers.arrayContains(this.searchParams.filterBy.services, 0)) {
      this.isFormValid.servicesChoices = false;
    } else {
      this.isFormValid.servicesChoices = true;
    }

    if (Object.keys(this.isFormValid).every(k => this.isFormValid[k] === true)) {
      this.getSearchResults();
    }
  }

  getSearchResults() {
    this.navCtrl.push('ListPage', {evIds: this.search.advancedSearch(this.searchParams, this.evIds)});
  }

  eraseParams(): void {
    this.searchParams = new AdvancedSearchParams();
  }

  toSimpleSearch() {
    this.navCtrl.push('RechercheSimplePage');
  }

  toAdvancedSearch() {
    this.navCtrl.push('RechercheAvanceePage');
  }

}
