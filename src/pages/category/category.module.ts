import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {CategoryPage} from './category';
import {CategoryService} from "./CategoryService";
import {ShoppingCartPage} from "./shopping-cart/shopping-cart";
import {ProductDetailsPage} from "./details/details";
import {ProductConfirmPage} from "./confirm/confirm";
import {SignInModule} from "../login/sign-in/sign-in.module";

@NgModule({
  imports: [IonicModule, SignInModule],
  declarations: [CategoryPage, ShoppingCartPage, ProductDetailsPage, ProductConfirmPage],
  entryComponents: [CategoryPage, ShoppingCartPage, ProductDetailsPage, ProductConfirmPage],
  providers: [CategoryService],
  exports: [IonicModule]
})
export class CategoryModule {
}
