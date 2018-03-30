import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, HtmlInfoWindow, LatLng, Marker } from '@ionic-native/google-maps';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

const defaultPosition = new LatLng(48.8566, 2.3522); //Paris

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private geolocation: GeolocationProvider) {
  }

  ev: any;
  map: GoogleMap;
  @ViewChild('mapCanvas') mapCanvas: ElementRef;

  ngAfterViewInit() {
    this.initPage();
  }

  initPage(): void {
    this.ev = this.navParams.get('ev');
    this.getEVCoordinates();
    setTimeout(this.loadMap.bind(this), 1000);
  }

  getEVCoordinates(): void {
    if (this.ev) {
      this.geolocation.getPlace(this.ev.name)
        .subscribe(data => {
          if (data.results[0]) {
            let coordinates = data.results[0].geometry.location;
            this.ev.coordinates = new LatLng(coordinates.lat, coordinates.lng);
            this.ev.address = data.results[0].formatted_address;
          } else {
            this.ev.coordinates = defaultPosition;
          }
        });
    }
  }

  loadMap(): void {
    let coordinates = (this.ev.coordinates) ? this.ev.coordinates : defaultPosition,
        mapOpts: GoogleMapOptions = {
          controls: {
            compass: true,
            myLocationButton: true,
            indoorPicker: true,
            zoom: true
          },
          gestures: {
            scroll: true,
            tilt: true,
            rotate: true,
            zoom: true
          },
          camera: {
            target: coordinates,
            tilt: 30,
            zoom: 15,
            bearing: 50
          }
        };
    this.map = GoogleMaps.create(this.mapCanvas.nativeElement, mapOpts);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.loadMarker(coordinates);
    });
  }

  loadMarker(coordinates: LatLng): void {
    if (coordinates !== defaultPosition) {
      let marker = this.map.addMarker({
        position: coordinates,
        icon: '#68D7A5',
        animation: 'BOUNCE'
      }).then(marker => {
        this.loadInfoBox(marker);
      }); 
    } else {
      let marker = this.map.addMarker({
        position: coordinates,
        title: 'Espace vert actuellement non accessible !',
        icon: '#68D7A5',
        animation: 'BOUNCE'
      }).then(marker => marker.showInfoWindow());
    }
  }

  loadInfoBox(marker: any): void {
    let infoBox: HtmlInfoWindow = new HtmlInfoWindow(),
        infoBoxContent: HTMLElement = document.createElement('div');
    infoBoxContent.innerHTML = [
      `<h2>${this.ev.name}</h2>`,
      `<p>${this.ev.address}</p>`
    ].join('');
    infoBoxContent.classList.add('info-box');
    infoBox.setContent(infoBoxContent);
    infoBox.open(marker);
    marker.on(GoogleMapsEvent.MARKER_CLICK)
    .subscribe(() => {
      infoBox.open(marker);
    });
  }

  goBack(): void {
    this.navCtrl.pop();
  }

}
