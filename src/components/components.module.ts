import { NgModule } from '@angular/core';
import { EvItemComponent } from './ev-item/ev-item';
import {IonicModule} from "ionic-angular";

@NgModule({
	declarations: [EvItemComponent],
	imports: [IonicModule],
	exports: [EvItemComponent]
})
export class ComponentsModule {}
