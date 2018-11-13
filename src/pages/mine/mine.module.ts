import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MinePage} from './mine';
import {MineService} from "./MineService";

@NgModule({
  imports: [IonicModule],
  declarations: [MinePage],
  entryComponents: [MinePage],
  providers: [MineService],
  exports: [IonicModule]
})
export class MineModule {
}
