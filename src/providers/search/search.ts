import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { SearchParams } from '../../classes/searchParams';
import { AdvancedSearchParams } from '../../classes/advancedSearchParams';
import { HelpersProvider } from '../helpers/helpers';



//API's BASE URL
const url = 'http://parisouvert.com/api.php/espace_vert/';
const urlServices = 'http://parisouvert.com/api.php/espacevert_service/';

@Injectable()
export class SearchProvider {

  constructor(private http: HttpClient,
              private helpers: HelpersProvider) {
  }

  ssFilterParams(searchParams: SearchParams): HttpParams {
    let filterParams: HttpParams = new HttpParams();
    filterParams = filterParams.append('columns', 'espace_vert_id')
                .append('order', 'name')
                .append('transform', '1')
                .append('satisfy', 'all');
    if (searchParams.keyword) {
      filterParams = filterParams.append('filter[]', `name,cs,${searchParams.keyword.trim()}`);
    }
    if (searchParams.location === '2') {
      filterParams = filterParams.append('filter[]', 'city,cs,Paris');
    }
    return filterParams;
  }

  ssUserInputParams(searchParams: SearchParams): HttpParams {
    let userInputParams: HttpParams = new HttpParams();
    userInputParams = userInputParams.append('columns', 'espace_vert_id')
                                     .append('order', 'name')
                                     .append('transform', '1')
                                     .append('satisfy', 'any')
                                     .append('filter[]', `postal_code,cs,${searchParams.userInputLocation.trim()}`)
                                     .append('filter[]', `address,cs,${searchParams.userInputLocation.trim()}`);
    return userInputParams;
  }

  simpleSearch(searchParams: SearchParams): Observable<any> {
    if (searchParams.location === '4') {
      return forkJoin([this.http.get(url, {params: this.ssFilterParams(searchParams)}),
                       this.http.get(url, {params: this.ssUserInputParams(searchParams)})])
              .map(results => {
                return results.map(data => data['espace_vert'].map(ev => ev['espace_vert_id']));
              })
              .map(results => {
                return results[1].filter(evId1 => {
                  return results[0].indexOf(evId1) !== -1;
                });
              })
    } else {
      return this.http.get(url, {params: this.ssFilterParams(searchParams)})
        .map(data => {
          if (data) {
            return data['espace_vert'].map(ev => ev['espace_vert_id']);
          } else {
            return [];
          }
        });
    }
    
  }

  asFilterParams(searchParams: AdvancedSearchParams): HttpParams {
    let filterParams = new HttpParams();
    filterParams = filterParams.append('transform', '1');
    
    //keywords params
    if (searchParams.keyword) {
      filterParams = filterParams.append('filter[]', `name,cs,${searchParams.keyword.trim()}`);
    }

    //distance params
    switch (searchParams.filterBy.distance) {
      case '2':
        filterParams = filterParams.append('filter[]', 'city,cs,Paris');
        break;
      case '4':
        filterParams = filterParams.append('filter[]', `postal_code,cs,${searchParams.userInputLocation.trim()}`)
                                   .append('filter[]', `address,cs,${searchParams.userInputLocation.trim()}`);
      default:
        break;
    }

    //disponibility params: for now not set
    
    //types params: 
    if (!this.helpers.arrayContains(searchParams.filterBy.types, 0)) {
      searchParams.filterBy.types.forEach(type => {
        filterParams = filterParams.append('filter[]', `evType_FK,eq,${type}`);
      });
    } 
    //services params: 
    // another method

    //strict mode ?
    if (searchParams.filterStrictMode) {
      filterParams = filterParams.append('satisfy', 'all');
    } else {
      filterParams = filterParams.append('satisfy', 'any');
    }

    return filterParams;
  };

