import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { of } from "rxjs/observable/of";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

//Classes
import { Location } from '../../classes/location'
import { EspaceVert } from '../../classes/espaceVert';
import { EVType } from '../../classes/evtype';
import { Service } from '../../classes/service';
import { Photo } from '../../classes/photo';
import { EVItem } from '../../classes/evitem';

//API's BASE URL
const api = 'http://parisouvert.com/api.php';

@Injectable()
export class EspaceVertProvider {

  constructor(private http: HttpClient) {
  }

  /**
   * METHOD getEspaceVert : fetch an EV by its ID.
   * @param evId: number (EV's id)
   * return an object of EspaceVert type || an Observable of EspaceVert type
   */
  getEspaceVert(evId: number): Observable<EspaceVert> {
    let url: string = `${api}/espace_vert/${evId}`,
        httpReqs: any[] = [this.http.get(url),
                                this.getEVTypeFromEV(evId),
                                this.getServices(evId),
                                this.getPhotos(evId)];

    //forkJoin: (kinda) make multiple HTTP requests and return their responses in an array
    //forkJoin: prendre un tableau de requetes HTTP, les executer, et renvoyer les resultats dans un tableau                           
    return forkJoin(httpReqs)
            //map: transform results (here, format all results and from these results, make and return a single EspaceVert object)
            //map: transformer les resultats (ici, transformer les results des requetes HTTt, a partir de ces resultats construire et renvoyer un seul objet EspaceVert)
            .map(results => {
              let ev = results[0];
            
              //See EspaceVert's constructor for params details
              //Voir le constructeur de la classe EspaceVert pour les details des parametres
              return new EspaceVert(
                ev['espace_vert_id'],
                ev['name'],
                new Location(ev['address'], ev['postal_code'], ev['city']),
                results[1],
                ev['superficie'],
                ev['description'],
                results[2],
                results[3]);
            });
  }

  /**
   * METHOD getAllEVTypes : fetch all EV Types.
   * return array of objects of EVType type 
   * the result looks like this: EVType[] [{id: 18, name: 'Square'}, {id: 18, name: 'Square'}]
   */
  getAllEVTypes(): any { //Observable<EVType>
    let url: string = `${api}/evtype?transform=1`;
    return this.http.get(url)
      .map(data => data['evtype']
        .map(type => new EVType(type['evtype_id'], type['name'])));
  }

  /**
   * METHOD getEVType : fetch an EV Type by its ID.
   * @param evTypeId: number (EV Type's id)
   * return an object of EVType type || an Observable of EVType type
   * the result looks like this: EVType {id: 18, name: 'Square'}
   */
  getEVType(evTypeId: number): Observable<EVType> {
    let url: string = `${api}/evtype/${evTypeId}`;
    return this.http.get(url).map(data => new EVType(data['evtype_id'], data['name']));
  }


  /**
   * METHOD getEVTypeFromEV : fetch an EV's type by its ID.
   * @param evId: number (EV's id)
   * return an object of EVType type || an Observable of EVType type
   * the result looks like this: EVType {id: 18, name: 'Square'}
   */
  getEVTypeFromEV(evId: number): Observable<EVType> {
    //Query evtype_FK from espace_vert with an EV's Id, then use this evtype_FK to query the EVType from evtype
    //Avec l'Id de l'EV, recuperer la valeur evtype_FK, ensuite avec cette valeur evtype_FK, recuperer le type correspondant de la table evtype
    let params: HttpParams = new HttpParams();
    params = params.append('columns', 'evtype_FK')
                    .append('transform', '1')
                    .append('filter', `espace_vert_id,eq,${evId}`);
    
    let queryEVTypeIdFromEV = {
          url: `${api}/espace_vert`,
          params: params
    };
    
    return this.http.get(queryEVTypeIdFromEV.url,
                         {params: queryEVTypeIdFromEV.params})
                    .map(data => data['espace_vert'][0]['evtype_FK'])
                    //mergeMap: google it, because uhmm it's complicated...
                    .mergeMap(evTypeId => this.getEVType(evTypeId));
  }

