import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, Refresher, InfiniteScroll } from 'ionic-angular';
import { OrderDetailsPage } from "./details/details";
import { NativeService } from "../../providers/NativeService";
import { OrderService } from "./OrderService";
import { SignInPage } from "../login/sign-in/sign-in";
import { DomSanitizer } from "@angular/platform-browser";
import { SIGN_IN_TO_DISMISS } from "../../providers/Constants";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
  //列表集合
  public orderList: any = [];
  //是否登录
  public isSign: boolean = true;
  //分页数
  public pageIndex: any = 1;
  //当前分页索引
  public pageSize: any = 5;
  public count: any;
  //是否加载
  private canLoadMore: boolean = true;
  constructor(public navCtrl: NavController,
              public orderService: OrderService,
              public modalCtrl: ModalController,
              public _sanitizer: DomSanitizer,
              public alertCtrl: AlertController,
              public nativeService: NativeService) {
  }

  ionViewWillEnter() {
    this.resetParams();
    this.getOrderList();
  }

  /**
   * 获取订单列表
   * */
  getOrderList(){
    if (!this.nativeService.isSign()){
      this.orderList = [];
      this.signIn();
      return;
    } else {
      this.orderService.getOrderList({
        start: (this.pageIndex - 1) * this.pageSize,
        limit: this.pageSize
      }).subscribe(r => {
        if (r.ret){
          // 获取总条数 （判断是否继续请求）
          this.count = r.data.count;
          // 向数组迭代写入分页请求结果
          this.orderList = this.orderList.concat(r.data.orderList);
          //是否取完
          if (this.orderList.length >= this.count || r.data.orderList.length != this.pageSize) {
             this.canLoadMore = false;
             return;
          }
          //下一页
          this.pageIndex++;
        } else {
          this.nativeService.alertTip(r.data[0].message);
        }
      });
    }
  }

  /**
   * @OrderDetailsPage
   * 订单详情
   * */
  orderDetails(item){
    this.navCtrl.push(OrderDetailsPage, {item: item});
  }

  /**
   * @SignInPage
   * 登陆
   * */
  signIn(){
    this.isSign = false;
    let sign = this.modalCtrl.create(SignInPage, {to: SIGN_IN_TO_DISMISS});
    sign.present();
    sign.onDidDismiss(data=>{
      if (data != null){
        this.isSign = true;
        this.getOrderList();
        //this.nativeService.alertTip(data.message);
      } else {
        this.nativeService.alertTip("用户取消登陆");
      }
    })
  }

  /**
   * 重置参数
   * */
  resetParams() {
    this.canLoadMore = true;
    this.pageIndex = 1;
    this.orderList = [];
  }
  /**
   // 取消订单
   * */
  cancel(item){
    this.alertCtrl.create({
      title: '是否取消精品订单？',
      buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            /**
             * @delete
             * 取消订单
             * */
            this.orderService.cancelOrder({
              orderId: item.orderId
            }).subscribe(r => {
              if (r.ret) {
                this.nativeService.alertTip("订单取消成功.");
                this.navCtrl.push(TabsPage, {index: 1});
              } else {
                this.nativeService.alertTip(r.data[0].message);
              }
            });
          }
        }
      ]
    }).present();
  }

  /**
   * 背景图片
   * */
  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  /**
   * 下拉刷新
   * */
  doRefresh(refresher: Refresher) {
    this.resetParams();
    this.getOrderList();
    refresher.complete();
  }

  /**
   * 下拉加载
   * */
  doInfinite(infiniteScroll: InfiniteScroll) {
    if (!this.canLoadMore) {
      return;
    } else {
      setTimeout(() => {
        this.getOrderList();
        infiniteScroll.complete();
      }, 500)
    }
  }
}
