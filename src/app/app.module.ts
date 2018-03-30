import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { ComponentsModule } from '../components/components.module';
import { EspaceVertProvider } from '../providers/espace-vert/espace-vert';
import { HelpersProvider } from '../providers/helpers/helpers';
import { SearchProvider } from '../providers/search/search';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GeolocationProvider } from '../providers/geolocation/geolocation';





@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EspaceVertProvider,
    HelpersProvider,
    SearchProvider,
    HttpClientModule,
    SocialSharing,
    Geolocation,
    GeolocationProvider,
    GoogleMaps,
  ]
})
export class AppModule {}
