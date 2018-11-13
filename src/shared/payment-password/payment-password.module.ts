import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PaymentPasswordPage} from "./payment-password";
import {IonDigitKeyboard} from "../ion-digit-keyboard/ion-digit-keyboard.module";

@NgModule({
  declarations: [
    PaymentPasswordPage
  ],
  imports: [
    IonicPageModule.forChild(PaymentPasswordPage),IonDigitKeyboard
  ],
  exports: [
    PaymentPasswordPage
  ]
})
export class PaymentPasswordModule {}
