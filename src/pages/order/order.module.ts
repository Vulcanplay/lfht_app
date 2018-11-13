import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {OrderPage} from './order';
import {OrderService} from "./OrderService";
import {OrderDetailsPage} from "./details/details";
import {SignaturePadReturnModule} from "../../shared/signature-pad-return/signature-pad-r.module";
import {SignatureForOrderPage} from "./signature/signature";

@NgModule({
  imports: [IonicModule, SignaturePadReturnModule],
  declarations: [OrderPage, OrderDetailsPage, SignatureForOrderPage],
  entryComponents: [OrderPage, OrderDetailsPage, SignatureForOrderPage],
  providers: [OrderService],
  exports: [IonicModule]
})
export class OrderModule {
}