  /**
   * METHOD getAllServices : fetch all Services.
   * return array of objects of EVType type 
   * the result looks like this: EVType[] [{id: 18, name: 'Square'}, {id: 18, name: 'Square'}]
   */
  getAllServices(): any { //Observable<EVType>
    let url: string = `${api}/service?transform=1`;
    return this.http.get(url)
      .map(data => data['service']
        .map(service => new Service(service['service_id'], service['name'])));
  }


  /**
   * METHOD getServices : fetch all services of an EV by its ID.
   * @param evId: number (EV's id)
   * return an array of objects of Service type || an Observable of Service type
   * check Service class for more details
   */
  getServices(evId: number): Observable<Service[]> {
    //This method consists of sending 2 HTTP request: 1 to fetch the list of all services, 1 to fetch the list of all services' ID of an EV
    //Cette methode consiste a envoyer 2 requetes, l'une pour recuperer la liste de tous les services, l'autre pour recuperer la liste des ID des services de l'EV concerne
    //Il me semble que c'est la facon la plus efficace et qui economise le plus des requetes HTTP, on n'a pas de choix c'est pas l'API faite par nous-meme  
    let paramsAllServices: HttpParams = new HttpParams(),
        paramsEV_Service: HttpParams = new HttpParams();
    paramsAllServices = paramsAllServices.append('transform', '1');
    paramsEV_Service = paramsEV_Service.append('transform', '1')
                                          .append('filter', `ev_id_FK,eq,${evId}`);
    
    let queryAllServices = {
          url: `${api}/service`,
          params: paramsAllServices
    },
        queryEV_service = {
          url: `${api}/espacevert_service`,
          params: paramsEV_Service
    },
        getAllServices = this.http.get(queryAllServices.url,
                                      {params: queryAllServices.params}),
        getEV_service = this.http.get(queryEV_service.url, 
                                     {params: queryEV_service.params});
    
    //Make 2 HTTP requests and get its results in an array
    //Executer les 2 requetes HTTP et obtenir les resultats dans un tableau
    //results[0]: all services, results[1]: all service of the concerned EV
    return forkJoin([getAllServices, getEV_service])
            .map(results => {              
              //Iterate through results[1], for each iteration, format results to make and return a single Service object
              //Parcourir results[1] (qui est lui-meme un tableau), a chaque parcours construire et renvoyer un objet Service
              return results[1]['espacevert_service'].map(service => {
                return new Service(service['service_id_FK'],
                                   results[0]['service'].find(e => e.service_id === service['service_id_FK'])['name'],
                                   service['description']);
              });
            });
  }


  /**
   * METHOD getEV_photo : fetch all rows from espacevert_user_photo (relations between espacevert, photo, and user || table (n,n) with foreign keys etc.), of which ev_id_FK is equal to the EV's Id
   * a helper method for getPhotos
   * @param evId: number (EV's id)
   * return an array of any object || an Observable of any type
   */
  getEV_photo(evId: number): Observable<any> {
    //Build the query for the http request
    let params: HttpParams = new HttpParams();
    params = params.append('transform', '1')
                    .append('filter', `ev_id_FK,eq,${evId}`);

    let queryEV_photo = {
      url: `${api}/espacevert_user_photo`,
      params: params
    };

    //Make the http request and prettify/format the result before return it
    return this.http.get(queryEV_photo.url,
                          {params: queryEV_photo.params})
                    .map(data => {
                      return data['espacevert_user_photo'].map(photo => {
                        return {evId: photo['ev_id_FK'], 
                                userId: photo['user_id_FK'],
                                photoId: photo['photo_id_FK']};
                      });
                    });  
  }

