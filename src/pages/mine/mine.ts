import { Component } from "@angular/core";
import { Storage } from '@ionic/storage';
import { UserInfo } from "../../model/UserInfo";
import { SignInPage } from "../login/sign-in/sign-in";
import { ModalController, AlertController } from "ionic-angular";
import { Utils } from "../../providers/Utils";
import { SIGN_IN_TO_MINE } from "../../providers/Constants";
import { SignInService } from "../login/sign-in/SignInService";
import { NativeService } from "../../providers/NativeService";
import { GlobalData } from "../../providers/GlobalData";

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
  providers: [SignInService]
})
export class MinePage {
  public userInfo: UserInfo;
  public isPlatform:boolean = false;
  constructor(public storage: Storage,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public signService: SignInService,
              public nativeService: NativeService,
              public globalData:GlobalData) {
  }

  ionViewWillEnter() {
    this.isPlatform = this.nativeService.isMobile();
    this.getUser();
  }
  /***
   * 获取用户信息
   * */
  getUser(){
    this.storage.get('user').then((user: UserInfo) => {
      if (user) {
        this.userInfo = user;
      } else {
        this.userInfo = null;
      }
    });
  }
  /**
   * 检查更新
   * */
  syncUpdate(){
    this.nativeService.sync(true);
  }
  /***
   * 登陆
   * */
  signIn(){
    this.modalCtrl.create(SignInPage, {to: SIGN_IN_TO_MINE}).present();
  }

  /***
   * 退出登陆
   * */
  signOut(){
    this.alertCtrl.create({
      title: '是否退出登陆？',
      buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.signService.signOut().subscribe(r=>{
              if (r.ret){
                this.storage.clear();//清除缓存
                Utils.sessionStorageClear();//清除缓存
                this.globalData.token = '';
                this.globalData.cart = '';
                this.getUser();
              } else {
                this.nativeService.alertTip(r.data[0].message);
              }
            });
          }
        }]
    }).present();
  }
}
