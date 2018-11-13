import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { SignInService } from './SignInService';
import { UserInfo } from "../../../model/UserInfo";
import { Utils } from "../../../providers/Utils";
import { TabsPage } from '../../tabs/tabs';
import { SIGN_IN_TO_MINE } from "../../../providers/Constants";
import { GlobalData } from "../../../providers/GlobalData";

@Component({
  selector: 'page-sing-in',
  templateUrl: 'sign-in.html',
  providers: [SignInService]
})

export class SignInPage {
  userInfo: UserInfo;
  submitted: boolean = false;
  loginForm: any;

  whereFrom: number = SIGN_IN_TO_MINE;
  constructor(private formBuilder: FormBuilder,
              private storage: Storage,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private signInService: SignInService,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private globalData: GlobalData) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewWillEnter() {
    this.whereFrom = this.navParams.get("to");
  }

  signIn(user) {
    this.signInService.signIn(user).subscribe(r => {
      if (r.ret) {
        this.userInfo = r.data.curUser;
        this.storage.clear();//清除缓存
        Utils.sessionStorageClear();//清除缓存
        this.storage.set('user', this.userInfo);
        this.storage.set('token', r.data.token);
        this.globalData.token = r.data.token;
        this.signInService.cart().subscribe( r => {
          this.storage.set('cart', r.data.cartCount);
          this.globalData.cart = r.data.cartCount;
        });
        if(this.whereFrom == SIGN_IN_TO_MINE){
          this.navCtrl.push(TabsPage, {index: 2});
        } else {
          //TODO 返回登陆成功结果
          this.viewCtrl.dismiss({message: "登陆成功"});
        }
      } else {
        this.alertCtrl.create({
          title: r.data[0].message,
          buttons: [
          {
            text: '确定',
          }]
        }).present();
        return false;
      }
    }, () => {
        this.submitted = false;
    });
  }

}
