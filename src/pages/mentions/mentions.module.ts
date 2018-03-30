import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MentionsPage } from './mentions';

@NgModule({
  declarations: [
    MentionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MentionsPage),
  ],
})
export class MentionsPageModule {}