  asFilterServices(searchParams: AdvancedSearchParams): HttpParams {
    let filterServicesParams: HttpParams = new HttpParams();
    filterServicesParams = filterServicesParams.append('transform', '1')
                                                .append('columns', 'ev_id_FK');

    if (!this.helpers.arrayContains(searchParams.filterBy.services, 0)) {
      searchParams.filterBy.services.forEach(service => {
        filterServicesParams = filterServicesParams.append('filter[]', `service_id_FK,eq,${service}`);
      });
    }

    //strict mode ?
    if (searchParams.filterStrictMode) {
      filterServicesParams= filterServicesParams.append('satisfy', 'all');
    } else {
      filterServicesParams = filterServicesParams.append('satisfy', 'any');
    }

    return filterServicesParams;
  }

  asOrderParams(searchResults: any[], order: string, superficieOrder?: string|number): any[] {
    //ORDERS PRECEDENCES : PERTINENCE > AZ > SUPERFICIE (POPULARITY NOT YET)
    let sortedData = [],
        seperatedData = {w: [], wo: []},
        seperateByP = {w: [], wo: []},
        seperateByS1 = {w: [], wo: []},
        seperateByS2 = {w: [], wo: []};

    switch (order) {
      //Order by pertinence (check if EV has completed, detailed infos)
      //(in this case, mostly check if EV has an proper description...)
      case 'pertinence':
        sortedData = searchResults.sort(this.helpers.evDescriptionSort).reverse();
        break;

      //Order by superficie (after order by pertinence)
      case 'superficie':
        // Seperate EV by with or without superficie
        seperatedData = this.helpers.seperateBy(searchResults, 'superficie');
        //Order by superficie
        seperatedData.w = seperatedData.w.sort(this.helpers.evSuperficieSortDESC);
          // 1 => ASC, 2 => DESC
        seperatedData.w = (superficieOrder == '1') ? seperatedData.w : seperatedData.w.reverse();
        //Combine everything
        sortedData = [...seperatedData.w, ...seperatedData.wo];
        break;

      case 'az':
        sortedData = searchResults.sort(this.helpers.evNameSort);
        break;

      case 'pertinence&superficie':
        //Seperate EV by Pertinence
        seperateByP = this.helpers.seperateBy(searchResults, 'description');
        //Order by Superficie for pertinentEVs
        seperateByS1 = this.helpers.seperateBy(seperateByP.w, 'superficie');
        seperateByS1.w = seperateByS1.w.sort(this.helpers.evSuperficieSortDESC);
        seperateByS1.w = (superficieOrder == '1') ? seperateByS1.w : seperateByS1.w.reverse();
        //Order by Superficie for impertinentEVs
        seperateByS2 = this.helpers.seperateBy(seperateByP.wo, 'superficie');
        seperateByS2.w = seperateByS2.w.sort(this.helpers.evSuperficieSortDESC);
        seperateByS2.w = (superficieOrder == '1') ? seperateByS2.w : seperateByS2.w.reverse();
        //combine data
        sortedData = [...seperateByS1.w, ...seperateByS1.wo, ...seperateByS2.w, ...seperateByS2.wo];
        break;

      case 'pertinence&az':
        //Seperate EV by Pertinence
        seperateByP = this.helpers.seperateBy(searchResults, 'description');
        //Order by AZ for pertinentEVs
        seperateByP.w = seperateByP.w.sort(this.helpers.evNameSort);
        //Order by AZ for impertinentEVs
        seperateByP.wo = seperateByP.wo.sort(this.helpers.evNameSort);
        //combine data
        sortedData = [...seperateByP.w, ...seperateByP.wo];
        break;

      case 'superficie&az':
        // Seperate EV by with or without superficie
        seperatedData = this.helpers.seperateBy(searchResults, 'superficie');
        //Order by superficie
        seperatedData.w = seperatedData.w.sort(this.helpers.evSuperficieSortDESC);
          // 1 => ASC, 2 => DESC
        seperatedData.w = (superficieOrder == '1') ? seperatedData.w : seperatedData.w.reverse();
        //Order by AZ
        seperatedData.w = seperatedData.w.sort(this.helpers.evNameSort);
        seperatedData.wo = seperatedData.wo.sort(this.helpers.evNameSort);
        //Combine everything
        sortedData = [...seperatedData.w, ...seperatedData.wo];
        break;
      
      case 'all':
        //Seperate EV by Pertinence
        seperateByP = this.helpers.seperateBy(searchResults, 'description');
        //Order by Superficie for pertinentEVs
        seperateByS1 = this.helpers.seperateBy(seperateByP.w, 'superficie');
        seperateByS1.w = seperateByS1.w.sort(this.helpers.evSuperficieSortDESC);
        seperateByS1.w = (superficieOrder == '1') ? seperateByS1.w : seperateByS1.w.reverse();
        //Order by Superficie for impertinentEVs
        seperateByS2 = this.helpers.seperateBy(seperateByP.wo, 'superficie');
        seperateByS2.w = seperateByS2.w.sort(this.helpers.evSuperficieSortDESC);
        seperateByS2.w = (superficieOrder == '1') ? seperateByS2.w : seperateByS2.w.reverse();
        //Order by AZ
        seperateByS1.w = seperateByS1.w.sort(this.helpers.evNameSort);
        seperateByS1.wo = seperateByS1.wo.sort(this.helpers.evNameSort);
        seperateByS2.w = seperateByS2.w.sort(this.helpers.evNameSort);
        seperateByS2.wo = seperateByS2.wo.sort(this.helpers.evNameSort);
        //combine data
        sortedData = [...seperateByS1.w, ...seperateByS1.wo, ...seperateByS2.w, ...seperateByS2.wo];
        break;

      default:
        break;
    }
    return sortedData;
  }

