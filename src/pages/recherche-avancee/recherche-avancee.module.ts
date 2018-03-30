import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechercheAvanceePage } from './recherche-avancee';

@NgModule({
  declarations: [
    RechercheAvanceePage,
  ],
  imports: [
    IonicPageModule.forChild(RechercheAvanceePage),
  ],
})
export class RechercheAvanceePageModule {}
