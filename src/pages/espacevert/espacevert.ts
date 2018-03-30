import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';


//EspaceVert class & EspaceVert Provider;
import { EspaceVertProvider } from '../../providers/espace-vert/espace-vert';
import { EspaceVert } from '../../classes/espaceVert';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';


@IonicPage()
@Component({
  selector: 'page-espacevert',
  templateUrl: 'espacevert.html',
})
export class espacevertPage implements OnInit {

  nom ="";
  donnees: Observable<any>;

  private evId: number;
  private ev: EspaceVert;
  private completedAddress: string;

  constructor(public navCtrl: NavController, 
              private navParams: NavParams,
              private EVProvider: EspaceVertProvider,
              public HttpClient: HttpClient,
              public alertCtrl: AlertController,
              private socialSharing: SocialSharing,
              private geolocation: GeolocationProvider) {

    this.HttpClient = HttpClient;
    
  }

  ngOnInit() {
    this.getEspaceVert();
    return this.getEspaceVert();
  }

  toggleVisible(): void {
    let divInfo = document.getElementById('hidden');

    if (divInfo.style.display == 'none') {
      divInfo.style.display = 'block';
    } else {
      divInfo.style.display = 'none';
    }
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  getEspaceVert(): void {
    this.evId = this.navParams.get('evId');
    this.EVProvider.getEspaceVert(this.evId)
                    .subscribe(ev => {
                      this.ev = ev;
                      this.getEVPosition();
                    });
  }

  getEVPosition(): void {
    this.geolocation.getPlacePosition(this.ev.name)
        .subscribe(evPos => {
          if (evPos !== null) {
            this.completedAddress = evPos.address;
          }
        });
  }

  toMap() {
    this.navCtrl.push('MapPage', {ev: {name: this.ev.name}})
  }

  //

  commentaires(){
    this.charge();

  }
  charge() {
    
    var x = ' ';
    var y = 0;
    var count;
    this.donnees = this.HttpClient.get('http://parisouvert.com/api.php/avis?transform=1&order=date_ajout,desc&filter=espace_vert_id,eq,' + this.evId);
    this.donnees
    .subscribe(data => {
    count = Object.keys(data.avis).length;
    for (var i = 1; i < count; i++) {
      
      x = x + `<div class="avis-utilisateur">
      <img src="assets/imgs/avatar.jpg" alt="" class="avatar">

      <p class="user-text">
          `+ data.avis[i].utilisateur + `<br>
          <i>` + data.avis[i].date_ajout + `</i>
      </p>

      <div class="user-note">
          <ion-icon class="icon-star" name="star"></ion-icon>
          <ion-icon class="icon-star" name="star"></ion-icon>
          <ion-icon class="icon-star" name="star"></ion-icon>
          <ion-icon class="icon-star" name="star-outline"></ion-icon>
          <ion-icon class="icon-star" name="star-outline"></ion-icon>
      </div>
  </div>
  <p>`+ data.avis[i].contenu + `</p><br />`;
      document.getElementById("insertion").innerHTML = x;
      
      
      y = y+1;
    }
    });
    
  }

  appel(){
    let alert = this.alertCtrl.create({
      title: 'Avis',
      inputs: [
        {
          type:'text',
          name: 'avis',
          placeholder: 'Ce parc est magnifique...'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Laisser mon avis',
          handler: data => {
            var avis = data.avis;

    var link = 'http://parisouvert.com/api.php/avis';
    var data2 = JSON.stringify({"avis_id":"","espace_vert_id":this.evId,"utilisateur":"Anonyme", "contenu":avis,"date_ajout":new Date()});
    
    this.HttpClient.post(link, data2)
    .subscribe(data2 => {
        console.log("ça marche, les données sont enregistrées dans la bdd");
    }, error => {
        console.log("Erreur, go checker le code");
    });
    this.charge();
  }
            
          
        }
      ]
    });
    alert.present();
  }
  partageFacebook() {
    this.donnees = this.HttpClient.get('http://parisouvert.com/api.php/espace_vert/' + this.evId);
    this.donnees
    .subscribe(data => {
      var textePartage = "Je viens de découvrir un parc sur l'application Paris Ou'Vert,  " + data.name + " ! On y va tous ensembles ? ;)"
    // Share via Facebook
      this.socialSharing.share(textePartage,'Viens découvrir ce parc avec moi !','http://parisouvert.com/images/partage.png' , 'http://parisouvert.com');
    });
    }
  

}
