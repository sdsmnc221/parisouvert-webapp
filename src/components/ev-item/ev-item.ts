import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { EVItem } from '../../classes/evitem';
import { LatLng } from '@ionic-native/google-maps';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

@Component({
  selector: 'ev-item',
  templateUrl: 'ev-item.html'
})
export class EvItemComponent {

  @Input() ev: EVItem;
  currentPosition: LatLng;
  completedAddress: string;
  distanceFromCurrentPosition: number;
  hasPhoto: boolean;

  constructor(public navCtrl: NavController, private geolocation: GeolocationProvider) {
  }

  ngAfterViewInit() {
    this.hasPhoto = (this.ev.photo) ? true : false;
    this.getCurrentPosition()
      .then(() => {
        this.getEVPosition();
      });
  }

  toEV(): void {
    this.navCtrl.push('espacevertPage',{evId: this.ev.id});
  }

  getCurrentPosition(): any {
    this.currentPosition = null;
    return this.geolocation.getCurrentPosition()
      .then(pos => {
        this.currentPosition = pos;
      })
      .catch(e => console.log(e));
  }

  getEVPosition(): void {
    this.geolocation.getPlacePosition(this.ev.name)
        .subscribe(evPos => {
          if (evPos !== null) {
            this.completedAddress = evPos.address;
            this.distanceFromCurrentPosition = this.geolocation.getDistanceFromTwoPoints(this.currentPosition, evPos.coordinates);
          }
        });
  }
}
