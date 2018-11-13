///<reference path="modal-transitions.ts"/>
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, Config} from 'ionic-angular';
import { MyApp } from './app.component';
import { SignaturePadModule } from 'angular2-signaturepad';
/*providers*/
import {NativeService} from "../providers/NativeService";
import {HttpService} from "../providers/HttpService";
import {FileService} from "../providers/FileService";
import {Helper} from "../providers/Helper";
import {Utils} from "../providers/Utils";
import {HttpModule} from "@angular/http";
import {GlobalData} from "../providers/GlobalData";
import {ENABLE_FUNDEBUG, IS_DEBUG, FUNDEBUG_API_KEY} from "../providers/Constants";
import {Logger} from "../providers/Logger";
import {
  CenterModalFromRightEnter, CenterModalFromRightLeave, FilterModalFromRightEnter, FilterModalFromRightLeave,
  ModalFromRightEnter, ModalFromRightLeave, ModalScaleEnter, ModalScaleLeave,
  PaymentModalFromRightEnter, PaymentModalFromRightLeave, PPModalFromRightEnter, PPModalFromRightLeave
} from "./modal-transitions";
/*ionic native*/
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Network} from "@ionic-native/network";
import {File} from "@ionic-native/file";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {ImagePicker} from "@ionic-native/image-picker";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Transfer} from "@ionic-native/transfer";
import {AppVersion} from "@ionic-native/app-version";
import {Camera} from "@ionic-native/camera";
import {AppMinimize} from "@ionic-native/app-minimize";
import {Diagnostic} from "@ionic-native/diagnostic";
import {Toast} from "@ionic-native/toast";
import {IonicStorageModule} from "@ionic/storage";
import {CodePush} from "@ionic-native/code-push";
import{ PhotoLibrary } from '@ionic-native/photo-library';
import{ AndroidPermissions } from '@ionic-native/android-permissions';
/*pages*/
import { OrderModule } from '../pages/order/order.module';
import { MineModule } from '../pages/mine/mine.module';
import { TabsModule } from '../pages/tabs/tabs.module';
import {SignInModule} from "../pages/login/sign-in/sign-in.module";
import {CategoryModule} from "../pages/category/category.module";
import {CommonService} from "../pages/service/CommonService";
//$ cnpm i fundebug-javascript --save
//https://docs.fundebug.com/notifier/javascript/framework/ionic2.html
declare var require: any;
let fundebug: any = require("fundebug-javascript");
fundebug.apikey = FUNDEBUG_API_KEY;
fundebug.releasestage = IS_DEBUG ? 'development' : 'production';//应用开发阶段，development:开发;production:生产
fundebug.silent = !ENABLE_FUNDEBUG;//如果暂时不需要使用Fundebug，将silent属性设为true

export class FunDebugErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    fundebug.notifyError(err);
    console.error(err);
  }
}

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md',//android >> 'md'
      backButtonText: '',
      backButtonIcon: 'arrow-round-back',
      tabsHideOnSubPages: 'true'
    }),
    IonicStorageModule.forRoot(),
    CategoryModule,
    OrderModule,
    MineModule,
    TabsModule,
    SignInModule,
    SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],

  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    Camera,
    Toast,
    File,
    FileTransfer,
    FileTransferObject,
    CodePush,
    Transfer,
    InAppBrowser,
    ImagePicker,
    Network,
    AppMinimize,
    Diagnostic,
    {provide: ErrorHandler, useClass: FunDebugErrorHandler},
    NativeService,
    HttpService,
    FileService,
    Helper,
    Utils,
    GlobalData,
    Logger,
    PhotoLibrary,
    AndroidPermissions,
    CommonService,
  ]
})

export class AppModule {
  constructor(public config: Config,
              public statusBar: StatusBar) {
    this.setCustomTransitions();
  }

  private setCustomTransitions() {
    this.statusBar.backgroundColorByHexString('#3598DC');
    this.config.setTransition('modal-from-right-enter', ModalFromRightEnter);
    this.config.setTransition('modal-from-right-leave', ModalFromRightLeave);
    this.config.setTransition('filter-modal-from-right-enter', FilterModalFromRightEnter);
    this.config.setTransition('filter-modal-from-right-leave', FilterModalFromRightLeave);
    this.config.setTransition('payment-modal-from-right-enter', PaymentModalFromRightEnter);
    this.config.setTransition('payment-modal-from-right-leave', PaymentModalFromRightLeave);
    this.config.setTransition('modal-scale-enter', ModalScaleEnter);
    this.config.setTransition('modal-scale-leave', ModalScaleLeave);
    this.config.setTransition('center-modal-from-right-enter', CenterModalFromRightEnter);
    this.config.setTransition('center-modal-from-right-leave', CenterModalFromRightLeave);
    this.config.setTransition('pp-modal-from-right-enter', PPModalFromRightEnter);
    this.config.setTransition('pp-modal-from-right-leave', PPModalFromRightLeave);
  }
}
