import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechercheSimplePage } from './recherche-simple';

@NgModule({
  declarations: [
    RechercheSimplePage,
  ],
  imports: [
    IonicPageModule.forChild(RechercheSimplePage),
  ],
})
export class RechercheSimplePageModule {}
