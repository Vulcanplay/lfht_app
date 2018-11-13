import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {SignInPage} from './sign-in';

@NgModule({
  imports: [IonicModule],
  declarations: [SignInPage],
  entryComponents: [SignInPage],
  providers: [],
  exports: [IonicModule]
})
export class SignInModule {
}