  advancedSearch(searchParams: AdvancedSearchParams, searchRange: any[]): Observable<any> {
    //Apply Filter params
    let search: any;
    
    //Check if Services filter is enabled (All is selected) ? combine 2 resquest : only 1 request
    if (!this.helpers.arrayContains(searchParams.filterBy.services, 0)) {
      search = forkJoin([
        this.http.get(url, {params: this.asFilterParams(searchParams)}),
        this.http.get(urlServices, {params: this.asFilterServices(searchParams)})
      ])
        .map(results => {
          return this.helpers.sameElementsArray(results[0]['espace_vert'], results[1]['espacevert_service'], false);
        });
    } else {
      search = this.http.get(url, {params: this.asFilterParams(searchParams)})
        .map(data => data['espace_vert']);
    }
    
    //If search on a predefined lisd
    if (searchRange.length > 0) {
      search = search.map(data => {
        return this.helpers.sameElementsArray(data, searchRange, true);
      });
    }

    //Apply Order params
    search = search.map(data => {
      //Apply Order params
      let sortedData = data;
      skipToReturn: if (data.length > 0) {
        
        //Order by pertinence
        if (searchParams.orderBy.pertinence) {
          sortedData = this.asOrderParams(data, 'pertinence');
          break skipToReturn;
        }

        //Order by superficie
        if (searchParams.orderBy.superficie != 0) {
          //if order by pertinence enabled
          if (searchParams.orderBy.pertinence) {
            sortedData = this.asOrderParams(data, 'pertinence&superficie', searchParams.orderBy.superficie);
            break skipToReturn;
          } else {
            sortedData = this.asOrderParams(data, 'superficie', searchParams.orderBy.superficie);
            break skipToReturn;
          }
        }

        //Order by AZ 
        if (searchParams.orderBy.az) {
          if (searchParams.orderBy.pertinence && searchParams.orderBy.superficie != 0) {
            sortedData = this.asOrderParams(data, 'all', searchParams.orderBy.superficie);
            break skipToReturn;
          } else if (searchParams.orderBy.pertinence) {
            sortedData = this.asOrderParams(data, 'pertinence&az');
            break skipToReturn;
          } else if (searchParams.orderBy.superficie != 0) {
            sortedData = this.asOrderParams(data, 'superficie&az', searchParams.orderBy.superficie);
            break skipToReturn;
          } else {
            sortedData = this.asOrderParams(data, 'az');
            break skipToReturn;
          }
        }
      }
  
      return sortedData;
    });

    return search.map(data => {
      if (data) {
        return data.map(ev => ev['espace_vert_id']);
      } else {
        return [];
      }
    });
  }

}
