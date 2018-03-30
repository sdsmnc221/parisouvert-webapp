import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LatLng } from '@ionic-native/google-maps';
import { HttpParams, HttpClient } from '@angular/common/http';

const googleMapsWebAPI = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleMapsWebAPIKey = 'AIzaSyDx0tYJIchEwePiqMFfGWxKpD0fEoFWEHI';

@Injectable()
export class GeolocationProvider {

  constructor(private geolocation: Geolocation, private http: HttpClient) {}

  getCurrentPosition(): any {
    return this.geolocation.getCurrentPosition().then((resp) => {
      return new LatLng(resp.coords.latitude, resp.coords.longitude);  
     });
  }

  getPlace(place: string): any {
    let params = new HttpParams();
    params = params.append('key', googleMapsWebAPIKey)
                    .append('address', place);
    return this.http.get(googleMapsWebAPI, {params: params});
  }

  getPlacePosition(place: string): any {
    return this.getPlace(place)
      .map(data => {
        let placePosition: any = {coordinates: new LatLng(0,0), address: ''};
        if (data.results[0]) {
          let temp = data.results[0].geometry.location;
          placePosition.coordinates = new LatLng(temp.lat, temp.lng);
          placePosition.address = data.results[0].formatted_address;
        } else {
          placePosition = null;
        }
        return placePosition; 
      });
  }

  //Harvesine formula
  getDistanceFromTwoPoints(ptA: LatLng, ptB: LatLng): number {
    function degreeToRadian(degree: number) {
      return degree * (Math.PI/180);
    }

    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }

    const R = 6371/1000; // Earth rad

    let dLat: number = degreeToRadian(ptA.lat - ptB.lat),
        dLng: number = degreeToRadian(ptA.lng - ptB.lng),
        a: number = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(ptA.lat) + Math.cos(ptB.lat) +
            Math.sin(dLng/2) * Math.sin(dLng/2),
        c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
        d: number = R * c;

    return round(d, 1);
  }


}