  /**
   * METHOD getPhotos : fetch all photos of an EV by its ID.
   * @param evId: number (EV's id)
   * return an array of Photo objects|| an Observable of Photo type
   * check Photo class for more details
   * (kinda) difficult to understand.
   */
  getPhotos(evId: number): Observable<Photo[]> {
    //First, call the helper method getEv_photo, because we need this information in order to move on
    //D'abord, appeler la methode getEV_photo et stocker le resultat dans un variable, parce qu'on en est besoin pour recuperer les photos
    //(On n'a pas de choix faut se debrouiller avec l'API comme ca, dsl...)
    let EV_photo = this.getEV_photo(evId);

    //Then, we need the photoId to fetch info of each Photo
    //Pour recuperer les details de chaque photo (de l'EV concerne), on a besoin de son ID
    return EV_photo.map(ev_photo => ev_photo.map(e => e.photoId))

                  //mergeMap again, in short for chaining http request
                  //merMap: parcourir le tableau des photoId(s), et pour chaque photoId, construire et executer une requete Http
                   .mergeMap(photoIds => {

                    //only make http request if and only if an EV does actually have photo
                    //on ne fait la requete que quand l'EV a au moins une photo (cad tableau photoId n'est pas vide)
                    if (photoIds.length > 0){ 
                      return forkJoin( //forkJoin: (kinda) build multiple http requests
                        photoIds.map(photoId => {
                          let url: string = `${api}/photo/${photoId}`;
                          return this.http.get(url)
                                  .map(photo => {
                                    let userId: number | null;
                                    EV_photo.subscribe(ev_photo => {
                                      userId = ev_photo.find(e => e.photoId === photo['photo_id']).userId;
                                    });

                                    return new Photo(
                                      photo['photo_id'],
                                      `http://parisouvert.com/app/db/imgs/${photo['filename']}`,
                                      photo['source'],
                                      photo['sourceUrl'],
                                      photo['date_ajout'],
                                      evId,
                                      userId,
                                      photo['caption']
                                    ); 
                                  });
                        })
                      );

                    //if EV don't have any photo, for now return an empty array...
                    //si l'EV n'a aucune photo, pour l'instant on revoie un tableau vide
                    //en fait faut renvoyer une photo par defaut mais bon on va le faire demain.
                    } else {
                      return of([]); //of(): transform an array to an Observable or else, error
                    }
                   });
  }

  getEVItem(evId: number): Observable<EVItem> {
    let url: string = `${api}/espace_vert/${evId}`,
        httpReqs: any[] = [this.http.get(url),
                           this.getPhotos(evId)];
    return forkJoin(httpReqs)
            .map(results => {
              let ev = results[0];
              return new EVItem(
                ev['espace_vert_id'],
                ev['name'],
                new Location(ev['address'], ev['postal_code'], ev['city']),
                results[1]
              );
            });
  }

  getAllEVIds(): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('columns', 'espace_vert_id')
                    .append('order', 'name')
                    .append('transform', '1')
    let queryAllEVIds = {
      url: `${api}/espace_vert`,
      params: params
    };
    return this.http.get(queryAllEVIds.url,
                         {params: queryAllEVIds.params})
                    .map(data => {
                      return data['espace_vert'].map(ev => ev['espace_vert_id']);
                    });
  }


  getEVItems(evIds: Observable<any>): Observable<any> {
    return evIds.mergeMap((evIds: any[]) => {
              if (evIds.length > 0) {
                return forkJoin( 
                  evIds.map(evId => this.getEVItem(evId))
                );
              } else {
                return of([]);
              }
            });
  }

  getPredefinedEVsList(list: string): Observable<any> {
    let request: any;
    switch (list) {
      case 'Aires':
        request = this.http.get('http://parisouvert.com/api-test.php');
        break;
      case 'Popular':
        request = this.http.get(`${api}/popular_evs?transform=1&columns=ev_id_FK`)
          .map(data => {
            return data['popular_evs'].map(ev => ev['ev_id_FK']);
          });
      default:
        break;
    }
    return request;
  }
  
}
