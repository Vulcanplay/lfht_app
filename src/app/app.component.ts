import { Component, ViewChild } from '@angular/core';
import { Platform, IonicApp, Nav, ToastController, Keyboard, ModalController } from 'ionic-angular';
import { NativeService } from "../providers/NativeService";
import { Storage } from '@ionic/storage';
import {TabsPage} from "../pages/tabs/tabs";
import {Helper} from "../providers/Helper";
import {GlobalData} from "../providers/GlobalData";
import {SignInPage} from "../pages/login/sign-in/sign-in";
import {SIGN_IN_TO_MINE} from "../providers/Constants";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: Nav;
  rootPage: any = TabsPage;
  constructor(private platform: Platform,
              private keyboard: Keyboard,
              private storage: Storage,
              private ionicApp: IonicApp,
              private toastCtrl: ToastController,
              private nativeService: NativeService,
              private helper:Helper,
              private modalCtrl: ModalController,
              private globalData: GlobalData) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.nativeService.statusBarStyleDefault();
      this.nativeService.splashScreenHide();
      this.registerBackButtonAction();//注册返回按键事件
      this.assertNetwork();//检测网络
      this.helper.funDebugInit();//初始化fundebug
      this.nativeService.sync(false);
      this.globalData.cart = '0';
      this.storage.get('token').then(token => { //从缓存中获取token
        if (token) {
          this.globalData.token = token;
        } else {
          this.globalData.token = '';
          this.modalCtrl.create(SignInPage, {to: SIGN_IN_TO_MINE}).present();
        }
      });
      this.storage.get('cart').then(cart => { //从缓存中获取token
        if (cart) {
          this.globalData.cart = cart;
          console.log(this.globalData.cart);
        } else {
          this.globalData.cart = '0';
        }
      });
    });
  }

  assertNetwork() {
    if (!this.nativeService.isConnecting()) {
      this.toastCtrl.create({
        message: '未检测到网络,请连接网络',
        showCloseButton: true,
        closeButtonText: '确定'
      }).present();
    }
  }

  registerBackButtonAction() {
    if (!this.nativeService.isAndroid()) {
      return;
    }
    this.platform.registerBackButtonAction(() => {
      if (this.keyboard.isOpen()) {//如果键盘开启则隐藏键盘
        this.keyboard.close();
        return;
      }
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.nativeService.minimize();
    }, 1);
  }
}
