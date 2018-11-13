import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {SignaturePadRPage} from "./signature-pad-r";
import { SignaturePadModule } from 'angular2-signaturepad';
@NgModule({
  declarations: [
    SignaturePadRPage
  ],
  imports: [
    SignaturePadModule,
    IonicPageModule.forChild(SignaturePadRPage),
  ],
  exports: [
    SignaturePadRPage
  ]
})
export class SignaturePadReturnModule {}
