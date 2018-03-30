import { Injectable } from '@angular/core';
import { AdvancedSearchParams } from '../../classes/advancedSearchParams';

@Injectable()
export class HelpersProvider {

  constructor() {
  }

  chunkArray(array: any[], chunkSize: number): any[] {
    let arrayLength: number = array.length,
        chunks: any[] = [];
    
    for (let i: number = 0; i < arrayLength; i += chunkSize) {
        let chunk = array.slice(i, i+chunkSize);
        chunks.push(chunk);
    }

    return chunks;
  }

  joinArray(array: any[]): any[] {
    let joinedArray: any[] = [];
    if (array.length === 1) {
      joinedArray = array;
    } else {
      array.forEach(chunk => {
        joinedArray = [...joinedArray, ...chunk];
      });
    }
    
    return joinedArray;
  }

  arrayContains(array: any[], value: any): boolean {
    return array.findIndex(e => e == value) !== -1;
  } 

  stringContains(lookUpString: string, text: string) {
    return lookUpString.toLowerCase().trim().indexOf(text.toLowerCase().trim()) !== -1;
  }

  sameElementsArray(arrayEV: any, arrayEVIds: any, rangeFilter: boolean) {
    let joinedArray: any[] = [],
        comparedArray: any[] = (rangeFilter) ? arrayEVIds : arrayEVIds.map(e => e['ev_id_FK']);

    arrayEV.forEach(el => {
      if (this.arrayContains(comparedArray, el['espace_vert_id'])) {
        joinedArray.push(el);
      }
    });

    return joinedArray;
  }

  seperateBy(array: any[], criterion: string) {
    let result = {
      w: [],
      wo: []
    };
    array.forEach(e => {
      if (e[criterion] === '') {
        result.wo.push(e);
      } else {
        result.w.push(e);
      }
    });
    return result;
  }

  checkIfAllChecked(asParams: AdvancedSearchParams): boolean {
    if (this.arrayContains(asParams.filterBy.types, 0) || this.arrayContains(asParams.filterBy.services, 0)) {
          return true;
    } else {
      return false;
    }
  }

  // '' comes first
  evDescriptionSort(ev1: any, ev2: any) {
    let desc1 = ev1['description'],
        desc2 = ev2['description'];
    return (desc1 < desc2) ? -1 : (desc1 > desc2) ? 1 : 0;
  }

  //DESC (decroissant)
  evSuperficieSortDESC(ev1: any, ev2: any) {
    let s1 = ev1['superficie'],
        s2 = ev2['superficie'];
    return (s1 < s2) ? -1 : (s1 > s2) ? 1 : 0;
  }

  // AZ
  evNameSort(ev1: any, ev2: any) {
    let desc1 = ev1['name'],
        desc2 = ev2['name'];
    return (desc1 < desc2) ? -1 : (desc1 > desc2) ? 1 : 0;
  }
}
